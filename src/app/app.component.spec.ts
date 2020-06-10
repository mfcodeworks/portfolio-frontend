import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { HomeModule } from './home/home.module';

describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                HomeModule
            ],
            declarations: [
                AppComponent,
                FooterComponent
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        }).compileComponents();
    }));

    beforeEach(async (() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    }));

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should render router outlet', () => {
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });

    it('should render footer', () => {
        expect(compiled.querySelector('app-footer')).toBeTruthy();
    });
});
