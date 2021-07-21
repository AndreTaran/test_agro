import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status/status.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'status',
    component: StatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
