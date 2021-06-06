import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { File } from '../entities';
import {v4 as uuidv4} from 'uuid';


export class FileMapper {
  db: DocumentClient;
  tableName: string;

  constructor(db: DocumentClient, tableName: string){
    this.db = db;
    this.tableName = tableName;
  }

  async putFile(file: File): Promise<void> {
    await this.db
      .put({
        TableName: this.tableName,
        Item: {
          id: uuidv4(),
          path: file.info.path,
          size: file.info.size,
          type: file.info.type,
          content: file.content,
          dateCreated: Date.now()
        }
      })
      .promise()
  }

  async getAllFiles(): Promise<Array<File>> {
    const {Items} = await this.db
    .query({
      TableName: this.tableName
    })
    .promise();

    if (Items?.length !== 1) return null;
    return Items as Array<File>;
  }

  async getFile(id: string): Promise<File> {
    const { Item } = await this.db.get({
      TableName: this.tableName,
      Key: {
        id: id
      }
    })
    .promise();

    if (!Item) return null;

    return Item as File;
  }

}