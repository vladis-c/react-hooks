import React, {useState} from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  RenderResult,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import useAsyncEffect from '../src/useAsyncEffect';

const UseAsyncEffectComponent = ({
  effect,
  dependencies,
}: {
  effect: jest.Mock<any>;
  dependencies: React.DependencyList;
}) => {
  const [status, setStatus] = useState('idle');

  useAsyncEffect(async () => {
    setStatus('loading');
    const cleanup = await effect();
    setStatus('success');
    return cleanup || (() => setStatus('cleanup'));
  }, dependencies);

  return <div data-testid="status">{status}</div>;
};

describe('useAsyncEffect hook', () => {

  it('executes an async effect and updates state', async () => {
    const mockEffect = jest.fn(async () => {
      return new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    });

    act(() => {
      render(<UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />);
    });

    const statusElement = screen.getByTestId('status');

    expect(statusElement.textContent).toBe('loading'); // During async execution
    await waitFor(() => expect(statusElement.textContent).toBe('success')); // After async resolution
    expect(mockEffect).toHaveBeenCalled();
  });

  it('calls cleanup function on unmount', async () => {
    const mockCleanup = jest.fn();
    const mockEffect = jest.fn(async () => mockCleanup);

    let unmount: () => void;
    act(() => {
      const result = render(
        <UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />,
      );
      unmount = result.unmount;
    });

    // Wait for the effect to complete
    await waitFor(() => expect(mockEffect).toHaveBeenCalled());

    act(() => {
      unmount(); // Trigger unmount
    });

    expect(mockCleanup).toHaveBeenCalled(); // Verify cleanup
  });

  it('handles sync effects correctly', async () => {
    const mockEffect = jest.fn(() => {});

    act(() => {
      render(<UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />);
    });

    await waitFor(() => {
      const statusElement = screen.getByTestId('status');
      expect(statusElement.textContent).toBe('success'); // Final state
    });

    expect(mockEffect).toHaveBeenCalled();
  });

  it('calls async cleanup function and logs errors', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    const mockCleanup = jest.fn(async () => {
      throw new Error('Async cleanup error');
    });
    const mockEffect = jest.fn(async () => mockCleanup);

    let unmount: () => void;
    act(() => {
      const result = render(
        <UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />,
      );
      unmount = result.unmount;
    });

    // Wait for the effect to complete
    await waitFor(() => expect(mockEffect).toHaveBeenCalled());

    act(() => {
      unmount(); // Trigger unmount
    });

    // Wait for the error logging to complete
    await waitFor(() =>
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error during async cleanup:',
        expect.any(Error),
      ),
    );

    consoleErrorMock.mockRestore();
  });

  it('re-runs effect on dependency change', async () => {
    const mockEffect = jest.fn();
    let component: RenderResult<
      typeof import('@testing-library/dom/types/queries'),
      HTMLElement,
      HTMLElement
    >;
    act(() => {
      component = render(
        <UseAsyncEffectComponent effect={mockEffect} dependencies={[1]} />,
      );
    });

    expect(mockEffect).toHaveBeenCalledTimes(1);

    act(() => {
      component.rerender(
        <UseAsyncEffectComponent effect={mockEffect} dependencies={[2]} />,
      );
    });

    expect(mockEffect).toHaveBeenCalledTimes(2);
  });
});
