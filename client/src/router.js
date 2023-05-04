import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminHome from "./pages/Admin/AdminHome";
import SuperHome from "./pages/Supervisor/SuperHome"
import SupervisorRequest from "./pages/Supervisor/SupervisorRequest";
import ShowDetail from "./pages/Supervisor/Product/ShowDetail";
import Warehouse from "./pages/Admin/ManageWarehouse/Warehouse";
import AddWarehouse from "./pages/Admin/ManageWarehouse/AddWarehouse";
import UpdateWarehouse from "./pages/Admin/ManageWarehouse/UpdateWarehouse";
import Product from "./pages/Admin/ManageProduct/Product";
import AddProduct from "./pages/Admin/ManageProduct/AddProduct";
import UpdateProduct from "./pages/Admin/ManageProduct/UpdateProduct"
import Supervisor from "./pages/Admin/ManageSupervisor/Supervisor";
import AddSupervisor from "./pages/Admin/ManageSupervisor/AddSupervisor";
import UpdateSupervisor from "./pages/Admin/ManageSupervisor/UpdateSupervisor";
import App from "./App";
import Guest from "./middleware/Guest"
import ShowHistory from "./pages/Admin/ManageRequests/ShowHistory";
import ShowRequests from "./pages/Admin/ManageRequests/ShowRequests";
import ProductSupervisor from "./pages/Supervisor/ProductSupervisor";
import ShowSupervisorRequests from "./pages/Supervisor/ShowHistory";

export const routes = createBrowserRouter([
            {
              path:"/",
              element:<Login />,
            },
                {
                  path:"/home",
                  element:<AdminHome />,
                },
                {
                      path:"/manageWarehouse",
                      element:<Warehouse />,
                    },
                    {
                      path:"/add",
                      element:<AddWarehouse />,
                    },
                    {
                      path:"/update/:id",
                      element:<UpdateWarehouse/>,
                    },
                    {
                      path:"/manageProduct/:id",
                      element:<Product />,
                    },
                        {
                          path:"/add-product/:id",
                          element:<AddProduct />,
                        },
                        {
                          path:"/update-product/:id",
                          element:<UpdateProduct />,
                        },
                      
                    
                    {
                      path:"/manageSupervisor",
                      element:<Supervisor />,
                    },
                        {
                          path:"/add-supervisor",
                          element:<AddSupervisor />
                        },
                        {
                          path:"/update-supervisor/:id",
                          element:<UpdateSupervisor />,
                        },
                      
                    
                    {
                      path:"showHistory",
                      element:<ShowHistory />,
                    },
                    {
                      path:"showRequests",
                      element:<ShowRequests />,
                    },
                    /*{
                  
                      path: "/login",
                      element: <Login />,
                    
                },*/
                {
                  path:"/supervisor/:id",
                  element:<SuperHome />,
              },
              {
                  path:"/request/:id",
                  element:<SupervisorRequest />,
              },
              {
                  path:"/show/:id",
                  element:<ShowSupervisorRequests />,
              },
              {
                  path:"/SuperHome",
                  element:<ProductSupervisor />,
              },
                  
                  
                

              
            
            
            

        /*{
            path:"/login" && "",
            element:<Login />,
        },
        {
            path:"/home",
            element:<AdminHome />,
        },
        {
            path:"/supervisor",
            element:<SuperHome />,
        },
        {
            path:"/request",
            element:<SupervisorRequest />,
        },
        {
            path:"/show/:id",
            element:<ShowDetail />,
        },
            
        {
          path:"/manageWarehouse",
          element:<Warehouse />,
        },
        {
          path:"/add",
          element:<AddWarehouse />,
        },
        {
          path:"/:5",
          element:<UpdateWarehouse/>,
        },
        {
          path:"/manageProduct",
          element:<Product />,
        },
        {
          path:"/add-product",
          element:<AddProduct />,
        },
        {
          path:"/update",
          element:<UpdateProduct />,
        },
        {
          path:"/manageSupervisor",
          element:<Supervisor />,
        },
        {
          path:"/add-supervisor",
          element:<AddSupervisor />
        },
        {
          path:"/update-supervisor",
          element:<UpdateSupervisor />,
        },
          
        
        {
            path:"*",
            element:<Navigate to={"/"}/>
        }*/
        /*{
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":id",
        element: <MovieDetails />,
      },

      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/manage-movies",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageMovies />,
          },
          {
            path: "add",
            element: <AddMovie />,
          },
          {
            path: ":id",
            element: <UpdateMovie />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },*/

]);
