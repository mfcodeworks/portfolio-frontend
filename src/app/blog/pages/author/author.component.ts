import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthorGraphQL } from '../../../shared/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {

    // Get author
    author: Observable<AuthorGraphQL> = this.router.paramMap.pipe(
        map(m => m.get('slug')),
        switchMap(s => this.blog.getBlogAuthor(s)),
        map(({data}) => data.allAuthor[0]),
        tap(console.log)
    );

    constructor(
        private router: ActivatedRoute,
        private blog: BlogService
    ) { }

}
