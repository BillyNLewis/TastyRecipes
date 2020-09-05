import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import '../styles.css';

function Home() {
  // template: https://tasty.co/
  // https://www.bigoven.com/
  const [recipe, setRecipe] = useState({ info: null });
  const [searchInput, setSearchInput] = useState('');
  const [checkInput, setCheckInput] = useState(true);

  function fetchData() {
    // handle empty input field
    if (searchInput === '') {
      setCheckInput(false);
    } else {
      const appID = '8dd6cb24';
      const appKey = 'cc5fc71652b6d09b2f1bb6842575a079';
      fetch(
        `https://api.edamam.com/search?q=${searchInput}&app_id=${appID}&app_key=${appKey}`
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          throw new Error('Problem while fetching recipes from server');
        })
        .then((data) => {
          setRecipe({ info: data.hits });
          console.log(data.hits);
        })
        .catch((error) => setRecipe({ error }));
    }
  }
  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchData(e);
    }
  }
  return (
    <div className="wrapper">
      {/* search box section */}
      <section className="searchBox">
        <h2>Discover thousands of expert-tested recipes!</h2>
        <form>
          <input
            onKeyDown={handleEnterKey}
            value={searchInput}
            placeholder="Search recipes: e.g., pasta, crab, steak"
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button type="button" onClick={fetchData}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {checkInput ? null : (
            <p className="errorMessage">Please enter something to cook </p>
          )}
          {recipe.error ? <p>{recipe.error.message}</p> : null}
        </form>
      </section>

      {/* image section */}
      <section className="imageList">
        {recipe.info
          ? recipe.info.map((item) => (
              <div className="imageCard" key={uuidv4()}>
                {/* There are 2 ways to pass data from the Link component to the new route
              #1: pass data through URL parameters
              #2[prefer]: pass data through Link's component state property */}
                <Link
                  to={{
                    pathname: '/recipe',
                    state: {
                      //   searchInput,
                      foodImage: item.recipe.image,
                      foodLabel: item.recipe.label,
                      foodCal: item.recipe.calories,
                      foodServing: item.recipe.yield,
                      foodIngred: item.recipe.ingredientLines,
                      foodURL: item.recipe.url,
                      foodSource: item.recipe.source
                    }
                  }}
                >
                  <img src={item.recipe.image} alt="food" />
                  <div className="card-text">
                    <h2>{item.recipe.label}</h2>
                    <p>{item.recipe.source}</p>
                  </div>
                </Link>
              </div>
            ))
          : null}
      </section>
      <footer id="footer">Made by Billy N.Lewis</footer>
    </div>
  );
}
export default Home;
