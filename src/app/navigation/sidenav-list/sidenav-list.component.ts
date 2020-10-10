import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLoggout() {
    this.onClose();
    this.authService.logout();
  }


  onClose() {
    this.closeSidenav.emit();
  }

}
