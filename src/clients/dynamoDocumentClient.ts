import { DynamoDB } from 'aws-sdk';

let dynamoDocumentClient: DynamoDB.DocumentClient | null = null;

export const getDynamoDBDocument = (): DynamoDB.DocumentClient => {
  if (!dynamoDocumentClient) dynamoDocumentClient = new DynamoDB.DocumentClient();
  return dynamoDocumentClient;
}