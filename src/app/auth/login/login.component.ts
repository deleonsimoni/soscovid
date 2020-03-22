import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  email: string;
  password: string;
  carregando: false;
  isLogin = true;
  register: any = {};
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
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
