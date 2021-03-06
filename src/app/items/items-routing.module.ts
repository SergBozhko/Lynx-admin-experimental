import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ItemsComponent} from "./items.component";
import {ItemsEditComponent} from "./items-edit.component";

const routes: Routes = [
  {path: '', redirectTo: 'goods', pathMatch: 'full'},

  {path: 'goods', component: ItemsComponent},
  {path: 'news', component: ItemsComponent},
  {path: 'pages', component: ItemsComponent},

  {path: 'edit-goods/:id', component: ItemsEditComponent},
  {path: 'edit-news/:id', component: ItemsEditComponent},
  {path: 'edit-pages/:id', component: ItemsEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {
}
