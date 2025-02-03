export async function gqlRequest<T = any>(query: string, variables = {}) {
  const graphqlUrl =
    import.meta.env.VITE_GRAPHQL_URL ||
    `http://${window.location.hostname}:4001`;
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  return data as T;
}
