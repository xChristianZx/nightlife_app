import React from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = (props) => {
  const { handleChange, handleSubmit, value } = props;
  return (
    <div className={styles.wrapper}>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="ui fluid action input">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={`Oakland, San Francisco, Austin`}
          />
          <button className="ui button primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
