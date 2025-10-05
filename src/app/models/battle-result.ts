export interface BattleResult {
  id: string;
  heroId: string;
  villainId: string;
  heroName: string;
  villainName: string;
  winnerType: 'hero' | 'villain' | 'tie';
  heroPower: number;
  villainPower: number;
  createdAt: string;
}
