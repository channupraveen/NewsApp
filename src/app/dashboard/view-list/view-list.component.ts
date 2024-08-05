import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../models/new-list.model';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadNews, loadTopHeadlines } from '../../ngrx-store/news.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectAllNews, selectNewsError } from '../../ngrx-store/selector';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  news$: Observable<Article[]>;
  error$: Observable<string | null>;
  news: Article[] = [];
  visibleArticles = 20;
  hasData: boolean = true;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.news$ = this.store.select(selectAllNews);
    this.error$ = this.store.select(selectNewsError);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const type = params.get('type');
      if (type?.toLowerCase() === 'top-headlines') {
        this.store.dispatch(loadTopHeadlines({ q: 'latest' }));
      } else if (type) {
        this.store.dispatch(loadNews({ query: type }));
      } else {
        this.store.dispatch(loadNews({ query: 'sports' }));
      }
    });

    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });

    this.news$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.news = data;
      this.hasData = this.news.length > 0;
    });

    this.error$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      if (error) {
        console.error('Error loading news:', error);
      }
    });
  }

  navigate() {
    window.location.reload();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore() {
    this.visibleArticles += 20;
  }
}
