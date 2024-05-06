import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFinderMainComponent } from './site-finder-main.component';

describe('SiteFinderMainComponent', () => {
  let component: SiteFinderMainComponent;
  let fixture: ComponentFixture<SiteFinderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteFinderMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteFinderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
