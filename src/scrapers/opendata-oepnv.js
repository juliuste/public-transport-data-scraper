// the data is fetched and processed in these steps:
// 1. obtain a session cookie and the zip file's url
// 2. download the data using the session cookie

import { DateTime } from 'luxon'
import cheerio from 'cheerio'
import got from 'got'
import lodash from 'lodash'
import { basename } from 'path'

const throwOnMultipleOrNoMatches = fileUrls => {
	if (fileUrls.length !== 1) throw new Error(`unexpected number of file urls: ${fileUrls.length}, probably internal error or invalid credentials.`)
	return fileUrls[0]
}

const extractUrlFromResponse = (html, isMatchingFile, selectBestMatch) => {
	const parsed = cheerio.load(html)
	const urls = Array.from(parsed('a').filter(function (i, el) {
		// this === el
		return isMatchingFile(parsed(this).attr('href') || '')
	})).map(a => parsed(a).attr('href'))
	const url = selectBestMatch(urls)
	return url
}

const fetchCookie = async (user, password) => {
	const url = new URL('https://www.opendata-oepnv.de/ht/de/willkommen')
	url.searchParams.append('tx_felogin_login[action]', 'login')
	url.searchParams.append('tx_felogin_login[controller]', 'Login')
	url.searchParams.append('cHash', '99c35a06ebc0db4f37f0bb93048bb79b')
	const response = await got.post(url, {
		form: {
			user,
			pass: password,
			submit: 'Anmelden',
			logintype: 'login',
			pid: '174@d6f42d5376399b9d6eee5cbcb5a06dcb1b489387',
		},
	})
	const cookie = (response.headers['set-cookie'] || []).find(c => c.includes('fe_typo_user'))
	if (!cookie) throw new Error('cookie not found. internal error or invalid credentials')
	return cookie
}

const fetchAndOutput = async (user, password, organisationPath, datasetName, isMatchingFile, selectBestMatch = throwOnMultipleOrNoMatches) => {
	const cookie = await fetchCookie(user, password)

	const url = new URL(organisationPath, 'https://www.opendata-oepnv.de/ht/de/organisation/')
	url.searchParams.append('tx_vrrkit_view[dataset_name]', datasetName)
	url.searchParams.append('tx_vrrkit_view[action]', 'details')
	url.searchParams.append('tx_vrrkit_view[controller]', 'View')

	const response = await got.get(url, { headers: { Cookie: cookie } })
	const fileUrl = extractUrlFromResponse(response.body, isMatchingFile, selectBestMatch)

	const stream = await got.stream.get(fileUrl, { headers: { Cookie: cookie } })
	return stream.pipe(process.stdout)
}

export const gtfs = async (user, password) => {
	const organisationPath = 'delfi/startseite'
	const datasetName = 'deutschlandweite-sollfahrplandaten-gtfs'
	const isMatchingFile = name => name.endsWith('_fahrplaene_gesamtdeutschland_gtfs.zip')
	await fetchAndOutput(user, password, organisationPath, datasetName, isMatchingFile)
}

export const netex = async (user, password) => {
	const organisationPath = 'delfi/startseite'
	const datasetName = 'deutschlandweite-sollfahrplandaten'
	const isMatchingFile = name => name.endsWith('_fahrplaene_gesamtdeutschland.zip')
	await fetchAndOutput(user, password, organisationPath, datasetName, isMatchingFile)
}

export const zhv = async (user, password) => {
	const organisationPath = 'delfi/startseite'
	const datasetName = 'deutschlandweite-haltestellendaten'
	const isMatchingFile = name => name.endsWith('_zHV_gesamt.zip')
	await fetchAndOutput(user, password, organisationPath, datasetName, isMatchingFile)
}

export const nrwGtfs = async (user, password) => {
	const organisationPath = 'bundeslaender/nrw/startseite'
	const datasetName = 'soll-fahrplandaten-nrw'
	const isMatchingFile = name => /\/nrw-gtfs-\d{2}-\d{4}\.zip$/.test(name)
	const selectBestMatch = urls => {
		const urlsWithDate = urls.map(url => {
			const fileName = basename(new URL(url).pathname)
			const rawDate = `28-${fileName.slice(-11).slice(0, 7)}`
			const date = DateTime.fromFormat(rawDate, 'dd-MM-yyyy').toJSDate()
			return { date, url }
		})
		const latest = lodash.last(lodash.sortBy(urlsWithDate, ({ date }) => +date))
		// throw if latest file is older than 90 days
		if (+new Date() - (+latest.date) > 90 * 24 * 60 * 60 * 1000) throw new Error(`latest dataset seems to be outdated: ${latest.date}`)
		return latest.url
	}
	await fetchAndOutput(user, password, organisationPath, datasetName, isMatchingFile, selectBestMatch)
}

export const hvvGtfs = async (user, password) => {
	const organisationPath = 'verkehrsverbuende/hvv/startseite'
	const datasetName = 'soll-fahrplandaten-hvv'
	const isMatchingFile = name => /\/hvv_rohdaten_gtfs_fpl_\d{8}\.zip$/.test(name)
	const selectBestMatch = urls => {
		const urlsWithDate = urls.map(url => {
			const fileName = basename(new URL(url).pathname)
			const rawDate = `${fileName.slice(-12).slice(0, 8)}`
			const date = DateTime.fromFormat(rawDate, 'yyyyMMdd').toJSDate()
			return { date, url }
		})
		const latest = lodash.last(lodash.sortBy(urlsWithDate, ({ date }) => +date))
		// throw if latest file is older than 45 days
		if (+new Date() - (+latest.date) > 45 * 24 * 60 * 60 * 1000) throw new Error(`latest dataset seems to be outdated: ${latest.date}`)
		return latest.url
	}
	await fetchAndOutput(user, password, organisationPath, datasetName, isMatchingFile, selectBestMatch)
}
