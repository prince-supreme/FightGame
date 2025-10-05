export function generatePGUID(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pguid = '';
  for (let i = 0; i < 5; i++) {
    pguid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pguid;
}

export function generateRandomPower(): number {
  return Math.floor(Math.random() * 101);
}

export function generateProfileImage(name: string, type: 'hero' | 'villain'): string {
  const seed = encodeURIComponent(name);
  const style = type === 'hero' ? 'avataaars' : 'bottts';
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function determineBattleWinner(
  heroPower: number, 
  villainPower: number
): 'hero' | 'villain' | 'tie' {
  if (heroPower > villainPower) return 'hero';
  if (villainPower > heroPower) return 'villain';
  return 'tie';
}
