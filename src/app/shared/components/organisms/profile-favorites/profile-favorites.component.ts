import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig, Profile } from 'models';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  profile: Profile | undefined;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  ngOnInit() {
    this.route?.parent?.data.subscribe((data: any) => {
      this.profile = data.profile as Profile;
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }
}
