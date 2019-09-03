'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const postsTable = process.env.POSTS_TABLE;
const uniqid = require('uniqid');

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.createAuthor = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  if (
    !reqBody.authorName ||
    reqBody.authorName.trim() === '' ||
    !reqBody.birthDate ||
    reqBody.birthDate.trim() === '' ||
    !reqBody.email ||
    reqBody.email.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'Post must have a authorName a birthDate and an email, and they must not be empty'
      })
    );
  }

  const post = {
    authorId: uniqid(),
    authorName: reqBody.authorName,
    birthDate: reqBody.birthDate,
    email: reqBody.email,
    createdAt: new Date().toISOString(),
  };

  return db.put({
    TableName: postsTable,
    Item: post
  })
  .promise()
  .then(() => {
      callback(null, response(201, post));
  })
  .catch(err => response(null, response(err.statusCode, err)));
};
