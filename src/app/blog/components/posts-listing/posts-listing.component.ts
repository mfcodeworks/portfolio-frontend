import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { PostGraphQL, CategoryGraphQL, TagGraphQL, AuthorGraphQL } from '../../../shared/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-posts-listing',
    templateUrl: './posts-listing.component.html',
    styleUrls: ['./posts-listing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListingComponent implements OnChanges {
    @Input() title: string;
    @Input() posts: PostGraphQL[];
    @Input() categories: CategoryGraphQL[];
    @Input() tags: TagGraphQL[];
    @Input() authors: AuthorGraphQL[];
    @Output('openModal') open: EventEmitter<string> = new EventEmitter();
    @Output('closeModal') close: EventEmitter<string> = new EventEmitter();
    postCount: BehaviorSubject<number> = new BehaviorSubject(1);

    ngOnChanges(): void {
        this.postCount.next(this.posts?.length)
    }

    openModal(name: string): void {
        this.open.emit(name);
    }

    closeModal(name: string): void {
        this.close.emit(name);
    }

}
