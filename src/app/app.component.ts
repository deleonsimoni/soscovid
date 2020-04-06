import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Howl, Howler } from 'howler';
import { AuthService } from './auth/auth.service';
import * as schema from './schema/equipment.json';

declare let Media: any;
declare let navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;
  public imageSplash;
  public sound: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.registerSvgIcons(),
      this.getImageRandom()
  }

  public ngOnInit() {

    // init this.user on startup
    /*this.authService.me().subscribe(data => {

      const splashScreen: HTMLElement = document.getElementById('custom-overlay');
      if (splashScreen) {
        splashScreen.remove();
      }

      this.user = data.user;
    });*/

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      navigator.splashscreen.hide();
      document.addEventListener("backbutton", function (e) {
        e.preventDefault();
      }, false);
    }

    setTimeout(() => {
      const splashScreen: HTMLElement = document.getElementById('custom-overlay');
      const menu: HTMLElement = document.getElementById('menu');

      if (splashScreen) {
        menu.removeAttribute("style");
        splashScreen.remove();
        // this.sound.stop();

      }
    }, 5500);

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  playAudio() {

    var media = new Media('../assets/sounds/heartbeat.wav', alert('sucesso'), alert('erro'));
    media.play();
  }


  getImageRandom() {


    switch (Math.floor((Math.random() * 6) + 1)) {
      case 1:
        this.imageSplash = "./assets/img/corona-red.png"
        break;
      case 2:
        this.imageSplash = "./assets/img/corona-white.png"
        break;
      case 3:
        this.imageSplash = "./assets/img/name-red.png"
        break;
      case 4:
        this.imageSplash = "./assets/img/name-white.png"
        break;
      case 5:
        this.imageSplash = "./assets/img/sos-red.png"
        break;
      case 6:
        this.imageSplash = "./assets/img/sos-white.png"
        break;
      default:
        this.imageSplash = "./assets/img/corona-red.png"
        break;
    }

  }
  logout(): void {
    this.authService.signOut();
    window.open('file:///android_asset/www/index.html', "_system");
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  registerSvgIcons() {
    [
      'close',
      'add',
      'add-blue',
      'airplane-front-view',
      'air-station',
      'balloon',
      'boat',
      'cargo-ship',
      'car',
      'catamaran',
      'clone',
      'convertible',
      'delete',
      'drone',
      'fighter-plane',
      'fire-truck',
      'horseback-riding',
      'motorcycle',
      'railcar',
      'railroad-train',
      'rocket-boot',
      'sailing-boat',
      'segway',
      'shuttle',
      'space-shuttle',
      'steam-engine',
      'suv',
      'tour-bus',
      'tow-truck',
      'transportation',
      'trolleybus',
      'water-transportation',
    ].forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`))
    });
  }

}
