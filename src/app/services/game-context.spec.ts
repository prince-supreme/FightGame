import { TestBed } from '@angular/core/testing';

import { GameContext } from './game-context';

describe('GameContext', () => {
  let service: GameContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
