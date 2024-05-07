import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { EsriMapService } from '../esri-map.service';
import config from '@arcgis/core/config';
import Map from '@arcgis/core/Map.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';

@Component({
  selector: 'app-site-finder-esiri',
  templateUrl: './site-finder-esiri.component.html',
  styleUrls: ['./site-finder-esiri.component.scss'],
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
  sketch: any;
  baseMapExpand: any;
  legendExpand: any;
  oldSketch: any;
  public saveListSketch: any;
  public isSketchDrawn = false;

  constructor(public esriMapService: EsriMapService) {}

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
      (error) => {
        alert('errr');
      }
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
      basemap: 'arcgis-navigation',
      layers: [this.graphicsLayer],
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
    this.sketchWidget();
    // Gallery widget
    this.galleryWidget();
    // Legend widget
    // this.legendWidget();
  }

  sketchWidget() {
    this.mapView.when(() => {
      this.sketch = new Sketch({
        view: this.mapView,
        layer: this.graphicsLayer,
        creationMode: 'single',
        snappingOptions: {
          enabled: true,
        },
        defaultUpdateOptions: {
          tool: 'transform',
          enableRotation: false,
          toggleToolOnClick: false,
          enableScaling: false,
        },
      });

      this.sketch.visibleElements = {
        createTools: {
          polygon: true,
          circle: true,
          rectangle: true,
          point: false,
          polyline: false,
        },
        selectionTools: {
          'lasso-selection': false,
          'rectangle-selection': false,
        },
        snappingControlsElements: {
          featureEnabledToggle: false,
          layerList: false,
        },
        undoRedoMenu: false,
        settingsMenu: false,
      };

      this.mapView.ui.add(this.sketch, 'top-leading');
      this.mapView.ui.add(this.baseMapExpand, 'top-left');
      this.mapView.ui.add(this.legendExpand, 'top-left');

      // On change sketch
      this.onChangeSketch(this.sketch);
    });
  }

  onChangeSketch(sketch: any) {
    // Create polygon
    sketch.on('create', (event: any) => {
      if (this.oldSketch) {
        this.shapeChanged.emit(true);
        this.graphicsLayer.remove(this.oldSketch.graphic);
        this.mapView.graphics.remove(this.saveListSketch);
      }
      this.isComplete(event);
    });

    // Update polygon
    sketch.on('update', () => {
      sketch.complete();
    });

    // Delete polygon
    sketch.on('delete', () => {
      this.parcelList.emit(null);
      this.isSketchDrawn = false;
      this.sketchList.emit(this.isSketchDrawn);
      // this.globalService.clearSelectedArea();
    });
  }
  isComplete(event: any) {
    if (event.state === 'complete') {
      // this.removeHighlightParcel();
      this.parcelList.emit(null);
      this.sketchComplete.emit(true);
      this.oldSketch = event;
      this.isSketchDrawn = true;
      const value = webMercatorUtils
        .webMercatorToGeographic(event.graphic.geometry)
        .toJSON();
      const rings = value.rings[0];
      const coordinates: any[] = [];

      for (const index in rings) {
        if (rings.hasOwnProperty(index)) {
          coordinates.push({ lat: rings[index][1], long: rings[index][0] });
        }
      }

      // Reference query layer
      // this.isParcelFeatures(event);

      const data = {
        event,
        tool: event.tool,
        coordinates,
        sketchStatus: this.isSketchDrawn,
      };

      this.sketchList.emit(data);
    }
  }

  galleryWidget() {
    const basemapGallery = new BasemapGallery({
      view: this.mapView,
    });

    this.baseMapExpand = new Expand({
      view: this.mapView,
      content: basemapGallery,
      expanded: false,
    });
  }

}
