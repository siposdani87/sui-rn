import React, { Fragment, ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { Styles, Tokens } from '../constants';

export default function ActionButtons(props: {
    label?: string;
    actionButtons?: ReactNode[];
}) {
    if (!props.actionButtons) {
        return null;
    }

    const labelOffset = Tokens.fontSizeBody + Tokens.spacingXs;
    const platformAdjust = Platform.select({ android: 7, ios: 2 }) ?? 2;
    const noLabelAdjust = Platform.select({ android: -2, ios: -1 }) ?? -1;
    const top = props.label ? labelOffset + platformAdjust : noLabelAdjust;

    return (
        <View style={[Styles.actionsContainer, { top }]}>
            {props.actionButtons.map((actionButton, key) => (
                <Fragment key={key}>{actionButton}</Fragment>
            ))}
        </View>
    );
}
