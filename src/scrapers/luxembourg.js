import got from 'got'
import lodash from 'lodash'

const findLatestFeed = (response, license) => {
	if (response?.license !== license) throw new Error('unexpected license')
	const [latest] = lodash.sortBy((response?.resources || []).filter(r => r?.format === 'zip'), r => -new Date(r?.created_at))
	if (!latest) throw new Error('no matching dataset found')

	const { created_at: createdAt, url } = latest
	if (!url || !createdAt) throw new Error('missing resource properties')

	// throw if latest file is older than 20 days
	if (+new Date() - (+new Date(createdAt)) > 20 * 24 * 60 * 60 * 1000) throw new Error(`latest dataset seems to be outdated: ${createdAt}`)

	return url
}

export const luxembourgGtfs = async () => {
	const response = await got.get(new URL('https://data.public.lu/api/1/datasets/gtfs')).json()
	const latestUrl = findLatestFeed(response, 'cc-by')
	const stream = await got.stream.get(latestUrl)
	return stream.pipe(process.stdout)
}

export const luxembourgNetex = async () => {
	const response = await got.get(new URL('https://data.public.lu/api/1/datasets/horaires-et-arrets-des-transport-publics-netex/')).json()
	const latestUrl = findLatestFeed(response, 'cc-zero')
	const stream = await got.stream.get(latestUrl)
	return stream.pipe(process.stdout)
}
