import React, { Component } from 'react';
import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
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
import {
    AWS_COGNITO_CLIENT_ID, AWS_COGNITO_IDENTITY_POOL_ID, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_IDENTITY_POOL_ID_FACEBOOK,
    AWS_REGION, awsObtenerCognitoLoginObject,
    TEST_USER_EMAIL, TEST_USER_PWD
} from '../config/config-DEV';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import FBLoginButton from './components/FBLoginButton';

class Login extends Component {

    state = {
        loading: false
    }

    handleS3 = async () => {
        AWS.config.region = AWS_REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID });
        const S3Client = new S3();

        const bucketName = 'XXXXXX';
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
            Username: TEST_USER_EMAIL,
            Password: TEST_USER_PWD
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        const poolData = {
            UserPoolId: AWS_COGNITO_USER_POOL_ID,
            ClientId: AWS_COGNITO_CLIENT_ID
        };
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: TEST_USER_EMAIL,
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
        //Realizamos la autenticación de AWS
        AWS.config.region = AWS_REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
            Logins: awsObtenerCognitoLoginObject(result.getIdToken().getJwtToken())
        });

        this.setState({
            loading: false
        });
        this.props.navigation.navigate('Main');
    }

    handleCrash = () => {
        console.log("Forzamos crash para crashlytics 3.");
        firebase.crashlytics().log("Forzamos error en Crashlytics de manera manual");
        firebase.crashlytics().crash();
    }

    handleFBLogin = async (error, result) => {
        if (error) {
            console.log(JSON.stringify(error))
            alert("Login failed with error: " + error.message);
        } else if (result.isCancelled) {
            alert("Login was cancelled");
        } else {
            const token = (await AccessToken.getCurrentAccessToken()).accessToken;
            console.log("FB Token: "+token);
            AWS.config.region = AWS_REGION;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID_FACEBOOK,
                Logins: {
                    'graph.facebook.com':token
                }
            });
            
            this.props.navigation.navigate('Main');
        }
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleCrash}
                >
                    <Text style={styles.buttonLabel}>Crash</Text>
                </TouchableOpacity>
                <FBLoginButton
                    handleFBLogin={this.handleFBLogin}
                />

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