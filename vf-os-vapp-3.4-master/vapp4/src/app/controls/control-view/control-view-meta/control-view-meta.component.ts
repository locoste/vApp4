import {Component, Input, OnInit} from '@angular/core';
import {GlobalControlInformation} from "../../../api";
import {CpsControlInformation} from "../../../cps-socket/cpsControlInformation";

@Component({
  selector: 'app-control-view-meta',
  templateUrl: './control-view-meta.component.html',
  styleUrls: ['./control-view-meta.component.scss']
})
export class ControlViewMetaComponent implements OnInit {

	@Input() controlInformation: GlobalControlInformation = null;
  private _controlInformation: CpsControlInformation[];
  
  /*@Input() set controlInformationCps(value: CpsControlInformation[]) {
  	console.log('Input')
    this._controlInformation = value;
    this.updateInformation();
  };*/

  constructor() { }

  ngOnInit() {
  }

  /*updateInformation(){
  	console.log(this._controlInformation[this._controlInformation.length-1].ok)
  	if(this._controlInformation[this._controlInformation.length-1].ok=='NOK'){
  		this.controlInformation.defect_rate = (((this.controlInformation.defect_rate*this._controlInformation.length-1)/100)+1)/this._controlInformation.length*100;
  		this.controlInformation.total_nc_cost = (this.controlInformation.total_nc_cost+this.controlInformation.product_cost);
  		this.controlInformation.total_shutdown_cost = this.controlInformation.total_shutdown_cost+this.controlInformation.total_nc_cost;
  		this.controlInformation.impact = this._controlInformation.action;
  		this.controlInformation.production_rate=0;
  	}
  }*/

}

