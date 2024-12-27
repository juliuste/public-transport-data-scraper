import got from 'got'

export const hvvGtfs = async () => {
	const response = await got.get(new URL('https://suche.transparenz.hamburg.de/api/3/action/package_search?q=name%3Ahvv-fahrplandaten-gtfs-%2A-bis%2A&sort=metadata_modified%20desc')).json()
	const item = response?.result?.results[0]
	if (!item || item.author !== 'Hamburger Verkehrsverbund GmbH') throw new Error('no matching dataset found')
	if (item.license_id !== 'dl-de-by-2.0') throw new Error('unexpected license')

	if (item.resources.length !== 1) throw new Error('unexpected number of resources')
	const { url, created } = item.resources[0]
	if (!url || !created) throw new Error('missing resource properties')

	// throw if latest file is older than 31 days
	if (+new Date() - (+new Date(created)) > 31 * 24 * 60 * 60 * 1000) throw new Error(`latest dataset seems to be outdated: ${created}`)

	const stream = await got.stream.get(url, {
		https: { rejectUnauthorized: false }, // sigh…
	})
	return stream.pipe(process.stdout)
}
