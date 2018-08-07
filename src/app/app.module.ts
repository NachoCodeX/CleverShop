import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Angular Material
import { CustomMaterialModule } from './angular-material';
import { IndexComponent } from './components/index/index.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import AppState from './store/reducers/app.reducer';
import CartState from './store/reducers/cart.reducer';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { CartComponent } from './components/cart/cart.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/cart/header/header.component';
import { ListComponent } from './components/cart/list/list.component';
import { FooterComponent } from './components/cart/footer/footer.component';

import { ItemComponent } from './components/cart/list/item/item.component';
import { ItemComponent2 } from './components/gallery/item/item.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { IndexDashboardComponent } from './components/dashboard/index-dashboard/index-dashboard.component';
import { SignupComponent } from './components/dashboard/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CartComponent,
    GalleryComponent,
    HeaderComponent,
    ListComponent,
    FooterComponent,
    ItemComponent,
    ItemComponent2,
    SalesComponent,
    IndexDashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AppState,
      CartState
    ]),
    NgxsStoragePluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
