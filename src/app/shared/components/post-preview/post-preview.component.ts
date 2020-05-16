import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostGraphQL } from '../../core';

@Component({
    selector: 'app-post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {
    @Input('post') p: PostGraphQL;
    @Output('openAuthor') openAuthor: EventEmitter<string> = new EventEmitter();

    openModal(name: string): void {
        this.openAuthor.emit(name);
    }
}
