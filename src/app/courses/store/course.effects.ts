import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { CoursesService } from '../services/courses.service';
import { AppState } from '../../store/app.reducers';
import { AllCoursesRequested, CourseActionTypes, AllCoursesLoaded, CourseRequested, CourseLoaded } from './course.actions';
import { withLatestFrom, filter, mergeMap, map, catchError } from 'rxjs/operators';
import { allCoursesLoaded } from './course.selectors';
import { throwError } from 'rxjs';

@Injectable()
export class CourseEffects {

  constructor(private actions$: Actions, private courseService: CoursesService, private store: Store<AppState>) { }

  @Effect()
  loadCourse$ = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap(action => this.courseService.findCourseById(action.payload.courseId)),
      map(course => new CourseLoaded({ course })),
      catchError(err => {
        console.log('error loading course ', err);
        return throwError(err);
      })
    );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
    mergeMap(() => this.courseService.findAllCourses()),
    map(courses => new AllCoursesLoaded({ courses })),
    catchError(err => {
      console.log('error loading all courses ', err);
      return throwError(err);
    })
  );
}
