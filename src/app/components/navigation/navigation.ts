import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface NavLink {
  to: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  links: NavLink[] = [
    { to: '/', label: 'Dashboard', icon: 'home' },
    { to: '/heroes', label: 'Heroes', icon: 'shield' },
    { to: '/villains', label: 'Villains', icon: 'skull' },
    { to: '/battle', label: 'Battle Room', icon: 'swords' }
  ];

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}

