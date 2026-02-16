import React from 'react';
import TestComponent from '../components/TestComponent';

/**
 * TestPage component: A basic React page that renders the TestComponent.
 * 
 * @returns {JSX.Element} The TestComponent.
 */
const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <TestComponent />
    </div>
  );
};

export default TestPage;