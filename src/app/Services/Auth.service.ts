import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './Training.service';
import { UiService } from './ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private authSerive: AngularFireAuth,
    private trainingService: TrainingService,
    private UiSEervice: UiService,
    private store: Store<fromRoot.State>) { }

  initAuthLister() {
    this.authSerive.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubsriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    }
    );
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.authSerive.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.UiSEervice.showSnakbar('Registration successful!', null, 3000);
      }).catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.UiSEervice.showSnakbar('Registration failed', null, 3000);
      });
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.authSerive.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        this.store.dispatch(new UI.StopLoading());
        this.UiSEervice.showSnakbar('Login successful!', null, 3000);
      }
    ).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.router.navigate(['/login']);
      this.UiSEervice.showSnakbar(error.message, null, 3000);
      this.UiSEervice.loadingStateChanged.next(false);
    });
  }

  logout(): void {
    this.authSerive.auth.signOut();
    this.UiSEervice.showSnakbar('Logged-out!', null, 3000);
  }


}
