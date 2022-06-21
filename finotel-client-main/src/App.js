// import those pages in App.js
// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import SearchResult from "./hotels/SearchResult";

import PaymentContainer from "./booking/PaymentContainer";
import CabContainer from "./components/cabs/CabContainer"
import CabPayment from "./components/cabs/CabPayment";
import HotelBookings from "./user/HotelBookings";
import FooterNav from "./components/Footer";



/**
 * Lets create TopNavigation/menu bar so that we can easily TopNavigate between pages
 * lets write it in App.js before we move it to its own component
 */

function App() {
  return (
    <BrowserRouter>
      <TopNav />    
      <div className="app-content">
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <Route exact path="/search-result" component={SearchResult} />
        <PrivateRoute exact path="/payment/:hotelId" component={PaymentContainer} />
        <PrivateRoute exact path="/cabs" component={CabContainer} />
        <PrivateRoute exact path="/cabs/payment/:id" component={CabPayment} />
        <PrivateRoute exact path="/booking-details/:hotelId" component={HotelBookings} />
      </Switch>
      </div>

      <FooterNav/>
    </BrowserRouter>
  );
}

export default App;
