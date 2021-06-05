import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const uploadHttpHandler: APIGatewayProxyHandlerV2 = (event) => {
  const body = event.body ? JSON.parse(event.body) : null;
  console.log(body);
}

export default uploadHttpHandler;