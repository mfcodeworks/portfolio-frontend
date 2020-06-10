import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../contact.routing';
import { MailerService } from '../../../services/mailer/mailer.service';
import { SEOService } from '../../../services/seo/seo.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let compiled: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                NavbarComponent,
                ContactComponent
            ],
            providers: [
                FormBuilder,
                MailerService,
                SEOService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create page', () => {
        expect(component).toBeTruthy();
    });

    it('should have a title as "Contact Me"', () => {
        expect(compiled.querySelector('h1.title').textContent).toBe(' Contact Me ');
    });

    it('should call #sendEmail() method', () => {
        spyOn(component, 'sendEmail');
        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
        expect(component.sendEmail).toHaveBeenCalled();
    });

    it('should validate email form', () => {
        component.emailForm.get('subject').setValue('Test');
        component.emailForm.get('message').setValue('Email');
        component.emailForm.get('email').setValue('email');
        expect(component.emailForm.valid).toBeFalse();
        component.emailForm.get('email').setValue('email@email.com');
        expect(component.emailForm.valid).toBeTrue();
    })
});
