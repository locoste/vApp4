import {Observable, Subject} from "rxjs";
import {CpsControlInformation} from "./cpsControlInformation";

export class CpsConnectedSocket {

  private isSubscribed: boolean = false;

  private readonly subscriptionPath = '/control';
  private controlInformationSubscription: any = null;
  private controlInformation$: Subject<CpsControlInformation> = null;

  constructor(private client: any) {}

  subscribeControl(): Observable<CpsControlInformation>|null {
    if (this.controlInformation$ !== null) {
      return this.controlInformation$;
    }

    this.controlInformation$ = new Subject<CpsControlInformation>();
    this.controlInformationSubscription = this.client.subscribe(this.subscriptionPath, (controlInformation) => this.controlInformation$.next(controlInformation));
    return this.controlInformation$;
  }

  unsubscribeControl(): void {
    this.client.unsubscribe(this.subscriptionPath);
    this.controlInformation$.complete();
    this.controlInformation$ = null;
    this.isSubscribed = false;
  }
}
