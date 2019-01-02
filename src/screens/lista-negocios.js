import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    ActivityIndicator,
    FlatList,
    StyleSheet
    } from 'react-native';
import Lambda from 'aws-sdk/clients/lambda';
import FichaNegocio from './components/ficha-negocio';

class ListaNegocios extends Component {

    state = {
        loadingNegocios: true,
        negocios: null
    };

    async componentDidMount() {

        const res = await (new Lambda()).invoke({
            FunctionName: "VC_LeerListaNegocios",
            Payload: JSON.stringify({
                T: 1,
                C: 30,
                IU: 100
            })
        }).promise();

        const data = JSON.parse(res.Payload);

        this.setState({
            loadingNegocios: false,
            negocios: data.NGS
        });
    }

    keyExtractor = item => item.ID.toString();


    renderItem = ({ item }) => <FichaNegocio {...item} />   

    renderItem = ({ item }) => {
        return (
            <FichaNegocio {...item} />
        );
    }

    itemSeparator = () => <View style={{ borderTopColor: '#eaeaea', borderTopWidth: 2 }} />

    filtrarNegocios = (favoritos, negocios) => {
        const negociosFiltrados = negocios.filter(negocio => {
            return !favoritos.find(X => {
                return X.ID === negocio.ID;
            });
        });
        return negociosFiltrados;
    }
                                
    render() {
        if (this.props.loadingCliente || this.state.loadingNegocios) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color="#039BE5" />
                </View>
            );
        }
        else {
            return (
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.filtrarNegocios(this.props.cliente.NGS, this.state.negocios)}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.itemSeparator}
                    />
                </View>
            );
        }
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

function mapStateToProps(state, props) {
    if (!state) {
        return {
            loadingCliente: true
        };
    }
    else {
        return {
            loadingCliente: false,
            cliente: state.cliente.datos
        };
    }
}

export default connect(mapStateToProps)(ListaNegocios);