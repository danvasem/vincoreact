import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Lambda from 'aws-sdk/clients/lambda';
import MapView, { Marker } from 'react-native-maps';

class Mapa extends Component {

    state = {
        loading: true,
        locales: null
    }

    async componentDidMount() {

        const res= await (new Lambda()).invoke({
            FunctionName: "VC_LeerListaLocales",
            Payload: "100"
        }).promise();

        const data = (JSON.parse(res.Payload));

        this.setState({
            loading: false,
            locales: data.LCS
        });
    }

    render() {
        console.log("Aqui va un mapa");
        return (
            <MapView
                style={styles.map}
                region={
                    {
                        latitude: -2.053588,
                        longitude: -79.929587,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2
                    }
                }
            >
                {
                    !this.state.loading && this.state.locales.map(local => {
                        return (
                            <Marker
                                key={local.ID}
                                coordinate={
                                    {
                                        latitude: local.LT,
                                        longitude: local.LG
                                    }
                                }
                                title={local.N}
                                description={local.HO}
                            />
                        );
                    })
                }
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default Mapa;