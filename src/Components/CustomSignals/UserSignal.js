import { signal } from "@preact/signals";
import Cookies from "js-cookie";
import { InXMinutes, InXDays } from "../CustomCookieMethods/CookieMethods";

export const userSignal = signal(getUser());
//export const notificationSignal = signal(getUser());

function getUser() {
	const isExistingUserCookie = !!Cookies.get("auth");
	if (!isExistingUserCookie) {
		return null;
	}

	const userObject = JSON.parse(Cookies.get("auth"));
	let notificationObject = null;

	if (userObject.userRole === "Admin") {
		const isExistingAdminNotificationCookie = !!Cookies.get("adminNotification");
		if (isExistingAdminNotificationCookie) {
			notificationObject = JSON.parse(Cookies.get("adminNotification"));
		}
	}

	return { user: userObject, notification: notificationObject };
}

export function userLoggedIn(userObject, cookieExpirationType, cookieExpirationTimeValue) {
	if (!userObject) {
		userSignal.value = { user: null, notification: null };
		return null;
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

	let notificationObject = userSignal.value?.notification;

	if (userObject.userRole === "Admin") {
		const isExistingAdminNotificationCookie = !!Cookies.get("adminNotification");
		if (isExistingAdminNotificationCookie) {
			notificationObject = JSON.parse(Cookies.get("adminNotification"));
		}
	}

	userSignal.value = { user: userObject, notification: notificationObject };
	return;
}
export function createAdminNotificationData(data) {
	Cookies.set("adminNotification", JSON.stringify(data), { expires: 0.5 });
	return JSON.parse(Cookies.get("adminNotification"));
}

export function updateAdminNotificationData(id, projectData) {
	const searchAndDestroy = projectData.findIndex((kill) => kill.id === id);
	if (searchAndDestroy !== -1) {
		projectData.splice(searchAndDestroy, 1);
		Cookies.set("adminNotification", JSON.stringify(projectData), { expires: 0.5 });
	}
}

export function userLoggedOut() {
	Cookies.remove("auth");
	//Cookies.remove("adminNotification");
	userSignal.value = null;
}
