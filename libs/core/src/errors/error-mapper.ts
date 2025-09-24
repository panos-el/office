// error-kit/error-mapper.ts
import { HttpErrorResponse } from '@angular/common/http';

function extractHttpMessage(err: HttpErrorResponse): string {
  const payload = err.error;

  // 1) err.error (string or object with text)
  if (typeof payload === 'string' && payload.trim()) return payload.trim();
  if (payload && typeof payload === 'object') {
    if (typeof (payload as any).message === 'string' && (payload as any).message.trim()) {
      return (payload as any).message.trim();
    }
    if (typeof (payload as any).error === 'string' && (payload as any).error.trim()) {
      return (payload as any).error.trim();
    }
  }

  // 2) err.message from Angular HttpErrorResponse
  if (err.message && err.message.trim()) return err.message.trim();

  // 3) last resort
  if (err.status) return `Request failed (${err.status}${err.statusText ? ' ' + err.statusText : ''}).`;
  return 'Request failed.';
}

export function mapToMessage(err: unknown): { title: string; message: string } {
  if (!navigator.onLine) return { title: 'Offline', message: 'No internet connection.' };

  if (err instanceof HttpErrorResponse) {
    const msg = extractHttpMessage(err);

    switch (err.status) {
      case 401: return { title: 'Session',    message: msg || 'Your session has expired. Please sign in.' };
      case 403: return { title: 'Forbidden',  message: msg || 'You do not have permission.' };
      case 404: return { title: 'Not found',  message: msg || 'The requested resource was not found.' };
      case 422: return { title: 'Validation', message: msg || 'Please check the highlighted fields.' };
      case 0:
      case 500:
      case 502:
      case 503:
      case 504: return { title: 'Service', message: msg || 'Service temporarily unavailable. Try again.' };
      default: return { title: 'Error', message: msg || 'Request failed.' };
    }
  }

  // Non-HTTP
  const message =
    (err && typeof err === 'object' && 'message' in (err as any) && typeof (err as any).message === 'string')
      ? (err as any).message
      : 'Something went wrong. Please try again.';
  return { title: 'Unexpected', message };
}
