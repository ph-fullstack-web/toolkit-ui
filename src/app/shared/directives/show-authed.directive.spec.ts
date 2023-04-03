import { CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppStore, RootState } from "@app/store";
import { MockTemplateRef, MockViewContainerRef } from "@mocks";
import { MockInstance } from "ng-mocks";
import { ShowAuthedDirective } from "./show-authed.directive";
import { createMockStore, MockStore } from '@ngrx/store/testing';

describe('ShowAuthedDirective', () => {

    beforeEach(() => {
    });

    it('should set appshowAuthed value to false', () => {
        let mockTemplateRef =  new MockTemplateRef();   
        let mockAppStore: MockStore<RootState> = createMockStore();
        let mockViewContainerRef = new MockViewContainerRef();
        let directive = new ShowAuthedDirective(mockTemplateRef, mockAppStore, mockViewContainerRef);
        directive.appShowAuthed = false;
        expect(directive.appShowAuthed).toEqual(false);
    });

});