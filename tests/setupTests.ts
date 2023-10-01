import '@testing-library/jest-dom';
import "whatwg-fetch";
import server from './mock/api/server';
import { api } from '../src/store/services/api';
import { setupStore } from '../src/store/store';

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(api.util.resetApiState());
});

afterAll(() => server.close());
