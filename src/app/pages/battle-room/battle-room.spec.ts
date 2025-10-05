import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleRoom } from './battle-room';

describe('BattleRoom', () => {
  let component: BattleRoom;
  let fixture: ComponentFixture<BattleRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
