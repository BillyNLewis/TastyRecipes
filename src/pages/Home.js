import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import '../styles.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 1.5 }
  },
  exit: {
    x: '-100vw'
  }
};

const imgVariants = {
  hidden: {
    x: '-100vw'
  },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 60 }
  },
  exit: {
    x: '-100vw'
  }
};
function Home() {
  const [recipe, setRecipe] = useState({ info: null, imgKey: false });
  const [searchInput, setSearchInput] = useState('');
  const [checkInput, setCheckInput] = useState(true);

  // storing data in sessionStorage whenever the recipe state changes
  useEffect(() => {
    if (recipe.info) {
      const recipeHistory = recipe.info;
      sessionStorage.setItem('recipes', JSON.stringify(recipeHistory));
    }
  }, [recipe]);
  // getting data from sessionStorage once the component is mounted
  useEffect(() => {
    let data = sessionStorage.getItem('recipes');
    data = JSON.parse(data);
    setRecipe((prev) => ({
      info: data,
      imgKey: !prev.imgKey
    }));
  }, []);

  function fetchData() {
    // handle empty input field
    if (searchInput === '') {
      setCheckInput(false);
    } else {
      const appID = '8dd6cb24';
      const appKey = 'cc5fc71652b6d09b2f1bb6842575a079';
      fetch(
        `https://api.edamam.com/search?q=${searchInput}&app_id=${appID}&app_key=${appKey}`
        // https://api.edamam.com/search?q=steak&app_id=8dd6cb24&app_key=cc5fc71652b6d09b2f1bb6842575a079
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Problem while fetching recipes from server');
        })
        .then((data) => {
          setRecipe((prev) => ({
            info: data.hits,
            imgKey: !prev.imgKey
          }));
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
    <motion.div
      className="wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* search box section */}
      <section className="searchBox">
        <h2>Discover thousands of expert-tested recipes!</h2>
        <form>
          <input
            //  type="search" adds a clear button inside of text box
            type="search"
            onKeyDown={handleEnterKey}
            value={searchInput}
            placeholder="Search recipes: e.g., pasta, fish, steak"
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
      {recipe.info && (
        <motion.section
          key={recipe.imgKey}
          className="imageList"
          variants={imgVariants}
          exit="exit"
        >
          {recipe.info.map((item) => (
            <div className="imageCard" key={uuidv4()}>
              {/* There are 2 ways to pass data from the Link component to the new route
              #1: pass data through URL parameters
              #2[prefer]: pass data through Link's component state property */}
              <Link
                to={{
                  pathname: '/recipe',
                  state: {
                    //   searchInput [passing array of obj to another component],
                    foodHistory: recipe.info,
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
          ))}
        </motion.section>
      )}
      <footer id="footer">Made by Billy N.Lewis</footer>
    </motion.div>
  );
}
export default Home;
