import { GoogleEvent } from '@/constants/GoogleEvent';

export async function fetchCalendars(
  accessToken: string,
  refreshAccessToken: () => Promise<void>
) {
  let response = await fetch(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 401) {
    await refreshAccessToken();

    response = await fetch(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  const data = await response.json();

  return data.items;
}

export async function fetchNextEvent(
  accessToken: string,
  calendarId: string
): Promise<GoogleEvent | null> {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  if (!calendarId) {
    throw new Error('Calendar ID is required');
  }

  const now = new Date().toISOString();

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch events: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  return data.items[0] as GoogleEvent;
}
