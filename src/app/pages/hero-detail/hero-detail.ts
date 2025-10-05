import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameContext } from '../../services/game-context';
import { Hero } from '../../models';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css'
})


export class HeroDetail implements OnInit{

  hero: Hero | undefined;
  name: string = '';
  power: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameContext: GameContext
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hero = this.gameContext.getHero(id);
      if (this.hero) {
        this.name = this.hero.name;
        this.power = this.hero.power.toString();
      }
    }
  }

  handleSave(): void {
    if (!this.name.trim() || !this.hero) return;

    const powerValue = parseInt(this.power);
    if (isNaN(powerValue) || powerValue < 0 || powerValue > 100) {
      alert('Power must be between 0 and 100');
      return;
    }

    this.gameContext.updateHero(this.hero.id, {
      name: this.name.trim(),
      power: powerValue
    });
    this.router.navigate(['/heroes']);
  }

  handleDelete(): void {
    if (!this.hero) return;

    if (confirm(`Are you sure you want to delete ${this.hero.name}?`)) {
      this.gameContext.deleteHero(this.hero.id);
      this.router.navigate(['/heroes']);
    }
  }

  get powerPercentage(): number {
    return Math.min(100, Math.max(0, parseInt(this.power) || 0));
  }
}

