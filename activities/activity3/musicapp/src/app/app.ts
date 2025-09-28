import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title : string = "My Music Collection";
  protected readonly version : string = "1.0";
  private router : Router;

  constructor(private r: Router) {
    this.router = r;
  }

  displayVersion() {
    alert(this.version);
  }

  displayArtistList() {
    this.router.navigate(['list-artists'], { queryParams: { data: new Date()} });
    alert("display list here");
  }
}
