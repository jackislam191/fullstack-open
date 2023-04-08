import React from 'react';

const PersonForm = ({onSubmit, onNameChange, onNumberChange}) => {

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            name: <input onChange={onNameChange} />
          </div>
          <div>
            number: <input onChange={onNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
}

export default PersonForm;
