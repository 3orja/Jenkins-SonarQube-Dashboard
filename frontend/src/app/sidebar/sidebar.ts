import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  link: string;
  badge?: string;
  badgeType?: 'info' | 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  @Input() isCollapsed: boolean = false;
  @Output() toggleEvent = new EventEmitter<void>();

  mainItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-grid-1x2', link: '/dashboard', badge: 'Nuevo', badgeType: 'info' },
    { label: 'Analíticas', icon: 'bi-bar-chart', link: '/analytics' },
    { label: 'Informes', icon: 'bi-file-earmark-text', link: '/reports' },
    { label: 'Notificaciones', icon: 'bi-bell', link: '/notifications', badge: '5', badgeType: 'danger' }
  ];

  managementItems: NavItem[] = [
    { label: 'Usuarios', icon: 'bi-people', link: '/users' },
    { label: 'Configuración', icon: 'bi-gear', link: '/settings' },
    { label: 'Seguridad', icon: 'bi-shield-check', link: '/security' }
  ];

  toggleSidebar(): void {
    this.toggleEvent.emit();
  }
}
