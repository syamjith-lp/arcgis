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
  demographics: any='';
  items = [
    { key: 'householdIncome', label: 'Median Household Income' },
    { key: 'population', label: 'Population' },
    { key: 'census', label: 'Population Growth' },
    { key: 'age', label: 'Population Age' },
  ];
  constructor() {}

  ngOnInit(): void {}

  onItemSelected(key: any) {
    this.demographics = key.target.value;
  }
}
