import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '../../home.routing';
import { HomeService } from '../../../services/home/home.service';
import { ToolSliderComponent } from '../../../shared/components/tool-slider/tool-slider.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { GraphQLModule } from '../../../graphql.module.ts.old';
import { APP_BASE_HREF } from '@angular/common';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                HttpClientModule,
                GraphQLModule
            ],
            declarations: [
                HomeComponent,
                ToolSliderComponent,
                NavbarComponent
            ],
            providers: [
                HomeService,
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create home page', () => {
        expect(component).toBeTruthy();
    });

    it('should render sections', () => {
        expect(compiled.querySelectorAll('section').length).toEqual(5);
    });

    it('should render navbar', () => {
        expect(compiled.querySelector('.hero-head app-navbar')).toBeTruthy();
    });
});
