import { GoogleCalendar } from '@/constants/GoogleCalendar';
import { fetchCalendars } from '@/services/googleCalendarService';
import { useEffect, useState } from 'react';

export function useGoogleCalendars(accessToken: string | null) {
  const [calendars, setCalendars] = useState<GoogleCalendar[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessToken) {
      (async () => {
        setIsLoading(true);
        try {
          const fetchedCalendars = await fetchCalendars(accessToken);
          setCalendars(fetchedCalendars);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Unknown error occurred'
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [accessToken]);

  return { calendars, error, isLoading };
}
