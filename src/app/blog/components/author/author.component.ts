import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorGraphQL } from '../../../shared/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../../services/blog/blog.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit {
    @Input('slug') slug: string;
    @Output('close') close: EventEmitter<string> = new EventEmitter();

    // Get author
    author: Observable<AuthorGraphQL>;

    constructor(
        private blog: BlogService
    ) { }

    ngOnInit(): void {
        console.log('Loading author', this.slug);
        this.author = this.blog.getBlogAuthor(this.slug).pipe(
            map(({data}) => data.allAuthor[0]),
            tap(console.log)
        );
    }

    closeModal(name: string): void {
        this.close.emit(name);
    }
}
