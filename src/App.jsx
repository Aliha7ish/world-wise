import Product from "./pages/product";
import Pricing from "./pages/pricing";
import Homepage from "./pages/Homepage";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesProvider.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <CitiesProvider>
      <div>
        <div>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="/" element={<Homepage />} />
                <Route index element={<Homepage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </div>
    </CitiesProvider>
  );
}

export default App;
