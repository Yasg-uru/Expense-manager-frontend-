import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RootStateInterface from "../interfaces/RootStateInterface";
interface Props {
  allowedrole: string[];
}
function ProtectedHelper({ allowedrole }: Props) {
  const location = useLocation();
  const isLoggedIn = useSelector<RootStateInterface>(
    (state) => state.auth.isLoggedin
  ) as boolean;
  const role = useSelector<RootStateInterface>(
    (state) => state.auth.role
  ) as string;

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!allowedrole.includes(role)) {
      navigate("/login");
    }
  }, [isLoggedIn, location, role, navigate]);
  return <>{isLoggedIn && allowedrole.includes(role) && <Outlet />}</>;
}
export default ProtectedHelper;
