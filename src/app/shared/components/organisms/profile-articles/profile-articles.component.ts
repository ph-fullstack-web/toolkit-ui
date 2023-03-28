import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig, Profile } from 'models';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
})
export class ProfileArticlesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  profile: Profile | undefined;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit() {
    this.route?.parent?.data.subscribe((data: any) => {
      this.profile = data.profile as Profile;
      this.articlesConfig = {
        type: 'all',
        filters: {},
      }; // Only method I found to refresh article load on swap
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
