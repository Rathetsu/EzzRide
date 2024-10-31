import { useState } from "react";
import {
	TextInput,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	TouchableOpacity,
} from "react-native";

import { icons } from "@/constants";
import { InputFieldProps } from "@/types/type";

const InputField = ({
	label,
	icon,
	secureTextEntry = false,
	labelStyle,
	containerStyle,
	inputStyle,
	iconStyle,
	className,
	lowercase = false,
	...props
}: InputFieldProps) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible((prevState) => !prevState);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className="my-2 w-full">
					<Text
						className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}
					>
						{label}
					</Text>
					<View
						className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
					>
						{icon && (
							<Image
								source={icon}
								className={`w-6 h-6 ml-4 ${iconStyle}`}
							/>
						)}
						<TextInput
							className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
							secureTextEntry={
								secureTextEntry && !isPasswordVisible
							}
							autoCapitalize={lowercase ? "none" : "sentences"}
							{...props}
						/>
						{secureTextEntry ? (
							<TouchableOpacity
								onPress={togglePasswordVisibility}
								className="absolute right-4"
							>
								<Image
									source={
										isPasswordVisible
											? icons.eyeOpen
											: icons.eyeClosed
									}
									className="w-6 h-6"
								/>
							</TouchableOpacity>
						) : null}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default InputField;
