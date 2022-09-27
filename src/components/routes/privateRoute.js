import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

export default function PrivateRoute({ children, loginInfo }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}
