import { ComponentFactory, ComponentRef, ElementRef, EmbeddedViewRef, EnvironmentInjector, Injector, NgModuleRef, TemplateRef, Type, ViewContainerRef, ViewRef } from "@angular/core";

export class MockViewContainerRef<C> extends ViewContainerRef {
    get element(): ElementRef<any> {
        throw new Error("Method not implemented.");
    }
    get injector(): Injector {
        throw new Error("Method not implemented.");
    }
    get parentInjector(): Injector {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    get(index: number): ViewRef | null {
        throw new Error("Method not implemented.");
    }
    get length(): number {
        throw new Error("Method not implemented.");
    }
    createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C | undefined, options?: { index?: number | undefined; injector?: Injector | undefined; } | undefined): EmbeddedViewRef<C>;
    createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C | undefined, index?: number | undefined): EmbeddedViewRef<C>;
    createEmbeddedView(templateRef: unknown, context?: unknown, index?: unknown): EmbeddedViewRef<C> | EmbeddedViewRef<C> {
        throw new Error("Method not implemented.");
    }
    createComponent<C>(componentType: Type<C>, options?: { index?: number | undefined; injector?: Injector | undefined; ngModuleRef?: NgModuleRef<unknown> | undefined; environmentInjector?: EnvironmentInjector | NgModuleRef<unknown> | undefined; projectableNodes?: Node[][] | undefined; } | undefined): ComponentRef<C>;
    createComponent<C>(componentFactory: ComponentFactory<C>, index?: number | undefined, injector?: Injector | undefined, projectableNodes?: any[][] | undefined, environmentInjector?: EnvironmentInjector | NgModuleRef<any> | undefined): ComponentRef<C>;
    createComponent(componentFactory: unknown, index?: unknown, injector?: unknown, projectableNodes?: unknown, environmentInjector?: unknown): ComponentRef<C> | ComponentRef<C> {
        throw new Error("Method not implemented.");
    }
    insert(viewRef: ViewRef, index?: number | undefined): ViewRef {
        throw new Error("Method not implemented.");
    }
    move(viewRef: ViewRef, currentIndex: number): ViewRef {
        throw new Error("Method not implemented.");
    }
    indexOf(viewRef: ViewRef): number {
        throw new Error("Method not implemented.");
    }
    remove(index?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    detach(index?: number | undefined): ViewRef | null {
        throw new Error("Method not implemented.");
    }

   
  }