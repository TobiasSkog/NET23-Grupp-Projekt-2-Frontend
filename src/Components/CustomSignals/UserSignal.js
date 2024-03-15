import { signal } from "@preact/signals";
import Cookies from "js-cookie";
import { InXMinutes, InXDays } from "../CustomCookieMethods/CookieMethods";
import { successfulLogin } from "./SuccessfulLogin";

export const userSignal = signal(getUser());

function getUser() {
	const isExistingCookie = !!Cookies.get("auth");

	if (!isExistingCookie) {
		successfulLogin.value = false;
		return null;
	}

	const userObject = JSON.parse(Cookies.get("auth"));
	successfulLogin.value = true;
	return userObject;
}

export function userLoggedIn(userObject, cookieExpirationType, cookieExpirationTimeValue) {
	if (!userObject) {
		successfulLogin.value = false;
		return false;
	}

	let definedTimeValue;

	if (!cookieExpirationTimeValue && cookieExpirationType === "Days") {
		// No time value was passed but we want to store the cookie in a DAYS time format
		// setting the default cookieExpirationTimeValue to half a day
		cookieExpirationTimeValue = 0.5;
	} else if (!cookieExpirationTimeValue && cookieExpirationType === "Minutes") {
		// No time value was passed but we want to store the cookie in a MINUTES time format
		// setting the default cookieExpirationTimeValue to 30 minutes
		cookieExpirationTimeValue = 30;
	} else if (!cookieExpirationTimeValue && !cookieExpirationType) {
		// No time value AND no epixration type value was passed
		// setting the default cookieExpirationTimeValue to 30 minutes
		cookieExpirationType = "Minutes";
		cookieExpirationTimeValue = 30;
	}

	// Get a datetime date definition based on if we want to store the cookie for minutes or days
	// Defaulting to 30 minutes if something is not set properly
	switch (cookieExpirationType) {
		case "Days":
			definedTimeValue = InXDays(cookieExpirationTimeValue);
			break;

		case "Minutes":
			definedTimeValue = InXMinutes(cookieExpirationTimeValue);
			break;

		default:
			definedTimeValue = InXMinutes(cookieExpirationTimeValue);
			break;
	}

	// Create a cookie to store the user data
	Cookies.set("auth", JSON.stringify(userObject), {
		expires: definedTimeValue,
	});

	successfulLogin.value = true;
	userSignal.value = userObject;
	return true;
}

export function userLoggedOut() {
	Cookies.remove("auth");
	userSignal.value = null;
	successfulLogin.value = false;
}
