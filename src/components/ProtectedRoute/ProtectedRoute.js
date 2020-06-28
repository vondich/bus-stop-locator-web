import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import { getAuth } from '../../services/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        getAuth() ? (
          <Component {...props } {...rest } />
        ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
      }
    />
  );

export default ProtectedRoute