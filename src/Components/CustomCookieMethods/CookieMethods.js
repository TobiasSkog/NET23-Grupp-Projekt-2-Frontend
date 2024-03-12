export function InXMinutes(minutes) {
	if (!minutes || !minutes > 0) {
		return 30; // if the value is NOT( Null OR greater than 0 THEN return 30 minutes )
	}
	return new Date(new Date().getTime() + minutes * 60 * 1000);
}
export function InXDays(days) {
	if (!days || !days > 0) {
		return 1 / 48; // if the value is NOT( Null OR greater than 0 THEN return 30 minutes )
	}
	return days;
}
