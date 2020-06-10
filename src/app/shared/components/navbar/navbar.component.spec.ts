import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectionStrategy } from '@angular/core';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                NavbarComponent
            ]
        }).overrideComponent(NavbarComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default}
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create navbar', () => {
        expect(component).toBeTruthy();
    });

    it('should create paths', () => {
        expect(component.navRoutes()).toContain({path: 'home', name: 'Home'});
    });

    it('should be dark by default', () => {
        expect(component.color).toBeUndefined();
        expect(compiled.querySelector('.navbar').classList.contains('is-dark')).toBeTrue();
    });

    it('should accept colour', () => {
        component.color = 'white';
        fixture.detectChanges();
        expect(compiled.querySelector('.navbar').classList.contains('is-white')).toBeTrue();
    });

    it('#toggleActive() should set #isActive to "true"', () => {
        expect(compiled.querySelector('.navbar-menu').classList.contains('is-active')).toBeFalse();
        component.toggleActive();
        fixture.detectChanges();
        expect(compiled.querySelector('.navbar-menu').classList.contains('is-active')).toBeTrue();
    });
});
