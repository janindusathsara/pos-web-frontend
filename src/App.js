import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import CategoryProduct from './pages/CategoryProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='products' element={<Product />} />
        <Route path='products/:id' element={<SingleProduct />} />
        <Route path='categories/:id/products' element={<CategoryProduct />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='categories' element={<Category />} />
        <Route path='categories/:id/products/:id' element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
