import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, share } from 'rxjs/operators';
import { PostGraphQL, CategoryGraphQL, TagGraphQL, AuthorGraphQL } from '../../../shared/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

    // Page title
    title = 'Latest Articles';

    // Consolidate page data
    pageData: Observable<any> = this.router.queryParamMap.pipe(
        map(m => parseInt(m.get('page') || '1')),
        switchMap(p => this.blog.getBlogPosts(10 * --p)),
        share()
    );

    // Get blog posts
    posts: Observable<PostGraphQL[]> = this.pageData.pipe(map(({data}) => data.allPost));

    // Get post author
    authors: Observable<AuthorGraphQL[]> = this.posts.pipe(
        // Map posts to author
        map(posts => posts.map(p => p.author)),

        // Create distinct author set
        map(authors => [...new Set(authors)])
    );

    // Fetch categories and tags
    categories: Observable<CategoryGraphQL[]> = this.pageData.pipe(map(({data}) => data.allCategory));
    tags: Observable<TagGraphQL[]> = this.pageData.pipe(map(({data}) => data.allTags));

    constructor(
        private blog: BlogService,
        private modals: ModalService,
        private router: ActivatedRoute
    ) { }

    openModal(name: string): void {
        this.modals.open(name);
    }

    closeModal(name: string): void {
        this.modals.close(name);
    }
}
