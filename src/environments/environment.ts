// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    graphql: {
        uri: 'https://682knlgh.api.sanity.io/v1/graphql/production/default',
        imageCdn: 'https://cdn.sanity.io/images/682knlgh/production/'
    },
    sanity: {
        projectId: '682knlgh',
        dataset: 'production',
        useCdn: false
    },
    mailgun: {
        from: 'MF Codeworks Test <postmaster@sandboxefc86754a42c4a36bf5ac6c8081a4f4c.mailgun.org>',
        to: 'Arran Fletcher <arranjamesfletcher2012@gmail.com>',
        auth: 'api:0fc5aaa543e53f7b1435ad26d02da28e-3e51f8d2-3f2309ed',
        api: 'https://api.mailgun.net/v3/sandboxefc86754a42c4a36bf5ac6c8081a4f4c.mailgun.org/messages'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
