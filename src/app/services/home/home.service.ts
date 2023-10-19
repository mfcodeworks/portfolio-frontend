import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HomePage } from '../../shared/queries';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private apollo: Apollo) { }

    getHomePageData() {
        return this.apollo.query<any>({ query: HomePage });
    }
}
