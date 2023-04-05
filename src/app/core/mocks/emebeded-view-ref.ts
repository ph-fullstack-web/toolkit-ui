import { EmbeddedViewRef } from '@angular/core';

export class MockEmbeddedViewRef<C> extends EmbeddedViewRef<C> {
  context = {} as C;
  get rootNodes(): Node[] {
    throw new Error('Method not implemented.');
  }
  destroy(): void {
    throw new Error('Method not implemented.');
  }
  get destroyed(): boolean {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDestroy(callback: () => void) {
    throw new Error('Method not implemented.');
  }
  markForCheck(): void {
    throw new Error('Method not implemented.');
  }
  detach(): void {
    throw new Error('Method not implemented.');
  }
  detectChanges(): void {
    throw new Error('Method not implemented.');
  }
  checkNoChanges(): void {
    throw new Error('Method not implemented.');
  }
  reattach(): void {
    throw new Error('Method not implemented.');
  }
}
