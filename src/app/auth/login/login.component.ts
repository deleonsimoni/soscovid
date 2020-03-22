import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent {

  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {

    this.createForm();

  }

  email: string;
  password: string;
  carregando: false;
  isLogin = true;
  register: any = {};
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public createForm() {
    this.registerForm = this.builder.group({
      fullname: [null],
      membros: this.builder.group({
        nome: [null],
        parentesco: [null],
        idade: [null]
      }),
      email: [null],
      dateBirth: [null],
      address: this.builder.group({
        street: [null],
        complement: [null],
        num: [null],
        zip: [null],
        city: [null],
        district: [null],
        country: [null],
        state: [null]
      }),
      lat: [null],
      lng: [null],
      phones: this.builder.group({
        cellphone: [null],
        telephone: [null]
      }),
      social: this.builder.group({
        facebook: [null],
        instagran: [null]
      }),
      trabalho: [null],
      necessidades: this.builder.array([
        this.createNecessityField()
      ]),
      obs: [null]
    });
  }

  private createNecessityField() {
    return this.builder.group({
      produto: [null],
      qtd: [null]
    });
  }

  login(): void {
    if (!this.email || !this.password) {
      alert('Preencha corretamente os campos de acesso.');
    } else {
      this.authService.login(this.email, this.password)
        .subscribe(data => {
          this.authService.setUser(data.user, data.token);
          window.location.assign("/");
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
        });
    }
  }

  registrar(): void {

    if (!this.register.icAcceptTerms) {
      this.toastr.error('Aceite os termos de uso para prosseguir', 'Atenção: ');
      return;
    }

    if (!this.register.fullname || !this.register.email || !this.register.email2 || !this.register.document || !this.register.password || !this.register.password2) {
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

    this.authService.register(this.register)
      .subscribe(data => {
        this.authService.setUser(data.user, data.token);
        window.location.assign("/");
      }, err => {
        this.toastr.error('Servidor momentaneamente inoperante', 'Erro: ');
      });

  }

}
