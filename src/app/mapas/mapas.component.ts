import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ModalCriarContaComponent } from '../modal/modal-criar-conta/modal-criar-conta.component';
import { EmbedVideoService } from 'ngx-embed-video';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalConfirmationComponent } from '../modal/modal-confirmation/modal-confirmation.component';
import { ModalWaitGpsComponent } from '../modal/modal-wait-gps/modal-wait-gps.component';

import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

declare var google: any;

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  modalRef: BsModalRef;
  carregando = false;
  isCategoriaAberta = false;
  geocoder: any;
  galleries: any;
  gallerieSelect: any;
  points: any = [];
  point: any = {};
  help: any = {};
  userContent: any = {};
  necessidades: any = [{ produto: "" }];
  produtoSelecionado = 1;
  token: any;
  isUserHelp = false;
  public preCategorias = [
    { id: 1, name: 'Alimentos', icon: 'abcedario.png' },
    { id: 2, name: 'Higiene', icon: 'entrevista.png' },
    { id: 3, name: 'Medicamentos', icon: 'poscast.png' }
  ];
  preCategoriaSelecionada;

  categoriaSelecionada: any;
  selectedHelp: any;
  user: any;
  lat: any;
  lng: any;
  zoom = 16;
  @ViewChild('categoriaSeta', { static: false }) categoriaSeta: ElementRef;
  @ViewChild('modalTemplate', { static: false }) modalTemplateRef: TemplateRef<any>;
  @ViewChild('callHelp', { static: false }) callHelpModal: TemplateRef<any>;

  public categorias: any = [];
  modalWaitGPS: any;
  constructor(public mapsApiLoader: MapsAPILoader,
    private modalService: BsModalService,
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private embedService: EmbedVideoService,
    private _sanitizer: DomSanitizer,
    @Inject('BASE_API_URL') private baseUrl: string,
    private dialog: MatDialog,

  ) {

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.carregarPontos();
      });
    }
  }

  ngOnInit() {
    this.token = this.authService.getToken();
    this.user = this.authService.getDecodedAccessToken(this.token);
  }

  carregarPontos() {
    console.log(this.lat, this.lng)
    this.carregando = true;
    this.categorias = [];
    this.http.get(`${this.baseUrl}/points/getPointsNear/` + this.lat + '/' + this.lng).subscribe((res: any) => {
      this.carregando = false;
      this.points = [];
      res.forEach(element => {
        if (element.help.length > 0) {
          this.points.push(element);
        } else {
          this.toastr.info('Não há ninguém precisando de algo nas proximidades', 'Atenção');
        }
      });

    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });
  }


  selectMarker(help) {

    this.selectedHelp = help;
    this.isUserHelp = false;
    let helpValid;
    if (help.help[0]) {
      helpValid = help.help[0];
    } else {
      helpValid = help.help
    }

    if (!this.token || this.token == 'null') {
      const dialogRef = this.dialog.open(ModalCriarContaComponent, {
        data: {},
      });
    } else {

      this.necessidades = [];

      if (helpValid.userHelp.length && helpValid.userHelp.some(element => element.userId == this.user._id)) {
        this.isUserHelp = true;
      }

      this.http.get(`${this.baseUrl}/points/helpUserId/` + help._id).subscribe((res: any) => {
        this.userContent = res;

        this.modalRef = this.modalService.show(this.modalTemplateRef, Object.assign({}, { class: 'modal-edit' }));

      }, err => {
        this.toastr.error('Erro ao recuperar dados do usuario.', 'Erro: ');
      });


      helpValid.necessidades.forEach(idNecessidade => {
        this.http.get(`${this.baseUrl}/points/getNecessidades/` + idNecessidade).subscribe((res: any) => {
          this.necessidades.push(res);
        }, err => {
          this.toastr.error('Erro ao recuperar produtos.', 'Erro: ');
        });
      });

    }
  }

  insertCallHelp() {

    if (!this.token) {
      const dialogRef = this.dialog.open(ModalCriarContaComponent, {
        data: {},
      });
      return
    }

    for (let index = 0; index < this.necessidades.length; index++) {
      if (!this.necessidades[index].categoria || !this.necessidades[index].produto) {
        this.toastr.warning('Preencha corretamente os campos de suprimentos', 'Atenção: ');

        return;
      }
    }


    this.carregando = true;

    let help = {
      location: {
        coordinates: [this.lng, this.lat]
      },
      necessidades: this.necessidades,
      obs: this.help.obs ? this.help.obs : ''
    }

    this.http.post(`${this.baseUrl}/user/callHelp`, help).subscribe((res: any) => {
      this.carregando = false;
      this.necessidades = [];

      if (res && res.temErro) {
        this.toastr.error(res.mensagem, 'Erro: ');
      } else {
        this.modalRef.hide();
        this.toastr.success(res.message, 'Sucesso');
        this.help = {};
        this.carregarPontos();
      }
    }, err => {

      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  modalSOS() {
    this.necessidades = [{ produto: "" }];
    if (!this.token || this.token == 'null') {
      const dialogRef = this.dialog.open(ModalCriarContaComponent, {
        data: {},
      });
    } else {
      this.modalRef = this.modalService.show(this.callHelpModal, Object.assign({}, { class: 'modal-edit' }));
    }
  }

  exibirCategorias() {
    if (this.isCategoriaAberta) {
      this.categoriaSeta.nativeElement.className = 'fa fa-chevron-down pull-right';
      this.isCategoriaAberta = false;
    } else {
      this.categoriaSeta.nativeElement.className = 'fa fa-chevron-up pull-right';
      this.isCategoriaAberta = true;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  mudarCategoria(produto) {
    this.carregando = true;
    this.produtoSelecionado = produto;
    this.http.get(`${this.baseUrl}/points/getByProduto/` + this.produtoSelecionado).subscribe((res: any) => {
      this.carregando = false;
      this.points = [];
      res.forEach(element => {
        if (element.help.length > 0) {
          this.points.push(element);
        }
      });


      if (this.points.length == 0) {
        this.toastr.error('Não há mais ninguém precisando deste produto', 'Poxa: ');
      }

    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });
  }

  getPointsByPreCategoria(preCategoria) {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/points/getPointsByPreCategoria/` + preCategoria + '/' + this.lat + '/' + this.lng).subscribe((res: any) => {
      this.carregando = false;

      /*res.forEach(element => {
        if (element.help.length > 0) {
          this.points.push(element);
        }
      });*/


      if (res.length == 0) {
        this.toastr.error('Não há mais ninguém próximo precisando deste tipo de ajuda', 'Poxa: ');
      } else {
        this.points = res;
        this.preCategoriaSelecionada = preCategoria;
        this.categoriaSeta.nativeElement.className = 'fa fa-chevron-down pull-right';
        this.isCategoriaAberta = false;
      }

    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });
  }

  mudarPreCategoria(id) {
    if (this.preCategoriaSelecionada != id) {
      this.carregando = true;
      this.preCategoriaSelecionada = id;
      this.http.get(`${this.baseUrl}/points/getProdutosFromCategoria/` + id).subscribe((res: any) => {
        this.carregando = false;
        this.categorias = res;
        if (!res || !res.length) {
          this.points = [];
        }

      }, err => {
        this.carregando = false;
        this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
      });
    }
  }

  getNameCategoria(id) {
    return this.categorias.filter(element => element.id == id)[0].name;
  }


  getNomeCategoria(categoria) {
    return this.categorias.filter(element => element.id == categoria)[0].name;
  }

  getIconCategoria(categoria) {

    switch (Number(categoria)) {
      case 1:
        return './assets/icones/' + 'ico-alimento.png';
      case 2:
        return './assets/icones/' + 'ico-higiene.png';
      case 3:
        return './assets/icones/' + 'ico-remedio.png';
      default:
        return './assets/icones/' + 'entrevista.png';
    }

  }

  confirmHelp() {

    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Sua colaboração é muito importante. Ao confirmar sua ajuda, o sistema entenderá que essa pessoa terá colaboração e priorizará outras na busca do mapa, por favor confirme só estando realmente disposto a ajudar.',
        buttonText: {
          ok: 'Quero ajudar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.callConfirmHelp();
      }
    });
  }

  callConfirmHelp() {
    this.carregando = true;
    let id = this.selectedHelp.help[0] ? this.selectedHelp.help[0]._id : this.selectedHelp.help._id;

    this.http.post(`${this.baseUrl}/points/confirmHelp/` + id, {}).subscribe((res: any) => {
      this.carregando = false;
      this.isUserHelp = true;

    }, err => {
      this.carregando = false;
      this.toastr.error('Erro ao confirmar ajuda, por favor tente mais tarde', 'Erro: ');
    });
  }

  addHelpForm() {
    this.necessidades.push({
      nome: '',
      link: ''
    });
  }
  removeHelpForm(i) {
    this.necessidades.splice(i, 1);
  }

  styles = [

  ]
}