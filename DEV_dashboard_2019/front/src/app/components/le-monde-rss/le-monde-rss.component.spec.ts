import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeMondeRssComponent } from './le-monde-rss.component';

describe('LeMondeRssComponent', () => {
  let component: LeMondeRssComponent;
  let fixture: ComponentFixture<LeMondeRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeMondeRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeMondeRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
