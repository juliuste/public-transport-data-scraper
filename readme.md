# public-transport-data-scraper

Scraper that re-publishes official public transport datasets under stable URLs, since many transportation authorities and government agencies sadly don't provide any on their own, making it nearly impossible to integrate these datasets in automated systems.

## Scraped datasets

Dataset | License | Attribution | Stable URL
------- | ------- | ----------- | ----------
[Germany-wide GTFS feed](https://www.opendata-oepnv.de/ht/de/organisation/delfi/startseite?tx_vrrkit_view%5Bdataset_name%5D=deutschlandweite-sollfahrplandaten-gtfs&tx_vrrkit_view%5Baction%5D=details&tx_vrrkit_view%5Bcontroller%5D=View) (🇩🇪) | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [opendata-oepnv.de](https://www.opendata-oepnv.de) | [latest](https://scraped.data.public-transport.earth/de/gtfs.zip)
[Germany-wide NETEX feed](https://www.opendata-oepnv.de/ht/de/organisation/delfi/startseite?tx_vrrkit_view%5Bdataset_name%5D=deutschlandweite-sollfahrplandaten&tx_vrrkit_view%5Baction%5D=details&tx_vrrkit_view%5Bcontroller%5D=View) (🇩🇪) | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [opendata-oepnv.de](https://www.opendata-oepnv.de) | [latest](https://scraped.data.public-transport.earth/de/netex.zip)
[German public transport stop registry (ZHV)](https://www.opendata-oepnv.de/ht/de/organisation/delfi/startseite?tx_vrrkit_view%5Bdataset_name%5D=deutschlandweite-haltestellendaten&tx_vrrkit_view%5Baction%5D=details&tx_vrrkit_view%5Bcontroller%5D=View) (🇩🇪) | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [opendata-oepnv.de](https://www.opendata-oepnv.de) | [latest](https://scraped.data.public-transport.earth/de/zhv.zip)
[North Rhine-Westphalia (NRW) GTFS feed](https://www.opendata-oepnv.de/ht/de/organisation/bundeslaender/nrw/startseite?tx_vrrkit_view[dataset_name]=soll-fahrplandaten-nrw&tx_vrrkit_view[action]=details&tx_vrrkit_view[controller]=View) (🇩🇪) | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [opendata-oepnv.de](https://www.opendata-oepnv.de) | [latest](https://scraped.data.public-transport.earth/de/nrw-gtfs.zip)
[Hamburger Verkehrsverbund (HVV) GTFS feed](https://suche.transparenz.hamburg.de/dataset?q=hvv%20gtfs&sort=score+desc%2Ctitle_sort+asc&esq_not_all_versions=true) (🇩🇪) | [DL-DE BY 2.0](https://www.govdata.de/dl-de/by-2-0) | [Hamburger Verkehrsverbund GmbH](https://www.hvv.de/) | [latest](https://scraped.data.public-transport.earth/de/hvv-gtfs.zip)
[Luxembourg-wide GTFS feed](https://data.public.lu/en/datasets/horaires-et-arrets-des-transport-publics-gtfs/) (🇱🇺) | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Administration des transports publics](https://mmtp.gouvernement.lu/de/annuaire.html?idMin=7854) | [latest](https://scraped.data.public-transport.earth/lu/gtfs.zip)
[Luxembourg-wide NeTEx feed](https://data.public.lu/en/datasets/horaires-et-arrets-des-transport-publics-netex/) (🇱🇺) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | _[Administration des transports publics](https://mmtp.gouvernement.lu/de/annuaire.html?idMin=7854)_ | [latest](https://scraped.data.public-transport.earth/lu/netex.zip)
[Sweden-wide GTFS feed](https://www.trafiklab.se/api/trafiklab-apis/gtfs-sverige-2/) (🇸🇪) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | _[Trafiklab](https://www.trafiklab.se/)_ | [latest](https://scraped.data.public-transport.earth/se/gtfs.zip)

## Contributing

If you found a bug, want to propose a feed or add a new scraper, feel free to visit [the issues page](https://github.com/juliuste/public-transport-data-scraper/issues), or open a pull request.
