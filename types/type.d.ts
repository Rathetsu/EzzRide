import { TextInputProps, TouchableOpacityProps } from "react-native";
declare interface Ride {
	origin_address: string;
	destination_address: string;
	origin_latitude: number;
	origin_longitude: number;
	destination_latitude: number;
	destination_longitude: number;
	ride_time: number;
	fare_price: number;
	payment_status: string;
	driver_id: number;
	user_id: string;
	created_at: string;
	driver: {
		first_name: string;
		last_name: string;
		car_seats: number;
	};
}

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	className?: string;
}
declare interface InputFieldProps extends TextInputProps {
	label: string;
	icon?: any;
	secureTextEntry?: boolean;
	labelStyle?: string;
	containerStyle?: string;
	inputStyle?: string;
	iconStyle?: string;
	className?: string;
	lowercase?: boolean;
}


declare interface LocationStore {
	userLatitude: number | null;
	userLongitude: number | null;
	userAddress: string | null;
	destinationLatitude: number | null;
	destinationLongitude: number | null;
	destinationAddress: string | null;
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}
}
