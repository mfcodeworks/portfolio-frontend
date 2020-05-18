import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

    constructor(private http: HttpClient) { }

    // Send email form
    send(subject: string, text: string, replyTo?: string): Observable<any> {
        // Build email
        const email = new FormData();
        email.append('from', environment.mailer.from);
        email.append('to', environment.mailer.to);
        email.append('subject', subject);
        email.append('text', text);
        !!replyTo && email.append('h:Reply-To', replyTo);

        // Send email
        return this.http.post<any>(environment.mailer.api, email);
    }
}
