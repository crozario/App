import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import type {FC, Ref, RefObject} from 'react';
import {withOnyx} from 'react-native-onyx';
import MagicCodeInput from '@components/MagicCodeInput';
import useLocalize from '@hooks/useLocalize';
import * as ErrorUtils from '@libs/ErrorUtils';
import * as ValidationUtils from '@libs/ValidationUtils';
import type {TwoFactorAuthStepOnyxProps} from '@pages/settings/Security/TwoFactorAuth/TwoFactorAuthPropTypes';
import * as Session from '@userActions/Session';
import type {TranslationPaths} from '@src/languages/types';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Errors} from '@src/types/onyx/OnyxCommon';

type AutoCompleteVariant = 'sms-otp' | 'one-time-code' | 'off';

type OnyxDataWithErrors = {
    errors?: Errors | null;
};

type BaseTwoFactorAuthFormProps = TwoFactorAuthStepOnyxProps & {
    autoComplete: AutoCompleteVariant;
    ref: RefObject<HTMLFormElement> | (() => void);
};

type MagicCodeInputHandle = {
    focus: () => void;
    focusLastSelected: () => void;
    resetFocus: () => void;
    clear: () => void;
    blur: () => void;
};

function BaseTwoFactorAuthForm({account, autoComplete, ref}: BaseTwoFactorAuthFormProps) {
    const [formError, setFormError] = useState<{twoFactorAuthCode?: string}>({});
    const [twoFactorAuthCode, setTwoFactorAuthCode] = useState('');
    const inputRef: Ref<MagicCodeInputHandle> = useRef(null);
    const {translate} = useLocalize();

    /**
     * Handle text input and clear formError upon text change
     */
    const onTextInput = useCallback(
        (text: string) => {
            setTwoFactorAuthCode(text);
            setFormError({});

            if (account?.errors) {
                Session.clearAccountMessages();
            }
        },
        [account?.errors],
    );

    /**
     * Check that all the form fields are valid, then trigger the submit callback
     */
    const validateAndSubmitForm = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        if (!twoFactorAuthCode.trim()) {
            setFormError({twoFactorAuthCode: 'twoFactorAuthForm.error.pleaseFillTwoFactorAuth'});
            return;
        }

        if (!ValidationUtils.isValidTwoFactorCode(twoFactorAuthCode)) {
            setFormError({twoFactorAuthCode: 'twoFactorAuthForm.error.incorrect2fa'});
            return;
        }

        setFormError({});
        Session.validateTwoFactorAuth(twoFactorAuthCode);
    }, [twoFactorAuthCode]);

    useImperativeHandle(ref as () => void, () => ({
        validateAndSubmitForm() {
            validateAndSubmitForm();
        },
        focus() {
            if (!inputRef.current) {
                return;
            }
            inputRef.current.focus();
        },
    }));

    return (
        <MagicCodeInput
            autoComplete={autoComplete}
            name="twoFactorAuthCode"
            value={twoFactorAuthCode}
            onChangeText={onTextInput}
            onFulfill={validateAndSubmitForm}
            errorText={formError.twoFactorAuthCode ? translate(formError.twoFactorAuthCode as TranslationPaths) : ErrorUtils.getLatestErrorMessage(account as OnyxDataWithErrors)}
            ref={inputRef}
            autoFocus={false}
        />
    );
}

const BaseTwoFactorAuthFormWithRef = forwardRef(({ref, ...props}: BaseTwoFactorAuthFormProps) => (
    <BaseTwoFactorAuthForm
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={ref}
    />
));

(BaseTwoFactorAuthFormWithRef as FC).displayName = 'BaseTwoFactorAuthFormWithRef';

export default withOnyx<BaseTwoFactorAuthFormProps, TwoFactorAuthStepOnyxProps>({
    account: {key: ONYXKEYS.ACCOUNT},
})(BaseTwoFactorAuthFormWithRef);
