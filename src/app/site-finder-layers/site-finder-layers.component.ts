import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Layers, ParcelLayerAllCode } from '../common.enum';
import { EsriMapService } from '../esri-map.service';

@Component({
  selector: 'app-site-finder-layers',
  templateUrl: './site-finder-layers.component.html',
  styleUrls: ['./site-finder-layers.component.scss'],
})
export class SiteFinderLayersComponent {
  @Input() public isSketch: any;
  @Output() layers = new EventEmitter<any>();
  @Output() parcelAtlas = new EventEmitter<any>();
  public parcelAllLayer = ParcelLayerAllCode;

  public isParcel = false;
  public selectedParcel: any;
  public doctorLocations: any[] = [];

  show = false;
  public layerForm = new FormGroup({
    nearByMobs: new FormControl(false),
    hospital: new FormControl(false),
    competitors: new FormControl(false),
    primaryCare: new FormControl(false),
    referringPhysicians: new FormControl(false),
    parcel: new FormControl(false),
    parcelLandUseCode: new FormControl(),
    lotSizeMin: new FormControl(),
    lotSizeMax: new FormControl(),
    locationData: new FormControl(false),
  });

  constructor(public siteFinderService: EsriMapService) {}
  ngOnChanges() {
  }
  ngOnInit(): void {
    this.getParcel();
  }

  toggleSwitch(layer: any) {
    if (layer == 'mob') {
      if (this.isSketch) {
        this.isLayer(Layers.nearByMobs);
      } else if (this.layerForm.value.nearByMobs) {
        this.polygonAlert();
        this.layerForm.controls.nearByMobs.reset();
      }
    } else if (layer == 'hospital') {
      if (this.isSketch) {
        this.isLayer(Layers.hospital);
      } else if (this.layerForm.value.hospital) {
        this.polygonAlert();
        this.layerForm.controls.hospital.reset();
      }
    } else if (layer == 'competitors') {
    } else if (layer == 'primaryCare') {
      if (this.isSketch) {
        this.isLayer(Layers.primaryCare);
      } else if (this.layerForm.value.primaryCare) {
        this.polygonAlert();
        this.layerForm.controls.primaryCare.reset();
      }
    } else if (layer == 'referringPhysicians') {
    }
  }
  toggleAtlasParcel(): void {
    this.isParcel = this.layerForm?.value?.parcel!;
    if (this.selectedParcel) {
      this.isParcelAtlas();
    } else {
      this.layerForm.controls.parcel.reset();
      alert('Land Use Code should not be an empty value');
    }
  }
  isParcelAtlas() {
    const data = {
      layer: this.layerForm.value,
      parcel: this.selectedParcel,
      doctorLocations: this.doctorLocations,
    };
    this.parcelAtlas.emit(data);
  }
  polygonAlert() {
    alert('Polygon is required');
  }
  getParcel() {
    // this.landUseCode = this.parcelLayerDefaultLandCode;
    this.selectedParcel = this.parcelAllLayer;
    // this.parcelSelectedLayer = this.parcelAllLayer;
  }
  isLayer(layer: any) {
    this.layers.emit({ activeLayer: layer, layerForm: this.layerForm.value });
  }

  getGeoLocationByDoctorLocation(addressList: any): void {
    // this.isFilterLoader.emit(true);
    this.siteFinderService
      .getGeoLocations(addressList)
      .subscribe((res: any) => {
        this.doctorLocations = res.data.geocoded;

        this.isParcelAtlas();
        // this.isFilterLoader.emit(false);
      });
  }
}
