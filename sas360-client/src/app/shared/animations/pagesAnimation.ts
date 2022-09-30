import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

//---------- SLIDE ANIMATION -----------------
export const SLIDE_LEFT_ANIMATION = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        height: '100vh',
        left: 0,
        overflowY: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
      }),
    ],
    { optional: true }
  ),
  query(':enter', [style({ transform: 'translateX(100%)' })], {
    optional: true,
  }),
  query(':enter, :leave', animateChild(), { optional: true }),
  group([
    query(
      ':leave',
      [
        animate(
          '200ms ease-out',
          style({
            transform: 'translateX(-100%)',
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '200ms ease-out',
          style({
            transform: 'translateX(0%)',
          })
        ),
      ],
      { optional: true }
    ),
    query('@*', animateChild(), { optional: true }),
  ]),
];

export const SLIDE_RIGHT_ANIMATION = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ],
    { optional: true }
  ),
  query(':enter', [style({ left: '-100%' })], { optional: true }),
  query(':enter, :leave', animateChild(), { optional: true }),
  group([
    query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
      optional: true,
    }),
    query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
      optional: true,
    }),
    query('@*', animateChild(), { optional: true }),
  ]),
];

export const PAGE_SLIDE_ANIMATION = trigger('routeAnimations', [
  transition(`HomePage => GeodataPage`, SLIDE_RIGHT_ANIMATION),
  transition(`GeodataPage => HomePage`, SLIDE_LEFT_ANIMATION),
  transition(`UsersPage => DevicesPage`, SLIDE_RIGHT_ANIMATION),
  transition(`DevicesPage => UsersPage`, SLIDE_LEFT_ANIMATION),
  transition(`* <=> *`, SLIDE_RIGHT_ANIMATION),
]);
//---------------------------------------------

//---------- FADE ANIMATION -----------------

export const FADE_ANIMATION = trigger('fadeInOut', [
  state('open', style({ opacity: 1, transform: 'translateY(0px)' })),
  state('close', style({ opacity: 0, transform: 'translateY(10px)' })),
  transition('open => *', animate('400ms ease-out')),
  transition('* => open', animate('400ms ease-in')),
]);
//_---------------------------------------------

//---------- STAGGER ANIMATION -----------------
const stagger_leave_query = query(':leave', [
  style({ opacity: 1 }),
  stagger(100, [animate('0.5s', style({ opacity: 0 }))]),
]);

const stagger_enter_query = query(':enter', [
  style({ opacity: 0 }),
  stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
]);

const stagger_transition = transition('* => *', [
  stagger_leave_query,
  stagger_enter_query,
]);

export const STAGGER_ANIMATION = trigger('listAnimation', [stagger_transition]);
//_---------------------------------------------
