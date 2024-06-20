import React, { Component } from "react";
import { connect } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import * as actions from "./actions/index";
import Header from "./components/Header";
import Landing from "./components/Landing";

const Dashboard = () => <h1>Dashboard</h1>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
}

const ConnectedApp = connect(null, actions)(App);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectedApp />,
    children: [
      {
        path: "/surveys",
        element: <Dashboard />,
      },
    ],
  },
]);

const AppWithRouter = () => <RouterProvider router={router} />;

export default AppWithRouter;
