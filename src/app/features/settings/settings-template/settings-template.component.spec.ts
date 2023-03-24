import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTemplateComponent } from './settings-template.component';

describe('SettingsTemplateComponent', () => {
  let component: SettingsTemplateComponent;
  let fixture: ComponentFixture<SettingsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
