/**
 * Created by Roman on 26.09.2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AppComponent} from "./app.component";
import {RootComponent} from "./root/root.component";
import {MainComponent} from "./main/main.component";
import {ItemsComponent} from "./items/items.component";

const appRoutes: Routes = [
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: MainComponent
      }
    ]
  },
  {
    path: 'items',
    component: RootComponent,
    children: [
      {
        path: '',
        component: ItemsComponent
      }
    ]
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
