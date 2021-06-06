import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {uploadHttpHandler, getHttpHandler } from './src/http';

export const upload: APIGatewayProxyHandlerV2 = async(event) => {
  await uploadHttpHandler(event);
  return { 
    statusCode: 200,
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }, 
    body: 'Success'
  };
}

export const files: APIGatewayProxyHandlerV2 = async(event) => {
  const files = await getHttpHandler(event);
  console.log(files);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }, 
    body: JSON.stringify(files)
  }


}