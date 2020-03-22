import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/');
  }

  getShortName(fullName) {
    return fullName.split(' ')[0];
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
