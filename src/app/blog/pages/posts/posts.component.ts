import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, share, tap } from 'rxjs/operators';
import { PostGraphQL, CategoryGraphQL, TagGraphQL, AuthorGraphQL } from '../../../shared/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { SEOService } from '../../../services/seo/seo.service';

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
    pageData: Observable<any>

    // Get blog posts
    posts: Observable<PostGraphQL[]>

    // Get post author
    authors: Observable<AuthorGraphQL[]>

    // Fetch categories and tags
    categories: Observable<CategoryGraphQL[]>
    tags: Observable<TagGraphQL[]>

    constructor(
        private blog: BlogService,
        private modals: ModalService,
        private router: ActivatedRoute,
        private seo: SEOService
    ) {

        // Consolidate page data
        this.pageData = this.router.queryParamMap.pipe(
            map(m => parseInt(m.get('page') || '1')),
            // Set SEO
            tap(_ => {
                this.seo.setTitle(`MF Codeworks - ${this.title}`);
                this.seo.setDescription(`${this.title} for Tech`);
            }),
            switchMap(p => this.blog.getBlogPosts(10 * --p)),
            share()
        );

        // Get blog posts
        this.posts = this.pageData.pipe(map(({data}) => data.allPost));

        // Get post author
        this.authors = this.posts.pipe(
            // Map posts to author
            map(posts => posts.map(p => p.author)),

            // Create distinct author set
            map(authors => [...new Set(authors)])
        );

        // Fetch categories and tags
        this.categories = this.pageData.pipe(map(({data}) => data.allCategory));
        this.tags = this.pageData.pipe(map(({data}) => data.allTags));
    }

    openModal(name: string): void {
        this.modals.open(name);
    }

    closeModal(name: string): void {
        this.modals.close(name);
    }
}
