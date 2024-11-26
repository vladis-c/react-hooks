import React, {useState} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
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
    await effect();
    setStatus('success');
    return () => setStatus('cleanup');
  }, dependencies);

  return <div data-testid="status">{status}</div>;
};

describe('useAsyncEffect hook', () => {
  it('executes an async effect and updates state', async () => {
    const mockEffect = jest.fn(async () => {
      return new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    });

    render(<UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />);

    const statusElement = screen.getByTestId('status');

    expect(statusElement.textContent).toBe('loading'); // During async execution
    await waitFor(() => expect(statusElement.textContent).toBe('success')); // After async resolution
    expect(mockEffect).toHaveBeenCalled();
  });

  // TODO: fix this test
  // it('calls cleanup function on unmount', () => {
  //   const mockCleanup = jest.fn();
  //   const mockEffect = jest.fn(() => mockCleanup);

  //   const {unmount} = render(
  //     <UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />,
  //   );

  //   expect(mockEffect).toHaveBeenCalled(); // Ensure the effect runs
  //   unmount(); // Trigger unmount
  //   expect(mockCleanup).toHaveBeenCalled(); // Verify cleanup
  // });

  it('handles sync effects correctly', async () => {
    const mockEffect = jest.fn(() => {});

    render(<UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />);

    await waitFor(() => {
      const statusElement = screen.getByTestId('status');
      expect(statusElement.textContent).toBe('success'); // Final state
    });

    expect(mockEffect).toHaveBeenCalled();
  });

  // TODO: fix this test
  // it('calls async cleanup function and logs errors', async () => {
  //   const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  //   const mockCleanup = jest.fn(async () => {
  //     throw new Error('Async cleanup error');
  //   });
  //   const mockEffect = jest.fn(async () => mockCleanup);

  //   const {unmount} = render(
  //     <UseAsyncEffectComponent effect={mockEffect} dependencies={[]} />,
  //   );

  //   expect(mockEffect).toHaveBeenCalled(); // Ensure the effect runs
  //   unmount(); // Trigger unmount

  //   // Wait for the error logging to complete
  //   await waitFor(() =>
  //     expect(consoleErrorMock).toHaveBeenCalledWith(
  //       'Error during async cleanup:',
  //       expect.any(Error),
  //     ),
  //   );

  //   consoleErrorMock.mockRestore();
  // });

  it('re-runs effect on dependency change', async () => {
    const mockEffect = jest.fn();
    const {rerender} = render(
      <UseAsyncEffectComponent effect={mockEffect} dependencies={[1]} />,
    );

    expect(mockEffect).toHaveBeenCalledTimes(1);

    rerender(
      <UseAsyncEffectComponent effect={mockEffect} dependencies={[2]} />,
    );

    expect(mockEffect).toHaveBeenCalledTimes(2);
  });
});
