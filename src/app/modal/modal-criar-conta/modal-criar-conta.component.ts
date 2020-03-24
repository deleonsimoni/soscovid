import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-criar-conta',
  templateUrl: './modal-criar-conta.component.html',
  styleUrls: ['./modal-criar-conta.component.scss']
})
export class ModalCriarContaComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalCriarContaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }

}
