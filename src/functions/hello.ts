import { Context, Callback, Handler } from "aws-lambda";
export const handler: Handler = (
  event: any,
  context: Context,
  callback: Callback
) => {
  console.log("context", context);
  console.log("queryStringParameters", event.queryStringParameters);

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "The Message": "Hello, World" }),
  });
};
