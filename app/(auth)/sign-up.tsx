import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { clsx } from "clsx";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isPendingVerification, setIsPendingVerification] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ emailAddress?: string; password?: string; verificationCode?: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = useMemo(() => {
        if (isPendingVerification) {
            return isSubmitting || verificationCode.trim().length < 6;
        }

        return isSubmitting || !emailAddress.trim() || !password;
    }, [emailAddress, isPendingVerification, isSubmitting, password, verificationCode]);

    const validateSignUp = () => {
        const nextErrors: { emailAddress?: string; password?: string } = {};

        if (!emailAddress.trim()) {
            nextErrors.emailAddress = "Email is required";
        } else if (!emailRegex.test(emailAddress.trim())) {
            nextErrors.emailAddress = "Enter a valid email address";
        }

        if (!password) {
            nextErrors.password = "Password is required";
        } else if (password.length < 8) {
            nextErrors.password = "Use at least 8 characters";
        }

        setFieldErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const validateCode = () => {
        const nextErrors: { verificationCode?: string } = {};

        if (!verificationCode.trim()) {
            nextErrors.verificationCode = "Verification code is required";
        } else if (verificationCode.trim().length < 6) {
            nextErrors.verificationCode = "Enter the 6-digit code";
        }

        setFieldErrors((prev) => ({ ...prev, ...nextErrors }));

        return Object.keys(nextErrors).length === 0;
    };

    const onRequestVerification = async () => {
        setSubmitError(null);

        if (!isLoaded || !validateSignUp()) {
            return;
        }

        try {
            setIsSubmitting(true);
            await signUp.create({
                emailAddress: emailAddress.trim(),
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setIsPendingVerification(true);
        } catch (error: any) {
            const firstError = error?.errors?.[0]?.message;
            setSubmitError(firstError ?? "We couldn't create your account right now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onVerifyCode = async () => {
        setSubmitError(null);

        if (!isLoaded || !validateCode()) {
            return;
        }

        try {
            setIsSubmitting(true);
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode.trim(),
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (error: any) {
            const firstError = error?.errors?.[0]?.message;
            setSubmitError(firstError ?? "The code looks invalid. Please check and try again.");
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
                        <Text className="auth-title">Create your account</Text>
                        <Text className="auth-subtitle">Set up secure access and take control of your subscriptions.</Text>
                    </View>

                    <View className="auth-card">
                        <View className="auth-form">
                            {!isPendingVerification ? (
                                <>
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
                                            placeholder="Create a strong password"
                                            placeholderTextColor="rgba(0,0,0,0.45)"
                                            className={clsx("auth-input", fieldErrors.password && "auth-input-error")}
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        {fieldErrors.password ? <Text className="auth-error">{fieldErrors.password}</Text> : null}
                                    </View>

                                    <Text className="auth-helper">Use 8+ characters to protect your account and billing history.</Text>
                                </>
                            ) : (
                                <>
                                    <View className="auth-field">
                                        <Text className="auth-label">Email verification code</Text>
                                        <TextInput
                                            keyboardType="number-pad"
                                            placeholder="Enter 6-digit code"
                                            placeholderTextColor="rgba(0,0,0,0.45)"
                                            className={clsx("auth-input", fieldErrors.verificationCode && "auth-input-error")}
                                            value={verificationCode}
                                            onChangeText={setVerificationCode}
                                            maxLength={6}
                                        />
                                        {fieldErrors.verificationCode ? <Text className="auth-error">{fieldErrors.verificationCode}</Text> : null}
                                    </View>

                                    <Text className="auth-helper">We sent a verification code to {emailAddress.trim()}.</Text>
                                </>
                            )}

                            {submitError ? <Text className="auth-error">{submitError}</Text> : null}

                            <Pressable
                                className={clsx("auth-button", isDisabled && "auth-button-disabled")}
                                onPress={isPendingVerification ? onVerifyCode : onRequestVerification}
                                disabled={isDisabled}
                            >
                                <Text className="auth-button-text">
                                    {isSubmitting
                                        ? isPendingVerification
                                            ? "Verifying..."
                                            : "Creating account..."
                                        : isPendingVerification
                                            ? "Verify and continue"
                                            : "Create account"}
                                </Text>
                            </Pressable>
                        </View>

                        <View className="auth-link-row">
                            <Text className="auth-link-copy">Already have an account?</Text>
                            <Link href="/(auth)/sign-in" className="auth-link">
                                Sign in
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;
