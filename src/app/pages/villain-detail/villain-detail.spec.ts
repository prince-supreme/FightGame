import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainDetail } from './villain-detail';

describe('VillainDetail', () => {
  let component: VillainDetail;
  let fixture: ComponentFixture<VillainDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillainDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
