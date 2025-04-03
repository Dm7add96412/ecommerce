import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          path: '',
          element: <HomePage/>
        },
        {
          path: '/products',
          element: <ProductsPage/>
        },
        {
          path: '/shoppingcart',
          element: <CartPage/>
        },
        {
          path: '/profilepage',
          element: <ProfilePage/>
        },
        {
          path: '/search/:searchWord',
          element: <SearchPage/>
        },
        {
          path: '/singleproduct/:productId',
          element: <ProductPage/>
        },
        {
          path: '/categories',
          element: <CategoriesPage/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
