import * as types from "./actionTypes";
import * as plateApi from "../../api/plateApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPlateSuccess(plates) {
  return { type: types.LOAD_PLATES_SUCCESS, plates };
}

export function createPlateSuccess(plate) {
  return { type: types.CREATE_PLATE_SUCCESS, plate };
}

export function updatePlateSuccess(plate) {
  return { type: types.UPDATE_PLATE_SUCCESS, plate };
}

export function deletePlateOptimistic(plate) {
  return { type: types.DELETE_PLATE_OPTIMISTIC, plate };
}

export function loadPlates() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return plateApi
      .getPlates()
      .then(plates => {
        dispatch(loadPlateSuccess(plates));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function savePlate(plate) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return plateApi
      .savePlate(plate)
      .then(savedPlate => {
        plate.id
          ? dispatch(updatePlateSuccess(savedPlate))
          : dispatch(createPlateSuccess(savedPlate));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deletePlate(plate) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deletePlateOptimistic(plate));
    return plateApi.deletePlate(plate.id);
  };
}
