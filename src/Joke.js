import React from 'react';

export default React.memo(function Joke({ text }) {
  return (
    <React.Fragment>
      {text && (
        <div
          className='Joke'
          data-testid='joke-text'
          style={{
            fontSize: '3rem',
            fontWeight: '300',
            padding: '1rem',
            border: '1px solid grey',
            marginTop: '1rem',
            boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.3)',
          }}
        >
          {text}
        </div>
      )}
    </React.Fragment>
  );
});
