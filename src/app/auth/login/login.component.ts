import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalNormasComponent } from '../../modal/modal-normas/modal-normas.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {

  public registerForm: FormGroup;
  public openTerms = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private dialog: MatDialog,

  ) {


  }

  email: string;
  password: string;
  carregando = false;
  isLogin = true;
  register: any = {};
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  login(): void {

    this.carregando = false;

    if (!this.email) {
      this.toastr.error('Preencha o campo Email', 'Atenção: ');
      return;
    }

    if (!this.password) {
      this.toastr.error('Preencha o campo Senha', 'Atenção: ');
      return;
    }

    this.authService.login(this.email.toLocaleLowerCase(), this.password)
      .subscribe(data => {
        this.carregando = false;
        this.authService.setUser(data.user, data.token);
        window.location.assign("/mapas");
      }, err => {
        if (err.status === 401) {
          this.carregando = false;
          this.toastr.error('Email ou senha inválidos', 'Erro: ');
        }
      });

  }

  public openRules(): void {

    const dialogRef = this.dialog.open(ModalNormasComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.openTerms = true;
    });
  }

  registrar(): void {



    if (!this.register.fullname || !this.register.email || !this.register.email2 || !this.register.password || !this.register.password2) {
      this.toastr.error('Preencha todos os campos do formulário', 'Atenção: ');
      return;
    }

    if (this.register.email && this.register.email2 && this.register.email != this.register.email2) {
      this.toastr.error('Emails preenchidos não conferem', 'Atenção: ');
      return;
    }

    if (this.register.password && this.register.password2 && this.register.password != this.register.password2) {
      this.toastr.error('Senhas preenchidas não conferem', 'Atenção: ');
      return;
    }

    if (!this.regexEmail.test(this.register.email)) {
      this.toastr.error('Email inválido', 'Atenção: ');
      return;
    }

    if (!this.openTerms) {
      this.toastr.error('Leia os termos de uso para prosseguir', 'Atenção: ');
      return;
    }

    if (!this.register.icAcceptTerms) {
      this.toastr.error('Aceite os termos de uso para prosseguir', 'Atenção: ');
      return;
    }


    //this.carregando = true;

    this.authService.register(this.register)
      .subscribe(data => {
        this.carregando = false;

        this.authService.setUser(data.user, data.token);
        location.reload();
      }, err => {
        this.carregando = false;

        this.toastr.error('Servidor momentaneamente inoperante', 'Erro: ');
      });

  }

}
