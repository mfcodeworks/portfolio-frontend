import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { BlogPostsPage, BlogPostPage, BlogAuthorPage } from '../../shared/queries';

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

    getBlogPost(slug: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogPostPage,
            variables: {slug}
        });
    }

    getBlogAuthor(slug: string): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({
            query: BlogAuthorPage,
            variables: {slug}
        });
    }
}
