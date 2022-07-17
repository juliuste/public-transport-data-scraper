import got from 'got'
import lodash from 'lodash'

export const luxembourgGtfs = async () => {
	const response = await got.get(new URL('https://data.public.lu/api/1/datasets/gtfs')).json()
	if (response?.license !== 'cc-by') throw new Error('unexpected license')

	const [latest] = lodash.sortBy((response?.resources || []).filter(r => r?.format === 'zip'), r => -new Date(r?.published))
	if (!latest) throw new Error('no matching dataset found')

	const { published, url } = latest
	if (!url || !published) throw new Error('missing resource properties')

	// throw if latest file is older than 10 days
	if (+new Date() - (+new Date(published)) > 10 * 24 * 60 * 60 * 1000) throw new Error(`latest dataset seems to be outdated: ${published}`)

	const stream = await got.stream.get(url)
	return stream.pipe(process.stdout)
}
