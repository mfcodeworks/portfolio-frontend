import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FooterComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create footer', () => {
        expect(component).toBeTruthy();
    });

    it('should render footer', () => {
        let compiled = fixture.nativeElement;
        expect(compiled).toBeTruthy();
    });

    it('should render social links', () => {
        expect(compiled.querySelectorAll('.field a').length).toEqual(4);
    });

    it('should render copyright', () => {
        expect(compiled.querySelector('.copyright').textContent).toContain('Built by me  2020');
    });
});
