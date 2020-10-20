import React from 'react';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Title() {
  const titleVariants = {
    hidden: {
      x: '100vw'
    },
    visible: {
      x: 0,
      transition: { delay: 0.5, type: 'spring', stiffness: 40 }
    }
  };
  return (
    <motion.h1
      className="websiteTitle"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      Tasty<span className="titleText">Recipes </span>
      <FontAwesomeIcon icon={faUtensils} />
    </motion.h1>
  );
}
export default Title;
