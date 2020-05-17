import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

    // Setup Mailer Auth
    authHeader = new HttpHeaders({Authorization: `Basic ${btoa(environment.mailgun.auth)}`});

    constructor(private http: HttpClient) { }

    // Send email form
    send(subject: string, text: string, replyTo?: string): Observable<any> {
        // Build email
        const email = new FormData();
        email.append('from', environment.mailgun.from);
        email.append('to', environment.mailgun.to);
        email.append('subject', subject);
        email.append('text', text);
        !!replyTo && email.append('h:Reply-To', replyTo);

        // Send email
        return this.http.post<any>(environment.mailgun.api, email, {headers: this.authHeader});
    }
}
