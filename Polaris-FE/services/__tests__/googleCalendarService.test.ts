import { GoogleEvent } from '@/constants/GoogleEvent';
import { fetchCalendars, fetchNextEvent } from '../googleCalendarService';

global.fetch = jest.fn();

describe('Google Calendar API Functions', () => {
  const mockAccessToken = 'mock_token';
  const mockCalendarId = 'mock_calendar_id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCalendars should return a list of calendars', async () => {
    const mockCalendars = { items: [{ id: '1', summary: 'Test Calendar' }] };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCalendars),
    });

    const calendars = await fetchCalendars(mockAccessToken);
    expect(calendars).toEqual(mockCalendars.items);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      expect.objectContaining({
        headers: { Authorization: `Bearer ${mockAccessToken}` },
      })
    );
  });

  it('fetchCalendars should return an empty list if no calendars exist', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ items: [] }),
    });

    const calendars = await fetchCalendars(mockAccessToken);
    expect(calendars).toEqual([]);
  });

  it('fetchNextEvent should return the next event', async () => {
    const mockEvent: GoogleEvent = {
      id: 'event_1',
      summary: 'Next Event',
      start: { dateTime: '2025-01-01T10:00:00Z' },
      end: { dateTime: '2025-01-01T11:00:00Z' },
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ items: [mockEvent] }),
    });

    const event = await fetchNextEvent(mockAccessToken, mockCalendarId);
    expect(event).toEqual(mockEvent);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/calendars/${mockCalendarId}/events`),
      expect.objectContaining({
        headers: { Authorization: `Bearer ${mockAccessToken}` },
      })
    );
  });

  it('fetchNextEvent should return null if no upcoming events exist', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ items: [] }),
    });

    const event = await fetchNextEvent(mockAccessToken, mockCalendarId);
    expect(event).toBeNull();
  });

  it('fetchNextEvent should return null if API request fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Unauthorized' }),
    });

    const event = await fetchNextEvent(mockAccessToken, mockCalendarId);
    expect(event).toBeNull();
  });
});
