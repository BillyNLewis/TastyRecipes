import React from 'react';
import '../styles.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, Link } from 'react-router-dom';

function Recipe() {
  const location = useLocation();
  const {
    // searchInput,
    foodImage,
    foodLabel,
    foodCal,
    foodServing,
    foodIngred,
    foodURL,
    foodSource
  } = location.state;
  const calPerServ = Math.round(foodCal / foodServing);

  return (
    <div className="wrapper">
      <div className="homeButton">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
      </div>
      {/* recipe info section */}
      <section className="infoContainer">
        <header>
          <h1>{foodLabel}</h1>
        </header>
        <div className="recipeImage">
          <img src={foodImage} alt="food" />
        </div>
        <div className="ingredients">
          <h2>Ingredients</h2>
          {foodIngred.map((item) => (
            <p key={uuidv4()}>{item}</p>
          ))}
        </div>
        <div className="nutrition">
          <div className="cal">
            <p>{calPerServ}</p>
            <p>CAL / SERV</p>
          </div>
          <div className="servings">
            <p>{foodServing}</p>
            <p>SERVINGS</p>
          </div>
        </div>
        <div className="instructions">
          <p>
            Instructions on:{' '}
            <a href={foodURL} target="_blank" rel="noopener noreferrer">
              {foodSource}
            </a>
          </p>
        </div>
      </section>

      <footer id="footer">Made by Billy N.Lewis</footer>
    </div>
  );
}
export default Recipe;
