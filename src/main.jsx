import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Auth from "./components/Auth.jsx";
import Signup from "./pages/Signup";
import AllPost from "./pages/AllPost";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Auth authentication={false}>
            <Login />
          </Auth>
        ),
      },
      {
        path: "/signup",
        element: (
          <Auth authentication={false}>
            <Signup />
          </Auth>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Auth authentication>
            <AllPost />
          </Auth>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Auth authentication>
            <AddPost />
          </Auth>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Auth authentication>
            <EditPost />
          </Auth>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Auth authentication={false}>
            <Post />
          </Auth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
