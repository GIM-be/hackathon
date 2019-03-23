import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayerComponent } from './layer/layer.component';
import { CreatePointButtonComponent } from './create-point-button/create-point-button.component';
import { LeftPanelComponent } from './map/left-panel/left-panel.component';
import { RightPanelComponent } from './map/right-panel/right-panel.component';
import { LayermanagerComponent } from './map/right-panel/layermanager/layermanager.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayerComponent,
    CreatePointButtonComponent,
    LeftPanelComponent,
    RightPanelComponent,
    LayermanagerComponent,
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
