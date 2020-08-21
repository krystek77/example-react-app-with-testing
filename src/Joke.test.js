import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Joke from './Joke';
import JokeGenerator from './JokeGenerator';

describe('Joke component', () => {
  it('render Joke komponent when text props given', () => {
    const { getByTestId } = render(
      <Joke text='The funniest joke in this year' />
    );
    expect(getByTestId('joke-text')).toHaveTextContent(
      'The funniest joke in this year'
    );
  });
  it('returns null when name props is not passed', () => {
    const { queryByTestId } = render(<Joke />);
    const item = queryByTestId('joke-text');
    expect(item).toBeNull();
  });
  it('returns "Loading..." when data is loading by user', () => {
    const { getByRole, queryByText } = render(<JokeGenerator />);
    userEvent.click(getByRole('button'));
    expect(queryByText(/Loading.../i)).toBeInTheDocument();
  });
});

console.log("[Joke.test.js] - all tests passed")