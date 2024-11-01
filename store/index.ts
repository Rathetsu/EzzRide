import { create } from "zustand";

import { LocationStore } from "@/types/type";

export const useLoationStore = create<LocationStore>((set) => ({
	userLongitude: null,
	userLatitude: null,
	userAddress: null,
	destinationLongitude: null,
	destinationLatitude: null,
	destinationAddress: null,
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) =>
		set((state) => ({
			...state,
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		})),
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) =>
		set((state) => ({
			...state,
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		})),
}));
