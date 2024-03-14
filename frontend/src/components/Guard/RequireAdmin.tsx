import { useLocation, Navigate } from 'react-router-dom';
import { retreiveTokens } from '../../util';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
interface Props {
  children: JSX.Element;
}

const RequireAdmin: React.FC<Props> = ({ children }): JSX.Element => {
  const location = useLocation();
  const { user } = useContext(UserContext) as IUserContext;

  if (retreiveTokens()?.token && user.role === 'USER') {
    return <Navigate to={`/${user.slug}/latest`} replace state={{ path: location.pathname }} />;
  } else if (retreiveTokens()?.token) {
    return children;
  } else {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
};

export default RequireAdmin;
