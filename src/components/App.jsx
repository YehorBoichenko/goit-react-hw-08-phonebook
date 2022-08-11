import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Container } from './Container/Container';
import PublicRoute from '../components/Routes/PublicRoute';
import PrivateRoute from '../components/Routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authSelectors from 'redux/authorization/authorization-selectors';
import authorizationOperations from 'redux/authorization/authorization-operations';
import RegisterView from 'views/Registration/Registration';
import LoginView from 'views/Login/Login';
import ContactsViewPage from 'views/Contactspage/ContactsPage';
import AppBar from './AppBar/AppBar';
import LoaderSpinner from './loader/Loader';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactLIst/ContactList';
// import Filter from './Filter/Filter';
// import Title from './Title/Title';
// import styles from '../App.module.css';

export default function App() {
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorizationOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />
        <Suspense fallback={LoaderSpinner}>
          <Routes>
            <Route
              path="/register"
              element={
                <PublicRoute redirectTo="/contacts" restricted>
                  <RegisterView />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/contacts" restricted>
                  <LoginView />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsViewPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Suspense>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    )
  );
}
