import React from 'react';
import {View} from 'react-native';
import FocusTrapForScreens from '@components/FocusTrap/FocusTrapForScreen';
import useThemeStyles from '@hooks/useThemeStyles';
import BaseOnboardingAccounting from './BaseOnboardingAccounting';
import type {OnboardingAccountingProps} from './types';

function OnboardingAccounting({...rest}: OnboardingAccountingProps) {
    const styles = useThemeStyles();
    return (
        <FocusTrapForScreens>
            <View style={styles.h100}>
                <BaseOnboardingAccounting
                    shouldUseNativeStyles={false}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...rest}
                />
            </View>
        </FocusTrapForScreens>
    );
}

OnboardingAccounting.displayName = 'OnboardingPurpose';

export default OnboardingAccounting;
