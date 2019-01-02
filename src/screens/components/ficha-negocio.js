import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import S3 from 'aws-sdk/clients/s3';

class FichaNegocio extends Component {

    state= {
        loading: true,
        urlImagen: null
    }

    async componentDidMount() {
        const params = {
            Bucket: 'vincoappfiles/negocios/listafavoritos',
            Key: `${this.props.NU}.jpg`
        };
        const S3Client = new S3();

        const url = S3Client.getSignedUrl('getObject',params);

        this.setState({
            loading: false,
            urlImagen: url
        });
    }

    handlePress = () => {
        this.props.dispatch({
            type: "SET_NEGOCIO",
            payload: {
                negocio: { ...this.props }
            }
        });
        this.props.navigation.navigate('Negocio', {
            nombreNegocio: this.props.N
        });
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.handlePress}
            >
                <View style={styles.left}>
                    {
                        this.state.loading ?
                            <Text>Cargando...</Text>
                            :
                            <Image
                                style={styles.image}
                                source={{ uri: this.state.urlImagen }}
                            />
                    }
                </View>
                <View style={styles.right} >
                    <Text>{this.props.N}</Text>
                    <Text>{(new Date(this.props.FC)).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100
    },
    left: {
        width: 100
    },
    right: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 10
    },
    image:{
        height: 100,
        width: 100
    }
});

export default connect(null)(withNavigation(FichaNegocio));