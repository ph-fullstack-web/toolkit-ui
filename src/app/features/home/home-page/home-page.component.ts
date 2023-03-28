import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConfig } from 'models';
import { TagsService } from 'services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private router: Router, private tagsService: TagsService, private route: ActivatedRoute) {}

  isAuthenticated: boolean = false;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.isAuthenticated = data.isAuthenticated as boolean;
      // set the article list accordingly
      if (data.isAuthenticated) {
        this.setListTo({ type: 'feed' });
      } else {
        this.setListTo({ type: 'all' });
      }
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(event: { type: string; filters?: Object }) {
    const { type = '', filters = {} } = event;
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = { type: type, filters: filters };
  }
}
