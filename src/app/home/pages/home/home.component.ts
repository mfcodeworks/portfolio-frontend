import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HomeService } from '../../../services/home/home.service';
import { Slide, ToolGraphQL } from '../../../shared/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    // Get Home page data from GraphQL
    imageSlides: Observable<Slide[]> = this.home.getHomePageData().pipe(
        // Map GraphQL query to structured array
        map(({data}) => this.mapToolGraphQL(data.allTools))
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
