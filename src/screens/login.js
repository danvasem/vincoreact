import React, { Component } from 'react';
import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
import Lambda from 'aws-sdk/clients/lambda';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import {
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';

class Login extends Component {

    state = {
        loading: false
    }

    handleS3 = async () => {
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'us-east-1:28f2a308-58e5-4be4-86fa-ba5b5ec56215' });
        const S3Client = new S3();

        const bucketName = 'daniel-vinco-04';
        const keyName = 'Hola mundo.txt';
        
        await S3Client.createBucket({ Bucket: bucketName }).promise();

        var objectParams = {
            Bucket: bucketName,
            Key: keyName,
            Body: 'Hola mundo'
        };

        await S3Client.putObject(objectParams).promise();

        ToastAndroid.show("Exitoso", ToastAndroid.LONG);
    }

    handleLogin = async () => {

        this.setState({
            loading: true
        });

        const authenticationData = {
            Username: 'turok3000@gmail.com',
            Password: 'XXXXXX'
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        const poolData = {
            UserPoolId: 'us-east-1_OlPayx8XF',
            ClientId: '12jbk98ir87tjct5icd5f4h6ld'
        };
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: 'turok3000@gmail.com',
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: this.autenticacionExitosa,
            onFailure: function (err) {
                ToastAndroid.show("Error: " + err.message, ToastAndroid.LONG);
            }
        });
    }

    autenticacionExitosa = async (result) => {
        const accessToken = result.getAccessToken().getJwtToken();

        //Realizamos la autenticación de AWS
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:28f2a308-58e5-4be4-86fa-ba5b5ec56215',
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_OlPayx8XF': result.getIdToken().getJwtToken()
            }
        });

        //ToastAndroid.show("Login exitoso!!", ToastAndroid.LONG);

        this.setState({
            loading: false
        });
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    <Text style={styles.buttonLabel}>Login</Text>
                </TouchableOpacity>
                {
                    this.state.loading &&
                    <ActivityIndicator
                        style={styles.loading}
                        color="#039BE5"
                    />
                }

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC107'
    },
    input: {
        marginTop: 10,
        borderColor: 'blue',
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5
    },
    button: {
        backgroundColor: '#039BE5',
        color: 'white',
        marginTop: 15,
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    loading: {
        marginTop: 10
    }
});

export default Login;