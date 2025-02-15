import { useQuery } from '@tanstack/react-query';
import { fetchCalendars } from '@/services/googleCalendarService';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { GoogleCalendar } from '@/constants/GoogleCalendar';

export function useGoogleCalendars() {
  const { accessToken, refreshAccessToken } = useGoogleAuth();

  const query = useQuery<GoogleCalendar[], Error>({
    queryKey: ['googleCalendars', accessToken],
    queryFn: () => fetchCalendars(accessToken!, refreshAccessToken),
    enabled: !!accessToken,
    staleTime: 10000,
    retry: 2,
  });

  return { ...query, refetch: query.refetch };
}
