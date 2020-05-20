import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { SearchComponent } from './pages/search/search.component';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [
    {
        path: '',
        component: PostsComponent
    },
    {
        path: 'article',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'tag',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'category',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'category/:category',
        component: SearchComponent
    },
    {
        path: 'tag/:tag',
        component: SearchComponent
    },
    {
        path: 'article/:slug',
        component: PostComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
