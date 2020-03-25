import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,

  ) { }

  versao = "0.0.5b"
  atualizado = true;
  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
    this.chkVsk();
  }

  chkVsk(): void {
    this.http.get(`${this.baseUrl}/auth/chkVsk/` + this.versao).subscribe((res: any) => {
      if (res.atualizado != 1) {
        this.router.navigate(['atualize']);
        this.atualizado = false;
      }
    })
  }

  logout(): void {
    this.authService.signOut();
    window.open('file:///android_asset/www/index.html', "_system");
  }

  getShortName(fullName) {
    return fullName.split(' ')[0];
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
