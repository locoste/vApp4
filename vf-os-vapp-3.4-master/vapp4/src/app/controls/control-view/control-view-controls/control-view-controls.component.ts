import {Component, Input, OnInit} from '@angular/core';
import {CpsControlInformation} from "../../../cps-socket/cpsControlInformation";

@Component({
  selector: 'app-control-view-controls',
  templateUrl: './control-view-controls.component.html',
  styleUrls: ['./control-view-controls.component.scss']
})
export class ControlViewControlsComponent implements OnInit {

  @Input() controlInformation: CpsControlInformation[];

  constructor() { }

  ngOnInit() {
  }

}
