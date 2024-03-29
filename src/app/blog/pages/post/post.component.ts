import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, share } from 'rxjs/operators';
import { BlogService } from '../../../services/blog/blog.service';
import { PostGraphQL, AuthorGraphQL } from '../../../shared/core';
import { SEOService } from '../../../services/seo/seo.service';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

    // Loading state
    loading: BehaviorSubject<boolean>

    // Sanitized preview URL
    previewURL: BehaviorSubject<SafeResourceUrl>

    // Get page data
    pageData: Observable<PostGraphQL>


    // Post data
    post: Observable<PostGraphQL>

    // Author data
    author: Observable<AuthorGraphQL>

    constructor(
        private blog: BlogService,
        private modals: ModalService,
        private router: ActivatedRoute,
        private seo: SEOService,
        private sanitizer: DomSanitizer
    ) {
        // Loading state
        this.loading = new BehaviorSubject(true);

        // Sanitized preview URL
        this.previewURL = new BehaviorSubject('');

        // Get page data
        this.pageData = this.router.paramMap.pipe(
            map(m => m.get('slug')),
            switchMap(s => this.blog.getBlogPost(s)),
            map(({data}) => data.allPost[0]),
            tap(_ => this.loading.next(false)),
            share()
        );

        // Post data
        this.post = this.pageData.pipe(
            tap((p: PostGraphQL) => {
                this.seo.setTitle(p.title);
                this.seo.setDescription(p.excerpt);
                this.seo.setMetaImage(p.mainImage.asset.url);
            }),
            tap((p: PostGraphQL) => this.previewURL.next(this.sanitizer.bypassSecurityTrustResourceUrl(p.preview)))
        );

        // Author data
        this.author = this.post.pipe(map(p => p.author));
    }

    openModal(name: string): void {
        this.modals.open(name);
    }

    closeModal(name: string): void {
        this.modals.close(name);
    }
}
