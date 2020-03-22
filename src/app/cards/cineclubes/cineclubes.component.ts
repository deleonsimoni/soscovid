import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cineclubes',
  templateUrl: './cineclubes.component.html',
  styleUrls: ['./cineclubes.component.scss']
})
export class CineclubesComponent implements OnInit {

  @Input() contents: any;
  @Input() isAdmin: boolean;
  @Output() remover = new EventEmitter();
  @Output() alterar = new EventEmitter();

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  }

  delete(idCineclub) {
    this.remover.emit(idCineclub);
  }
  update(cineclub) {
    this.alterar.emit(cineclub);
  }

  sanitizeURL(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
