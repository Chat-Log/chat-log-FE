import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthCheck = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return isAuth ? <Outlet /> : null;
};

export default AuthCheck;
