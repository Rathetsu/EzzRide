import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
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

export const useDriverStore = create<DriverStore>((set) => ({
	drivers: [] as MarkerData[],
	selectedDriver: null,
	setSelectedDriver: (driverId: number) =>
		set(() => ({ selectedDriver: driverId })),
	setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),
	clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
	clearDrivers: () => set(() => ({ drivers: [] })),
}));
