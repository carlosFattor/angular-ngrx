import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducers';
import * as fromCourse from './courses.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  courseState => courseState.allCoursesLoaded
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  coursesLoad => coursesLoad.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  coursesLoad => coursesLoad.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

