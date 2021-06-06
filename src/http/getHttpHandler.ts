import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import {FileMapper} from '../mappers/fileMapper';
import { getDynamoDBDocument } from '../clients/dynamoDocumentClient';
import {File} from '../entities';

const getHttpHandler = async(event: APIGatewayProxyEventV2): Promise<File[]> => {
  const documentClient = getDynamoDBDocument();
  const mapper = new FileMapper(documentClient, 'FileTableV3');
  return await mapper.getAllFiles();
}

export default getHttpHandler;