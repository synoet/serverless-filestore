import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import {FileMapper} from '../mappers/fileMapper';
import { getDynamoDBDocument } from '../clients/dynamoDocumentClient';
import {File} from '../entities';

const uploadHttpHandler= async (event: APIGatewayProxyEventV2) => {
  const documentClient = getDynamoDBDocument();
  const mapper = new FileMapper(documentClient, 'FileTableV3');
  const body = event.body ? <File>JSON.parse(event.body) : null;
  return await mapper.putFile(body);
}

export default uploadHttpHandler;