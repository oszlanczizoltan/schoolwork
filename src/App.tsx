import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import AppRoutes from "./routes";
import Navbar from "./components/Common/Navbar";
import { BrowserRouter as Router } from "react-router-dom"; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <Navbar />
            <AppRoutes />
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};  

export default App;