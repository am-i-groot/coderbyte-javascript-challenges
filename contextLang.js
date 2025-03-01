/*

React Context API

We provided some simple React template code. Your goal is to modify the application so that when you click the toggle button, 
the favorite programming language toggles between the items in the languages array. The default value should be the first item in the array.

You must use the Context API for this challenge, which means you have to use the React.createContext and Context.Provider functions. 
You are free to add classes and styles, but make sure you leave the component ID's and classes provided as they are.

Submit your code once it is complete and our system will validate your output.

*/

import React, { useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

// Array of languages
const languages = ['JavaScript', 'Python'];

// 1. Create a Context to hold the language and the toggle function
const LanguageContext = createContext();

// 2. Create a Context Provider to provide the state and toggle function
function LanguageProvider({ children }) {
  const [favoriteLanguage, setFavoriteLanguage] = useState(languages[0]);

  const toggleLanguage = () => {
    setFavoriteLanguage(prev => {
      const currentIndex = languages.indexOf(prev);
      const nextIndex = (currentIndex + 1) % languages.length;
      return languages[nextIndex];
    });
  };

  return (
    <LanguageContext.Provider value={{ favoriteLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function App() {
  // Wrap the MainSection with the LanguageProvider to provide the context
  return (
    <LanguageProvider>
      <MainSection />
    </LanguageProvider>
  );
}

function MainSection() {
  // Use the context to get the current favorite language and toggle function
  const { favoriteLanguage, toggleLanguage } = useContext(LanguageContext);

  return (
    <div>
      {/* Display the current favorite language */}
      <p id="favoriteLanguage">favorite programming language: {favoriteLanguage}</p>
      {/* Button to toggle between languages */}
      <button id="changeFavorite" onClick={toggleLanguage}>toggle language</button>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
