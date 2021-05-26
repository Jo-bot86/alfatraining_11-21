import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {StoreProvider} from '../Store';
import Layout from './Layout';
import Routes from './Routes';

export default function App(): ReactElement {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}
