import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ActivityIndicator,
    ToastAndroid,
    FlatList,
    StyleSheet
} from 'react-native';
import Lambda from 'aws-sdk/clients/lambda';
import SNS from 'aws-sdk/clients/sns';
import FichaNegocio from './components/ficha-negocio';
import firebase from 'react-native-firebase';
import { AWS_SNS_PLATFORM_APPLICATION_ARN } from '../config/config-DEV';

class ListaFavoritos extends Component {

    state = {
        loading: true,
        negocios:[]
    }

    async componentDidMount() {

        ////Realizamos una ejecución a Lambda a motivo de pruebas
        await this.cargarCliente();

        //Procedemos a registrarnos en Firebase
        const fcmToken = await firebase.messaging().getToken();
        console.log("Firebase Token: " + fcmToken);
        //Registramos el endpoint en SNS
        const resSNS=await (new SNS()).createPlatformEndpoint({
            PlatformApplicationArn: AWS_SNS_PLATFORM_APPLICATION_ARN,
            Token: fcmToken
        }).promise();
        console.log("Resultado de registro en SNS: " + JSON.stringify(resSNS));
        const endpointARN = resSNS.EndpointArn;

        const lambdaClient = new Lambda();
        const resRegistro=await lambdaClient.invoke({
            FunctionName: 'VC_ActualizarEndPointCliente',
            Payload: JSON.stringify({
                T: "A",
                E: endpointARN
            })
        }).promise();
        console.log("Resultado de registro en Vinco: " + JSON.stringify(resRegistro));

        //Realizamos la comprobación de permisos para recibir mensajes de push notifications
        const permiso = await firebase.messaging().hasPermission();
        if (permiso)
            console.log("Permiso PUSH concedido!!");
        else {
            console.log("Permiso PUSH no ha sido concedido");
            try {
                await firebase.messaging().requestPermission();
                console.log("Permiso PUSH concedido!!");
            }
            catch{
                console.log("Permiso denegado: " + error);
            }
        }
    }

    componentWillUnmount() {
        console.log("WillUnmount");
        this.unsuscribeOnTokenRefreshListener();
        this.unsuscribeMessageListener();
        this.unsuscribeNotificationDisplayedListener();
        this.unsuscribeNotificationListener();
    }

    contador = 0;

    keyExtractor = item => item.ID.toString();

    renderItem = ({ item }) => {
        return (
            <FichaNegocio {...item} />   
        );
    }

    cargarCliente = async () => {

        this.setState({
            loading: true
        });

        ////Realizamos una ejecución a Lambda a motivo de pruebas
        const lambdaClient = new Lambda();
        const params = {
            FunctionName: 'VC_LeerCliente'
        };

        const res = await lambdaClient.invoke(params).promise();
        const datos = JSON.parse(res.Payload);

        this.setState({
            loading: false,
            negocios: datos.CLS.NGS
        });

        this.props.dispatch({
            type: "SET_CLIENTE",
            payload: {
                cliente: datos.CLS
            }
        });
    }

    //Para escuchar la actualización del refresh token de Firebase
    unsuscribeOnTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        //Ejecutar lo que haya que ejecutar cuando cambia el Token
    });

    //Lo siguiente devuelve un Unsuscribe function
    unsuscribeMessageListener = firebase.messaging().onMessage((message) => {
        console.log("Mensaje recibido: " + JSON.stringify(message));
        const payload = JSON.parse(message.data.default);
        const data = JSON.parse(payload.GCM);
        console.log("Notificacion: " + data.notification.text);
        console.log("Data: " + JSON.stringify(data.data));

        const notification = new firebase.notifications.Notification()
            .setNotificationId((this.contador++).toString())
            .setTitle(data.data.NC.N)
            .android.setChannelId('1')
            .setData({
                ...data.data.NC
            });
        notification.android.setAutoCancel(true); //Para cerrar automáticamente la notificación cuando se dio clic en ella.
        notification.android.setBigText(data.notification.text);

        firebase.notifications().displayNotification(notification);
    });

    //Cuando una notificacion es presentada, es decir aparece en la barra de notificaciones
    unsuscribeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
        console.log("Notificacion presentada: ");
        this.cargarCliente();
    })

    //Cuando una notificación es recibida pero no presentada:
    unsuscribeNotificationListener = firebase.notifications().onNotification(notification => {
        console.log("Notificacion recibida: ");
    })

    //Cuando una notificación es tapped/abierta
    unsuscribeNotificationOpenedListener = firebase.notifications().onNotificationOpened(notification => {
        const action = notification.action; //EN caso de que se haya indicado una acción
        const data = notification.notification.data;
        console.log("Notificacion abierta: " + JSON.stringify(data));

        //Para quitar la notificación cuando ya se dió clic en ella:
        //firebase.notifications().removeDeliveredNotification("notificationId");

        //Abrimos la pantalla del negocio
        this.props.dispatch({
            type: "SET_NEGOCIO",
            payload: {
                negocio: data
            }
        });
        this.props.navigation.navigate('Negocio', {
            nombreNegocio: data.N
        });
    })

    itemSeparator = () => <View style={{ borderTopColor: '#eaeaea', borderTopWidth: 2 }} />
                                
    render() {
        if (this.state.loading)
            return (
                <View style={styles.container}>
                    <ActivityIndicator color="#039BE5" />
                </View>
            );
        else
            return (
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.negocios}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.itemSeparator}
                    />
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect(null)(ListaFavoritos);