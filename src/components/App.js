import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import '../styles.css';

function App() {
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
        <h1>
          TastyRecipes <FontAwesomeIcon icon={faUtensils} />
        </h1>

        <h2>Discover thousands of expert-tested recipes!</h2>
        <form>
          <input
            onKeyDown={handleEnterKey}
            value={searchInput}
            placeholder="Search recipes: e.g., eggs, crab, steak"
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
                <img src={item.recipe.image} alt={item.recipe.label} />
                <div className="card-text">
                  <h2>{item.recipe.label}</h2>
                  <p>{item.recipe.source}</p>
                </div>
              </div>
            ))
          : null}
      </section>
      <footer id="footer">Made by Billy N.Lewis</footer>
    </div>
  );
}
export default App;
