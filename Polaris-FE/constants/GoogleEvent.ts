export interface GoogleEvent {
  id: string;
  summary: string;
  location?: string;
  start?: {
    dateTime?: string;
  };
  end?: {
    dateTime?: string;
  };
}
