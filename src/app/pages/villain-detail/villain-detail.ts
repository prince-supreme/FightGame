import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GameContext } from '../../services/game-context';
import { Villain } from '../../models';

@Component({
  selector: 'app-villain-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './villain-detail.html',
  styleUrl: './villain-detail.css'
})


export class VillainDetail implements OnInit {
  villain: Villain | undefined;
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
      this.villain = this.gameContext.getVillain(id);
      if (this.villain) {
        this.name = this.villain.name;
        this.power = this.villain.power.toString();
      }
    }
  }

  handleSave(): void {
    if (!this.name.trim() || !this.villain) return;

    const powerValue = parseInt(this.power);
    if (isNaN(powerValue) || powerValue < 0 || powerValue > 100) {
      alert('Power must be between 0 and 100');
      return;
    }

    this.gameContext.updateVillain(this.villain.id, {
      name: this.name.trim(),
      power: powerValue
    });
    this.router.navigate(['/villains']);
  }

  handleDelete(): void {
    if (!this.villain) return;

    if (confirm(`Are you sure you want to delete ${this.villain.name}?`)) {
      this.gameContext.deleteVillain(this.villain.id);
      this.router.navigate(['/villains']);
    }
  }

  get powerPercentage(): number {
    return Math.min(100, Math.max(0, parseInt(this.power) || 0));
  }
}

