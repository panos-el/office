import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';
import { mapToMessage } from './error-mapper';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
    private notify = inject(NotificationService);

    handleError(error: unknown): void {
        const { title, message } = mapToMessage(error);
        this.notify.error(message, title);

        console.error('[GlobalErrorHandler]', error);
    }
}
