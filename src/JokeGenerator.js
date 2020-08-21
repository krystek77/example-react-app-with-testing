import React from 'react';
import Joke from './Joke';
import axios from 'axios';

const URL = 'https://api.icndb.com/jokes/random';

export default function JokeGenerator() {
  const [joke, setJoke] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  function handleClick() {
    setLoading(true);
    const loadJoke = async function () {
      try {
        const result = await axios.get(URL);
        const randomJoke = result.data.value.joke;
        if (randomJoke === undefined) throw Error('Invalid data');
        setJoke(randomJoke);
        setLoading(false);
      } catch (error) {
        const message = error.message || 'Something went wrong';
        const err = { message };
        setError(err);
        setLoading(false);
      }
    };
    loadJoke();
  }

  return (
    <React.Fragment>
      {error ? (
        <div data-testid='error'>{error.message}</div>
      ) : (
        <div className='JokeGenerator'>
          <button type='button' data-testid='load-joke' onClick={handleClick}>
            Load
          </button>
          {loading ? (
            <div>Loading...</div>
          ) : joke ? (
            <Joke text={joke} />
          ) : (
            <div className='NoJoke'>No joke</div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
