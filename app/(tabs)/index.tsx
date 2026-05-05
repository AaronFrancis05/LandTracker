import { Text, View } from "react-native";
// import { Link } from 'expo-router';
import {SafeAreaView } from 'react-native-safe-area-context';



export default function Index() {

  return (
      <SafeAreaView className={"flex-1 p-5 bg-background h-full "}>
      <View
        className={"gap-5 p-4 text-primary"}
      >
          <Text className={"font-sans-bold"}>Welcome to:</Text>
        <Text className={'font-bold text-orange-400 font-sans-extrabold '}>
            AFT LandTracker</Text>


      </View>
      </SafeAreaView>
  );
}
