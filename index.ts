import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {uploadHttpHandler} from './src/http';

export const upload: APIGatewayProxyHandlerV2 = async(event, context, callback) => {
  await uploadHttpHandler(event, context, callback);
  return { statusCode: 200, body: ''};
}

export const get = () => {

}