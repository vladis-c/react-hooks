# @vladisc/react-hooks

A collection of useful, well-tested React hooks to simplify your development workflow. This package includes hooks for working with asynchronous operations, state transformations, and more.

## Features

- `useAsyncEffect`: A useEffect wrapper that supports asynchronous functions and cleanups.
- `useDidMountEffect`: Executes an effect only after the initial render (skipping the first trigger).
- `useSpread`: Easily create new objects or arrays from existing ones with React state dependencies.

## Installation

**Ensure that your project uses React >=16.8.0 <=19.x.**

Install the package using `yarn` or `npm`:

### Using Yarn

```bash
yarn add @vladisc/react-hooks
```

### Using npm

```bash
npm install @vladisc/react-hooks
```

## Usage

`useAsyncEffect`

An extended `useEffect` that allows you to use asynchronous functions while managing optional cleanup logic.

```
import { useState } from 'react';
import { useAsyncEffect } from '@vladisc/react-hooks';

const FetchDataComponent = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useAsyncEffect(async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const json = await response.json();
      setData(json.message);
    } catch {
      setError('Failed to fetch data');
    }
  }, []);

  if (error) return <p>Error: {error}</p>;
  return <p>Data: {data}</p>;
};
```

`useDidMountEffect`

Executes the provided callback only after the first render, skipping the initial mount.

```
import { useState } from 'react';
import { useDidMountEffect } from '@vladisc/react-hooks';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  useDidMountEffect(() => {
    console.log('This runs only after the first render!');
  }, [count]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Increment: {count}
    </button>
  );
};

```

`useSpread`

Creates a new object or array based on the provided input, ideal for creating shallow copies.

```
import { useState } from 'react';
import { useSpread } from '@vladisc/react-hooks';

const SpreadComponent = () => {
  const [state, setState] = useState({ a: 1, b: 2 });

  const spreadState = useSpread(state);

  return (
    <p>{JSON.stringify(spreadState, null, 2)}</p>
  );
};
```

## API Reference

`useAsyncEffect`

- **Parameters**:
  - `effect: () => Promise<void | CleanupFunction>` - An async function for the effect.
  - `dependencies: React.DependencyList` - Dependencies for the effect.
- **Returns**: None.

`useDidMountEffect`

- **Parameters**:
  - `callback: () => void` - The function to execute after the initial render.
  - `dependencies: React.DependencyList` - Dependencies for the effect.
- **Returns**: None.

`useSpread`

- **Parameters**:
  - `data: T` - The object or array to spread.
- **Returns**:
  - A new object or array created from the input data.

## Development

### Running Tests

Run the tests to ensure the hooks work as expected:

```bash
yarn test
```

## Contributing

Feel free to contribute by opening an issue or creating a pull request on the GitHub repository.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Author

Vladislav Cherkasheninov
