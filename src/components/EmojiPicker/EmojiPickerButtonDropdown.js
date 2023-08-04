import React, {useRef, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from '../../styles/styles';
import CONST from '../../CONST';
import * as StyleUtils from '../../styles/StyleUtils';
import getButtonState from '../../libs/getButtonState';
import * as Expensicons from '../Icon/Expensicons';
import Tooltip from '../Tooltip';
import Text from '../Text';
import Icon from '../Icon';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import * as EmojiPickerAction from '../../libs/actions/EmojiPickerAction';
import PressableWithoutFeedback from '../Pressable/PressableWithoutFeedback';

const propTypes = {
    /** Flag to disable the emoji picker button */
    isDisabled: PropTypes.bool,

    ...withLocalizePropTypes,
};

const defaultProps = {
    isDisabled: false,
};

const EmojiPickerButtonDropdown = (props) => {
    const emojiPopoverAnchor = useRef(null);
    useEffect(() => EmojiPickerAction.resetEmojiPopoverAnchor, []);

    const onPress = () =>
        EmojiPickerAction.showEmojiPicker(props.onModalHide, (emoji) => props.onInputChange(emoji), emojiPopoverAnchor.current, {
            horizontal: CONST.MODAL.ANCHOR_ORIGIN_HORIZONTAL.LEFT,
            vertical: CONST.MODAL.ANCHOR_ORIGIN_VERTICAL.TOP,
        });

    return (
        <Tooltip text={props.translate('reportActionCompose.emoji')}>
            <PressableWithoutFeedback
                ref={emojiPopoverAnchor}
                style={[styles.chatItemEmojiButton, styles.emojiPickerButtonDropdown, props.style]}
                disabled={props.isDisabled}
                onPress={onPress}
                nativeID="emojiDropdownButton"
                accessibilityLabel="statusEmoji"
                accessibilityRole="text"
            >
                {({hovered, pressed}) => (
                    <View style={styles.emojiPickerButtonDropdownContainer}>
                        <Text
                            style={styles.emojiPickerButtonDropdownIcon}
                            numberOfLines={1}
                        >
                            {props.value}
                        </Text>
                        <View style={[styles.popoverMenuIcon, styles.pointerEventsAuto, props.disabled && styles.cursorDisabled, styles.rotate90]}>
                            <Icon
                                src={Expensicons.ArrowRight}
                                fill={StyleUtils.getIconFillColor(getButtonState(hovered, pressed))}
                            />
                        </View>
                    </View>
                )}
            </PressableWithoutFeedback>
        </Tooltip>
    );
};

EmojiPickerButtonDropdown.propTypes = propTypes;
EmojiPickerButtonDropdown.defaultProps = defaultProps;
EmojiPickerButtonDropdown.displayName = 'EmojiPickerButtonDropdown';
export default withLocalize(EmojiPickerButtonDropdown);
