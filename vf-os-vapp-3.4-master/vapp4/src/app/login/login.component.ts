import { Component, OnInit } from '@angular/core';
import {AuthService} from "../api";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {AuthGuard} from "../auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public formDisabled: boolean = false;
  public errorMsg: string = '';

  constructor(
    private authGuard: AuthGuard,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    // redirect automatically if already logged in
    this.authGuard.isLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        this.navigateToHome();
      }
    });
  }

  protected disableForm() {
    this.formDisabled = true;
  }

  protected enableForm() {
    this.formDisabled = false;
  }

  protected navigateToHome() {
    this.router.navigate(['/home']);
  }

  public login() {
    this.disableForm();

    this.errorMsg = '';

    this.authService.loginPost({
      email: this.email,
      password: this.password
    }).subscribe((result) => {
      if (result.message === 'Login with sucess') {
        this.navigateToHome();
      } else {
        this.errorMsg = 'Invalid login credentials.';
      }
      this.enableForm();
    }, (error) => {
      this.errorMsg = 'Undefined error.';
      this.enableForm();
    });
  }

}
