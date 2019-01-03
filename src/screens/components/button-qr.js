import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Modal
} from 'react-native';
import QrCode from '../qrcode';

class ButtonQr extends Component{

    state = {
        modalVisible: false
    }

    handlePress = () => {
        this.setState({
            modalVisible: true
        });
    }

    closeDialog = () => {
        this.setState({
            modalVisible: false
        });
    }


    render() {
        if (!this.state.modalVisible) {
            return (
                <TouchableOpacity
                    style={styles.container}
                    onPress={this.handlePress}
                >
                    <Text style={styles.text}>QR</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <View>
                    <Modal
                        animationType="slide"
                        onRequestClose={this.closeDialog}
                        transparent
                        visible
                    >
                        <QrCode
                            handlePressCerrar={this.closeDialog}
                        />
                    </Modal>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 50,
        height: 30,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#039BE5"   
    },
    text: {
        color: 'white'
    }
});

export default ButtonQr;
