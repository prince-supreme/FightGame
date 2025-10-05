import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameContext } from '../../services/game-context';
import { HeroCard } from '../../components/hero-card/hero-card';
import { CharacterForm } from '../../components/character-form/character-form';
import { Hero } from '../../models';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroCard, CharacterForm],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.css'
})
export class HeroesList {

  heroes: Hero[] = [];
  searchTerm: string = '';

  constructor(private gameContext: GameContext) {
    this.gameContext.heroes$.subscribe(heroes => this.heroes = heroes);
  }

  get filteredHeroes(): Hero[] {
    return this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      hero.pguid.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addHero(data: { name: string; power?: number }): void {
    this.gameContext.addHero(data.name, data.power);
  }

  deleteHero(id: string): void {
    this.gameContext.deleteHero(id);
  }
}
