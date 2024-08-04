import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthmoduleModule } from './authmodule/authmodule.module';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuthmoduleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}
 
  
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if (pos > 0) {
      console.log('Scroll detected:', pos);
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('NavigationEnd event detected. Scrolling to top.');
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });
  }
}
