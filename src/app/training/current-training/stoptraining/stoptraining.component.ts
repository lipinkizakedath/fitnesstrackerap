import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stoptraining',
  templateUrl: './stoptraining.component.html',
  styleUrls: ['./stoptraining.component.css']
})
export class StoptrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passsedData: any) { }

  ngOnInit(): void {
  }

}
