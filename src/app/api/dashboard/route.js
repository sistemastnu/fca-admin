import { NextResponse } from "next/server";
import {
  fetchAvgTime,
  fetchContries,
  fetchPageViews,
  fetchPaths,
  fetchPersons,
  fetchSessions,
} from "./apiHelpers";

export async function GET() {
  try {
    const [avgTime, contires, pageviews, paths, persons, sessions] =
      await Promise.all([
        fetchAvgTime(),
        fetchContries(),
        fetchPageViews(),
        fetchPaths(),
        fetchPersons(),
        fetchSessions(),
      ]);

    const data = {
      avgTime: avgTime.results[0][0],
      contires: contires.results[0],
      pageviews: pageviews.results[0][0],
      paths: paths.results,
      persons: persons.results[0][0],
      sessions: sessions.results[0][0],
    };
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 200,
      }
    );
  }
}
