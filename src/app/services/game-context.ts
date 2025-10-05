import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero, Villain } from '../models';
import {
  generatePGUID,
  generateRandomPower,
  generateProfileImage,
  generateUUID
} from '../utils/helpers';

export interface BattleRecord {
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

const STORAGE_KEY_HEROES = 'tour_of_heroes_data';
const STORAGE_KEY_VILLAINS = 'tour_of_villains_data';
const STORAGE_KEY_BATTLES = 'tour_of_battles_data';

const initialHeroes: Hero[] = [
  {
    id: generateUUID(),
    pguid: 'HER01',
    name: 'Dr. Nice',
    power: 85,
    profileImage: generateProfileImage('Dr. Nice', 'hero'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'HER02',
    name: 'Bombasto',
    power: 92,
    profileImage: generateProfileImage('Bombasto', 'hero'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'HER03',
    name: 'Celeritas',
    power: 78,
    profileImage: generateProfileImage('Celeritas', 'hero'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'HER04',
    name: 'Magneta',
    power: 88,
    profileImage: generateProfileImage('Magneta', 'hero'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'HER05',
    name: 'RubberMan',
    power: 65,
    profileImage: generateProfileImage('RubberMan', 'hero'),
    createdAt: new Date().toISOString()
  }
];

const initialVillains: Villain[] = [
  {
    id: generateUUID(),
    pguid: 'VIL01',
    name: 'The Shadow',
    power: 90,
    profileImage: generateProfileImage('The Shadow', 'villain'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'VIL02',
    name: 'Dr. Chaos',
    power: 87,
    profileImage: generateProfileImage('Dr. Chaos', 'villain'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'VIL03',
    name: 'Venom Strike',
    power: 75,
    profileImage: generateProfileImage('Venom Strike', 'villain'),
    createdAt: new Date().toISOString()
  },
  {
    id: generateUUID(),
    pguid: 'VIL04',
    name: 'Dark Matter',
    power: 82,
    profileImage: generateProfileImage('Dark Matter', 'villain'),
    createdAt: new Date().toISOString()
  }
];

@Injectable({
  providedIn: 'root'
})


export class GameContext {
  // Private BehaviorSubjects for internal state management
  private heroesSubject: BehaviorSubject<Hero[]>;
  private villainsSubject: BehaviorSubject<Villain[]>;
  private battleHistorySubject: BehaviorSubject<BattleRecord[]>;

  // Public observables for component subscription
  public heroes$: Observable<Hero[]>;
  public villains$: Observable<Villain[]>;
  public battleHistory$: Observable<BattleRecord[]>;

  constructor() {
    // Initialize heroes from localStorage or use initial data
    const storedHeroes = this.loadFromStorage<Hero[]>(STORAGE_KEY_HEROES);
    this.heroesSubject = new BehaviorSubject<Hero[]>(
      storedHeroes || initialHeroes
    );
    this.heroes$ = this.heroesSubject.asObservable();

    // Initialize villains from localStorage or use initial data
    const storedVillains = this.loadFromStorage<Villain[]>(STORAGE_KEY_VILLAINS);
    this.villainsSubject = new BehaviorSubject<Villain[]>(
      storedVillains || initialVillains
    );
    this.villains$ = this.villainsSubject.asObservable();

    // Initialize battle history from localStorage
    const storedBattles = this.loadFromStorage<BattleRecord[]>(STORAGE_KEY_BATTLES);
    this.battleHistorySubject = new BehaviorSubject<BattleRecord[]>(
      storedBattles || []
    );
    this.battleHistory$ = this.battleHistorySubject.asObservable();

    // Subscribe to state changes and persist to localStorage
    this.heroes$.subscribe(heroes => {
      this.saveToStorage(STORAGE_KEY_HEROES, heroes);
    });

    this.villains$.subscribe(villains => {
      this.saveToStorage(STORAGE_KEY_VILLAINS, villains);
    });

    this.battleHistory$.subscribe(battles => {
      this.saveToStorage(STORAGE_KEY_BATTLES, battles);
    });
  }

  // Hero methods
  addHero(name: string, power?: number): Hero {
    const newHero: Hero = {
      id: generateUUID(),
      pguid: generatePGUID(),
      name,
      power: power ?? generateRandomPower(),
      profileImage: generateProfileImage(name, 'hero'),
      createdAt: new Date().toISOString()
    };

    const currentHeroes = this.heroesSubject.getValue();
    this.heroesSubject.next([...currentHeroes, newHero]);
    return newHero;
  }

  updateHero(id: string, updates: Partial<Hero>): void {
    const currentHeroes = this.heroesSubject.getValue();
    const updatedHeroes = currentHeroes.map(hero =>
      hero.id === id ? { ...hero, ...updates } : hero
    );
    this.heroesSubject.next(updatedHeroes);
  }

  deleteHero(id: string): void {
    const currentHeroes = this.heroesSubject.getValue();
    const filteredHeroes = currentHeroes.filter(hero => hero.id !== id);
    this.heroesSubject.next(filteredHeroes);
  }

  getHero(id: string): Hero | undefined {
    const currentHeroes = this.heroesSubject.getValue();
    return currentHeroes.find(hero => hero.id === id);
  }

  // Villain methods
  addVillain(name: string, power?: number): Villain {
    const newVillain: Villain = {
      id: generateUUID(),
      pguid: generatePGUID(),
      name,
      power: power ?? generateRandomPower(),
      profileImage: generateProfileImage(name, 'villain'),
      createdAt: new Date().toISOString()
    };

    const currentVillains = this.villainsSubject.getValue();
    this.villainsSubject.next([...currentVillains, newVillain]);
    return newVillain;
  }

  updateVillain(id: string, updates: Partial<Villain>): void {
    const currentVillains = this.villainsSubject.getValue();
    const updatedVillains = currentVillains.map(villain =>
      villain.id === id ? { ...villain, ...updates } : villain
    );
    this.villainsSubject.next(updatedVillains);
  }

  deleteVillain(id: string): void {
    const currentVillains = this.villainsSubject.getValue();
    const filteredVillains = currentVillains.filter(villain => villain.id !== id);
    this.villainsSubject.next(filteredVillains);
  }

  getVillain(id: string): Villain | undefined {
    const currentVillains = this.villainsSubject.getValue();
    return currentVillains.find(villain => villain.id === id);
  }

  // Battle methods
  recordBattle(
    heroId: string,
    villainId: string,
    winnerType: 'hero' | 'villain' | 'tie',
    heroPower: number,
    villainPower: number
  ): void {
    const hero = this.getHero(heroId);
    const villain = this.getVillain(villainId);

    if (!hero || !villain) return;

    const battle: BattleRecord = {
      id: generateUUID(),
      heroId,
      villainId,
      heroName: hero.name,
      villainName: villain.name,
      winnerType,
      heroPower,
      villainPower,
      createdAt: new Date().toISOString()
    };

    const currentBattles = this.battleHistorySubject.getValue();
    this.battleHistorySubject.next([battle, ...currentBattles]);
  }

  // LocalStorage helper methods
  private saveToStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  }

  private loadFromStorage<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error loading from localStorage: ${key}`, error);
      return null;
    }
  }

  // Optional: Clear all data
  clearAllData(): void {
    this.heroesSubject.next(initialHeroes);
    this.villainsSubject.next(initialVillains);
    this.battleHistorySubject.next([]);
  }
}
