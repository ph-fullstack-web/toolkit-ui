import { ElementRef, EmbeddedViewRef, Injector, TemplateRef } from "@angular/core";

export class MockTemplateRef<C> implements TemplateRef<C> {
    elementRef!: ElementRef<any>;
    createEmbeddedView(context: C, injector?: Injector | undefined): EmbeddedViewRef<C> {
        throw new Error("Method not implemented.");
    }
    
}