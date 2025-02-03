import { GoogleEvent } from '@/constants/GoogleEvent';
import { fetchNextEvent } from '@/services/googleCalendarService';
import { useQuery } from '@tanstack/react-query';

export function useGoogleNextEvent(
  accessToken: string | null,
  selectedCalendar: string | null
) {
  return useQuery<GoogleEvent | null, Error>({
    queryKey: ['googleNextEvent', accessToken, selectedCalendar],
    queryFn: () => fetchNextEvent(accessToken!, selectedCalendar!),
    enabled: !!accessToken && !!selectedCalendar,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    retry: 2,
  });
}
