import {Component, OnInit} from '@angular/core';
import {ControllersService, GlobalControlInformation} from "../../api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.scss']
})
export class ControlListComponent implements OnInit {

  controllers: GlobalControlInformation[] = [];

  constructor(
    private controllerService: ControllersService,
    private router: Router
  ) {
    this.controllerService.getAllControlGet().subscribe((controllers) => this.controllers = controllers);
  }

  ngOnInit() {
  }

  openController(controller: GlobalControlInformation) {
    this.router.navigate(['/controls', controller.mo])
  }

}
