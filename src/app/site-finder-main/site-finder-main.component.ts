import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-finder-main',
  templateUrl: './site-finder-main.component.html',
  styleUrls: ['./site-finder-main.component.scss'],
})
export class SiteFinderMainComponent implements OnInit {
  public practiceLocationData: any;
  public specialtyData: any;
  public isComparative = false;
  public isComparativeGrid = false;
  constructor() {}

  ngOnInit(): void {}

  analysisReady(event: any) {}
  isShapeChanged(event: any) {}
  isParcelsError(event: any) {}
  onMapReady(event: any) {}
  onSketch(event: any) {}
  onParcelList(event: any) {}
  onParcelSelected(event: any) {}
  isSelectedParcel(event: any) {}
  triggerAddToList(event: any) {}
}
