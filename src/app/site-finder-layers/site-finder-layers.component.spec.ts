import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFinderLayersComponent } from './site-finder-layers.component';

describe('SiteFinderLayersComponent', () => {
  let component: SiteFinderLayersComponent;
  let fixture: ComponentFixture<SiteFinderLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteFinderLayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteFinderLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
