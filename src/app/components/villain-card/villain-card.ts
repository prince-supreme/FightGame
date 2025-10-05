import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Villain {
  id: string;
  name: string;
  pguid: string;
  profileImage: string;
}

@Component({
  selector: 'app-villain-card',  
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './villain-card.html',
  styleUrl: './villain-card.css'
})
export class VillainCard {
  
  @Input() villain!: Villain;
  @Input() showDelete: boolean = false;
  @Output() delete = new EventEmitter<string>();
  @Output() cardClick = new EventEmitter<void>();

  handleDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm(`Delete ${this.villain.name}?`)) {
      this.delete.emit(this.villain.id);
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

