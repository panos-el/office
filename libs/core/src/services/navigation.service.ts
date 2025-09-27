import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    // Signal to track the navigation history
    private history = signal<string[]>([]);

    // Computed signal to determine if back navigation is possible
    readonly canBack = computed(() => this.history().length > 1);

    constructor(private router: Router) {
        // Listen to NavigationEnd events to track navigation history
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.addToHistory(event.urlAfterRedirects);
        });
    }

    // Custom mutation function for the history signal
    private mutateHistory(mutator: (history: string[]) => void): void {
        const currentHistory = this.history();
        const newHistory = [...currentHistory]; // Clone the array
        mutator(newHistory); // Apply the mutation
        this.history.set(newHistory); // Update the signal with the modified array
    }

    // Method to navigate back in history
    back(): void {
        if (this.canBack()) {
            this.mutateHistory((history) => history.pop()); // Remove the last URL from history
            const previousUrl = this.history()[this.history().length - 1];
            this.router.navigateByUrl(previousUrl); // Navigate to the previous URL
        } else {
            this.router.navigateByUrl('/'); // Navigate to home if no history left
        }
    }

    // Method to add a URL to history
    private addToHistory(url: string): void {
        this.mutateHistory((history) => {
            if (!history.length || history[history.length - 1] !== url) {
                history.push(url);
            }
        });
    }

    // Method to reset the history
    resetHistory(): void {
        this.history.set([]); // Clear the history by setting it to an empty array
    }
}
