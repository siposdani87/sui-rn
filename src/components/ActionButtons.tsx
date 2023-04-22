import React, { Fragment, ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { Styles } from '../constants';

export default function ActionButtons(props: {
    label?: string;
    actionButtons?: ReactNode[];
}) {
    if (!props.actionButtons) {
        return null;
    }

    return (
        <View
            style={[
                Styles.actionsContainer,
                Platform.select({
                    android: {
                        top: props.label ? 26 : -2,
                    },
                    ios: {
                        top: props.label ? 21 : -1,
                    },
                }),
            ]}
        >
            {props.actionButtons.map((actionButton, key) => (
                <Fragment key={key}>{actionButton}</Fragment>
            ))}
        </View>
    );
}
