import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-form.html',
  styleUrl: './character-form.css'
})
export class CharacterForm {
  @Input() type: 'hero' | 'villain' = 'hero';
  @Input() showPowerInput: boolean = false;
  @Output() submitForm = new EventEmitter<{ name: string; power?: number }>();

  name: string = '';
  power: string = '';

  handleSubmit(): void {
    if (!this.name.trim()) return;

    const powerValue = this.showPowerInput && this.power 
      ? parseInt(this.power) 
      : undefined;
    
    this.submitForm.emit({ name: this.name.trim(), power: powerValue });
    this.name = '';
    this.power = '';
  }

  get bgColor(): string {
    return this.type === 'hero' 
      ? 'bg-blue-600 hover:bg-blue-700' 
      : 'bg-red-600 hover:bg-red-700';
  }

  get borderColor(): string {
    return this.type === 'hero' 
      ? 'border-blue-500 focus:ring-blue-500' 
      : 'border-red-500 focus:ring-red-500';
  }
}

