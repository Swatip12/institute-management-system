import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingState = signal<boolean>(false);
  private readonly loadingMessage = signal<string>('Loading...');
  
  // Public readonly signals
  readonly isLoading = this.loadingState.asReadonly();
  readonly message = this.loadingMessage.asReadonly();

  show(message: string = 'Loading...'): void {
    this.loadingMessage.set(message);
    this.loadingState.set(true);
  }

  hide(): void {
    this.loadingState.set(false);
    this.loadingMessage.set('Loading...');
  }

  // Utility method to wrap observables with loading state
  withLoading<T>(message: string = 'Loading...') {
    return (source: any) => {
      this.show(message);
      return source.pipe(
        // Using finalize to ensure loading is hidden regardless of success/error
        (source: any) => {
          return new Promise((resolve, reject) => {
            source.subscribe({
              next: (value: T) => {
                this.hide();
                resolve(value);
              },
              error: (error: any) => {
                this.hide();
                reject(error);
              }
            });
          });
        }
      );
    };
  }
}