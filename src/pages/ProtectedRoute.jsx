/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthorized) navigate("/");
    },
    [isAuthorized, navigate]
  );
  return isAuthorized ? children : null;
}

export default ProtectedRoute;
