import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Lambda from 'aws-sdk/clients/lambda';
import QRCode from 'react-native-qrcode-svg';
import { NavigationActions } from 'react-navigation';

class QrCode extends Component {

    state = {
        loading: true,
        codigoTemporal: null
    };

    async componentDidMount() {
        const lambdaClient = new Lambda();

        const params = {
            FunctionName: "VC_LeerCodigoTemporalCliente"
        };

        const res = await lambdaClient.invoke(params).promise();
        const datos = JSON.parse(res.Payload);

        this.setState({
            loading: false,
            codigoTemporal: datos.C
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading ?
                        <ActivityIndicator color="#039BE5" />
                        :
                        <View style={styles.card}>
                            <QRCode
                                value={this.state.codigoTemporal}
                                size={200}
                            />
                            <Text>{this.state.codigoTemporal}</Text>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        padding: 20,
        height: 240,
        width: 240
    }
});

export default QrCode;