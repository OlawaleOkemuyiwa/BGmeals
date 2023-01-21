import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import FoodsScreen from "./screens/FoodsScreen";
import NotFound from "./screens/NotFound";
import CartScreen from "./screens/CartScreen";
import AdminScreen from "./screens/AdminScreen";
import UsersList from "./components/Admin/UsersList";
import RestaurantList from "./components/Admin/RestaurantsList";
import OrdersList from "./components/Admin/OrdersList";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await fetch("/api/users/getStatus", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const status = await response.json();
          setIsAdmin(status);
        } catch (error) {
          alert(error.message);
        }
      })();
    }
  }, [token, isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate replace to="/" /> : <AuthScreen />}
      />
      <Route
        path="/meals"
        element={isLoggedIn ? <FoodsScreen /> : <Navigate replace to="/auth" />}
      />
      <Route
        path="/cart"
        element={isLoggedIn ? <CartScreen /> : <Navigate replace to="/auth" />}
      />
      <Route
        path="/admin/*"
        element={
          isLoggedIn && isAdmin ? (
            <AdminScreen></AdminScreen>
          ) : isLoggedIn ? (
            <Navigate replace to="/meals" />
          ) : (
            <Navigate replace to="/auth" />
          )
        }
      >
        <Route path="UsersList" element={<UsersList />} />
        <Route path="RestaurantsList" element={<RestaurantList />} />
        <Route path="OrdersList" element={<OrdersList />} />
      </Route>
      {isLoggedIn && <Route path="*" element={<NotFound />} />}
      {!isLoggedIn && <Route path="*" element={<Navigate replace to="/" />} />}
    </Routes>
  );
}

export default App;
