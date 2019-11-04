import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, UserCompany} from "../api";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() title = '';

  public user: UserCompany = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getUserCompanyGet().subscribe((result) => this.user = result[0]);
  }

  protected navigateToHome() {
    this.router.navigate(['/']);
  }

  public logout() {
    this.auth.logoutPost().subscribe(() => this.navigateToHome(), () => this.navigateToHome(), () => this.navigateToHome());
  }

}
