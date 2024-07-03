import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header"; // even if you dont keep extention react will treat as js file by default.
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import { Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy } from "react";
import { Suspense } from "react";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import appStore from "./components/appStore";
import YourMindInfo from "./components/YourMindInfo";

const About = lazy(() => import("./components/About")); // Lazy Loading of components
const ContactUs = lazy(() => import("./components/ContactUs"));
const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },

      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },

      {
        path: "/contact",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },

      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },

      {
        path: "/collections/:resId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <YourMindInfo />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
