import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {CpsConnectedSocket} from "./cps-connected-socket";

declare var Faye: any;

@Injectable({
  providedIn: 'root'
})
export class CpsSocketService {

  constructor() {}

  connect(): CpsConnectedSocket {
    const client = new Faye.Client(environment.cpsSocketUrl);
    return new CpsConnectedSocket(client);
  }
}
