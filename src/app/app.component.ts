import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUrl: any;
  public onlineOffline: boolean = navigator.onLine;
  constructor(private location: Location, private router: Router) {
    this.currentUrl = this.location.path();
    console.log('connectivty', this.onlineOffline);
    console.log('this.currentUrl', this.currentUrl);
  }

  reloadPage() {
    console.log('reloadPage');
    this.onlineOffline = navigator.onLine;
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
    let currentUrl = this.router.url + '?';
  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
    });
  }
}
