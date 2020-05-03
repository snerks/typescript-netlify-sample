import { Context, Callback, Handler } from "aws-lambda";

interface HttpHeaders {
  [key: string]: string;
}

interface QueryStringParameters {
  [key: string]: string;
}

interface HttpRequestEvent {
  path: string;
  queryStringParameters?: QueryStringParameters;
  headers: HttpHeaders;
}

interface HttpResponse {
  statusCode: number;
  headers?: HttpHeaders;
  body?: string;
}

export const handler: Handler = (
  event: HttpRequestEvent,
  context: Context,
  callback: Callback<HttpResponse>
) => {
  console.log("event", event);
  console.log("context", context);
  console.log("queryStringParameters", event.queryStringParameters);

  const userAgent = event.headers["user-agent"];

  const isEdge = userAgent.indexOf("Edge") > -1;
  const hasChrome = userAgent.indexOf("Chrome") > -1;

  const isChrome = hasChrome && !isEdge;
  const isInternetExplorer = userAgent.indexOf("Trident") > -1;
  const isFirefox = userAgent.indexOf("Firefox") > -1;

  let browserName = "Edge";

  if (isChrome) {
    browserName = "Chrome";
  }

  if (isFirefox) {
    browserName = "Firefox";
  }

  if (isInternetExplorer) {
    browserName = "Internet Explorer";
  }

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<h1>Home Page</h1><h2>User-Agent=[${JSON.stringify(
      event.headers["user-agent"],
      null,
      2
    )}]</h2><h3>${browserName}</h3>`,
  });
};
