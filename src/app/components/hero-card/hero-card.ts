import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export interface Hero {
  id: string;
  name: string;
  pguid: string;
  profileImage: string;
}


@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.css'
})
export class HeroCard {
  
  @Input() hero!: Hero;
  @Input() showDelete: boolean = false;
  @Output() delete = new EventEmitter<string>();
  @Output() cardClick = new EventEmitter<void>();

  handleDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm(`Delete ${this.hero.name}?`)) {
      this.delete.emit(this.hero.id);
    }
  }

  handleClick(): void {
    if (this.cardClick.observers.length > 0) {
      this.cardClick.emit();
    }
  }

  get hasClickHandler(): boolean {
    return this.cardClick.observers.length > 0;
  }
}

