import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTemplateComponent } from './article-template.component';

describe('ArticleTemplateComponent', () => {
  let component: ArticleTemplateComponent;
  let fixture: ComponentFixture<ArticleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
