import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxvideoRssComponent } from './jeuxvideo-rss.component';

describe('JeuxvideoRssComponent', () => {
  let component: JeuxvideoRssComponent;
  let fixture: ComponentFixture<JeuxvideoRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeuxvideoRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuxvideoRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
