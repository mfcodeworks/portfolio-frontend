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
        const email = {
          subject,
          text,
          replyTo,
          ...environment.mailer
        };

        // Send email
        return this.http.post<any>(environment.mailer.api, email);
    }
}
