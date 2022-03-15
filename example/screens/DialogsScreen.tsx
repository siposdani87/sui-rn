import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    Dialog,
    Text,
    TextButton,
    TextField,
    useModalState
} from '@siposdani87/sui-rn';

export default function DialogsScreen() {
    const [dialog1, openDialog1, closeDialog1] = useModalState();
    const [dialog2, openDialog2, closeDialog2] = useModalState();
    const [dialog3, openDialog3, closeDialog3] = useModalState();

    return (
        <Fragment>
            <StatusBar style="light" />
            <ScrollView>
                <View style={styles.container}>
                    <Dialog visible={dialog1} onClose={closeDialog1}>
                        <Text>
                            Dialog 1 text this paragraph has long long text to
                            test multiline content and numbers: 1, 34556, 54.54
                        </Text>
                    </Dialog>
                    <Button onPress={openDialog1} title="dialog1 with text" />

                    <Dialog
                        visible={dialog2}
                        title="Dialog 2"
                        buttons={[
                            <TextButton
                                key={0}
                                title="cancel"
                                onPress={closeDialog2}
                            />,
                            <Button
                                key={1}
                                title="done"
                                onPress={closeDialog2}
                            />,
                        ]}
                    >
                        <Text>Dialog 2 text</Text>
                        <TextField
                            label="Name"
                            value=""
                            onValueChange={() => null}
                            desc="Description of name"
                        />
                    </Dialog>
                    <Button onPress={openDialog2} title="dialog2 with form" />

                    <Dialog
                        visible={dialog3}
                        title="Dialog 3 with long title and long long!!!"
                        onClose={closeDialog3}
                        buttons={[
                            <TextButton
                                key={0}
                                title="cancel long title!!!"
                                onPress={closeDialog3}
                            />,
                            <Button
                                key={1}
                                title="done with long title!!!"
                                onPress={closeDialog3}
                            />,
                        ]}
                    >
                        <Text>Dialog 3 text</Text>
                    </Dialog>
                    <Button
                        onPress={openDialog3}
                        title="dialog3 with long titles"
                    />
                </View>
            </ScrollView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
