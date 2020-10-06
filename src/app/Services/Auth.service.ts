import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './Training.service';
import { UiService } from './ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedOrNot = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private authSerive: AngularFireAuth,
    private trainingService: TrainingService,
    private UiSEervice: UiService,
    private store: Store<{ ui: fromApp.State }>) { }

  initAuthLister() {
    this.authSerive.authState.subscribe(user => {
      if (user) {
        this.isAuthenticatedOrNot = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubsriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticatedOrNot = false;
      }
    }
    );
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch({ type: 'START_LOADING' });
    this.authSerive.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.UiSEervice.showSnakbar('Registration successful!', null, 3000);
      }).catch(error => { this.UiSEervice.showSnakbar('Registration failed', null, 3000); });
  }

  login(authData: AuthData): void {
    this.store.dispatch({ type: 'START_LOADING' });
    this.authSerive.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.UiSEervice.showSnakbar('Login successful!', null, 3000);
      }
    ).catch(error => {
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.router.navigate(['/login']);
      this.UiSEervice.showSnakbar(error.message, null, 3000);
      this.UiSEervice.loadingStateChanged.next(false);
    });
  }

  logout(): void {
    this.authSerive.auth.signOut();
    this.UiSEervice.showSnakbar('Logged-out!', null, 3000);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedOrNot;
  }


}
