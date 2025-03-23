import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

interface GraphicsCard {
  id: string;
  name: string;
  releaseDate: string;
  memory: string;
  price: number;
}

interface ProductContextType {
  graphicsCards: GraphicsCard[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [graphicsCards, setGraphicsCards] = useState<GraphicsCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphicsCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "GraphicsCards"));
        const cardsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as GraphicsCard[];
        setGraphicsCards(cardsData);
      } catch (error) {
        console.error("Error fetching graphics cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGraphicsCards();
  }, []);

  return (
    <ProductContext.Provider value={{ graphicsCards, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
