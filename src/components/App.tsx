import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}
