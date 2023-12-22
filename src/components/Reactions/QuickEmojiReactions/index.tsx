import React from 'react';
import {contextMenuRef} from '@pages/home/report/ContextMenu/ReportActionContextMenu';
import CONST from '@src/CONST';
import BaseQuickEmojiReactions from './BaseQuickEmojiReactions';
import type {OpenPickerCallback, QuickEmojiReactionsProps} from './types';

function QuickEmojiReactions({closeContextMenu, ...props}: QuickEmojiReactionsProps) {
    const onPressOpenPicker = (openPicker?: OpenPickerCallback) => {
        openPicker?.(contextMenuRef.current?.contentRef.current, {
            horizontal: CONST.MODAL.ANCHOR_ORIGIN_HORIZONTAL.RIGHT,
            vertical: CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
        });
    };

    return (
        <BaseQuickEmojiReactions
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            onPressOpenPicker={onPressOpenPicker}
            onWillShowPicker={closeContextMenu}
        />
    );
}

QuickEmojiReactions.displayName = 'QuickEmojiReactions';

export default QuickEmojiReactions;
