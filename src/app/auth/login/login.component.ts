import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { UiService } from 'src/app/Services/ui.service';
import { map } from 'rxjs/operators';
import * as fromApp from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  loadingSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authSerive: AuthService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>) { }

  ngOnInit(): void {
    this.loginFormAction();
  }

  loginFormAction() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authSerive.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // ngOnDestroy() {
  //   this.loadingSubscription.unsubscribe();
  // }

}
