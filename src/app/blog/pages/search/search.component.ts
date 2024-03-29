import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { PostGraphQL, TagGraphQL, CategoryGraphQL, AuthorGraphQL } from '../../../shared/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../../../services/modal/modal.service';
import { SEOService } from '../../../services/seo/seo.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

    // Page title
    title: BehaviorSubject<string>

    // Check if is category
    isCategory: Observable<boolean>

    // Filter posts
    pageData: Observable<any>

    // Get posts
    posts: Observable<PostGraphQL[]>

    // Get post author
    authors: Observable<AuthorGraphQL[]>

    // Get categories and tags
    categories: Observable<CategoryGraphQL[]>
    tags: Observable<TagGraphQL[]>

    constructor(
        private router: ActivatedRoute,
        private blog: BlogService,
        private modals: ModalService,
        private seo: SEOService
    ) {
        // Page title
        this.title = new BehaviorSubject('');

        // Check if is category
        this.isCategory = this.router.url.pipe(
            map(url => url.some(u => u.path.indexOf('category') > -1))
        );

        // Filter posts
        this.pageData = this.router.paramMap.pipe(
            // Get users filter
            map(m => m.get('category') || m.get('tag')),
            // Set page title
            tap(d => this.title.next(d)),
            // Set SEO
            tap(d => {
                this.seo.setTitle(`MF Codeworks - ${d}`);
                this.seo.setDescription(`Latest for ${d} Tech Articles`);
            }),
            // Switch filter type
            switchMap(d => {
                return this.isCategory.pipe(
                    // Return tag or category
                    switchMap(c => {
                        // Fetch articles
                        if (c) {
                            return this.blog.getCategoryID(d).pipe(
                                map(({data}) => data.allCategory[0])
                            );
                        }
                        return this.blog.getTagID(d).pipe(
                            map(({data}) => data.allTags[0])
                        )
                    })
                )
            }),
            // Map to ID
            map(({_id}) => _id),
            // Get posts referencing ID
            switchMap(ref => this.blog.getBlogPostsFiltered(ref)),
            // Map to data
            map(({data}) => data),
            tap(console.log),
            // Multicast to async pipes
            share()
        );

        // Get posts
        this.posts = this.pageData.pipe(
            map(d => d.allPost)
        );

        // Get post author
        this.authors = this.posts.pipe(
            // Map posts to author
            map(posts => posts.map(p => p.author)),

            // Create distinct author set
            map(authors => [...new Set(authors)])
        );

        // Get categories and tags
        this.categories = this.pageData.pipe(map(d => d.allCategory));
        this.tags = this.pageData.pipe(map(d => d.allTags));
    }

    openModal(name: string): void {
        this.modals.open(name);
    }

    closeModal(name: string): void {
        this.modals.close(name);
    }

}
