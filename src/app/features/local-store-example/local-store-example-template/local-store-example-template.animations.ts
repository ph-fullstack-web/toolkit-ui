import {
  AnimationTriggerMetadata,
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

export function itemIn(timingIn: number): AnimationTriggerMetadata {
  return trigger('itemIn', [
    transition(':enter', [
      style({ opacity: 0, height: 0 }),
      animate(timingIn, style({ opacity: 1, height: 'fit-content' })),
    ]),
  ]);
}

export function itemOut(timingOut: number): AnimationTriggerMetadata {
  return trigger('itemOut', [
    transition(':leave', [
      animate(timingOut, style({ opacity: 0, height: 0 })),
    ]),
  ]);
}

export function itemInOut(
  timingIn: number,
  timingOut: number
): AnimationTriggerMetadata {
  return trigger('itemInOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate(
        timingIn,
        style({
          transform: 'translateX(0)',
          opacity: 1,
          'overflow-x': 'hidden',
        })
      ),
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0)', opacity: 1 }),
      animate(timingOut, style({ transform: 'translateX(100%)', opacity: 0 })),
    ]),
  ]);
}
