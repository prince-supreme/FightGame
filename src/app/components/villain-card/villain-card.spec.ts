import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainCard } from './villain-card';

describe('VillainCard', () => {
  let component: VillainCard;
  let fixture: ComponentFixture<VillainCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillainCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
