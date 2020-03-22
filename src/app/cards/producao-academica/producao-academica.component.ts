import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-producao-academica',
  templateUrl: './producao-academica.component.html',
  styleUrls: ['./producao-academica.component.scss']
})
export class ProducaoAcademicaComponent implements OnInit {

  @Input() contents: any;
  @Input() isAdmin: boolean;
  @Output() remover = new EventEmitter();
  @Output() alterar = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
    private embedService: EmbedVideoService,
  ) { }

  ngOnInit() {

    this.contents.forEach(element => {
      if (element.url) {
        element.ytEmbed = this.embedService.embed(element.url, {
          attr: { width: 400, height: 315, frameborder: 0 }
        });
      }
    });

  }


  delete(idabecedario) {
    this.remover.emit(idabecedario);
  }
  update(abecedario) {
    this.alterar.emit(abecedario);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
