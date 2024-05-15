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
  private practiceLayer!: __esri.FeatureLayer;
  private nearByMobLayer!: __esri.FeatureLayer;
  private hospitalLayer!: __esri.FeatureLayer;
  private competitorLayer!: __esri.FeatureLayer;
  private primaryCareLayer!: __esri.FeatureLayer;
  private referringPhysicianLayer!: __esri.FeatureLayer;
  private dynamicLayer!: __esri.FeatureLayer;
  private addressLayer!: __esri.FeatureLayer;

  private montecitoOwnLayer!: __esri.FeatureLayer;
  private subscriptions: Subscription[] = [];
  private nearByMobService: any;
  private practiceService: any;
  private hospitalService: any;
  private primaryCareService: any;
  private competitorService: any;
  private referringPhysicianService: any;

  public practiceLocationType: any;
  public specialtyType: any;
  items = [
    { key: 'householdIncome', label: 'Median Household Income' },
    { key: 'population', label: 'Population' },
    { key: 'census', label: 'Population Growth' },
    { key: 'age', label: 'Population Age' },
  ];
  public parcelRecommendations: any;

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
    if (activeLayer === Layers.hospital && this.layersType?.hospital) {
      this.hospital = null;
      // this.isMapLoader = true;
      const option = {
        title: 'Hospital',
        type: 'buildings',
        layer: 'hospital',
        practiceName: '~',
        speciality: '~',
        icon: this.icon.iconHospital,
        activeLayer: this.hospitalLayer,
      };

      this.isHospital(option);
    } else if (!this.layersType?.hospital) {
      if (this.hospitalService) {
        // this.isMapLoader = false;
        this.hospitalService.unsubscribe();
      }
      this.mapApi.mapView.map.remove(this.hospitalLayer);
      this.hospital = null;
    }
    if (activeLayer === Layers.primaryCare && this.layersType?.primaryCare) {
      this.primaryCare = null;
      // this.isMapLoader = true;
      const option = {
        title: 'Primary Care',
        type: 'buildings-speciality',
        layer: 'primary-care',
        practiceName: this.practiceLocationType
          ? this.practiceLocationType
          : '~',
        speciality: this.specialtyType ? this.specialtyType : '~',
        icon: this.icon.iconPurple,
        activeLayer: this.primaryCareLayer,
      };

      this.isPrimaryCare(option);
    } else if (!this.layersType?.primaryCare) {
      if (this.primaryCareService) {
        // this.isMapLoader = false;
        this.primaryCareService.unsubscribe();
      }
      this.mapApi.mapView.map.remove(this.primaryCareLayer);
      this.primaryCare = null;
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
  isHospital(option: any) {
    const value = {
      tool: this.sketchList?.tool,
      type: option.type,
      layer: option.layer,
      speciality: option.speciality,
      practiceName: option.practiceName,
      coordinates: this.sketchList?.coordinates,
    };

    this.subscriptions.push(
      (this.hospitalService = this.siteFinderService
        .getLayers(value)
        .subscribe((res) => {
          if (res.data?.length > 0) {
            if (option.layer === 'hospital') {
              const response = res.data.map((x: any) =>
                x.website
                  ? {
                      ...x,
                      urlTitle: '>> Click here to go to hospital <<',
                      url: x.website,
                    }
                  : { ...x }
              );

              this.hospital = response;
              this.hospitalLayer = this.buildDataFt(
                this.hospital,
                option.icon,
                option.title
              );
              this.mapApi.mapView.map.add(this.hospitalLayer);
            }
          } else {
            // this.toastrService.warning('Hospital data not found');
          }
          // this.isMapLoader = false;
        }))
    );
  }

  isPrimaryCare(option: any) {
    const value = {
      tool: this.sketchList?.tool,
      type: option.type,
      layer: option.layer,
      speciality: option.speciality,
      practiceName: option.practiceName,
      coordinates: this.sketchList?.coordinates,
    };

    this.subscriptions.push(
      (this.primaryCareService = this.siteFinderService
        .getLayers(value)
        .subscribe((res) => {
          if (res.data?.length > 0) {
            if (option.layer === 'primary-care') {
              const response = res.data.map((x: any) =>
                x.website
                  ? {
                      ...x,
                      urlTitle: '>> Click here to go to primary care <<',
                      url: x.website,
                    }
                  : { ...x }
              );

              this.primaryCare = response;
              this.primaryCareLayer = this.buildDataFt(
                this.primaryCare,
                option.icon,
                option.title
              );
              this.mapApi.mapView.map.add(this.primaryCareLayer);
            }
          } else {
            // this.toastrService.warning('Primary Care data not found');
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
  isParcelAtlas(data: any) {
    console.log(data);
    // this.isParcel = data.layer.parcel;
    // this.layersType = data.layer;
    // this.parcelAtlas = data.parcel;

    if (data.doctorLocations.length > 0) {
      const doctorLocation = data.doctorLocations.map((x: any) => ({
        ...x,
        lng: x.lon,
      }));
      this.doctorLayer = this.buildDataFt(
        doctorLocation,
        this.icon.iconYellowDoctor,
        Lable.doctorLocation
      );
      this.mapApi.mapView.map.add(this.doctorLayer);
    }
    this.mapApi.isActiveParcelAtlas(data);

    if (!this.sketchList?.sketchStatus || !this.layersType?.parcel) {
      // this.isParcelRecommendation = false;
    }
  }
  onParcelList(data: any) {
    // this.isLoader = false;
    this.parcelRecommendations = [];
    if (data?.filterData?.length > 0) {
      this.parcelRecommendations = data?.filterData;
      this.isZipcodesEmpty = false;

      if (data?.isFilterParcel === true) {
        this.getScore(data?.filterData);
      }
    }
    console.log( this.parcelRecommendations);

  }
  getScore(data: any) {
    if (data?.length > 0) {
      const result = data.map((x: any) => ({
        SIT_FULL_S: x.SIT_FULL_S ? x.SIT_FULL_S : '',
        OWNADDRESS: x.OWNADDRESS ? x.OWNADDRESS : '',
        DEED_DSCR: x.DEED_DSCR ? x.DEED_DSCR : '',
        APN: x.APN ? x.APN : '',
        APN2: x.APN2 ? x.APN2 : '',
        COUNTY: x.COUNTY ? x.COUNTY : '',
        SIT_HSE_NU: x.SIT_HSE_NU ? x.SIT_HSE_NU : '',
        SIT_STR_NA: x.SIT_STR_NA ? x.SIT_STR_NA : '',
        SIT_CITY: x.SIT_CITY ? x.SIT_CITY : '',
        SIT_ZIP: x.SIT_ZIP ? Number(x.SIT_ZIP) : 0,
        SIT_ZIP4: x.SIT_ZIP4 ? Number(x.SIT_ZIP4) : 0,
        Shape_Area: x.Shape_Area ? Number(x.Shape_Area) : 0,
        FIPS: x.FIPS ? Number(x.FIPS) : 0,
      }));

      this.siteFinderService.getParcelScore(result).subscribe((res) => {
        // tslint:disable-next-line: no-shadowed-variable
        const result = res.data;

        result.sort((a: any, b: any) => {
          return b.Score - a.Score;
        });

        this.parcelRecommendations = this.parcelRecommendations.map(
          (x: any, i: any) => ({
            ...x,
            Score: result[i].Score,
          })
        );
      });
    }
    console.log(this.parcelRecommendations);
  }
}
