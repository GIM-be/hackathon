import {Component} from '@angular/core';
import {AppLoaderService} from './services/app-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'CitizenOfWallonia';

  constructor(private appLoaderService: AppLoaderService) {}

  isLoaded() {
    return this.appLoaderService.isLoaded();
  }
}
