import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authSerive: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.loginFormAction();
  }

  loginFormAction(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authSerive.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }


}
