import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTemplateComponent } from './editor-template.component';

describe('EditorTemplateComponent', () => {
  let component: EditorTemplateComponent;
  let fixture: ComponentFixture<EditorTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
