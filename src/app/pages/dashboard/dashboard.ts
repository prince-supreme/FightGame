import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameContext, BattleRecord } from '../../services/game-context';
import { HeroCard } from '../../components/hero-card/hero-card';
import { VillainCard } from '../../components/villain-card/villain-card';
import { Hero, Villain } from '../../models';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroCard, VillainCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  heroes: Hero[] = [];
  villains: Villain[] = [];
  battleHistory: BattleRecord[] = [];
  topHeroes: Hero[] = [];
  topVillains: Villain[] = [];
  recentBattles: BattleRecord[] = [];

  constructor(private gameContext: GameContext) {
    this.gameContext.heroes$.subscribe(heroes => {
      this.heroes = heroes;
      this.topHeroes = [...heroes]
        .sort((a, b) => b.power - a.power)
        .slice(0, 4);
    });

    this.gameContext.villains$.subscribe(villains => {
      this.villains = villains;
      this.topVillains = [...villains]
        .sort((a, b) => b.power - a.power)
        .slice(0, 4);
    });

    this.gameContext.battleHistory$.subscribe(history => {
      this.battleHistory = history;
      this.recentBattles = history.slice(0, 5);
    });
  }
}

