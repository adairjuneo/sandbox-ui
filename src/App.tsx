import React from 'react';
import { NavLink, Outlet } from 'react-router';

const App = () => {
  return (
    <React.Fragment>
      <div className="app">
        <nav className="navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/form">Form</NavLink>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

export default App;
