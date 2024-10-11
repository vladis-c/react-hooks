import React from 'react';
import ReactDOM from 'react-dom/client';
import {screen, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import UseAsyncEffectComponent from '../example/UseAsyncEffectComponent';

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = undefined;
});

// Mocking global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({title: 'Test Post Title'}),
  }),
) as jest.Mock;

describe('UseAsyncEffectComponent', () => {
  it('renders loading state initially', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<UseAsyncEffectComponent />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders fetched data when resolved', async () => {
    await act(async () => {
      ReactDOM.createRoot(container).render(<UseAsyncEffectComponent />);
    });

    await waitFor(() =>
      expect(screen.getByText(/data: test post title/i)).toBeInTheDocument(),
    );
  });

  it('renders error message on failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    await act(async () => {
      ReactDOM.createRoot(container).render(<UseAsyncEffectComponent />);
    });

    await waitFor(() =>
      expect(
        screen.getByText(/error: failed to fetch data/i),
      ).toBeInTheDocument(),
    );
  });
});
