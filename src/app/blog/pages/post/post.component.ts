import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BlogService } from '../../../services/blog/blog.service';
import { PostGraphQL } from '../../../shared/core';
import { SEOService } from '../../../services/seo/seo.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
    previewURL: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject('');
    post: Observable<PostGraphQL> = this.router.paramMap.pipe(
        map(m => m.get('slug')),
        switchMap(s => this.blog.getBlogPost(s)),
        map(({data}) => data.allPost[0]),
        tap((p: PostGraphQL) => {
            this.seo.setTitle(p.title);
            this.seo.setDescription(p.excerpt);
            this.seo.setMetaImage(p.mainImage.asset.url);
        }),
        tap((p: PostGraphQL) => this.previewURL.next(this.sanitizer.bypassSecurityTrustResourceUrl(p.preview)))
    );

    constructor(
        private blog: BlogService,
        private router: ActivatedRoute,
        private seo: SEOService,
        private sanitizer: DomSanitizer
    ) { }

}
