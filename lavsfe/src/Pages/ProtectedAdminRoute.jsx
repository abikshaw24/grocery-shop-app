import { Navigate } from "react-router-dom";


function ProtectedAdminRoute({ children }) {

  const isAdmin =
    localStorage.getItem(
      "adminLoggedIn"
    );


  if (isAdmin !== "true") {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }


  return children;

}


export default ProtectedAdminRoute;