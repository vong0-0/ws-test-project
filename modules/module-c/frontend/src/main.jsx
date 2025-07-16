import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Routing lib
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Heritages, { loader as heritagesLoader } from "./pages/Heritages";
import Tags, { loader as tagsLoader } from "./pages/Tags";
import IndexLayout from "./layouts/IndexLayout";
import Acient from "./pages/Acient";
import AncientAndRoman from "./pages/AncientAndRoman";
import MedievalAndRenaissance from "./pages/MedievalAndRenaissance";
import ModernAndContemporary from "./pages/ModernAndContemporary";
import OtherNotableSites from "./pages/OtherNotableSites";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <IndexLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        // === Acient folder content ===
        {
          path: "/heritages/Acient",
          element: <Acient />,
        },
        {
          path: "/heritages/Acient/Ancient&Roman",
          element: <AncientAndRoman />,
        },
        {
          path: "/heritages/Acient/Medieval&Renaissance",
          element: <MedievalAndRenaissance />,
        },
        {
          path: "/heritages/Acient/Modern&Contemporary",
          element: <ModernAndContemporary />,
        },
        // === End acient folder content ===

        // Other notable sites content
        {
          path: "/heritages/OtherNotableSites",
          element: <OtherNotableSites />,
        },
        // End other notable sites content
      ],
    },
    {
      path: "heritages/*",
      element: <Heritages />,
      loader: heritagesLoader,
    },
    {
      path: "tags/:tag",
      element: <Tags />,
      loader: tagsLoader,
    },
  ],
  { basename: "/01_module_c" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
