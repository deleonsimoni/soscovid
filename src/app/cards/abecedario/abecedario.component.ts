import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-abecedario',
  templateUrl: './abecedario.component.html',
  styleUrls: ['./abecedario.component.scss']
})
export class AbecedarioComponent implements OnInit {

  @Input() contents: any;
  @Input() isAdmin: boolean;
  @Output() remover = new EventEmitter();
  @Output() alterar = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

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
