import { Component, OnInit,ElementRef,EventEmitter,Output,Input ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-site-finder-esiri',
  templateUrl: './site-finder-esiri.component.html',
  styleUrls: ['./site-finder-esiri.component.scss']
})
export class SiteFinderEsiriComponent implements OnInit {

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  @Output() mapReady = new EventEmitter();
  @Output() sketchList = new EventEmitter();
  @Output() parcelList = new EventEmitter();
  @Output() sketchComplete = new EventEmitter();
  @Output() shapeChanged = new EventEmitter();
  @Output() isError = new EventEmitter();
  @Output() selectedParcel = new EventEmitter();
  @Output() addToList = new EventEmitter();
  @Output() selectedParcelList = new EventEmitter();

  @Input() public practiceLocation: any;
  @Input() public specialty: any;
  @Input() public comparativeGrid!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
