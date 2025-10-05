import { TestBed } from '@angular/core/testing';

import { Villains } from './villains';

describe('Villains', () => {
  let service: Villains;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Villains);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
