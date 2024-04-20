import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapLayoutComponent } from './heat-map-layout.component';

describe('HeatMapLayoutComponent', () => {
  let component: HeatMapLayoutComponent;
  let fixture: ComponentFixture<HeatMapLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatMapLayoutComponent]
    });
    fixture = TestBed.createComponent(HeatMapLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
