import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { route } from "./route";
const Router = createBrowserRouter(route)
function App() {
  return(
    <RouterProvider router={Router}/>
  )
}

export default App;
