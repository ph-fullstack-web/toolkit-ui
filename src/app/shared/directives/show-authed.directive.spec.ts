import { RootState } from "@app/store";
import { MockTemplateRef, MockViewContainerRef } from "@mocks";
import { ShowAuthedDirective } from "./show-authed.directive";
import { createMockStore, MockStore } from '@ngrx/store/testing';
import { of } from "rxjs";

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

    it('should call viewContainerRef.clear when appShowAuthed is false and isAuthenticated is true', () => {
        let mockTemplateRef =  new MockTemplateRef();   
        let mockAppStore: MockStore<RootState> = createMockStore();
        let mockViewContainerRef = new MockViewContainerRef();
        const isAuthenticated = true;
        let directive = new ShowAuthedDirective(mockTemplateRef, mockAppStore, mockViewContainerRef);
        directive.appShowAuthed = false;

        spyOn(mockAppStore, 'select').and.returnValue(of(isAuthenticated));
        spyOn(mockViewContainerRef, 'clear').and.callFake(() => console.log('callFake Clear 1'));

        directive.ngOnInit();

        expect(mockViewContainerRef.clear).toHaveBeenCalled();
    });

    it('should call viewContainerRef.clear when appShowAuthed is true and isAuthenticated is false', () => {
        let mockTemplateRef =  new MockTemplateRef();   
        let mockAppStore: MockStore<RootState> = createMockStore();
        let mockViewContainerRef = new MockViewContainerRef();
        const isAuthenticated = false;
        let directive = new ShowAuthedDirective(mockTemplateRef, mockAppStore, mockViewContainerRef);
        directive.appShowAuthed = true;

        spyOn(mockAppStore, 'select').and.returnValue(of(isAuthenticated));
        spyOn(mockViewContainerRef, 'clear').and.callFake(() => console.log('callFake Clear 2'));
        
        directive.ngOnInit();

        expect(mockViewContainerRef.clear).toHaveBeenCalled();
    });

    it('should call viewContainerRef.createEmbeddedView when appShowAuthed and isAuthenticated are both true', () => {
        let mockTemplateRef =  new MockTemplateRef();   
        let mockAppStore: MockStore<RootState> = createMockStore();
        let mockViewContainerRef = new MockViewContainerRef();
        const isAuthenticated = true;
        let directive = new ShowAuthedDirective(mockTemplateRef, mockAppStore, mockViewContainerRef);
        directive.appShowAuthed = true;

        spyOn(mockAppStore, 'select').and.returnValue(of(isAuthenticated));
        spyOn(mockViewContainerRef, 'createEmbeddedView').and.callThrough();
        
        directive.ngOnInit();

        expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalled();
    });

    it('should call viewContainerRef.createEmbeddedView when appShowAuthed and isAuthenticated are both false', () => {
        let mockTemplateRef =  new MockTemplateRef();   
        let mockAppStore: MockStore<RootState> = createMockStore();
        let mockViewContainerRef = new MockViewContainerRef();
        const isAuthenticated = false;
        let directive = new ShowAuthedDirective(mockTemplateRef, mockAppStore, mockViewContainerRef);
        directive.appShowAuthed = false;

        spyOn(mockAppStore, 'select').and.returnValue(of(isAuthenticated));
        spyOn(mockViewContainerRef, 'createEmbeddedView').and.callThrough();
        
        directive.ngOnInit();

        expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalled();
    });

});