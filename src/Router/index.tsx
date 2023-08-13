import { createBrowserRouter } from "react-router-dom";
import { ROUTE_NAMES } from "./Consts";
import { Layout } from "Layout";
import { ErrorBoundary } from "Common/Components/ErrorBoundary";
import { NotFoundPage } from "./NotFoundPage";
import { ContentPage } from "Modules/Content";
import { CONTENT_ROUTES } from "Modules/Content/Router.config";

const MAIN_ROUTES = [...CONTENT_ROUTES];

export const router = createBrowserRouter([
  {
    path: ROUTE_NAMES.PATH,
    Component: Layout,
    ErrorBoundary,
    children: [
      {
        path: "*",
        Component: NotFoundPage,
      },
      {
        index: true,
        Component: ContentPage,
      },
      ...MAIN_ROUTES,
    ],
  },
]);
