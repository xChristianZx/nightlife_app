import React from "react";
import styles from "./SearchForm.css";

const SearchForm = props => {
  const { handleChange, handleSubmit, value } = props;
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container}`}>
        <form className={`${styles.form} ui form`} onSubmit={handleSubmit}>
          <div className="inline field">
            <input
              className={"ui input"}
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={`Oakland, San Francisco, Austin`}
            />
            <button className={`ui button primary`} type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
