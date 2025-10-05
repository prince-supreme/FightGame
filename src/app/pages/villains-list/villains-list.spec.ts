import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsList } from './villains-list';

describe('VillainsList', () => {
  let component: VillainsList;
  let fixture: ComponentFixture<VillainsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillainsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
