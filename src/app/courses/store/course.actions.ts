import { Action } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

export enum CourseActionTypes {
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseSaved = '[Edit Course Dialog] course Saved',
  CourseRequested = '[View Page Course] Course requested',
  CourseLoaded = '[Course API] Course loaded'
}

export class AllCoursesRequested implements Action {
  readonly type = CourseActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CourseActionTypes.AllCoursesLoaded;
  constructor(public payload: { courses: Course[] }) { }
}

export class CourseSaved implements Action {
  readonly type = CourseActionTypes.CourseSaved;
  constructor(public payload: { course: Update<Course> }) { }
}

export class CourseRequested implements Action {
  readonly type = CourseActionTypes.CourseRequested;
  constructor(public payload: { courseId: number }) { }
}

export class CourseLoaded implements Action {
  readonly type = CourseActionTypes.CourseLoaded;
  constructor(public payload: { course: Course }) { }
}

export type CourseActions = AllCoursesRequested
  | AllCoursesLoaded
  | CourseSaved
  | CourseRequested
  | CourseLoaded;
