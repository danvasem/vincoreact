import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

class Negocio extends Component {

    static navigationOptions = ({ navigation }) => {
        console.log("Nombre de negocio: " + navigation.getParam("nombreNegocio", "MI NEGOCIO"));
        return {
            title: navigation.getParam("nombreNegocio","MI NEGOCIO")
        };
    }

    render() {
        if (!this.props.negocio) {
            return (
                <View>
                    <ActivityIndicator
                        style={styles.loading}
                        color="#039BE5"
                    />
                </View>
            );
        }
        return (
            <View>
                <Text>{this.props.negocio.N}</Text>
                <Text>{this.props.negocio.ID}</Text>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        negocio: state.negocio.datos
    };
}

export default connect(mapStateToProps)(Negocio);
