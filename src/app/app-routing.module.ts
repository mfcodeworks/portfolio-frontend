import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const ipfs = ['ipfs', 'ipns'];

// Test subpage (IPFS gateway) or domain (IPFS subdomain)
const useHash = ipfs.includes(
    window.location.pathname.split('/')[1].toLowerCase() ||
    window.location.host.split('.')[0]
);

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    }
];

const options: ExtraOptions = {
    useHash,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
