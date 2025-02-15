// import { fetchCalendars, fetchNextEvent } from '@/services/googleCalendarService';

// beforeEach(() => {
//   fetchMock.resetMocks();
// });

// describe('fetchCalendars', () => {
//   const mockAccessToken = 'mock_access_token';
//   const mockRefreshAccessToken = jest.fn();

//   it('should fetch calendars successfully', async () => {
//     fetchMock.mockResponseOnce(
//       JSON.stringify({
//         items: [{ id: 'calendar1', summary: 'Work Calendar' }],
//       })
//     );

//     const calendars = await fetchCalendars(mockAccessToken, mockRefreshAccessToken);

//     expect(calendars).toEqual([{ id: 'calendar1', summary: 'Work Calendar' }]);
//     expect(fetchMock).toHaveBeenCalledTimes(1);
//   });

//   it('should retry with refreshed token on 401', async () => {
//     fetchMock.mockResponses(
//       [JSON.stringify({ error: 'Unauthorized' }), { status: 401 }],
//       [JSON.stringify({ items: [{ id: 'calendar2', summary: 'Personal Calendar' }] })]
//     );

//     await fetchCalendars(mockAccessToken, mockRefreshAccessToken);

//     expect(mockRefreshAccessToken).toHaveBeenCalledTimes(1);
//     expect(fetchMock).toHaveBeenCalledTimes(2);
//   });

//   it('should return an empty array if no calendars are found', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify({ items: [] }));

//     const calendars = await fetchCalendars(mockAccessToken, mockRefreshAccessToken);

//     expect(calendars).toEqual([]);
//   });
// });
