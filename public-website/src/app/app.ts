import { Component, signal, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from './shared/components/layout/main-layout.component';
import { AppInitializationService } from './services/app-initialization.service';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly appInitService = inject(AppInitializationService);
  protected readonly title = signal('Institute Public Website');

  ngOnInit() {
    // Initialize API synchronization and data loading
    this.appInitService.initialize().then(() => {
      console.log('App initialization completed');
    }).catch(error => {
      console.error('App initialization failed:', error);
    });
  }
}
