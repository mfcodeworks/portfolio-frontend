import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    // Active subscriptions map
    subscriptions$: Map<string, Subscription> = new Map();

    constructor(private router: Router) {}

    // Open modal for name, return close function
    open(name: string): () => void {
        // Avoid duplicates
        if (this.subscriptions$.has(name)) {
            this.close(name);
        }

        // Remove scroll overflow
        document.body.classList.add('is-clipped');

        // Open modal
        document.querySelector(`[data-modal="${name}"]`).classList.add('is-active');

        // Add self-managing listeners
        this.subscriptions$.set(
            name,
            // Merge events from click, touch, back button
            merge(
                fromEvent(document, 'touchstart'),
                fromEvent(document, 'click'),
                this.router.events
            // Filter only modal background click or back button
            ).pipe(
                filter((e: Event) =>
                    e instanceof NavigationStart ||
                    (e.target as Element).classList.contains('modal-background')
                )
            // Handle modal close
            ).subscribe(_ => this.close(name))
        );

        // Return close function
        return () => this.close(name);
    }

    // Close modal for name
    close(name: string): void {
        // Close modal
        document.querySelector(`[data-modal="${name}"]`).classList.remove('is-active');

        // Unsubscribe and remove listener
        this.subscriptions$.get(name).unsubscribe();
        this.subscriptions$.delete(name);

        // Remove scroll overflow if no modals left
        this.subscriptions$.size === 0 && document.body.classList.remove('is-clipped');
    }
}
