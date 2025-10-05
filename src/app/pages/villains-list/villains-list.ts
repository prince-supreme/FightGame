import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameContext } from '../../services/game-context';
import { VillainCard } from '../../components/villain-card/villain-card';
import { CharacterForm } from '../../components/character-form/character-form';
import { Villain } from '../../models';

@Component({
  selector: 'app-villains-list',
  standalone: true,
  imports: [CommonModule, FormsModule, VillainCard, CharacterForm],
  templateUrl: './villains-list.html',
  styleUrl: './villains-list.css'
})

export class VillainsList {
  villains: Villain[] = [];
  searchTerm: string = '';

  constructor(private gameContext: GameContext) {
    this.gameContext.villains$.subscribe(villains => this.villains = villains);
  }

  get filteredVillains(): Villain[] {
    return this.villains.filter(villain =>
      villain.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      villain.pguid.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addVillain(data: { name: string; power?: number }): void {
    this.gameContext.addVillain(data.name, data.power);
  }

  deleteVillain(id: string): void {
    this.gameContext.deleteVillain(id);
  }
}

