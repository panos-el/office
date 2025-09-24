import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private toastr = inject(ToastrService);

    info(msg: string, title = 'Info') {
        this.toastr.info(msg, title);
    }
    warn(msg: string, title = 'Warning') {
        this.toastr.warning(msg, title);
    }
    error(msg: string, title = 'Error') {
        this.toastr.error(msg, title, { closeButton: true });
    }
}
