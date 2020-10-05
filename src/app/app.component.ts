import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authSerive: AuthService) { }

  ngOnInit(): void {
    this.authSerive.initAuthLister();
  }



}
