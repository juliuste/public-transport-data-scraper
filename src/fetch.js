const dataset = process.env.DATASET

const main = async () => {
	if (['DE_NETEX', 'DE_GTFS', 'DE_ZHV', 'DE_NRW_GTFS'].includes(dataset)) {
		const [user, password] = [process.env.OPENDATA_OEPNV_EMAIL, process.env.OPENDATA_OEPNV_PASSWORD]
		if (typeof user !== 'string' || user.length === 0) throw new Error('env.OPENDATA_OEPNV_EMAIL must be a non-empty string')
		if (typeof password !== 'string' || password.length === 0) throw new Error('env.OPENDATA_OEPNV_PASSWORD must be a non-empty string')

		if (dataset === 'DE_NETEX') {
			const { netex } = await import('./scrapers/opendata-oepnv.js')
			await netex(user, password)
			return
		}
		if (dataset === 'DE_GTFS') {
			const { gtfs } = await import('./scrapers/opendata-oepnv.js')
			await gtfs(user, password)
			return
		}
		if (dataset === 'DE_ZHV') {
			const { zhv } = await import('./scrapers/opendata-oepnv.js')
			await zhv(user, password)
			return
		}
		if (dataset === 'DE_NRW_GTFS') {
			const { nrwGtfs } = await import('./scrapers/opendata-oepnv.js')
			await nrwGtfs(user, password)
			return
		}
	}
	if (dataset === 'DE_HVV_GTFS') {
		const { hvvGtfs } = await import('./scrapers/hvv.js')
		await hvvGtfs()
		return
	}
	if (dataset === 'LU_GTFS') {
		const { luxembourgGtfs } = await import('./scrapers/luxembourg.js')
		await luxembourgGtfs()
		return
	}
	throw new Error(`unknown dataset: ${dataset}`)
}

main()
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
