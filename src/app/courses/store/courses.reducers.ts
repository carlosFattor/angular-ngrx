import { Course } from '../model/course';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions, CourseActionTypes } from './course.actions';

// tslint:disable-next-line:no-empty-interface
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialAdapter: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducers(state = initialAdapter, actions: CourseActions): CoursesState {

  switch (actions.type) {

    case CourseActionTypes.AllCoursesLoaded:
      return adapter.addAll(actions.payload.courses, { ...state, allCoursesLoaded: true });

    case CourseActionTypes.CourseSaved:
      return adapter.updateOne(actions.payload.course, state);

    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(actions.payload.course, state);

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
