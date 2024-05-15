import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Layers } from '../common.enum';


@Component({
  selector: 'app-site-finder-layers',
  templateUrl: './site-finder-layers.component.html',
  styleUrls: ['./site-finder-layers.component.scss'],
})
export class SiteFinderLayersComponent {
  @Input() public isSketch: any;
  @Output() layers = new EventEmitter<any>();

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
  ngOnChanges() {
    console.log(this.isSketch);
  }

  toggleSwitch(layer: any) {
    if (layer == 'mob') {
      if (this.isSketch) {
        this.isLayer(Layers.nearByMobs);
      } else if (this.layerForm.value.nearByMobs) {
        this.polygonAlert();
        this.layerForm.controls.nearByMobs.reset();
      }
    }
  }
  polygonAlert() {
    alert('Polygon is required');
  }
  isLayer(layer: any) {
    this.layers.emit({ activeLayer: layer, layerForm: this.layerForm.value });
  }
}
