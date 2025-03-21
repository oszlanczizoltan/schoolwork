import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

interface DashboardProps {
  userRole: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<{ id: string; brand: string; price: number; status: string }[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollection = collection(db, "Cars");
        const carSnapshot = await getDocs(carsCollection);
        const carList = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; brand: string; price: number; status: string }[]; 

        setCars(carList);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleBuy = async (carId: string) => {
    try {
      const carRef = doc(db, "Cars", carId);
      await updateDoc(carRef, { status: "Under Negotiation" });
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === carId ? { ...car, status: "Under Negotiation" } : car))
      );
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Car Listings</h2>
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        cars.map((car) => (
          <div key={car.id}>
            <h3>{car.brand} - ${car.price}</h3>
            <p>Status: {car.status}</p>
            {car.status === "Available" && <button onClick={() => handleBuy(car.id)}>Buy</button>}
          </div>
        ))
      )}
      {userRole === "admin" && <p>You have admin privileges.</p>}
    </div>
  );
};

export default Dashboard;
