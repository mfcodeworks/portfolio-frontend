import { TestBed } from '@angular/core/testing';

import { SEOService } from './seo.service';
import { Meta, Title } from '@angular/platform-browser';

describe('SEOService', () => {
    let service: SEOService;
    let title: Title;
    let meta: Meta;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SEOService,
                Meta,
                Title
            ]
        });
        service = TestBed.get(SEOService);
        title = TestBed.get(Title);
        meta = TestBed.get(Meta);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set page title', () => {
        const testTitle = 'Test';
        service.setTitle(testTitle);
        expect(title.getTitle()).toBe(testTitle);
    });

    it('should set meta description', () => {
        const testDesc = 'Testing description';
        service.setDescription(testDesc);
        expect(meta.getTag('name="description"').content).toBe(testDesc);
        expect(meta.getTag('name="twitter:description"').content).toBe(testDesc);
    });

    it('should set meta image', () => {
        const testImage = 'image.jpg';
        service.setMetaImage(testImage);
        expect(meta.getTag('name="twitter:image"').content).toBe(testImage);
    });
});
