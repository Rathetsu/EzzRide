import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLoationStore } from "@/store";


const Home = () => {
	const { setUserLocation, setDestinationLocation } = useLoationStore();
	const { user } = useUser();
	const loading = false;

	const [hasLocationPermission, setHasLocationPermission] = useState(false);

	const handleSignout = async () => {};

	const handleDesitinationPress = () => {};

	useEffect(() => {
		const requestLocationPermission = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				setHasLocationPermission(false);
				return;
			}

			let location = await Location.getCurrentPositionAsync();

			const address = await Location.reverseGeocodeAsync({
				latitude: location.coords?.latitude!,
				longitude: location.coords?.longitude!,
			});

			setUserLocation({
				latitude: location.coords?.latitude!,
				longitude: location.coords?.longitude!,
				address: `${address[0].name}, ${address[0].region}`,
			});
		};

		requestLocationPermission();
	}, []);

	return (
		<SafeAreaView className="bg-general-500">
			<FlatList
				data={recentRides?.slice(0, 5)}
				renderItem={({ item }) => <RideCard ride={item} />}
				className="px-5"
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{ paddingBottom: 100 }}
				ListEmptyComponent={() => (
					<View className="flex flex-col items-center justify-center">
						{!loading ? (
							<>
								<Image
									source={images.noResult}
									className="w-40 h-40"
									alt="No recent rides found"
									resizeMode="contain"
								/>

								<Text className="text-lg font-JakartaMedium text-gray-500 text-center">
									No recent rides found. Book a ride now!
								</Text>
							</>
						) : (
							<ActivityIndicator size="small" color="#000" />
						)}
					</View>
				)}
				ListHeaderComponent={() => (
					<>
						<View className="flex flex-row items-center justify-between my-5">
							<Text className="text-xl font-JakartaExtraBold">
								Welcome{", "}
								{user?.firstName ||
									user?.emailAddresses[0].emailAddress.split(
										"@"
									)[0]}
								! 👋
							</Text>
							<TouchableOpacity
								onPress={handleSignout}
								className="justify-center items-center w-10 h-10 rounded-full bg-white"
							>
								<Image source={icons.out} className="w-4 h-4" />
							</TouchableOpacity>
						</View>

						{/* Google text input */}
					</>
				)}
			/>
		</SafeAreaView>
	);
};

export default Home;
