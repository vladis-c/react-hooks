import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import useDidMountEffect from '../src/useDidMountEffect';

const UseDidMountEffectTestComponent = () => {
  const [count, setCount] = useState(0);
  const [callbackTriggered, setCallbackTriggered] = useState(false);

  useDidMountEffect(() => {
    setCallbackTriggered(true);
  }, [count]);

  return (
    <div>
      <button
        data-testid="increment-button"
        onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
      <div data-testid="callback-status">
        {callbackTriggered ? 'Triggered' : 'Not Triggered'}
      </div>
    </div>
  );
};

describe('useDidMountEffect', () => {
  it('does not trigger callback on initial render', () => {
    render(<UseDidMountEffectTestComponent />);
    const status = screen.getByTestId('callback-status');
    expect(status).toHaveTextContent('Not Triggered');
  });

  it('triggers callback on dependency change after initial render', () => {
    render(<UseDidMountEffectTestComponent />);
    const button = screen.getByTestId('increment-button');
    const status = screen.getByTestId('callback-status');

    // Simulate a dependency change
    button.click();
    expect(status).toHaveTextContent('Triggered');
  });
});
