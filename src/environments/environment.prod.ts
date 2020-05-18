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
    mailer: {
        from: 'MF Codeworks Test <mfcodeworks@gmail.com>',
        to: 'Arran Fletcher <arranjamesfletcher2012@gmail.com>',
        api: 'https://mailer.mfcodeworks.com/.netlify/functions/mailer/sendMail'
    }
};
