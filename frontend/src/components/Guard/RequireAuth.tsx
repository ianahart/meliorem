import { useLocation, Navigate } from 'react-router-dom';
import { retreiveTokens } from '../../util';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }): JSX.Element => {
  const location = useLocation();
  const { user } = useContext(UserContext) as IUserContext;

  if (retreiveTokens()?.token && user.role === 'USER') {
    return children;
  } else if (retreiveTokens()?.token && user.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace state={{ path: location.pathname }} />;
  } else {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
};

export default RequireAuth;
