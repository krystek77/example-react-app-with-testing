import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import JokeGenerator from './JokeGenerator';
import axios from 'axios';
import validJoke from './__mocks__/validJoke.json';
import invalidJoke from './__mocks__/invalidJoke.json';
jest.mock('axios');

describe('JokeGenerator', () => {
  it('returns "No joke" when no joke downloaded', () => {
    const { getByText } = render(<JokeGenerator />);
    const item = getByText(/No joke/);
    // screen.debug();
    expect(item).toBeInTheDocument();
  });

  it('returns joke from 3rd part service', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: validJoke });
    });
    const { getByTestId } = render(<JokeGenerator />);
    await act(async () => {
      await userEvent.click(getByTestId('load-joke'));
    });
    // screen.debug();
    expect(getByTestId('joke-text')).toBeInTheDocument();
  });
  it('returns error when data from 3rd part service is wrong', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: invalidJoke });
    });
    const { queryByTestId, getByText } = render(<JokeGenerator />);
    await act(async () => {
      await userEvent.click(queryByTestId('load-joke'));
    });
    // screen.debug();
    expect(queryByTestId('error')).toBeInTheDocument();
    expect(getByText(/Invalid data/i)).toBeInTheDocument();
  });
  it('returns error when requested url is incorrect', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.reject({
        message: 'Cannot read property "joke" of undefined',
      });
    });
    const { queryByTestId } = render(<JokeGenerator />);
    await act(async () => {
      await userEvent.click(queryByTestId('load-joke'));
    });
    expect(queryByTestId('error')).toHaveTextContent(
      'Cannot read property "joke" of undefined'
    );
  });
});

console.log('[JokeGenerator.test.js] - all tests passed');
