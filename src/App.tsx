import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import AppRoutes from "./routes";
import Navbar from "./components/Common/Navbar";
import { Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
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