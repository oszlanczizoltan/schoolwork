import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import AppRoutes from "./routes";
import Navbar from "./components/Common/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <Navbar />
          <AppRoutes />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;