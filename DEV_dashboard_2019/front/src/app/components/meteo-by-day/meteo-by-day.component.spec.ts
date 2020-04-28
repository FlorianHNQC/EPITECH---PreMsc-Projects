import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoByDayComponent } from './meteo-by-day.component';

describe('MeteoByDayComponent', () => {
  let component: MeteoByDayComponent;
  let fixture: ComponentFixture<MeteoByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
