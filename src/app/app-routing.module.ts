import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './test/test.component';
import {HomeComponent} from './home/home.component';
import {EsriComponent} from './esri/esri.component';

const routes: Routes = [
  {path: '', redirectTo: '/test', pathMatch: 'full'},
  {
  path: 'home',
  component: HomeComponent,
  data: {
    title: 'Home'
  },

},
{
  path: 'test',
  component: TestComponent,
  data: {
    title: 'Test'
  },
  
},
{
  path: 'esri',
  component: EsriComponent,
  data: {
    title: 'Esri'
  },
  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
