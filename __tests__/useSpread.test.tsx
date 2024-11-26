import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import useSpread from '../src/useSpread';

const UseSpreadComponent = ({
  data,
}: {
  data: Record<any, any> | any[] | null | undefined;
}) => {
  const spreadData = useSpread(data);

  return (
    <div>
      <pre data-testid="spread-data">{JSON.stringify(spreadData, null, 2)}</pre>
    </div>
  );
};

describe('useSpread hook', () => {
  it('spreads an object into a new object', () => {
    const testData = {a: 1, b: 2};
    render(<UseSpreadComponent data={testData} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData.textContent).toBe(JSON.stringify(testData, null, 2));
  });

  it('spreads an array into a new array', () => {
    const testData = [1, 2, 3];
    render(<UseSpreadComponent data={testData} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData.textContent).toBe(JSON.stringify(testData, null, 2));
  });

  it('returns null for null input', () => {
    render(<UseSpreadComponent data={null} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData.textContent).toBe('null');
  });

  it('returns undefined for undefined input', () => {
    render(<UseSpreadComponent data={undefined} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData.textContent).toBe('');
  });

  it('returns the same value for non-object, non-array inputs', () => {
    const testData = 'test-string';
    render(<UseSpreadComponent data={testData as any} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData.textContent).toBe(JSON.stringify(testData, null, 2));
  });
});
