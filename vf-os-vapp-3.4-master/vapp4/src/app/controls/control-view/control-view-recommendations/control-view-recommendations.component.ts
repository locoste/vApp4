import { Component, OnInit } from '@angular/core';

import {ControllersService} from "../../../api"

@Component({
  selector: 'app-control-view-recommendations',
  templateUrl: './control-view-recommendations.component.html',
  styleUrls: ['./control-view-recommendations.component.scss']
})
export class ControlViewRecommendationsComponent implements OnInit {

  constructor(private controllersService: ControllersService) {  }

  ngOnInit() {
  }

  displayAction(action: string){
  	this.controllersService.getFileRecommendationGet(''+action).subscribe(result => {
  		//console.log(decodeURIComponent(result))
  		let pdfWindow = window.open("")
		pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + result+"'></iframe>")
  		})
  	}
}
