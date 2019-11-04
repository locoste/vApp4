import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ControlListComponent} from "./control-list/control-list.component";
import {ControlNewComponent} from "./control-new/control-new.component";
import {ControlViewComponent} from "./control-view/control-view.component";

const routes: Routes = [
  {
    path: '',
    component: ControlListComponent
  },
  {
    path: 'new',
    component: ControlNewComponent
  },
  {
    path: ':mo',
    component: ControlViewComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule { }
