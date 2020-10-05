import { NgModule } from '@angular/core';
import { WeclomeComponent } from './weclome/weclome.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';

const routes: Routes = [

  { path: '', component: WeclomeComponent },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canLoad: [ AuthGuard ] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
