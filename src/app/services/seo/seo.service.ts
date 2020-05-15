import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SEOService {

    constructor(
        private title: Title,
        private meta: Meta
    ) { }

    setTitle(title: string): void {
        this.title.setTitle(title);

        this.meta.updateTag({
            name: 'twitter:title',
            content: title
        }, `name='twitter:title'`);
    }

    setDescription(description: string): void {
        this.meta.updateTag({
            name: 'description',
            content: description
        }, `name='description'`);

        this.meta.updateTag({
            name: 'twitter:description',
            content: description
        }, `name='twitter:description'`);
    }

    setMetaImage(imageUrl: string): void {
        this.meta.updateTag({
            name: 'twitter:image',
            content: imageUrl
        }, `name='twitter:image'`);
    }
}
