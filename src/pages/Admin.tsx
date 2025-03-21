import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";

interface Car {
  id: string;
  brand: string;
  price: number;
  status: string;
}

const Admin = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState({ brand: "", price: "" });

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, "Cars");
      const carSnapshot = await getDocs(carsCollection);
      setCars(carSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Car)));
    };
    fetchCars();
  }, []);

  const handleApprove = async (carId: string) => {
    await deleteDoc(doc(db, "Cars", carId));
  };

  const handleReject = async (carId: string) => {
    const carRef = doc(db, "Cars", carId);
    await updateDoc(carRef, { status: "Available" });
  };

  const handleAddCar = async () => {
    const carsCollection = collection(db, "Cars");
    await addDoc(carsCollection, {
      brand: newCar.brand,
      price: parseInt(newCar.price),
      owner: "",
      status: "Available",
    });
    setNewCar({ brand: "", price: "" });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      
      <h3>Add New Car</h3>
      <input type="text" placeholder="Brand" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
      <input type="number" placeholder="Price" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} />
      <button onClick={handleAddCar}>Add Car</button>

      <h3>Cars Under Negotiation</h3>
      {cars.map((car) => (
        car.status === "Under Negotiation" && (
          <div key={car.id}>
            <h3>{car.brand} - ${car.price}</h3>
            <button onClick={() => handleApprove(car.id)}>Approve Purchase</button>
            <button onClick={() => handleReject(car.id)}>Reject Purchase</button>
          </div>
        )
      ))}
    </div>
  );
};

export default Admin;