import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // context.waitUntil(logRequest(req));

  let jsonObject = null;

  // await fetch("https://jsonplaceholder.typicode.com/todos/1")
  //   .then((response) => response.json())
  //   .then((json) => {
  //     console.log("json", json);
  //     jsonObject = json;
  //   });

  const apiKey = process.env.APPRENTICE_API_KEY || "NOT_SET_IN_ENVIRONMENT";

  // console.log(`apiKey=[${apiKey}]`);

  const res = await fetch(
    "https://api.apprenticeships.education.gov.uk/vacancies/vacancy",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch data:", res.statusText);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: res.status,
    });
  } else {
    jsonObject = await res.json();
    console.log("jsonObject", jsonObject);
  }

  return new Response(JSON.stringify(jsonObject), {
    status: 200,
  });
};

// async function logRequest(req: Request) {
//   await fetch("https://example.com/log", {
//     method: "POST",
//     body: JSON.stringify({ url: req.url, timestamp: Date.now() }),
//     headers: { "Content-Type": "application/json" },
//   });
// }
