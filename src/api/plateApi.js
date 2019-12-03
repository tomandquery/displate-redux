import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/data/";

export function getPlates() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function savePlate(plate) {
  return fetch(baseUrl + (plate.id || ""), {
    method: plate.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(plate)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePlate(plateId) {
  return fetch(baseUrl + plateId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
