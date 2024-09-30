import { Configuration } from '@spos/clients-dining';

export const ApiMockConfig : Configuration = {
  apiKey: 'test',
  accessToken: 'test',
  password: 'test',
  username: 'test',
  isJsonMime(mime: string): boolean {
    try {
      const parsed = JSON.parse(mime);
      return typeof parsed === 'object' && parsed !== null;
    } catch (e) {
      return false;
    }
  },
};
