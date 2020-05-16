import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';
import { AuthorComponent } from './components/author/author.component';
import { SearchComponent } from './pages/search/search.component';
import { BlogRoutingModule } from './blog.routing';
import { SharedModule } from '../shared/shared.module';
import { PostsListingComponent } from './components/posts-listing/posts-listing.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    AuthorComponent,
    SearchComponent,
    PostsListingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
