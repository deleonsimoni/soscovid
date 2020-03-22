import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('template', { static: false }) templateRef: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      }
    });

  }

  ngOnInit() {

    /*setTimeout(() => {
      this.modalRef = this.modalService.show(this.templateRef);
    }, 500);*/

  }

  itemPesquisa: String = "";

}
