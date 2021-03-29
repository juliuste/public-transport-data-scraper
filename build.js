'use strict'

// the data is fetched and processed in these steps:
// 1. obtain a session cookie and the zip file's url
// 2. download the data using the session cookie

const got = require('got')
const cheerio = require('cheerio')

const extractUrlFromResponse = (html, isMatchingFile) => {
	const parsed = cheerio.load(html)
	const url = parsed('a').filter(function (i, el) {
		// this === el
		return isMatchingFile(parsed(this).attr('href') || '')
	}).attr('href')
	if (!url) throw new Error('no matching url found on download page. internal error or invalid credentials')
	return url
}

const fetchAndOutput = async (user, password, datasetName, isMatchingFile) => {
	const url = new URL('https://www.opendata-oepnv.de/ht/de/organisation/delfi/startseite')
	url.searchParams.append('tx_vrrkit_view[dataset_name]', datasetName)
	url.searchParams.append('tx_vrrkit_view[action]', 'details')
	url.searchParams.append('tx_vrrkit_view[controller]', 'View')

	const response = await got.post(url, {
		form: {
			user,
			pass: password,
			submit: 'Anmelden',
			logintype: 'login',
			pid: 174,
			'tx_felogin_pi1[noredirect]': 0,
			referer: url.toString(),
		},
	})

	const cookie = (response.headers['set-cookie'] || []).find(c => c.includes('fe_typo_user'))
	if (!cookie) throw new Error('cookie not found. internal error or invalid credentials')

	const fileUrl = extractUrlFromResponse(response.body, isMatchingFile)

	const stream = await got.stream.get(fileUrl, { headers: { Cookie: cookie } })
	return stream.pipe(process.stdout)
}

const logAndExit = error => {
	console.error(error)
	process.exit(1)
}

const [user, password] = [process.env.OPENDATA_OEPNV_EMAIL, process.env.OPENDATA_OEPNV_PASSWORD]
if (typeof user !== 'string' || user.length === 0) logAndExit('env.OPENDATA_OEPNV_EMAIL must be a non-empty string')
if (typeof password !== 'string' || password.length === 0) logAndExit('env.OPENDATA_OEPNV_PASSWORD must be a non-empty string')

const gtfs = () => {
	const datasetName = 'deutschlandweite-sollfahrplandaten-gtfs'
	const isMatchingFile = name => name.endsWith('_fahrplaene_gesamtdeutschland_gtfs.zip')
	fetchAndOutput(user, password, datasetName, isMatchingFile).catch(logAndExit)
}

const netex = () => {
	const datasetName = 'deutschlandweite-sollfahrplandaten'
	const isMatchingFile = name => name.endsWith('_fahrplaene_gesamtdeutschland.zip')
	fetchAndOutput(user, password, datasetName, isMatchingFile).catch(logAndExit)
}

const zhv = () => {
	const datasetName = 'deutschlandweite-haltestellendaten'
	const isMatchingFile = name => name.endsWith('_zHV_gesamt.zip')
	fetchAndOutput(user, password, datasetName, isMatchingFile).catch(logAndExit)
}

module.exports = { gtfs, netex, zhv }
