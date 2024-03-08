import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Contact from "./Contact.tsx";
// import { loader as rootLoader } from './routes/loader.ts'
import axios from "axios";
import Contacts from "./Contacts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contact",
        element: <Contacts />,
        // loader: async () => {
        //   const response = await axios.get(
        //     "https://rickandmortyapi.com/api/character"
        //   );
        //   return response.data;
        // },
        children: [
          {
            path: ":id",
            element: <Contact />,
            loader: async ({ params }) => {
              try {
                const response = await axios.get(
                  `https://rickandmortyapi.com/api/character/${params.id}`
                );
                return response.data;
              } catch (error) {
                console.error("fetching data failed.");
              }
              
            },
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
