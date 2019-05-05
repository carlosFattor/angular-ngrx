import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Login } from '../store/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  login() {
    const formVal = this.form.value;

    this.auth.login(formVal.email, formVal.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new Login({ user }));
          this.router.navigateByUrl('/courses');
        })
      ).subscribe(noop, () => alert('Login Failed'));
  }
}
