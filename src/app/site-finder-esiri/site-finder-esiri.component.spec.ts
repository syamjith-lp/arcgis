import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFinderEsiriComponent } from './site-finder-esiri.component';

describe('SiteFinderEsiriComponent', () => {
  let component: SiteFinderEsiriComponent;
  let fixture: ComponentFixture<SiteFinderEsiriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteFinderEsiriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteFinderEsiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
