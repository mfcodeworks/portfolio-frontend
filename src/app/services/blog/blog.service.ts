import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
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

    getBlogPosts(offset = 0, limit = 10): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogPostsPage,
            variables: {offset, limit}
        });
    }

    getBlogPostsFiltered(ref: string, offset = 0, limit = 10): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogPostsPageFiltered,
            variables: {offset, limit, ref}
        });
    }

    getBlogPost(slug: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogPostPage,
            variables: {slug}
        });
    }

    getBlogAuthor(slug: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogAuthor,
            variables: {slug}
        });
    }

    getTagID(name: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: Tag,
            variables: {name}
        })
    }

    getCategoryID(name: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: Category,
            variables: {name}
        })
    }
}
