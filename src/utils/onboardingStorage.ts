import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_FLAG_KEY = 'nolza.hasSeenOnboarding';

export const getHasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_FLAG_KEY);
    return value === 'true';
  } catch (error) {
    console.warn('Failed to read onboarding flag', error);
    return false;
  }
};

export const setHasSeenOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_FLAG_KEY, 'true');
  } catch (error) {
    console.warn('Failed to set onboarding flag', error);
  }
};

export const resetHasSeenOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_FLAG_KEY);
  } catch (error) {
    console.warn('Failed to reset onboarding flag', error);
  }
};
