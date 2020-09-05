import React from 'react';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
    <h1 className="websiteTitle">
      Tasty<span className="titleText">Recipes </span>
      <FontAwesomeIcon icon={faUtensils} />
    </h1>
  );
}
export default Title;
