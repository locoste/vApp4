import {Component, Input, OnInit} from '@angular/core';
import {CpsControlInformation} from "../../../cps-socket/cpsControlInformation";

import regression from 'regression';

@Component({
  selector: 'app-control-view-chart',
  templateUrl: './control-view-chart.component.html',
  styleUrls: ['./control-view-chart.component.scss']
})
export class ControlViewChartComponent implements OnInit {

  private _controlInformation: CpsControlInformation[];
  @Input() set controlInformation(value: CpsControlInformation[]) {
    this._controlInformation = value;
    this.updateChart();
  }

  chart: any = {
    data: [],
    layout: {}
  };

  constructor() { }

  ngOnInit() {
  }

  updateChart() {
    let chartData = [
      { x: [], y: [], type: 'scatter', mode: 'lines+points', marker: {color: 'blue'}, name: 'Tolerance'},
      { x: [], y: [], type: 'scatter', mode: 'lines+points', marker: {color: 'green'}, name: 'Control'},
      { x: [], y: [], type: 'scatter', mode: 'lines+points', marker: {color: 'orange'}, name: 'Regression (control)', line: {dash: 'dot'}}
    ];

    let regressionData = [];

    let i=0;
    for (let controlInformation of this._controlInformation) {
      chartData[0].x.push(i);
      chartData[0].y.push(controlInformation.tolerence);

      chartData[1].x.push(i);
      chartData[1].y.push(controlInformation.blob);

      regressionData.push([i+1, controlInformation.blob]);

      i++;
    }

    let regressionResult = regression.linear(regressionData);
    for (let regressionPart of regressionResult.points) {
      chartData[2].x.push(regressionPart[0]);
      chartData[2].y.push(regressionPart[1]);
    }

    this.chart.data = chartData;
  }

}
