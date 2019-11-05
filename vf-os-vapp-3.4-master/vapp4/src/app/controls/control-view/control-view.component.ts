import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ControllersService, GlobalControlInformation} from "../../api";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {CpsSocketService} from "../../cps-socket/cps-socket.service";
import {CpsControlInformation} from "../../cps-socket/cpsControlInformation";
import {CpsConnectedSocket} from "../../cps-socket/cps-connected-socket";

@Component({
  selector: 'app-control-view',
  templateUrl: './control-view.component.html',
  styleUrls: ['./control-view.component.scss']
})
export class ControlViewComponent implements OnInit, OnDestroy {

  controller: GlobalControlInformation = null;
  selectedId: number = null;
  routerParamsSubscription: Subscription = null;

  private cpsConnectedSocket: CpsConnectedSocket = null;
  cpsControlInformation$: Observable<CpsControlInformation> = null;
  cpsControlInformationSubscription: Subscription;
  cpsControlInformationArray: CpsControlInformation[] = [];

  constructor(
    private controllersService: ControllersService,
    private cpsControlService: CpsSocketService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.cpsConnectedSocket = this.cpsControlService.connect();
  }

  ngOnInit() {
    this.cpsControlInformation$ = this.cpsConnectedSocket.subscribeControl();

    this.routerParamsSubscription = this.route.params.subscribe(
      params => {
        this.selectedId = +params['mo'];
        this.controllersService.getGlobalControlInformationMoGet('' + this.selectedId).subscribe(
          async result => {
            this.controller = result[0];
            this.controller.defect_rate=0;
            this.controller.production_rate=0;
            this.controller.total_nc_cost=0;
            this.controller.total_shutdown_cost=0;
            this.controller.impact='None';

            await this.controllersService.startCpsControlControlPost(this.controller.id).toPromise();

            this.cpsControlInformationSubscription = this.cpsControlInformation$.subscribe(
              (controlInformation) => {
                if (controlInformation.mo != this.controller.mo) {
                  return;
                }

                this.zone.run(() => {
                  this.cpsControlInformationArray.push(controlInformation);

                  /*if (this.cpsControlInformationArray.length > 50) {
                    this.cpsControlInformationArray.shift();
                  }*/

                  this.cpsControlInformationArray = [ ...this.cpsControlInformationArray ];
                  if(controlInformation.ok=='NOK'){
                    this.controller.defect_rate = (((this.controller.defect_rate*this.cpsControlInformationArray.length-1)/100)+1)/this.cpsControlInformationArray.length*100;
                    this.controller.total_nc_cost = (this.controller.total_nc_cost+this.controller.product_cost);
                    this.controller.total_shutdown_cost = this.controller.total_shutdown_cost+this.controller.total_nc_cost;
                    this.controller.impact = this.controller.impact;
                    this.controller.production_rate=0;
                  }
                });
              }
            );
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.cpsControlInformationSubscription.unsubscribe();
    this.routerParamsSubscription.unsubscribe();
    this.controllersService.stopCpsControlControlPost(this.controller.cps);
    this.cpsConnectedSocket.unsubscribeControl();
  }

}
