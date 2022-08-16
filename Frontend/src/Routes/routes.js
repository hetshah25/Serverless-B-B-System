import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import ViewRooms from "../components/Dashboard/ViewRooms";
import LandingPage from "../components/Home/LandingPage";
import LandingPageLoggedIn from "../components/Home/LandingPageLoggedIn";
import Login2 from "../components/Login/Login2";
import Login3 from "../components/Login/Login3";
import Login1 from "../components/Login/Login1";
import UserRegistration from "../components/Register/UserRegistration/UserRegistration";
import ConfirmRegistration from "../components/Register/ConfirmRegistration/ConfirmRegistration";
import StoreUserDetails from "../components/Register/StoreUserDetails/StoreUserDetails";
import UserDashboard from "../components/Dashboard/UserDashboard";
import Order from "../components/Order/Order";
import BookRoom from "../components/BookRoom/BookRoom";
import FeedBack from "../components/FeedBack/FeedBack";
import BookTour from "../components/BookTour/BookTour";
import NotFound from "../components/NotFound/NotFound";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../services/auth";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import { getUserFromLocalStorage } from "../services/getUserFromLocalStorage";

const Routes = () => {
  // 0 - not authenticated
  // 1 - user authenticated
  // 2 - admin authenticated
  // const [authenticatedAs, setAuthenticatedAs] = useState(0);
  const history = useHistory();
  const logoutOfBnB = () => {
    logoutUser();
    history.replace("/");
  };

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} exact>
          {getUserFromLocalStorage() == null ? (
            <LandingPage />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/login1" component={Login1}>
          {getUserFromLocalStorage() == null ? (
            <Login1 />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/login2" component={Login2}>
          {getUserFromLocalStorage() == null ? (
            <Login2 />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/login3" component={Login3}>
          {getUserFromLocalStorage() == null ? (
            <Login3 />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/register" component={UserRegistration}>
          {getUserFromLocalStorage() == null ? (
            <UserRegistration />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/confirmRegistration" component={ConfirmRegistration}>
          {getUserFromLocalStorage() == null ? (
            <ConfirmRegistration />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/getAdditionalUserDetails" component={StoreUserDetails}>
          {getUserFromLocalStorage() == null ? (
            <StoreUserDetails />
          ) : (
            <LandingPageLoggedIn />
          )}
        </Route>
        <Route path="/view-rooms" component={ViewRooms}>
          {/* Even unregistered users can go */}
          <ViewRooms logoutOfBnB={logoutOfBnB} />
        </Route>
        <Route path="/feedback" component={FeedBack}>
          {/* Even unregistered users can go, internally we can check user is auth or not */}
          <FeedBack logoutOfBnB={logoutOfBnB} />
        </Route>
        <Route path="/user-dashboard" component={UserDashboard}>
          {getUserFromLocalStorage() != null &&
          getUserFromLocalStorage().isAdmin === "no" ? (
            <UserDashboard logoutOfBnB={logoutOfBnB} />
          ) : (
            <Login1 />
          )}
        </Route>
        <Route path="/order-food" component={Order}>
          {/* both can do */}
          <Order logoutOfBnB={logoutOfBnB} />
        </Route>
        <Route path="/bookroom" component={BookRoom}>
          {/* only registered user */}
          {getUserFromLocalStorage() != null &&
          getUserFromLocalStorage().isAdmin === "no" ? (
            <BookRoom logoutOfBnB={logoutOfBnB} />
          ) : (
            <Login1 />
          )}
        </Route>
        <Route path="/booktour" component={BookTour}>
          {/* only registered user */}
          {getUserFromLocalStorage() != null &&
          getUserFromLocalStorage().isAdmin === "no" ? (
            <BookTour logoutOfBnB={logoutOfBnB} />
          ) : (
            <Login1 />
          )}
        </Route>
        <Route path="/admin-dashboard" component={AdminDashboard}>
          {/* only admin */}
          {getUserFromLocalStorage() != null &&
          getUserFromLocalStorage().isAdmin === "yes" ? (
            <AdminDashboard logoutOfBnB={logoutOfBnB} />
          ) : (
            <Login1 />
          )}
        </Route>
        <Route path="/*" component={BookTour}>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
