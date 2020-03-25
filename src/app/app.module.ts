import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MapasComponent } from './mapas/mapas.component';
import { AgmCoreModule } from '@agm/core';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { UploadComponent } from './upload/upload.component';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmbedVideo } from 'ngx-embed-video';
import { ModalNormasComponent } from './modal/modal-normas/modal-normas.component';
import { ModalConfirmationComponent } from './modal/modal-confirmation/modal-confirmation.component';
import { ModalCriarContaComponent } from './modal/modal-criar-conta/modal-criar-conta.component';
import { AtualizeAppComponent } from './atualize-app/atualize-app.component';
import { ModalWaitGpsComponent } from './modal/modal-wait-gps/modal-wait-gps.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MapasComponent,
    UploadComponent,
    ModalNormasComponent,
    ModalConfirmationComponent,
    ModalCriarContaComponent,
    AtualizeAppComponent,
    ModalWaitGpsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    EmbedVideo.forRoot(),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH7oOZdBbMgyLURojHNE9tcggTpnJTa3Q'
    }),
    ModalModule.forRoot(),
    NgbModule,
  ],
  entryComponents: [

    ModalNormasComponent,
    ModalCriarContaComponent,
    ModalConfirmationComponent,
    ModalWaitGpsComponent,
  ],
  providers: [
    BsModalRef,
    {
      provide: 'BASE_API_URL',
      useValue: environment.host
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
