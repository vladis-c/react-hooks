import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import useSpread from '../src/useSpread';

const UseSpreadComponent = ({data}: {data: object | any[] | null}) => {
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

    expect(spreadData).toHaveTextContent(JSON.stringify({a: 1, b: 2}, null, 2));
  });

  it('spreads an array into a new array', () => {
    const testData = [1, 2, 3];
    render(<UseSpreadComponent data={testData} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData).toHaveTextContent(JSON.stringify([1, 2, 3], null, 2));
  });

  it('returns undefined for null input', () => {
    render(<UseSpreadComponent data={null} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData).toHaveTextContent('undefined');
  });

  it('returns undefined for undefined input', () => {
    render(<UseSpreadComponent data={undefined as any} />);
    const spreadData = screen.getByTestId('spread-data');

    expect(spreadData).toHaveTextContent('undefined');
  });
});
