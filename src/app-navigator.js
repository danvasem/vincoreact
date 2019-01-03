import React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer,
    NavigationActions
} from 'react-navigation';
import {
    Text
} from 'react-native';
import firebase from 'react-native-firebase';
import { BackHandler } from 'react-native';
import ListaFavoritos from './screens/lista-favoritos';
import ListaNegocios from './screens/lista-negocios';
import Login from './screens/login';
import Mapa from './screens/mapa';
import ButtonQr from './screens/components/button-qr';
import negocio from './screens/negocio';

const MainTab = createBottomTabNavigator(
    {
        ListaFavoritos: {
            screen: ListaFavoritos,
            navigationOptions: {
                tabBarIcon: <Text>🏠</Text>
            }
        },
        ListaNegocios: {
            screen: ListaNegocios,
            navigationOptions: {
                tabBarIcon: <Text>😂</Text>
            }
        },
        Mapa: {
            screen: Mapa,
            navigationOptions: {
                tabBarIcon: <Text>😎</Text>
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: '#039BE5'
        }
    }
);

const Main = createStackNavigator(
    {
        Main: {
            screen: MainTab,
            navigationOptions: {
                title: 'VINCO',
                headerRight: <ButtonQr />
            }
        },
        Negocio: {
            screen: negocio,
            navigationOptions: {
                headerRight: <ButtonQr />
            }
        }
    },
    {
        initialRouteName: 'Main'
    }
);

const SwitchNavigator = createSwitchNavigator(
    {
        Login: Login,
        Main: Main
    },
    {
        initialRouteName: 'Login'
    }
);

class AppNavigator extends SwitchNavigator {

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

        //Para saber si la app se abrió desde una notificacion y actuar en consecuencia
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const notification = notificationOpen.notification;
            console.log("Abierto desde notificacion.");
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        //Cuando le piques al back de Android
        console.log(JSON.stringify(this.props.navigation));
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
        return true;
    }
}

export default createAppContainer(AppNavigator);