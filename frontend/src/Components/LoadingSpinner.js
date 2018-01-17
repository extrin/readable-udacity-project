import React from 'react';
import Loading from 'react-loading';

const LoadingSpinner = () => {
  return <Loading delay={200} type="spin" color="#222" className="loading" />;
};

export default LoadingSpinner;
