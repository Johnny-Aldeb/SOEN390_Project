import { GoogleEvent } from '@/constants/GoogleEvent';
import { fetchNextEvent } from '@/services/googleCalendarService';
import { useEffect, useState } from 'react';

export function useGoogleNextEvent(
  accessToken: string | null,
  selectedCalendar: string | null
) {
  const [nextEvent, setNextEvent] = useState<GoogleEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessToken && selectedCalendar) {
      (async () => {
        setIsLoading(true);
        try {
          const event = await fetchNextEvent(accessToken, selectedCalendar);
          setNextEvent(event);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Unknown error occurred'
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [accessToken, selectedCalendar]);

  return { nextEvent, error, isLoading };
}
