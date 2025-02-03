import { GoogleCalendar } from '@/constants/GoogleCalendar';
import { fetchCalendars } from '@/services/googleCalendarService';
import { useQuery } from '@tanstack/react-query';

export function useGoogleCalendars(accessToken: string | null) {
  return useQuery<GoogleCalendar[], Error>({
    queryKey: ['googleCalendars', accessToken],
    queryFn: () => fetchCalendars(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
