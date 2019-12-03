import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function plateReducer(state = initialState.plates, action) {
  switch (action.type) {
    case types.CREATE_PLATE_SUCCESS:
      return [...state, { ...action.plate }];
    case types.UPDATE_PLATE_SUCCESS:
      return state.map(plate =>
        plate.id === action.plate.id ? action.plate : plate
      );
    case types.LOAD_PLATES_SUCCESS:
      return action.plates;
    case types.DELETE_PLATE_OPTIMISTIC:
      return state.filter(plate => plate.id !== action.plate.id);
    default:
      return state;
  }
}
