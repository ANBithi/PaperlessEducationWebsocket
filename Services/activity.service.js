import { handleResponse } from"../Helpers/handleResponse.js";
import fetch from 'node-fetch';
import { authHeader } from "../authHeader.js";
async function addActivity (request) {
let response = await fetch("http://localhost:5000/api/userActivity/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
	// return fetch("http://localhost:5000/api/userActivity/add", {
	// 	method: "POST",
	// 	headers: { ...authHeader(), "Content-Type": "application/json" },
	// 	body: JSON.stringify(request),
	// }).then(response=> {
    //     return JSON.parse(response);
    // });
}


const activityService = {addActivity}
export default activityService;