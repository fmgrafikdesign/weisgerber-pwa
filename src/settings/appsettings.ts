const Appsettings = {
    api : {
        base : 'https://weisgerber.fmgrafikdesign.de/wp-json/better-rest-endpoints/v1',
        stelen : "/stele/",
        library: "",
        count_parameter: 'per_page',
        location : '/acf/position/',
        pois_to_retrieve: '100'
    },
    map : {
        // tslint:disable-next-line:max-line-length
        accessToken : 'pk.eyJ1IjoiZm1ncmFmaWtkZXNpZ24iLCJhIjoiY2p0YWJyeHdiMDk4ZjQ0bnVsNmxxOTVxNiJ9.VT7_EBjMcWpDWzXyxyPuuw',
        center: [7.1122986, 49.279558],
        maxZoom: 22,
        minZoom: 5,
        provider : 'mapbox',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 13
    },
    menu : {
        items: [
            {
                name: 'Start',
                icon: false,
                route: '/'
            },
            {
                name: 'Karte',
                icon: false,
                route: '/karte'
            },
            {
                name: 'Stelen',
                icon: false,
                route: '/stelen'
            },
            {
                name: 'Bibliothek',
                icon: false,
                route: '/bibliothek'
            },
            {
                name: 'Publikation',
                icon: false,
                route: '/publikation'
            }
        ]
    },
    offer_directions : false,
    title : 'Albert Weisgerber',
    poi_route: '/stelen'

};

export default Appsettings;