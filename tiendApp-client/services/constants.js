export const URL_BASE = "http://localhost:8000/api";

export async function fetchService({ uri, data, method, params = '' }) {

  if(method === 'GET'){
    const response = await fetch(`${URL_BASE}${uri}?${params}`, {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin"
    });
    return response.json();
  }

  const response = await fetch(`${URL_BASE}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
}
