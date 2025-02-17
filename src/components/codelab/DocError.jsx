import React from 'react';
import { Alert } from 'react-bootstrap';

const DocError = ({ error }) => {
  return (
    <Alert variant="danger" className="m-4">
      <Alert.Heading>Access Error</Alert.Heading>
      <p>{error}</p>
      <hr />
      <p className="mb-0">
        To fix this:
        <ol>
          <li>Open the Google Doc</li>
          <li>Click "Share" in the top right</li>
          <li>Click "Change to anyone with the link"</li>
          <li>Make sure "Viewer" is selected</li>
          <li>Click "Done"</li>
        </ol>
      </p>
    </Alert>
  );
};

export default DocError; 