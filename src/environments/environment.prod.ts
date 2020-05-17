export const environment = {
    production: true,
    graphql: {
        uri: 'https://682knlgh.apicdn.sanity.io/v1/graphql/production/default',
        imageCdn: 'https://cdn.sanity.io/images/682knlgh/production/'
    },
    sanity: {
        projectId: '682knlgh',
        dataset: 'production',
        useCdn: true
    },
    mailgun: {
        from: 'MF Codeworks Test <postmaster@sandboxefc86754a42c4a36bf5ac6c8081a4f4c.mailgun.org>',
        to: 'Arran Fletcher <arranjamesfletcher2012@gmail.com>',
        auth: 'api:0fc5aaa543e53f7b1435ad26d02da28e-3e51f8d2-3f2309ed',
        api: 'https://api.mailgun.net/v3/sandboxefc86754a42c4a36bf5ac6c8081a4f4c.mailgun.org/messages'
    }
};
