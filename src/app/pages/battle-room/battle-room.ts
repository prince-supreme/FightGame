
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameContext } from '../../services/game-context';
import { HeroCard } from '../../components/hero-card/hero-card';
import { VillainCard } from '../../components/villain-card/villain-card';
import { Hero, Villain } from '../../models';
import { determineBattleWinner } from '../../utils/helpers';

interface BattleResult {
  winner: 'hero' | 'villain' | 'tie';
  heroPower: number;
  villainPower: number;
}

@Component({
  selector: 'app-battle-room',
  standalone: true,
  imports: [CommonModule, HeroCard, VillainCard],
  templateUrl: './battle-room.html',
  styleUrl: './battle-room.css'
})
export class BattleRoom {

  heroes: Hero[] = [];
  villains: Villain[] = [];
  selectedHero: Hero | null = null;
  selectedVillain: Villain | null = null;
  battleResult: BattleResult | null = null;
  isAnimating: boolean = false;

  constructor(private gameContext: GameContext) {
    this.gameContext.heroes$.subscribe(heroes => this.heroes = heroes);
    this.gameContext.villains$.subscribe(villains => this.villains = villains);
  }

  handleHeroClick(hero: Hero): void {
    if (this.isAnimating) return;
    this.selectedHero = this.selectedHero?.id === hero.id ? null : hero;
    this.battleResult = null;
  }

  handleVillainClick(villain: Villain): void {
    if (this.isAnimating) return;
    this.selectedVillain = this.selectedVillain?.id === villain.id ? null : villain;
    this.battleResult = null;
  }

  handleFight(): void {
    if (!this.selectedHero || !this.selectedVillain || this.isAnimating) return;

    this.isAnimating = true;
    this.battleResult = null;

    setTimeout(() => {
      if (!this.selectedHero || !this.selectedVillain) return;

      const winner = determineBattleWinner(
        this.selectedHero.power,
        this.selectedVillain.power
      );

      this.gameContext.recordBattle(
        this.selectedHero.id,
        this.selectedVillain.id,
        winner,
        this.selectedHero.power,
        this.selectedVillain.power
      );

      this.battleResult = {
        winner,
        heroPower: this.selectedHero.power,
        villainPower: this.selectedVillain.power
      };

      this.isAnimating = false;
    }, 2000);
  }

  get canFight(): boolean {
    return !!(this.selectedHero && this.selectedVillain && !this.isAnimating);
  }

  clearHeroSelection(): void {
    this.selectedHero = null;
  }

  clearVillainSelection(): void {
    this.selectedVillain = null;
  }
}

