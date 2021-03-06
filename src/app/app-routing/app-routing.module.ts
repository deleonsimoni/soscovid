import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MapasComponent } from '../mapas/mapas.component';
import { UploadComponent } from '../upload/upload.component';
import { AppComponent } from '../app.component';
import { AtualizeAppComponent } from '../atualize-app/atualize-app.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'mapas',
    component: MapasComponent
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'atualize',
    component: AtualizeAppComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule { }
