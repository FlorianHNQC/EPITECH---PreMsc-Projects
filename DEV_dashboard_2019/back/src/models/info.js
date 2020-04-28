const info =  {
    customer: { host: ""},
    server: {
        current_time: 0,
        services: [{
            name: 'weather',
            widgets: [{
                name:'weatherbyday',
                description: 'Display temperature for a city',
                params: [{
                    city: 'city',
                    type: 'string'
                }]
            }, {
                name:'weather-detailed',
                description: 'Display all weather information about a city',
                params: [{
                    city: 'city',
                    type: 'string'
                }]
            }] } , {
            name: 'rss',
            widgets: [{
                name:'jeuxvideo-rss',
                description: 'Display feeds about videogame',
                params: [{
                    category: 'category',
                    type: 'string'
                }]
            } , {
                name: 'lemonde-rss',
                description: 'Display feeds about world news',
                params: [{
                    category: 'category',
                    type: 'string'
                }]
            }]
            } , {
            name: 'todolist',
            widgets: [{
                name: 'todolist',
                description: 'a to-do list',
                params: {

                }
            }]
            }]
        
    }
}
 
module.exports = info