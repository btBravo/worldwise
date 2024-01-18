import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

// Build before lazy loading
// dist/assets/index-876024a2.css   31.90 kB │ gzip:   5.28 kB
// dist/assets/index-6b8e8c1e.js   533.15 kB │ gzip: 150.92 kB

const Homepage = lazy(()=>import('./pages/Homepage'))
const Product = lazy(()=>import('./pages/Product'))
const Pricing = lazy(()=>import('./pages/Pricing'))
const Login = lazy(()=>import('./pages/Login'))
const AppLayout = lazy(()=>import('./pages/AppLayout'))
const PageNotFound = lazy(()=>import('./pages/PageNotFound'))

// Build after lazy loading
// dist/assets/Logo-81b2c976.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-b7d792c3.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-9f395e2d.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-4503fc2e.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-b91bce59.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-9e3bf281.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-3e9d0bae.css           28.23 kB │ gzip:   4.60 kB
// dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-8db12cf8.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-3ce16613.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-7f3502d8.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-3f79e547.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-da99677b.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-dbc193d9.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-11c493bb.js             1.02 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-503c0cf6.js       156.98 kB │ gzip:  46.20 kB
// dist/assets/index-f163b630.js           374.56 kB │ gzip: 104.20 kB


function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
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
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
