import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuizContextProvider } from './ContextQuiz';

ReactDOM.render(
  <QuizContextProvider>
    <App />
  </QuizContextProvider>,
  document.getElementById('root')
);
