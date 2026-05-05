import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { clsx } from "clsx";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ emailAddress?: string; password?: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = useMemo(() => {
        return isSubmitting || !emailAddress.trim() || !password;
    }, [emailAddress, isSubmitting, password]);

    const validate = () => {
        const nextErrors: { emailAddress?: string; password?: string } = {};

        if (!emailAddress.trim()) {
            nextErrors.emailAddress = "Email is required";
        } else if (!emailRegex.test(emailAddress.trim())) {
            nextErrors.emailAddress = "Enter a valid email address";
        }

        if (!password) {
            nextErrors.password = "Password is required";
        } else if (password.length < 8) {
            nextErrors.password = "Password must be at least 8 characters";
        }

        setFieldErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const onSignIn = async () => {
        setSubmitError(null);

        if (!validate() || !isLoaded) {
            return;
        }

        try {
            setIsSubmitting(true);
            const result = await signIn.create({
                identifier: emailAddress.trim(),
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (error: any) {
            const firstError = error?.errors?.[0]?.message;
            setSubmitError(firstError ?? "Unable to sign in. Please check your credentials and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="auth-safe-area">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="auth-screen">
                <ScrollView className="auth-scroll" contentContainerClassName="auth-content" keyboardShouldPersistTaps="handled">
                    <View className="auth-brand-block">
                        <View className="auth-logo-wrap">
                            <View className="auth-logo-mark">
                                <Text className="auth-logo-mark-text">LT</Text>
                            </View>
                            <View>
                                <Text className="auth-wordmark">LandTracker</Text>
                                <Text className="auth-wordmark-sub">Track every recurring spend</Text>
                            </View>
                        </View>
                        <Text className="auth-title">Welcome back</Text>
                        <Text className="auth-subtitle">Sign in to continue managing subscriptions with confidence.</Text>
                    </View>

                    <View className="auth-card">
                        <View className="auth-form">
                            <View className="auth-field">
                                <Text className="auth-label">Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    placeholder="you@example.com"
                                    placeholderTextColor="rgba(0,0,0,0.45)"
                                    className={clsx("auth-input", fieldErrors.emailAddress && "auth-input-error")}
                                    value={emailAddress}
                                    onChangeText={setEmailAddress}
                                />
                                {fieldErrors.emailAddress ? <Text className="auth-error">{fieldErrors.emailAddress}</Text> : null}
                            </View>

                            <View className="auth-field">
                                <Text className="auth-label">Password</Text>
                                <TextInput
                                    secureTextEntry
                                    placeholder="Enter your password"
                                    placeholderTextColor="rgba(0,0,0,0.45)"
                                    className={clsx("auth-input", fieldErrors.password && "auth-input-error")}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                {fieldErrors.password ? <Text className="auth-error">{fieldErrors.password}</Text> : null}
                            </View>

                            {submitError ? <Text className="auth-error">{submitError}</Text> : null}

                            <Pressable className={clsx("auth-button", isDisabled && "auth-button-disabled")} onPress={onSignIn} disabled={isDisabled}>
                                <Text className="auth-button-text">{isSubmitting ? "Signing in..." : "Sign in"}</Text>
                            </Pressable>

                            <Text className="auth-helper">Secure sign-in keeps your billing data private and synced.</Text>
                        </View>

                        <View className="auth-link-row">
                            <Text className="auth-link-copy">New to LandTracker?</Text>
                            <Link href="/(auth)/sign-up" className="auth-link">
                                Create account
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignIn;
