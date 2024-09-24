const urlQuery = `${process.env.NEXT_POSTHOG_URL}`;

async function fetchPersons() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query: "SELECT count(id) as Persons FROM persons",
    },
  };

  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

async function fetchAvgTime() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT avg(time_on_page) AS avg_time_on_page FROM (SELECT dateDiff('minute', first_timestamp, next_timestamp) AS time_on_page FROM (SELECT distinct_id, event AS first_event, timestamp AS first_timestamp, first_value(event) OVER w AS next_event, first_value(timestamp) OVER w AS next_timestamp FROM events WHERE timestamp > toDateTime('2023-01-01 00:00:00') AND (event = '$pageview' OR event = '$pageleave') WINDOW w AS (PARTITION BY distinct_id ORDER BY timestamp ASC ROWS BETWEEN 1 FOLLOWING AND 1 FOLLOWING) ORDER BY distinct_id, timestamp) AS subquery WHERE first_event = '$pageview' AND (next_event = '$pageleave' OR next_event = '$pageview') AND time_on_page <= 30)",
    },
  };

  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

async function fetchPageViews() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query: "SELECT count() FROM events where event = '$pageview'",
    },
  };

  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function fetchPaths() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT properties.$pathname as MostVisited, count() as timeVisited FROM events GROUP BY MostVisited ORDER BY MostVisited",
    },
  };

  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

async function fetchContries() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query:
        "SELECT properties.$initial_geoip_country_name as Pais, count() as Times FROM persons GROUP BY Pais",
    },
  };

  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function fetchSessions() {
  const body = {
    query: {
      kind: "HogQLQuery",
      query: "SELECT  count (session_id) FROM sessions ",
    },
  };
  const response = await fetch(urlQuery, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export {
  fetchAvgTime,
  fetchContries,
  fetchPageViews,
  fetchPaths,
  fetchPersons,
  fetchSessions,
};
