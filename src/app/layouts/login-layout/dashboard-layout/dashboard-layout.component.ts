import { ChangeDetectorRef, Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, Observable, shareReplay, take } from 'rxjs';
import { Article } from '../../../models/new-list.model';
import { Store } from '@ngrx/store';
import { loadNews, loadTopHeadlines } from '../../../ngrx-store/news.actions';
import { ViewListComponent } from "../../../dashboard/view-list/view-list.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    AsyncPipe,
    CommonModule, ViewListComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  isSidebarVisible = false;
  @ViewChild('drawer') drawer!: MatSidenav;
  isSidebarOpen = false;
  news$!: Observable<Article[]>;
  hasContent: boolean = true;
  showProfileMenu: boolean = false;
  searchQuery: string = '';
  activeItem: string = 'Top headlines';
 
  private breakpointObserver = inject(BreakpointObserver);
  private viewportScroller = inject(ViewportScroller);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.isSidebarVisible = false;
    }
  }
closeSidebar() {
    this.isSidebarVisible = false;
  }
  constructor(
    private router: Router,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; // Toggle sidebar visibility
  }


  search() {
    this.loadNews(this.searchQuery);
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  loadTopHeadlines() {
    this.setActiveItem('Top headlines');
    this.store.dispatch(loadTopHeadlines({ q: 'latest' }));
    this.navigateAndScrollToTop('/view-list/top-headlines');
    this.isSidebarVisible = false;
  }

  loadNews(query: string) {
    this.setActiveItem(query);
    this.store.dispatch(loadNews({ query }));
    this.navigateAndScrollToTop(`/view-list/${query}`);
    this.isSidebarVisible = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.closeSidenavIfHandset();
  }

  private setActiveItem(item: string) {
    this.activeItem = item;
    this.changeDetectorRef.detectChanges();
  }

  private navigateAndScrollToTop(route: string) {
    this.router.navigate([route]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
    this.closeSidenavIfHandset();
  }

  private closeSidenavIfHandset() {
    this.isHandset$.pipe(take(1)).subscribe(isHandset => {
      if (isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }
  scrollToTop() {
    console.log('scrollToTop called');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  }
}
