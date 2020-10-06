import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { WeclomeComponent } from './weclome/weclome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './Services/Auth.service';
import { TrainingService } from './Services/Training.service';
import { environment } from '../environments/environment';
import { UiService } from './Services/ui.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { appReducer } from '../app/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WeclomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ui: appReducer})

  ],
  providers: [
    AuthService,
    TrainingService,
    UiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
