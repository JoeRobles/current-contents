'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});
const postTable = process.env.POST_TABLE;
const uniqid = requre('uniqid');

const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message)
  }
};

module.exports.createAuthor = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const post = {
    authorId: uniqid(),
    createdAt: newDate().toISOString(),
    userId: 1,
    title: reqBody.title,
    body: reqBody.body,
  };

  return db.put({
    TableName: postTable,
    Item: post
  })
  .promise().then(() => {
    callback(null, response(201, post))
  })
  .catch(err => response(null, response(err.statusCode, err)));
};
