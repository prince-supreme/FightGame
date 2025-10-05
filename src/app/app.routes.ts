import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { HeroesList } from './pages/heroes-list/heroes-list';
import { HeroDetail } from './pages/hero-detail/hero-detail';
import { VillainsList } from './pages/villains-list/villains-list';
import { VillainDetail } from './pages/villain-detail/villain-detail';
import { BattleRoom } from './pages/battle-room/battle-room';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'heroes',
    component: HeroesList
  },
  {
    path: 'heroes/:id',
    component: HeroDetail
  },
  {
    path: 'villains',
    component: VillainsList
  },
  {
    path: 'villains/:id',
    component: VillainDetail
  },
  {
    path: 'battle',
    component: BattleRoom
  },
  {
    path: '**',
    redirectTo: ''
  }
];
