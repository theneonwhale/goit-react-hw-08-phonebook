import { useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Container from './components/Container/Container';
import { authOperations, authSelectors } from './redux/auth';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactsView = lazy(() => import('./views/ContactsView'));
const AddContactView = lazy(() => import('./views/AddContactView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser,
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      {!isFetchingCurrentUser && (
        <>
          <AppBar />
          <Switch>
            <Suspense fallback={<Loader />}>
              <PublicRoute path="/" exact restricted redirectTo="/contacts">
                <LoginView />
              </PublicRoute>
              <PublicRoute
                path="/login"
                exact
                restricted
                redirectTo="/contacts"
              >
                <LoginView />
              </PublicRoute>
              <PublicRoute
                path="/register"
                exact
                restricted
                redirectTo="/contacts"
              >
                <RegisterView />
              </PublicRoute>
              <PrivateRoute path="/contacts" redirectTo="/login">
                <ContactsView />
              </PrivateRoute>
              <PrivateRoute path="/add-contact" redirectTo="/login">
                <AddContactView />
              </PrivateRoute>
            </Suspense>
          </Switch>
        </>
      )}
      <ToastContainer />
    </Container>
  );
}
