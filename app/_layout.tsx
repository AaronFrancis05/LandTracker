import "../global.css"
import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function RootLayout() {
    const [fontsLoaded]=useFonts({
        'sans-regular':require('./assets/fonts/sans-regular.ttf'),
        'sans-bold':require('./assets/fonts/sans-semibold.ttf'),
        'sans-medium':require('./assets/fonts/sans-light.ttf'),
        'sans-semibold':require('./assets/fonts/sans-regular.ttf'),
        'sans-extrabold':require('./assets/fonts/sans-extrabold.ttf'),
        'sans-light':require('./assets/fonts/sans-light.ttf'),

    })

    useEffect(() => {
        if(fontsLoaded){
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded]);

    if(!fontsLoaded) return null


    return <Stack screenOptions={{headerShown: false}}  />;
}