import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  SimpleChanges,
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
import Legend from '@arcgis/core/widgets/Legend';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { environment } from 'src/environments/environment';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import ClassBreakInfo from '@arcgis/core/renderers/support/ClassBreakInfo';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import Graphic from '@arcgis/core/Graphic';

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

  @Input() public demographics: any;

  @Input() public comparativeGrid!: boolean;

  mapView!: __esri.MapView;
  parcelLayer: any;
  public parcelAtlas: any;

  graphicsLayer = new GraphicsLayer();
  sketch: any;
  baseMapExpand: any;
  legendExpand: any;
  oldSketch: any;
  public saveListSketch: any;
  public isSketchDrawn = false;
  LayerScaleConfig = {
    country: {
      id: 'demographic_13',
      minScale: 591657527.591555,
      maxScale: 73957190.948944,
      layerId: 13,
    },
    state: {
      id: 'demographic_15',
      minScale: 73957190.948944,
      maxScale: 18489297.737236,
      layerId: 15,
    },
    county: {
      id: 'demographic_23',
      minScale: 18489297.737236,
      maxScale: 2311162.217155,
      layerId: 23,
    },
    subDivision: {
      id: 'demographic_24',
      minScale: 2311162.217155,
      maxScale: 288895.277144,
      layerId: 24,
    },
    city: {
      id: 'demographic_25',
      minScale: 288895.277144,
      maxScale: 72223.819286,
      layerId: 25,
    },
    tract: {
      id: 'demographic_27',
      minScale: 72223.819286,
      maxScale: 70,
      layerId: 27,
    },
  };
  ColorRamps = {
    age: [
      'rgb(0, 114, 153)',
      'rgb(82, 160, 191)',
      'rgb(180, 172, 151)',
      'rgb(250, 182, 120)',
      'rgb(255, 218, 191)',
    ],
    population: [
      'rgb(255, 255, 178)',
      'rgb(254, 198, 119)',
      'rgb(253, 141, 60)',
      'rgb(221, 71, 49)',
      'rgb(189, 0, 38)',
    ],
    householdIncome: [
      'rgb(59, 97, 66)',
      'rgb(176, 217, 184)',
      'rgb(250, 250, 250)',
      'rgb(162, 177, 191)',
      'rgb(26, 74, 120)',
    ],
    census: [
      'rgb(166, 97, 26)',
      'rgb(198, 156, 114)',
      'rgb(229, 215, 201)',
      'rgb(196, 223, 219)',
      'rgb(99, 178, 166)',
      'rgb(1, 133, 113)',
    ],
  };
  defaultParcelLayer = new FeatureLayer({
    url: environment.parcelAtlasUrl,
  });

  constructor(public esriMapService: EsriMapService) {}

  ngOnInit(): void {
    this.getEsriToken();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.['demographics'] &&
      changes?.['demographics'].currentValue !== '' &&
      changes?.['demographics'].currentValue !=
        changes?.['demographics'].previousValue
    ) {
      this.demographicLayerChange();
    }
  }

  getEsriToken() {
    this.esriMapService.getEsriAccessToken().subscribe(
      (res: any) => {
        if (res.token) {
          config.apiKey = res.token;
          this.initMapConfig().then(() => {
            this.mapReady.emit(true);
          });
        }
      },
      (error: any) => {
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

  initMap(config: { container: HTMLDivElement }) {
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
    this.legendWidget();
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
      this.isParcelFeatures(event);

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

  legendWidget() {
    const legend = new Legend({
      view: this.mapView,
    });

    this.legendExpand = new Expand({
      view: this.mapView,
      content: legend,
      expanded: false,
    });
  }
  demographicLayerChange(): void {
    this.resetDemographicLayers();

    Object.values(this.LayerScaleConfig).forEach((layerConfig: any) => {
      const createdLayer = new FeatureLayer({
        id: layerConfig?.id,
        url: (environment as any)[this.demographics],
        opacity: 0.5,
        ...layerConfig,
      });

      createdLayer.renderer = this.getClassBreaksRenderer()!;
      // this.dynamicLayer = createdLayer;

      this.mapView.map.add(createdLayer, layerConfig?.layerId || 0);
      // this.mapApi.popupChartTemplate(createdLayer, this.demoLayerName);
      this.mapView.zoom = 4;
    });
  }

  resetDemographicLayers(): void {
    Object.values(this.LayerScaleConfig).forEach((layerConfig) => {
      this.mapView.map.remove(this.mapView.map.findLayerById(layerConfig.id));
    });
  }

  getClassBreaksRenderer(): ClassBreaksRenderer | null {
    if (this.demographics == 'householdIncome') {
      return this.getHouseholdClassBreaksRenderer();
    } else if (this.demographics == 'population') {
      return this.getPopulationClassBreaksRenderer();
    } else if (this.demographics == 'census') {
      return this.getGrowthRateClassBreaksRenderer();
    } else if (this.demographics == 'age') {
      return this.getAgeClassBreaksRenderer();
    }
    return null;
  }

  private getHouseholdClassBreaksRenderer(): ClassBreaksRenderer {
    // tslint:disable-next-line: max-line-length
    const currencyFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    const classBreakValues = [
      { min: 0, max: 16500, colorId: 0 },
      { min: 16500, max: 55900, colorId: 1 },
      { min: 55900, max: 95400, colorId: 2 },
      { min: 95400, max: 134800, colorId: 3 },
      { min: 134800, max: 250100, colorId: 4 },
    ];

    const classBreakInfos = classBreakValues.map<ClassBreakInfo>((item) => {
      return new ClassBreakInfo({
        minValue: item.min,
        maxValue: item.max,
        symbol: new SimpleFillSymbol({
          color: this.ColorRamps.householdIncome[item.colorId],
        }),
        label: `${currencyFormat.format(item.min)} - ${currencyFormat.format(
          item.max
        )}`,
      });
    });

    return new ClassBreaksRenderer({
      valueExpression: `$feature.MEDHINC_CY`,
      valueExpressionTitle: 'Median Household Income',
      classBreakInfos,
    });
  }

  private getPopulationClassBreaksRenderer(): ClassBreaksRenderer {
    const numberFormat = new Intl.NumberFormat('en-US');

    const classBreakValues = [
      { min: 0, max: 1000, colorId: 0 },
      { min: 1000, max: 8400, colorId: 1 },
      { min: 8400, max: 15800, colorId: 2 },
      { min: 15800, max: 24000, colorId: 3 },
      { min: 24000, max: 629000, colorId: 4 },
    ];

    const classBreakInfos = classBreakValues.map<ClassBreakInfo>((item) => {
      return new ClassBreakInfo({
        minValue: item.min,
        maxValue: item.max,
        symbol: new SimpleFillSymbol({
          color: this.ColorRamps.population[item.colorId],
        }),
        label: `${numberFormat.format(item.min)} - ${numberFormat.format(
          item.max
        )} people per sq mi`,
      });
    });

    return new ClassBreaksRenderer({
      valueExpression: `$feature.POPDENS_CY`,
      valueExpressionTitle: 'Population Density',
      classBreakInfos,
    });
  }

  private getGrowthRateClassBreaksRenderer(): ClassBreaksRenderer {
    const numberFormat = new Intl.NumberFormat('en-US', {
      notation: 'compact',
    });

    const classBreakValues = [
      { min: -10.0, max: -1.9, colorId: 0 },
      { min: -1.9, max: -1.25, colorId: 1 },
      { min: -1.25, max: 0, colorId: 2 },
      { min: 0, max: 1.25, colorId: 3 },
      { min: 1.25, max: 1.9, colorId: 4 },
      { min: 1.9, max: 180.5, colorId: 5 },
    ];

    const classBreakInfos = classBreakValues.map<ClassBreakInfo>((item) => {
      return new ClassBreakInfo({
        minValue: item.min,
        maxValue: item.max,
        symbol: new SimpleFillSymbol({
          color: this.ColorRamps.census[item.colorId],
        }),
        label: `${numberFormat.format(item.min)}% to ${numberFormat.format(
          item.max
        )}%`,
      });
    });

    return new ClassBreaksRenderer({
      valueExpression: `$feature.POPGRWCYFY`,
      valueExpressionTitle: 'Population Growth Rate',
      classBreakInfos,
    });
  }

  private getAgeClassBreaksRenderer(): ClassBreaksRenderer {
    const numberFormat = new Intl.NumberFormat('en-US', {
      notation: 'compact',
    });

    const classBreakValues = [
      { min: 0, max: 27, colorId: 0 },
      { min: 27, max: 36, colorId: 1 },
      { min: 36, max: 45, colorId: 2 },
      { min: 45, max: 54, colorId: 3 },
      { min: 54, max: 100, colorId: 4 },
    ];

    const classBreakInfos = classBreakValues.map<ClassBreakInfo>((item) => {
      return new ClassBreakInfo({
        minValue: item.min,
        maxValue: item.max,
        symbol: new SimpleFillSymbol({
          color: this.ColorRamps.age[item.colorId],
        }),
        label: `${numberFormat.format(item.min)} - ${numberFormat.format(
          item.max
        )} years of age`,
      });
    });

    return new ClassBreaksRenderer({
      valueExpression: `$feature.MEDAGE_CY`,
      valueExpressionTitle: 'Median Age',
      classBreakInfos,
    });
  }

  isActiveParcelAtlas(data: any) {
    console.log(data);
    // Remove Parcel Atlas
    this.mapView.map.remove(this.parcelLayer);
    this.parcelAtlas = data.parcel;

    if (data?.layer?.parcel) {
      // Parcel layer render
      const parcelRender = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          style: 'none',
          outline: {
            color: 'blue',
            width: '0.6px',
          },
        }),
      });

      this.parcelLayer = new FeatureLayer({
        url: environment.parcelAtlasUrl,
        visible:true,
        definitionExpression: data.parcel,
        renderer: parcelRender,
      });

      this.mapView.map.add(this.parcelLayer, 0);

      if (this.oldSketch) {
        this.isParcelFeatures(this.oldSketch);
      }
      // this.popupTemplate(this.parcelLayer);
    }

    // Select Parcel
    // this.onParcelSelect();
  }

  isParcelFeatures(event: any) {
    console.log(event);

    const parcelQuery: __esri.QueryProperties = {
      spatialRelationship: 'intersects',
      geometry: event.graphic.geometry,
      outFields: ['*'],
      where: this.parcelAtlas ? this.parcelAtlas : '',
      returnGeometry: false,
    };

    let layer: any;
    let isFilterParcel: boolean;
    if (this.parcelLayer) {
      layer = this.parcelLayer;
      isFilterParcel = true;
    } else {
      layer = this.defaultParcelLayer;
      isFilterParcel = false;
    }

    layer
      .queryFeatures(parcelQuery)
      .then((results: any) => {
        const res = results.features.map((item: any) => item.attributes);
        const filterData = res.filter((item: any) => {
          return item.FID > 0;
        });
        console.log(results)
        this.parcelList.emit({ filterData, isFilterParcel });
      })
      .catch(() => {
        this.isError.emit(true);
      });
  }
  
}
