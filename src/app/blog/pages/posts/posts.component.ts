import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, share } from 'rxjs/operators';
import { PostGraphQL, CategoryGraphQL, TagGraphQL } from '../../../shared/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

    // Consolidate page data
    pageData: Observable<any> = this.router.queryParamMap.pipe(
        map(m => parseInt(m.get('page') || '1')),
        switchMap(p => this.blog.getBlogPosts(10 * --p)),
        share()
    );

    // Get blog posts
    posts: Observable<PostGraphQL[]> = this.pageData.pipe(map(({data}) => data.allPost));

    // Fetch categories and tags
    categories: Observable<CategoryGraphQL[]> = this.pageData.pipe(map(({data}) => data.allCategory));
    tags: Observable<TagGraphQL[]> = this.pageData.pipe(map(({data}) => data.allTags));

    constructor(
        private blog: BlogService,
        private router: ActivatedRoute
    ) { }

}
