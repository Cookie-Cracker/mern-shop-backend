module.exports = {

    servers: [
        {
            url: process.env.NODE_ENV === 'production'
                ? 'PROD'
                : 'http://localhost:3900/api',
            description: process.env.NODE_ENV === 'production'
                ? 'Server'
                : 'Local Server',
        }
    ]
}