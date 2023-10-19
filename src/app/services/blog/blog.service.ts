import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
    BlogPostsPage,
    BlogPostPage,
    BlogAuthor,
    Tag,
    Category,
    BlogPostsPageFiltered
} from '../../shared/queries';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private apollo: Apollo) { }

    getBlogPosts(offset = 0, limit = 10) {
        return this.apollo.query<any>({
            query: BlogPostsPage,
            variables: {offset, limit}
        });
    }

    getBlogPostsFiltered(ref: string, offset = 0, limit = 10) {
        return this.apollo.query<any>({
            query: BlogPostsPageFiltered,
            variables: {offset, limit, ref}
        });
    }

    getBlogPost(slug: string) {
        return this.apollo.query<any>({
            query: BlogPostPage,
            variables: {slug}
        });
    }

    getBlogAuthor(slug: string) {
        return this.apollo.query<any>({
            query: BlogAuthor,
            variables: {slug}
        });
    }

    getTagID(name: string) {
        return this.apollo.query<any>({
            query: Tag,
            variables: {name}
        })
    }

    getCategoryID(name: string) {
        return this.apollo.query<any>({
            query: Category,
            variables: {name}
        })
    }
}
