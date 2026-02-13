import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMobile = false;
  mobileMenuOpen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      if (!this.isMobile) {
        this.mobileMenuOpen = false;
      }
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}