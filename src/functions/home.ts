import { Context, Callback, Handler } from "aws-lambda";
export const handler: Handler = (
  event: any,
  context: Context,
  callback: Callback
) => {
  console.log("event", event);
  console.log("context", context);
  console.log("queryStringParameters", event.queryStringParameters);

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: "<h1>Home Page</h1>",
  });
};
