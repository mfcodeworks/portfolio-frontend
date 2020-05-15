import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HomePage } from '../../shared/queries';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private apollo: Apollo) { }

    getHomePageData(): Observable<ApolloQueryResult<any>> {
        return this.apollo.query<any>({ query: HomePage });
    }
}
