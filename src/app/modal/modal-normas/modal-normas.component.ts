import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-normas',
  templateUrl: './modal-normas.component.html',
  styleUrls: ['./modal-normas.component.scss']
})
export class ModalNormasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalNormasComponent>,
  ) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

}
