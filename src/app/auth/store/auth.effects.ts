import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { Login, Logout, AuthActionTypes } from './auth.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router) { }

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      return of(new Login({ user: JSON.parse(userData) }));
    } else {
      return <any>of(new Logout());
    }
  });
}

