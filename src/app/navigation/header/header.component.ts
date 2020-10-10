import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLoggout() {
    this.authService.logout();
  }


  onToggleSidenav(): void {
    this.sideNavToggle.emit();
  }

}
