import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

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
  points: any = {};
  point: any = {};
  help: any = {};
  userContent: any = {};
  necessidades: any = [{ produto: "" }];
  produtoSelecionado = 1;
  user: any;
  lat: any;
  lng: any;
  @ViewChild('categoriaSeta', { static: false }) categoriaSeta: ElementRef;
  @ViewChild('modalTemplate', { static: false }) modalTemplateRef: TemplateRef<any>;
  @ViewChild('callHelp', { static: false }) callHelpModal: TemplateRef<any>;

  public categorias: any = [];

  location: Location = {
    lat: this.lat,
    lng: this.lng,
    zoom: 3
  };

  constructor(public mapsApiLoader: MapsAPILoader,
    private modalService: BsModalService,
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private embedService: EmbedVideoService,
    private _sanitizer: DomSanitizer,
    @Inject('BASE_API_URL') private baseUrl: string,

  ) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.location.lng = this.lng;
        this.location.lng = this.lat;
      });
    }
  }

  ngOnInit() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/points`).subscribe((res: any) => {
      this.carregando = false;
      this.points = res;

      res.forEach(help => {
        help.help.necessidades.forEach(necessidade => {
          this.categorias.push(necessidade);
        });
      });

    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });

  }


  selectMarker(helpUserId) {

    this.http.get("api/points/helpUserId/" + helpUserId).subscribe((res: any) => {
      this.userContent = res;

      this.modalRef = this.modalService.show(this.modalTemplateRef, Object.assign({}, { class: 'modal-edit' }));

    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });

  }

  canHelp() {

    this.carregando = true;

    let help = {
      lat: this.lat,
      lng: this.lng,
      necessidades: this.necessidades,
      obs: this.help.obs
    }

    help.necessidades.forEach(element => {
      element.icon = "abcedario.png"
    });

    this.http.post(`${this.baseUrl}/user/callHelp`, help).subscribe((res: any) => {
      this.carregando = false;

      if (res && res.temErro) {
        this.toastr.error(res.mensagem, 'Erro: ');
      } else {
        this.modalRef.hide();
        this.toastr.success(res.message, 'Sucesso');
        this.necessidades = [{ produto: "" }];
        this.help = {};
      }
    }, err => {

      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  modalSOS() {
    this.modalRef = this.modalService.show(this.callHelpModal, Object.assign({}, { class: 'modal-edit' }));
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
    this.http.get("api/points/getByProduto/" + this.produtoSelecionado).subscribe((res: any) => {
      this.carregando = false;
      this.points = res;
    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });
  }

  getNameCategoria(id) {
    return this.categorias.filter(element => element.id == id)[0].name;
  }

  download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
  }

  getNomeCategoria(categoria) {
    return this.categorias.filter(element => element.id == categoria)[0].name;
  }

  getIconCategoria(categoria) {
    //let icone = this.categorias.filter(element => element.produto == categoria)[0].icon;
    return '../../assets/icones/' + 'abcedario.png';
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