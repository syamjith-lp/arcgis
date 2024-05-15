import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Comparative,
  FieldTemplate,
  Fields,
  Icon,
  Lable,
  LayerName,
  Layers,
} from '../common.enum';
import { SiteFinderEsiriComponent } from '../site-finder-esiri/site-finder-esiri.component';
import { Subscription } from 'rxjs';
import { EsriMapService } from '../esri-map.service';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import { environment } from 'src/environments/environment';

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
  demographics: any = '';
  isSketch = false;
  public sketchList: any;
  public legendExpand: any;
  public nearByMobs: any;
  public montecitoOwn: any;
  public hospital: any;
  public competitors: any;
  public primaryCare: any;
  public refferingPhysicians: any;
  public addressList: any = [];
  public newAddressList: any = [];
  public addressListToShow: any = [];
  public newSearchAddress: any = [];
  public isNewCategory = false;
  public isZipcodesEmpty = false;
  private doctorLayer: any;
  public selectedLayers: any[] = [];
  public layersType: any;
  public icon: any = Icon;
  private nearByMobLayer!: __esri.FeatureLayer;
  private montecitoOwnLayer!: __esri.FeatureLayer;
  private subscriptions: Subscription[] = [];
  private nearByMobService: any;

  items = [
    { key: 'householdIncome', label: 'Median Household Income' },
    { key: 'population', label: 'Population' },
    { key: 'census', label: 'Population Growth' },
    { key: 'age', label: 'Population Age' },
  ];

  @ViewChild(SiteFinderEsiriComponent) mapApi!: SiteFinderEsiriComponent;

  constructor(public siteFinderService: EsriMapService) {}

  ngOnInit(): void {}

  onItemSelected(key: any) {
    this.demographics = key.target.value;
  }
  isShapeChanged(event: any): void {
    this.isSketch = true;
  }

  onSketch(event: any) {
    this.sketchList = event;
    this.isSketch = false;

    this.resetMap();
    // this.globalService.setSketchList(this.sketchList);
    if (this.sketchList?.sketchStatus) {
      this.isSketch = true;
    }
    if (this.layersType && this.sketchList) {
      Object.keys(this.layersType).forEach((key) => {
        if (this.layersType[key] === true) {
          this.isLayers({ activeLayer: key, layerForm: this.layersType });
        }
      });
    }

    // if (!this.sketchList?.sketchStatus || !this.layersType?.parcel) {
    //   this.isParcelRecommendation = false;
    // }
  }

  resetMap() {
    this.nearByMobs = null;
    this.montecitoOwn = null;
    this.hospital = null;
    this.competitors = null;
    this.primaryCare = null;
    this.refferingPhysicians = null;
    this.doctorLayer = null;
  }
  layers(fields: any) {
    // this.globalService.setLayers(fields.layerForm);
    this.selectedLayers = fields?.layerForm ? fields.layerForm : fields;
    // this.selectSearchLayers.emit(fields.layerForm);
    this.isLayers(fields);
  }

  isLayers(data: any) {
    this.layersType = data?.layerForm;
    if (data?.activeLayer instanceof Array) {
      this.resetMap();
      // tslint:disable-next-line: no-shadowed-variable
      data?.activeLayer.forEach((element: any) => {
        this.addLayer(element);
      });
    } else {
      const activeLayer = data?.activeLayer;
      this.addLayer(activeLayer);
    }
  }

  addLayer(activeLayer: any) {
    this.mapApi.mapView.popup.close();
    if (activeLayer === Layers.nearByMobs && this.layersType?.nearByMobs) {
      this.nearByMobs = null;
      const option = {
        title: 'Near By Mobs',
        type: 'buildings',
        layer: 'near-by-mob',
        practiceName: '~',
        speciality: '~',
        icon: this.icon.iconRed,
        activeLayer: this.nearByMobLayer,
      };
      this.isNearByMob(option);
    } else if (!this.layersType?.nearByMobs) {
      if (this.nearByMobService) {
        this.nearByMobService.unsubscribe();
      }
      // this.mapApi.mapView.map.remove(this.nearByMobLayer);
      this.mapApi.mapView.map.remove(this.montecitoOwnLayer);
      this.nearByMobs = null;
      this.montecitoOwn = null;
    }
  }

  isNearByMob(option: any) {
    const value = {
      tool: this.sketchList?.tool,
      type: option.type,
      layer: option.layer,
      speciality: option.speciality,
      practiceName: option.practiceName,
      coordinates: this.sketchList?.coordinates,
    };

    this.subscriptions.push(
      (this.nearByMobService = this.siteFinderService
        .getLayers(value)
        .subscribe((res: any) => {
          if (res.data?.length > 0) {
            if (option.layer === 'near-by-mob') {
              const response = res.data.map((x: any) =>
                x.MontecitoID
                  ? {
                      ...x,
                      urlTitle: '>> Click here to go to building report <<',
                      url:
                        '#/admin/prizefinder/buildingreport/' + x.MontecitoID,
                    }
                  : { ...x }
              );

              // Nearby MOB
              this.nearByMobs = response.filter(
                (item: any) => item.MontecitoOwned === 'No'
              );
              this.nearByMobLayer = this.buildDataFt(
                this.nearByMobs,
                this.icon.iconBlue,
                option.title
              );
              this.mapApi.mapView.map.add(this.nearByMobLayer);

              // Montecito own
              this.montecitoOwn = response.filter(
                (item: any) => item.MontecitoOwned === 'Yes'
              );
              this.montecitoOwnLayer = this.buildDataFt(
                this.montecitoOwn,
                option.icon,
                Lable.nearByMobsMontecitoOwned
              );
              this.mapApi.mapView.map.add(this.montecitoOwnLayer);
            }
          } else {
            // this.toastrService.warning('NearBy Mobs data not found');
          }
          // this.isMapLoader = false;
        }))
    );
  }

  buildDataFt(data: any[], icon: any, title: any): __esri.FeatureLayer {
    let fieldInfos;
    let fields;

    if (title === LayerName.practiceLocation) {
      fieldInfos = FieldTemplate.practiceLocationField;
      fields = Fields.practiceLocationField;
    } else if (
      title === LayerName.nearByMobs ||
      title === Lable.nearByMobsMontecitoOwned
    ) {
      fieldInfos = FieldTemplate.nearByMobsField;
      fields = Fields.nearByMobsField;
    } else if (title === LayerName.hospital) {
      fieldInfos = FieldTemplate.hospitalField;
      fields = Fields.hospitalField;
    } else if (title === LayerName.competitors) {
      fieldInfos = FieldTemplate.competitorsField;
      fields = Fields.competitorsField;
    } else if (title === LayerName.primaryCare) {
      fieldInfos = FieldTemplate.primaryCareField;
      fields = Fields.primaryCareField;
    } else if (title === LayerName.referringPhysicians) {
      fieldInfos = FieldTemplate.referringPhysiciansField;
      fields = Fields.referringPhysiciansField;
    } else if (title === LayerName.addressList) {
      fieldInfos = FieldTemplate.addressListField;
      fields = Fields.addressListField;
    } else if (title === LayerName.doctorLocation) {
      fieldInfos = FieldTemplate.doctorLocationField;
      fields = Fields.doctorLocationField;
    } else if (title === Comparative.competitorLocations) {
      fieldInfos = FieldTemplate.competitors;
      fields = Fields.competitors;
    }

    // const buildingTemplate = new PopupTemplate({
    //   title,
    //   content: [
    //     { type: 'fields', fieldInfos },
    //     new CustomContent({
    //       outFields: ['*'],
    //       creator: (event: any) => {
    //         const a = document.createElement('a');
    //         a.href = `${event.graphic.attributes.url}`;
    //         a.target = '_blank';
    //         a.innerText = event.graphic.attributes.urlTitle;
    //         a.className = 'layer-link';
    //         return a;
    //       },
    //     })
    //   ],
    //   outFields: ['*'],
    // });

    if (title === LayerName.addressList) {
      const ftLayer = new FeatureLayer({
        outFields: ['*'],
        source: this.buildGraphics(data),
        geometryType: 'point',
        renderer: this.buildImageRenderer(icon, title),
        objectIdField: 'ObjectID',
        ...fields,
        // popupTemplate: new PopupTemplate({
        //   content: () => {
        //     const addButton: HTMLElement = document.createElement('div');
        //     // tslint:disable-next-line: max-line-length
        //     addButton.innerHTML = `<button id="addButton" class="pt-3 btn btn-sm"><i class="fa fa-plus-circle px-2"></i>Add to Address List</button>`;
        //     addButton.addEventListener('click', () => { this.addToAddressList(); });
        //     return addButton;
        //   },
        // })
      });
      return ftLayer;
    } else {
      const ftLayer = new FeatureLayer({
        source: this.buildGraphics(data),
        geometryType: 'point',
        renderer: this.buildImageRenderer(icon, title),
        objectIdField: 'objectId',
        ...fields,
        // popupTemplate: buildingTemplate,
      });
      return ftLayer;
    }
  }
  buildGraphics(data: any[]): __esri.Graphic[] {
    return data.map(
      (item) =>
        new Graphic({
          geometry: this.buildGeoPoint(item),
          attributes: { ...item },
        })
    );
  }

  buildGeoPoint(params: { lat: number; lng: number }): __esri.Point {
    return new Point({
      latitude: params.lat,
      longitude: params.lng,
    });
  }
  buildImageRenderer(icon: any, label: any): __esri.SimpleRenderer {
    return new SimpleRenderer({
      label,
      symbol: new PictureMarkerSymbol({
        url: environment.localHost + icon,
        width: Icon.width,
        height: Icon.height,
      }),
    });
  }
}
