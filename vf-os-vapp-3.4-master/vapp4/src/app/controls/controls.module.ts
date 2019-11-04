import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlsRoutingModule } from './controls-routing.module';
import { ControlNewComponent } from './control-new/control-new.component';
import { ControlListComponent } from './control-list/control-list.component';
import { ControlViewComponent } from './control-view/control-view.component';
import {MainModule} from "../main/main.module";
import { ControlViewMetaComponent } from './control-view/control-view-meta/control-view-meta.component';
import { ControlViewControlsComponent } from './control-view/control-view-controls/control-view-controls.component';
import { ControlViewRecommendationsComponent } from './control-view/control-view-recommendations/control-view-recommendations.component';
import { ControlViewChartComponent } from './control-view/control-view-chart/control-view-chart.component';
import {FormsModule} from "@angular/forms";
import {CpsSocketModule} from "../cps-socket/cps-socket.module";
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [ControlNewComponent, ControlListComponent, ControlViewComponent, ControlViewMetaComponent, ControlViewControlsComponent, ControlViewRecommendationsComponent, ControlViewChartComponent],
  imports: [
    CommonModule,
    ControlsRoutingModule,
    CpsSocketModule,
    FormsModule,
    MainModule,
    PlotlyModule
  ]
})
export class ControlsModule { }
