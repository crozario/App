import type {StackScreenProps} from '@react-navigation/stack';
import type {OnboardingModalNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';

type OnboardingAccountingProps = Record<string, unknown> & StackScreenProps<OnboardingModalNavigatorParamList, typeof SCREENS.ONBOARDING.EMPLOYEES>;

type BaseOnboardingAccountingProps = OnboardingAccountingProps & {
    /* Whether to use native styles tailored for native devices */
    shouldUseNativeStyles: boolean;
};

export type {OnboardingAccountingProps, BaseOnboardingAccountingProps};
