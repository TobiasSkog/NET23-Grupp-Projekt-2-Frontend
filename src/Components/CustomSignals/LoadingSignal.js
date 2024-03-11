import { signal } from "@preact/signals";

export const isLoading = signal(false);
export function ToggleLoadingData() {
	isLoading.value = !isLoading.value;
}
