import React from 'react';
import Form from "../containers/Form";
import List from "../containers/EventList";
//import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div className="container">
      <Form />
      <List />
    </div>
  );
};

export default HomePage;
