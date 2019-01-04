import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: 15
                }}
            >
                <LoginButton
                    readPermissions={["email"]}
                    onLoginFinished={this.props.handleFBLogin}
                    onLogoutFinished={() => alert("User logged out")} />
            </View>
        );
    }
};
