import { Hero } from './hero';
import { Villain } from './villain';

export interface BattleParticipants {
  hero: Hero | null;
  villain: Villain | null;
}
