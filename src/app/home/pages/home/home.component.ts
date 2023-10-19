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
    pageData: Observable<any>

    // Get tag logos
    imageSlides: Observable<Slide[]>

    // Get latest posts
    posts: Observable<PostGraphQL[]>

    // Get CV
    cv: Observable<MetaFileGraphQL>

    constructor(private home: HomeService) {
        // Get Home page data from GraphQL
        this.pageData= this.home.getHomePageData().pipe(share());

        // Get tag logos
        this.imageSlides = this.pageData.pipe(
            // Map GraphQL query to structured array
            map(({data}) => this.mapToolGraphQL(data.allTools))
        );

        // Get latest posts
        this.posts = this.pageData.pipe(
            map(({data}) => data.allPost)
        );

        // Get CV
        this.cv = this.pageData.pipe(
            map(({data}) => data.allMetaFiles[0])
        );
    }

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
