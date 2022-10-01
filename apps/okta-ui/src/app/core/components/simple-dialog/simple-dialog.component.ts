import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'okta-ui-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss'],
})
export class SimpleDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData
  ) {}

  ngOnInit(): void {}
}

export interface SimpleDialogData {
  title: string;
  content: string;
}
