import { Component, OnInit,ElementRef,EventEmitter,Output,Input ,ViewChild} from '@angular/core';
import { EsriMapService } from '../esri-map.service';
import config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapView from '@arcgis/core/views/MapView';

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

  mapView!: __esri.MapView;

  graphicsLayer = new GraphicsLayer();

  constructor(
    public esriMapService: EsriMapService,

  ) { }

  ngOnInit(): void {
    this.getEsriToken();
  }

  getEsriToken() {
    this.esriMapService.getEsriAccessToken().subscribe(
      (res) => {
        if (res.token) {
          config.apiKey = res.token;
          this.initMapConfig().then(() => {
            this.mapReady.emit(true);
          });
        }
      },
      (error) => { }
    );
  }

  initMapConfig() {
    const view = this.initMap({
      container: this.mapViewEl.nativeElement,
    });

    return view.when();
  }

  initMap(config: { container: HTMLDivElement }): __esri.MapView {
    const map = new Map({
      basemap: 'streets-navigation-vector',
      layers: [this.graphicsLayer]
    });

    const view = new MapView({
      container: config.container,
      map,
      center: [-92.5779, 37.6259],
      zoom: 4,
    });

    this.mapView = view;
    this.widget();

    return this.mapView;
  }

  widget() {
    // Zoom widget
    this.mapView.ui.move('zoom', 'bottom-right');
    // Sketch widget
    // this.sketchWidget();
    // Gallery widget
    // this.galleryWidget();
    // Legend widget
    // this.legendWidget();
  }
}
