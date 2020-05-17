import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HomeService } from '../../../services/home/home.service';
import { Slide, ToolGraphQL, PostGraphQL, MetaFileGraphQL } from '../../../shared/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    // Get Home page data from GraphQL
    pageData: Observable<any> = this.home.getHomePageData().pipe(share());

    // Get tag logos
    imageSlides: Observable<Slide[]> = this.pageData.pipe(
        // Map GraphQL query to structured array
        map(({data}) => this.mapToolGraphQL(data.allTools))
    );

    // Get latest posts
    posts: Observable<PostGraphQL[]> = this.pageData.pipe(
        map(({data}) => data.allPost)
    );

    // Get CV
    cv: Observable<MetaFileGraphQL> = this.pageData.pipe(
        map(({data}) => data.allMetaFiles[0])
    );

    constructor(private home: HomeService) { }

    // Map GraphQL Tool query to Slide array
    mapToolGraphQL(d: ToolGraphQL[]): Slide[] {
        return d.map((l: ToolGraphQL) => {
            return {
                image: l.logo.asset.url,
                alt: l.title.toLowerCase()
            }
        });
    }

}
