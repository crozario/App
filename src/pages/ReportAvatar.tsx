import React from 'react';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import AttachmentModal from '@components/AttachmentModal';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackScreenOptionsProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import * as ReportUtils from '@libs/ReportUtils';
import * as UserUtils from '@libs/UserUtils';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {Policy, Report} from '@src/types/onyx';

type ReportAvatarOnyxProps = {
    report: OnyxEntry<Report>;
    isLoadingApp: OnyxEntry<boolean>;
    policies: OnyxCollection<Policy>;
};

type ReportAvatarProps = ReportAvatarOnyxProps & PlatformStackScreenOptionsProps<AuthScreensParamList, typeof SCREENS.REPORT_AVATAR>;

function ReportAvatar({report = {} as Report, policies, isLoadingApp = true}: ReportAvatarProps) {
    const policy = policies?.[`${ONYXKEYS.COLLECTION.POLICY}${report?.policyID ?? '0'}`];
    const policyName = ReportUtils.getPolicyName(report, false, policy);
    const avatarURL = ReportUtils.getWorkspaceAvatar(report);

    return (
        <AttachmentModal
            headerTitle={policyName}
            defaultOpen
            source={UserUtils.getFullSizeAvatar(avatarURL, 0)}
            onModalClose={() => {
                Navigation.goBack(ROUTES.REPORT_WITH_ID_DETAILS.getRoute(report?.reportID ?? ''));
            }}
            isWorkspaceAvatar
            maybeIcon
            originalFileName={policy?.originalFileName ?? policyName}
            shouldShowNotFoundPage={!report?.reportID && !isLoadingApp}
            isLoading={(!report?.reportID || !policy?.id) && !!isLoadingApp}
        />
    );
}

ReportAvatar.displayName = 'ReportAvatar';

export default withOnyx<ReportAvatarProps, ReportAvatarOnyxProps>({
    report: {
        key: ({route}) => `${ONYXKEYS.COLLECTION.REPORT}${route.params.reportID ?? ''}`,
    },
    isLoadingApp: {
        key: ONYXKEYS.IS_LOADING_APP,
    },
    policies: {
        key: ONYXKEYS.COLLECTION.POLICY,
    },
})(ReportAvatar);
