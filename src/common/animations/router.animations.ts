import { trigger, state, animate, style, transition } from '@angular/animations';

export function routerTransition() {
  return slideToTop();
}
export function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({position: 'fixed', width: '100%'}) ),
    state('*', style({position: 'fixed', width: '100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.8s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.8s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({position: 'fixed', width: '100%'}) ),
    state('*', style({position: 'fixed', width: '100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

function slideToBottom() {
  return trigger('routerTransition', [
    state('void', style({position: 'fixed', width: '100%', height: '100%'}) ),
    state('*', style({position: 'fixed', width: '100%', height: '100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function slideToTop() {
  return trigger('routerTransition', [
    // state('void', style({position: 'fixed', width: '100vw', height: '100vh', opacity: 0}) ),
    // state('*', style({position: 'fixed', width: '100vw', height: '100vh', opacity: 0}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)', opacity: 0}),
      animate('0.6s 0.1s ease-in-out', style({transform: 'translateY(0%)', opacity: 1})),
    ]),
    // transition(':leave', [
    //   style({transform: 'translateY(0%)'}),
    //   animate('0.8s ease-in-out', style({transform: 'translateY(-100%)'}))
    // ])
  ]);
}

function fadeInOut() {
  return trigger('routerTransition', [
    state('void', style({opacity: 0}) ),
    state('*', style({opacity: 1}) ),
    transition(':enter', [
      style({opacity: 0}),
      animate('0.8s 1s  ease-in-out', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('30.8s ease-in-out', style({opacity: 0}))
    ])
  ]);
}

function tryMe() {
  return trigger('routerTransition', [
    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('1s ease-in-out', style({ opacity: 1 })),
    ]),
  ])
}
