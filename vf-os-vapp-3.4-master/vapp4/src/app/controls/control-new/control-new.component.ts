import { Component, OnInit } from '@angular/core';
import {
  ControllersService,
  CreateControlInformation,
  ManufacturingOrder,
  ManufacturingOrdersService,
  NewControlInformation, Operation
} from "../../api";

@Component({
  selector: 'app-control-new',
  templateUrl: './control-new.component.html',
  styleUrls: ['./control-new.component.scss']
})
export class ControlNewComponent implements OnInit {

  newControls: NewControlInformation[] = [];
  manufacturingOrders: ManufacturingOrder[] = [];
  operations: Operation[] = [];

  newControl: CreateControlInformation = {};

  constructor(
    private controllersService: ControllersService,
    private manufacturingOrdersService: ManufacturingOrdersService
  ) { }

  ngOnInit() {
    this.controllersService.getNewControlInformationGet().subscribe(
      result => {
        console.log(result)
        this.newControls = result
        this.newControl.cps = result[0].cps_libele;
      }
    );
    this.manufacturingOrdersService.getListOfMOGet().subscribe(
      result => {
        this.manufacturingOrders = result;
        this.updateOperations(this.manufacturingOrders[0].numofs);
        this.newControl.mo = this.manufacturingOrders[0].numofs;
      }
    );
    this.newControl.product=' ';
    this.newControl.product_cost = 67;
    this.newControl.ressource_cost = 32;
    this.newControl.control_type = 'Sample';
    this.newControl.control_size = 1;
    this.newControl.measure = 'Appearance';
    this.newControl.max_tolerence = 5;
    this.newControl.min_tolerence = 0;
  }

  updateOperations(mo: number) {
    this.manufacturingOrdersService.getListOperationMoGet('' + mo).subscribe(
      result => 
      {
        this.operations = result;
        this.newControl.ope = result[0].libope;
      }
    );
  }

  createNew() {
    this.controllersService.setNewControlInformationPost(this.newControl).subscribe(result => console.log(result));
  }
}
