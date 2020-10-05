import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { UiService } from 'src/app/Services/ui.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder, private authSerive: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loginFormAction();
  }

  loginFormAction() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(uiService => this.isLoading = uiService);
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

  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

}
