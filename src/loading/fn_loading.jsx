import React, { createContext, useContext, useState } from 'react';
import StylishLoading from './loading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

//   const showLoading = () => setIsLoading(true);
//   const hideLoading = () => setIsLoading(false);
const showLoading = (text) => {
    setLoadingText(text);
    setIsLoading(true);
  };
  
  const hideLoading = () => {
    setIsLoading(false);
    setLoadingText('');
  };

  return (
    // <LoadingContext.Provider value={{ showLoading, hideLoading }}>
    //   {isLoading && <StylishLoading />}
    //   {children}
    // </LoadingContext.Provider>
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
    {isLoading && <StylishLoading text={loadingText} />}
    {children}
  </LoadingContext.Provider>
  );
};


export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};