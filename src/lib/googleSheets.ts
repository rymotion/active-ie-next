export interface EventData {
  name: string;
  eventLink: string;
  headline?: string;
  posterUrl?: string;
  videoPosterUrl?: string;
  videoEmbed?: string;
}

export async function fetchEventsFromGoogleSheets(
  sheetId: string,
  sheetName: string
): Promise<EventData[]> {
  console.log("Fetching events from Google Sheets");
  console.log("Sheet ID: ", sheetId);
  console.log("Sheet Name: ", sheetName);
  // try {
  //   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  //   const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  //   const response = await fetch(url);

  //   if (!response.ok) {
  //     throw new Error(
  //       `Failed to fetch from Google Sheets: ${response.statusText}`
  //     );
  //   }

  //   const data = await response.json();

  //   // Assuming first row is header, skip it
  //   const rows = data.values.slice(1);

  //   return rows.map((row: string[]) => {
  //     // Adjust the indices based on your Google Sheets columns
  //     // Assuming columns are: Name, Event Link, Headline, Image URL, Video Embed
  //     return {
  //       name: row[0] || "",
  //       posterUrl: row[1] || "",
  //       eventLink: row[2],
  //       videoPosterUrl: row[3],
  //       headline: row[4],
  //       videoEmbed: row[5],
  //     };
  //   });
  // } catch (error) {
  //   console.error("Error fetching events from Google Sheets:", error);
  //   return [];
  // }
  return [];
}

export async function fetchCollabEventsFromGoogleSheets(
  sheetId: string,
  sheetName: string
): Promise<EventData[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from Google Sheets: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Assuming first row is header, skip it
    const rows = data.values.slice(1);

    return rows.map((row: string[]) => {
      // Adjust the indices based on your Google Sheets columns
      // Assuming columns are: Name, Event Link, Headline, Image URL, Video Embed
      return {
        name: row[0] || "",
        posterUrl: row[1] || "",
        eventLink: row[2],
        videoPosterUrl: row[3],
        headline: row[4],
        videoEmbed: row[5],
      };
    });
  } catch (error) {
    console.error("Error fetching events from Google Sheets:", error);
    return [];
  }
}
