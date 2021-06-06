import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import type {Key} from 'aws-sdk/clients/dynamodb';
import { File } from '../entities';
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns';
import chunk from '../utils/chunk';
import stitch from '../utils/stitch';


export class FileMapper {
  db: DocumentClient;
  tableName: string;

  constructor(db: DocumentClient, tableName: string = 'FileTableV4'){
    this.db = db;
    this.tableName = tableName;
  }

  async putFile(file: File): Promise<void> {
    const currDate = format(new Date(),'yyyy-mm-dd' );
    const chunks = chunk(file.content);
    const id = uuidv4()
    await Promise.all(chunks.map(async(chunk: any, index:number) =>{
      await this.db
      .put({
        TableName: this.tableName,
        Item: {
          id: id,
          chunk: `#chunk${('0' + index).slice(-2)}`,
          path: file.info.path,
          size: file.info.size,
          type: file.info.type,
          content: chunk,
          dateCreated: currDate
        }
      })
      .promise()
    }))
  }

  async getAllFiles(): Promise<Array<File>> {
    const params: {TableName: string, ExclusiveStartKey?: Key} = {
      TableName: this.tableName,
    };

    const Items = [];
    let items;
    do{
        items =  await this.db.scan(params).promise();
        items.Items.forEach((item) => Items.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return stitch(Items) as Array<File>;
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