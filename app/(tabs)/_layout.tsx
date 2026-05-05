// app/(tabs)/_layout.jsx
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Tabs } from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {components,colors} from "@/constants/theme"
import {Image, View} from "react-native";
import {tabs} from "@/constants/data";
import { clsx } from "clsx";

const tabBar=components.tabBar;


export default function TabLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const insets = useSafeAreaInsets();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    const TabIcon= ({focused,icon}: any)=>(

            <View className={"tabs-icon"}>
                <View className={clsx("tabs-pill",focused && "tabs-active")}>
                    <Image source={icon} resizeMode={"contain"} className={"tabs-glyph"} />
                </View>

            </View>

    )
  return (
      <Tabs
          screenOptions={{
              headerShown: false ,
              tabBarShowLabel: false,
              tabBarStyle: {
                  position: 'absolute',
                  bottom:Math.max(insets.bottom, tabBar.horizontalInset),
                  height: tabBar.height,
                  marginHorizontal:tabBar.horizontalInset,
                  backgroundColor: colors.primary,
                  borderTopWidth: 0,
                  borderRadius: tabBar.radius,
                  elevation: 0,
              },
              tabBarActiveTintColor: '#007AFF',
              tabBarItemStyle:{
                  paddingVertical:tabBar.height/2-tabBar.iconFrame/1.6,
              },
              tabBarIconStyle:{
                  width: tabBar.iconFrame,
                  height: tabBar.iconFrame,
                  alignItems: 'center',
              },

      }}
      >
          {tabs.map((tab)=>(
              <Tabs.Screen
                  key={tab.name}
                  name={tab.name}
                  options={{
                      title:tab.title,
                      tabBarIcon:({focused})=>
                          <TabIcon focused={focused} icon={tab.icon}/>

              }}/>


          ))}
        {/*<Tabs.Screen*/}
        {/*    name="index"*/}
        {/*    options={{*/}
        {/*      title: 'Home',*/}
        {/*      tabBarIcon: ({ color }) => (*/}
        {/*          <Ionicons name="home" size={24} color={color} />*/}
        {/*      ),*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<Tabs.Screen*/}
        {/*    name="Search"*/}
        {/*    options={{*/}
        {/*      title: 'Search',*/}
        {/*      tabBarIcon: ({ color }) => (*/}
        {/*          <Ionicons name="search" size={24} color={color} />*/}
        {/*      ),*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<Tabs.Screen*/}
        {/*    name="Profile"*/}
        {/*    options={{*/}
        {/*      title: 'Profile',*/}
        {/*      tabBarIcon: ({ color }) => (*/}
        {/*          <Ionicons name="person" size={24} color={color} />*/}
        {/*      ),*/}
        {/*    }}*/}
        {/*/>*/}
      </Tabs>

  );
}