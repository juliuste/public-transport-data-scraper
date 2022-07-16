const dataset = process.env.DATASET

const main = async () => {
	if (dataset === 'DE_NETEX') {
		const [user, password] = [process.env.OPENDATA_OEPNV_EMAIL, process.env.OPENDATA_OEPNV_PASSWORD]
		if (typeof user !== 'string' || user.length === 0) throw new Error('env.OPENDATA_OEPNV_EMAIL must be a non-empty string')
		if (typeof password !== 'string' || password.length === 0) throw new Error('env.OPENDATA_OEPNV_PASSWORD must be a non-empty string')
		const { netex } = await import('./scrapers/opendata-oepnv.js')
		await netex(user, password)
		return
	}
	if (dataset === 'DE_GTFS') {
		const [user, password] = [process.env.OPENDATA_OEPNV_EMAIL, process.env.OPENDATA_OEPNV_PASSWORD]
		if (typeof user !== 'string' || user.length === 0) throw new Error('env.OPENDATA_OEPNV_EMAIL must be a non-empty string')
		if (typeof password !== 'string' || password.length === 0) throw new Error('env.OPENDATA_OEPNV_PASSWORD must be a non-empty string')
		const { gtfs } = await import('./scrapers/opendata-oepnv.js')
		await gtfs(user, password)
		return
	}
	if (dataset === 'DE_ZHV') {
		const [user, password] = [process.env.OPENDATA_OEPNV_EMAIL, process.env.OPENDATA_OEPNV_PASSWORD]
		if (typeof user !== 'string' || user.length === 0) throw new Error('env.OPENDATA_OEPNV_EMAIL must be a non-empty string')
		if (typeof password !== 'string' || password.length === 0) throw new Error('env.OPENDATA_OEPNV_PASSWORD must be a non-empty string')
		const { zhv } = await import('./scrapers/opendata-oepnv.js')
		await zhv(user, password)
		return
	}
	throw new Error(`unknown dataset: ${dataset}`)
}

main()
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
