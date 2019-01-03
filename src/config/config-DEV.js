export const AWS_REGION = 'us-east-1';

export const AWS_COGNITO_IDENTITY_POOL_ID = 'us-east-1:28f2a308-58e5-4be4-86fa-ba5b5ec56215';
export const AWS_COGNITO_USER_POOL_ID = 'us-east-1_OlPayx8XF';
export const AWS_COGNITO_CLIENT_ID = '12jbk98ir87tjct5icd5f4h6ld';


export const TEST_USER_EMAIL = "turok3000@gmail.com";
export const TEST_USER_PWD = "Vinco123";

export function awsObtenerCognitoLoginObject(token) {
    return { 'cognito-idp.us-east-1.amazonaws.com/us-east-1_OlPayx8XF': token };
}

export const AWS_SNS_PLATFORM_APPLICATION_ARN = 'arn:aws:sns:us-east-1:984544342457:app/GCM/VincoReact';

export const AWS_S3_BUCKET_VINCO_LISTA_FAVORITOS = 'vincoappfiles/negocios/listafavoritos';