import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailerService } from '../../../services/mailer/mailer.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {

    // Notification timeout
    notificationTimeout = 5000;

    // Setup email form
    processing: BehaviorSubject<boolean> = new BehaviorSubject(false);
    complete: BehaviorSubject<boolean> = new BehaviorSubject(false);
    error: BehaviorSubject<string> = new BehaviorSubject('');
    emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        message: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private mailer: MailerService
    ) {}

    getErrors(control: string): string {
        if (this.emailForm.untouched) {
            return;
        }

        switch (true) {
            case this.emailForm.get(control).hasError('required'):
                return `${control} is required`;

            case this.emailForm.get(control).hasError('email'):
                return `${control} is not an email`;
        }
    }

    sendEmail(): void {
        // Validate form before submission
        this.emailForm.markAllAsTouched();
        if (this.emailForm.invalid) { return; }

        // Set processing
        this.processing.next(true);

        // Send email
        this.mailer.send(
            this.emailForm.controls['subject'].value,
            this.emailForm.controls['message'].value,
            this.emailForm.controls['email'].value

        // Complete processing
        ).subscribe(_ => {
            // Set processing complete
            this.processing.next(false)
            this.complete.next(true);

            // Remove notification
            setTimeout(() => this.complete.next(false), this.notificationTimeout);
        }, e => {
            // Log error
            console.warn(e);

            // Set processing error
            this.processing.next(false)
            this.error.next(e.message);

            // Remove notification
            setTimeout(() => this.error.next(''), this.notificationTimeout);

            // Reset form
            this.emailForm.reset();
        });
    }
}
