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
    authorName: reqBody.authorName,
    birthDate: reqBody.birthDate,
    email: reqBody.email,
    createdAt: newDate().toISOString(),
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
