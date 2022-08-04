import Home from './container/Home/Home'
import About from './container/About/About'
import Contact from './container/Contact/Contact'
import ProductsScreen from './container/ProductsScreen/ProductsScreen'
import MainProduct from './container/MainProduct/MainProduct'
import Blog from './container/Blog/Blog'
import CartPage from './container/CartPage/CartPage'
import ShippingPage from './container/ShippingPage/ShippingPage'
import SelectPayment from './container/SelectPayment/SelectPayment'
import PlaceOrder from './container/PlaceOrder/PlaceOrder'
import UserDashbord from './container/UserDashbord/UserDashbord'
import Signup from './container/Signup/Signup'
import Signin from './container/Signin/Signin'
import EditProfile from './container/EditProfile/EditProfile'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import DashboardAdmin from './container/ِDashboardAdmin/DashboardAdmin'
import AdminRoute from './components/AdminRoute/AdminRoute'
import UserList from './container/UserList/UserList'
import UserEdit from './container/UserEdit/UserEdit'
import ProductList from './container/ProductList/ProductList'
import ProductEdit from './container/ProductEdit/ProductEdit'
import SearchScreen from './container/SearchScreen/SearchScreen'




let routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/products', element: <ProductsScreen /> },
  { path: '/blog', element: <Blog /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/shipping', element: <ShippingPage /> },
  { path: '/payment', element: <SelectPayment /> },
  { path: '/search', element: <SearchScreen /> },
  
  { path: '/admin/dashboard', element: <AdminRoute><DashboardAdmin /></AdminRoute> },
  { path: '/admin/users-list', element: <AdminRoute><UserList /></AdminRoute> },
  { path: '/admin/product-list', element: <AdminRoute><ProductList /></AdminRoute> },
  { path: '/admin/user/:id', element: <AdminRoute><UserEdit /></AdminRoute> },
  { path: '/admin/product/:id', element: <AdminRoute><ProductEdit /></AdminRoute> },
  {
    path: '/user-profile', element:
      <ProtectedRoute>
        <UserDashbord />
      </ProtectedRoute>
  },
  {
    path: '/edit-profile', element:
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
  },
  { path: '/placeorder', element: <PlaceOrder /> },
  { path: '/signup', element: <Signup /> },
  { path: '/signin', element: <Signin /> },
  { path: '/product/:slug', element: <MainProduct /> },
]

export default routes