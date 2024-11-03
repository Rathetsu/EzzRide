import { router } from "expo-router";
import { View, FlatList } from "react-native";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
	const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

	return (
		<RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
			<FlatList
				data={drivers}
				renderItem={({ item }) => (
					<DriverCard
						item={item}
						selected={selectedDriver!}
						setSelected={() => setSelectedDriver(item.id!)}
					/>
				)}
				ListFooterComponent={() => (
					<View className="mx-5 mt-10">
						<CustomButton
							title="Select Ride"
							onPress={() => router.push("/(root)/book-ride/")}
						/>
					</View>
				)}
			/>
		</RideLayout>
	);
};

export default ConfirmRide;
