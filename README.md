# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community


PROMPT: CLERK AUTH FLOW
Study whole codebase and attached Clerk documentation to implement a complete custom Clerk auth flow for this Expo app with production-grade sign up and sign in screen with logic, validation, and navigation.

The UI must strictly match the existing app design system and NativeWind patterns and no generic “Clerk” wording.

Use the attached design only as layout inspiration, but keep the auth polished, brand-native, and focused on conversion, clarity, and trust.




PROMPT: SUBSCRIPTION LIST
implement a searchable subscription list using the existing SubscriptionCard component and the dummy data from constants.

PROMPT: CREATE SUBSCRIPTION
Study the entire codebase, paying close attention to the existing design system in global.css (especially the modal-, picker-, category-, and auth- component classes), the existing components in src/components/, the constants in src/constants/data.ts and src/constants/icons.ts, and the home screen at src/app/(tabs)/index.tsx.

Create a src/components/CreateSubscriptionModal.tsx component that:

Is a React Native <Modal> that slides up from the bottom with a transparent overlay

Has a header with "New Subscription" title and a close button

Has four form fields:

Name: TextInput (use auth-input class)

Price: TextInput with keyboardType="decimal-pad" (use auth-input class)

Frequency: Two toggle buttons for Monthly/Yearly (use picker-option / picker-option-active classes)

Category: Chip selection from these options: Entertainment, AI Tools, Developer Tools, Design, Productivity, Cloud, Music, Other (use category-chip / category-chip-active classes)

Has a submit button (use auth-button / auth-button-disabled classes) that validates name is not empty and price is a positive number

On submit: creates a subscription object with id, name, price, frequency, category, status ("active"), startDate, renewalDate (calculated from frequency), icon (use icons.wallet), billing (same as frequency), and a color based on category

Uses KeyboardAvoidingView for iOS

Resets form and closes modal after successful creation

Then hook it up to the home screen:

The "+" icon (icons.add) in the home header should open this modal when tapped (wrap in a Pressable)

When a subscription is created, add it to the beginning of the subscriptions list on the home screen

The new subscription should immediately appear in both the "All Subscriptions" FlatList and the home screen state

Use clsx for conditional class toggling (already installed). Use dayjs for date calculations (already installed). Match the visual style of the existing auth screens. Do NOT install any new packages.

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
