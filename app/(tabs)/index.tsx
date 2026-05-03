import { Text, View } from "react-native";
import { Link } from 'expo-router';
import {SafeAreaView } from 'react-native-safe-area-context';



export default function Index() {

  return (
      <SafeAreaView className={"flex-1 p-5 bg-background"}>
      <View
        className={"home-header p-4 text-primary"}
      >
        <Text className={'font-'}>LandTracker Home</Text>

          <Link href="/Profile">Profile</Link>
          <Link href="/Search">Search</Link>
          <Link href="/(auth)/sign-in">Login</Link>
          <Link href="/(auth)/sign-up">Create Account</Link>
      </View>
      </SafeAreaView>
  );
}
