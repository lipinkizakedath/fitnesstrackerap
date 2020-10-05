import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged = new Subject<boolean>();

  constructor(private snakbar: MatSnackBar) { }

  showSnakbar(message: string, action: any, duration: number) {
    this.snakbar.open(message, action, { duration: duration });
  }

}
