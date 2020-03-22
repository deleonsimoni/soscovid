import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser';


declare var google: any;


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('abecedarioModal', { static: false }) abecedarioRef: TemplateRef<any>;
  @ViewChild('producaoAcademicaModal', { static: false }) producaoAcademicaRef: TemplateRef<any>;
  @ViewChild('audioModal', { static: false }) audioRef: TemplateRef<any>;
  @ViewChild('entrevistaModal', { static: false }) entrevistaRef: TemplateRef<any>;
  @ViewChild('politicasModal', { static: false }) politicasRef: TemplateRef<any>;
  @ViewChild('escolasModal', { static: false }) escolasRef: TemplateRef<any>;
  @ViewChild('cursosModal', { static: false }) cursosRef: TemplateRef<any>;
  @ViewChild('cineclubesmodal', { static: false }) cinecluberef: TemplateRef<any>;

  geocoder: any;
  modalRef: BsModalRef;

  public submissionForm: FormGroup;
  public carregando = false;
  public carregandoMapa = false;

  public abecedario: any = {};
  public producaoAcademica: any = {};
  public audio: any = {};
  public entrevista: any = {};
  public politica: any = {};
  public escola: any = {};
  public curso: any = {};
  public cineclube: any = {};

  public point: any = {};
  public points: any = {};
  public contents: any = {};
  public address;
  public categoria = 0;
  public links: any[] = [{
    nome: '',
    link: ''
  }];
  public user: any;

  public locationMap = {
    lat: 19.2286289,
    lng: -97.4840638,
    zoom: 5
  };

  public categorias = [
    { id: 1, name: 'Abecedários', icon: 'abecedario.png' },
    { id: 2, name: 'Entrevistas' },
    { id: 3, name: 'Audios' },
    { id: 4, name: 'Produção Acadêmica' },
    { id: 5, name: 'Políticas' },
    { id: 6, name: 'Escolas' },
    { id: 7, name: 'Cursos' },
    { id: 8, name: 'Cineclubes' }
  ];

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private http: HttpClient,
    private authService: AuthService,
    private embedService: EmbedVideoService,
    private sanitizer: DomSanitizer,

  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.authService.refresh().subscribe((res: any) => {
      this.user = res.user;
      this.carregando = false;
    });
  }

  pesquisaPorCategoria() {
    this.http.get("api/auth/" + this.categoria).subscribe((res: any) => {
      this.points = res;
    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  mudarCategoria() {
    this.points = {};
    this.abecedario = {};
    this.audio = {};
    this.entrevista = {};
    this.producaoAcademica = {};
    this.politica = {};
    this.escola = {};
    this.curso = {};
    this.cineclube = {};

    this.contents = {};

    this.pesquisaPorCategoria();
  }

  openModal() {
    if (!this.point.nome) {
      this.toastr.error('Preencha o nome do local para prosseguir.', 'Atenção: ');
      return;
    }
    this.links = [{
      nome: '',
      link: ''
    }];
    switch (Number(this.categoria)) {
      case 1:
        this.abecedario = {};
        this.modalRef = this.modalService.show(this.abecedarioRef);

        break;
      case 2:
        this.entrevista = {};
        this.modalRef = this.modalService.show(this.entrevistaRef);

        break;
      case 3:
        this.audio = {};
        this.modalRef = this.modalService.show(this.audioRef);

        break;
      case 4:
        this.producaoAcademica = {};
        this.modalRef = this.modalService.show(this.producaoAcademicaRef);

        break;

      case 5:
        this.politica = {};
        this.modalRef = this.modalService.show(this.politicasRef);

        break;

      case 6:
        this.escola = {};
        this.modalRef = this.modalService.show(this.escolasRef);

        break;

      case 7:
        this.curso = {};
        this.modalRef = this.modalService.show(this.cursosRef);

        break;

      case 8:
        this.cineclube = {};
        this.modalRef = this.modalService.show(this.cinecluberef);

        break;

      default:
        break;
    }

  }


  getContentsPoint() {
    this.http.get("api/points/" + this.categoria).subscribe((res: any) => {
      this.points = res;
    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  addContent() {
    this.carregando = true;

    switch (Number(this.categoria)) {
      case 1:
        this.point.content = this.abecedario;

        break;
      case 2:
        this.point.content = this.entrevista;

        break;
      case 3:
        this.point.content = this.audio;

        break;
      case 4:
        this.point.content = this.producaoAcademica;

        break;

      case 5:
        this.point.content = this.politica;

        break;

      case 6:
        this.point.content = this.escola;

        break;

      case 7:
        this.point.content = this.curso;

        break;

      case 8:
        this.point.content = this.cineclube;

        break;

      default:
        break;
    }

    this.point.content.links = this.links;
    this.links = [{ nome: '', link: '' }];

    if (this.point.content._id) {
      this.updateContent(this.point)
    } else {
      this.insertContent(this.point)
    }

  }

  addLinkExtraForm() {
    this.links.push({
      nome: '',
      link: ''
    });
  }

  removeLinkExtraForm(i) {
    this.links.splice(i, 1);
  }

  updateContent(point) {
    this.http.put(`api/points/` + this.categoria, point).subscribe((res: any) => {
      this.carregando = false;

      if (res && res.temErro) {
        this.toastr.error(res.mensagem, 'Erro: ');
      } else {
        this.modalRef.hide();
        this.toastr.success(res.message, 'Sucesso');
        this.abecedario = {};
        this.selectMarker(this.point);
        this.getContentsPoint();

      }
    }, err => {

      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  insertContent(point) {
    this.http.post(`api/points/` + this.categoria, point).subscribe((res: any) => {
      this.carregando = false;

      if (res && res.temErro) {
        this.toastr.error(res.mensagem, 'Erro: ');
      } else {
        this.modalRef.hide();
        this.toastr.success(res.message, 'Sucesso');
        this.abecedario = {};
        this.point._id = res.point._id;
        this.selectMarker(this.point);
        this.getContentsPoint();

      }
    }, err => {

      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }


  placeMarker(position: any) {
    this.point = {};
    this.contents = {};
    this.point.lat = position.coords.lat;
    this.point.lng = position.coords.lng;
  }

  selectMarker(position: any) {
    this.point = position;

    this.http.get("api/points/" + this.categoria + "/" + position._id).subscribe((res: any) => {
      this.contents = res;

      this.contents.forEach(element => {
        if (element.linkVideo) {
          element.ytEmbed = this.embedService.embed(element.linkVideo, {
            attr: { width: 400, height: 315, frameborder: 0 }
          });
        } else if (element.linkAudio) {

          //element.linkAudio = this.sanitizer.bypassSecurityTrustHtml(element.linkAudio);

        }
      });

    }, err => {
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });

  }

  findLocation() {

    if (!this.address) {

      this.toastr.error('Digite o local que deseja buscar.', 'Atenção: ');

    } else {

      this.carregandoMapa = true;
      if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
      this.geocoder.geocode({
        'address': this.address
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          for (var i = 0; i < results[0].address_components.length; i++) {
            let types = results[0].address_components[i].types;
          }

          this.carregandoMapa = false;
          if (results[0].geometry.location) {
            this.point.lat = results[0].geometry.location.lat();
            this.point.lng = results[0].geometry.location.lng();
            this.locationMap.lat = results[0].geometry.location.lat();
            this.locationMap.lng = results[0].geometry.location.lng();
            this.locationMap.zoom = 10;
          }
        } else {
          this.carregandoMapa = false;
          this.toastr.error('endereço não localizado no Google Maps.', 'Atenção: ');

        }
      });

    }
  }

  reciverDelete(contentId) {
    this.carregando = true;

    this.http.delete(`api/points/` + this.categoria + "/" + contentId).subscribe((res: any) => {
      this.carregando = false;

      if (res && res.temErro) {
        this.toastr.error(res.mensagem, 'Erro: ');
      } else {
        this.toastr.success('Item excluído com sucesso', 'Sucesso');
        this.abecedario = {};
        this.selectMarker(this.point);

      }
    }, err => {

      this.carregando = false;
      this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
    });
  }

  reciverAlter(content) {


    switch (Number(this.categoria)) {
      case 1:
        this.abecedario = content;
        this.links = this.abecedario.links;
        this.modalRef = this.modalService.show(this.abecedarioRef);

        break;
      case 2:
        this.entrevista = content;
        this.links = this.entrevista.links;

        this.modalRef = this.modalService.show(this.entrevistaRef);

        break;
      case 3:
        this.audio = content;
        this.links = this.audio.links;

        this.modalRef = this.modalService.show(this.audioRef);

        break;
      case 4:
        this.producaoAcademica = content;
        this.links = this.producaoAcademica.links;

        this.modalRef = this.modalService.show(this.producaoAcademicaRef);
        break;

      case 5:
        this.politica = content;
        this.links = this.politica.links;

        this.modalRef = this.modalService.show(this.politica);
        break;

      case 6:
        this.escola = content;
        this.links = this.escola.links;

        this.modalRef = this.modalService.show(this.escolasRef);
        break;

      case 7:
        this.curso = content;
        this.links = this.curso.links;

        this.modalRef = this.modalService.show(this.cursosRef);
        break;

      case 8:
        this.cineclube = content;
        this.links = this.cineclube.links;

        this.modalRef = this.modalService.show(this.cinecluberef);
        break;

      default:
        break;
    }



    /*this.galeria = depoimento;

    this.modalRef = this.modalService.show(this.templateRef);*/
  }

  /*
    addGaleria() {
      if (!this.galeria.titulo) {
        this.toastr.error('Escreva o nome do abecedário', 'Atenção');
        return;
      }
  
      if (this.id) {
        const formData: FormData = new FormData();
  
        let aux = {
          galeria: this.galeria,
          id: this.id
        }
  
        if (this.galeria.id) {
          this.reciverDelete(this.galeria.id);
        }
  
        formData.append('galeria', JSON.stringify(aux));
  
        this.http.post(`api/user/upload-galeria/`, formData).subscribe((res: any) => {
          this.carregando = false;
  
          if (res && res.temErro) {
            this.toastr.error(res.mensagem, 'Erro: ');
          } else {
            this.modalRef.hide();
            if (this.galeria.id > 1) {
              this.toastr.success('Arquivo alterado com sucesso', 'Sucesso');
              this.modalRef.hide();
            } else {
              this.toastr.success('Depoimento registrado com sucesso', 'Sucesso');
            }
            this.galeria = {};
  
  
            this.pesquisaPorCategoria();
          }
        }, err => {
  
          this.carregando = false;
          this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ');
        });
      } else {
        this.modalRef.hide();
        this.submissionForm.patchValue({
          galeria: []
        });
        this.submissionForm.get('galeria').value.push(this.galeria);
        this.galeria = {};
      }
    }
  
    removerID(id, arr) {
      return arr.filter(function (obj) {
        return obj._id != id;
      });
    }
  
    reciverDelete(depoimentoId) {
      if (!this.id) {
        this.submissionForm.get('galeria').value.push(this.removerID(depoimentoId, this.submissionForm.get('galeria').value));
      } else {
        this.http.delete("api/user/deleteDepoimento/" + depoimentoId).subscribe((res: any) => {
          if (res && res.temErro) {
            this.toastr.error(res.mensagem, 'Erro: ');
          } else {
            this.pesquisaPorCategoria();
            if (this.galeria.id > 1) {
              this.toastr.success('Arquivo removido com sucesso', 'Sucesso');
            }
          }
        }, err => {
          this.toastr.error('Servidor momentaneamente inoperante.', 'Erro: ' + err);
        });
        console.log('Delecao', depoimentoId);
      }
    }
  
    reciverAlter(depoimento) {
      this.galeria = depoimento;
  
      this.modalRef = this.modalService.show(this.templateRef);
    }
  
    mudarCategoria() {
      this.pesquisaPorCategoria();
  
      this.id = null;
  
      this.submissionForm.patchValue({
        nomeInstituicao: "",
        galeria: this.galeria,
        lat: null,
        lng: null
      });
    }
  
  
  
    populaListaDepoimento() {
      console.log(this.galleries.find(element => element._id == this.id).galeria);
      this.submissionForm.get('galeria').setValue(
        this.galleries.find(element => element._id == this.id
        ).galeria);
  
      this.galleries.forEach(element => {
        if (element.url) {
          element.ytEmbed = this.embedService.embed(element.url, {
            attr: { width: 400, height: 315, frameborder: 0 }
          });
        }
      });
  
    }*/
}