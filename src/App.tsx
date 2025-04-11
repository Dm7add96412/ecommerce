import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage';
import LoginPage from './pages/LoginPage';

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
        },
        {
          path: '/categories/:categoryId/products',
          element: <ProductsByCategoryPage/>
        },
        {
          path: '/login',
          element: <LoginPage/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
