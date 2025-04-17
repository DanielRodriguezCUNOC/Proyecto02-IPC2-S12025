import { CanDeactivateFn } from '@angular/router';

export const adminGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
