import {
  createBrowserRouter,
} from "react-router-dom";
import { EventPage } from "./pages/event-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventPage />,
  }
])

export default router;
