import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoByDayBiggerComponent } from './meteo-by-day-bigger.component';

describe('MeteoByDayBiggerComponent', () => {
  let component: MeteoByDayBiggerComponent;
  let fixture: ComponentFixture<MeteoByDayBiggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoByDayBiggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoByDayBiggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
