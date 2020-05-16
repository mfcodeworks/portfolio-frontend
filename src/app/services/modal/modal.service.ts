import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

type ClickListener = (name: string) => (e: MouseEvent) => void

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    // Listenr for user click factory
    clickListener: ClickListener = (name) => e => {
        console.log(e);
        if ((e.target as Element).classList.contains('modal-background')) {
            console.log('Closing modal from outside click');
            e.preventDefault();
            this.close(name);
        }
    }

    // Active listeners map
    activeListeners: Map<string, (e: MouseEvent) => void> = new Map();
    activeSubs: Map<string, Subscription> = new Map();

    constructor(private router: Router) {}

    // Open modal based on name, return close function
    open(name: string): () => void {
        // Avoid duplicates
        if (this.activeListeners.has(name) || this.activeSubs.has(name)) {
            this.close(name);
        }

        // Remove scroll overflow
        document.body.classList.add('is-clipped');

        // Open modal
        const modal = document.querySelector(`[data-modal="${name}"]`);
        modal.classList.add('is-active');

        // Create click listener
        this.activeListeners.set(name, this.clickListener(name));

        // Add listener
        document.addEventListener('touchstart', this.activeListeners.get(name));
        document.addEventListener('click', this.activeListeners.get(name));

        // Handle back button
        this.activeSubs.set(name, this.router.events.pipe(
            filter(e => e instanceof NavigationStart)
        ).subscribe((e: NavigationStart) => {
            this.close(name);
        }));

        // Return close function
        return () => this.close(name);
    }

    // Close modal based on name
    close(name: string): void {
        // Close modal
        document.querySelector(`[data-modal="${name}"]`).classList.remove('is-active');

        // Remove scroll overflow
        document.body.classList.remove('is-clipped');

        // Remove listeners
        document.removeEventListener('touchstart', this.activeListeners.get(name));
        document.removeEventListener('click', this.activeListeners.get(name));
        this.activeSubs.get(name).unsubscribe();
    }
}
