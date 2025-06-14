import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }
}
