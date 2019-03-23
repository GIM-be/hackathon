import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayerComponent } from './layer/layer.component';
import { LeftPanelComponent } from './map/left-panel/left-panel.component';
import { DetailsComponent } from './map/left-panel/details/details.component';
import { RightPanelComponent } from './map/right-panel/right-panel.component';
import { LayermanagerComponent } from './map/right-panel/layermanager/layermanager.component';
import { BottomPanelComponent } from './map/bottom-panel/bottom-panel.component';
import { SelectNotifZoneComponent } from './map/right-panel/select-notif-zone/select-notif-zone.component';
import { ProposalModalComponent } from './proposal-modal/proposal-modal.component';
import { LoginFormComponent } from './map/right-panel/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayerComponent,
    LeftPanelComponent,
    DetailsComponent,
    RightPanelComponent,
    LayermanagerComponent,
    ProposalModalComponent,
    BottomPanelComponent,
    SelectNotifZoneComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
