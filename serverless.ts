import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-filestore',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          '*'
        ],
        Resource: ['*']
      }
    ]
  },
  
  functions: {
    upload: {
      handler: 'index.upload',
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/files/upload'
          }
        }
      ]
    },
    files: {
      handler: 'index.files',
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/files'
  
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      FileTableV3: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            },
            {
              AttributeName: 'chunk',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'chunk',
              KeyType: 'RANGE'
            }
          ],
          BillingMode: 'PAY_PER_REQUEST',
          TableName: 'FileTableV3'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
