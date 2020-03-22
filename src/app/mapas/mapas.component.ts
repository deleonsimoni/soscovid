import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

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
  contents: any = {};

  categoriaSelecionada = 1;
  user: any;
  @ViewChild('categoriaSeta', { static: false }) categoriaSeta: ElementRef;
  @ViewChild('modalTemplate', { static: false }) modalTemplateRef: TemplateRef<any>;


  public categorias = [
    { id: 1, name: 'Abecedários', icon: 'abcedario.png' },
    { id: 2, name: 'Entrevistas', icon: 'entrevista.png' },
    { id: 3, name: 'Podcasts', icon: 'poscast.png' },
    { id: 4, name: 'Produção Acadêmica', icon: 'prodAcademica.png' },
    { id: 5, name: 'Políticas', icon: 'politicas.png' },
    { id: 6, name: 'Escolas', icon: 'escolas.png' },
    { id: 7, name: 'Cursos', icon: 'cursos.png' },
    { id: 8, name: 'Cineclubes', icon: 'cineclub.png' }

  ];

  location: Location = {
    lat: 10.2989969,
    lng: -78.2803034,
    zoom: 4
  };

  constructor(public mapsApiLoader: MapsAPILoader,
    private modalService: BsModalService,
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private embedService: EmbedVideoService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.carregando = true;
    this.http.get("api/points/" + this.categoriaSelecionada).subscribe((res: any) => {
      this.carregando = false;
      this.points = res;
    }, err => {
      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante. Tente novamente mais tarde', 'Erro: ');
    });
  }


  selectMarker(position: any) {
    this.point = position;

    this.http.get("api/points/" + this.categoriaSelecionada + "/" + position._id).subscribe((res: any) => {
      this.contents = res;

      this.contents.forEach(element => {
        if (element.linkVideo) {

          element.ytEmbed = this._sanitizer.bypassSecurityTrustResourceUrl(element.linkVideo.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/"));

        } else if (element.linkAudio) {

          element.linkAudio = this._sanitizer.bypassSecurityTrustResourceUrl(element.linkAudio);

        }
      });


      this.modalRef = this.modalService.show(this.modalTemplateRef, Object.assign({}, { class: 'modal-edit' }));

    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });

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

  mudarCategoria(id) {
    this.carregando = true;
    this.categoriaSelecionada = id;
    this.http.get("api/points/" + this.categoriaSelecionada).subscribe((res: any) => {
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
    let icone = this.categorias.filter(element => element.id == categoria)[0].icon;
    return '../../assets/icones/' + icone;
  }

  styles = [

  ]
}