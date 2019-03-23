import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
import { LayerComponent } from './layer/layer.component';
import { CreatePointButtonComponent } from './create-point-button/create-point-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TestComponent,
    LayerComponent,
    CreatePointButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
