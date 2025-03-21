import { useEffect, useState } from "react";
import { db, auth } from "./firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { checkAdmin } from "./auth";

interface Car {
  id?: string;
  brand: string;
  price: number;
  owner: string;
  status: string;
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState({ brand: "", price: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Car[];
      setCars(carList);
    }

    fetchCars();
    auth.onAuthStateChanged(async (user) => {
      if (user) setIsAdmin(await checkAdmin(user.uid));
    });
  }, []);

  const addCar = async () => {
    if (!newCar.brand || !newCar.price) return;
    await addDoc(collection(db, "cars"), { 
      ...newCar, 
      price: Number(newCar.price), 
      owner: auth.currentUser?.uid, 
      status: "Available" 
    });
  };

  const removeCar = async (id: string) => {
    await deleteDoc(doc(db, "cars", id));
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div>
      <h1>Available Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} - ${car.price} - {car.status}
            {isAdmin && <button onClick={() => removeCar(car.id!)}>Remove</button>}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div>
          <h2>Add Car</h2>
          <input type="text" placeholder="Brand" onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
          <input type="number" placeholder="Price" onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} />
          <button onClick={addCar}>Add Car</button>
        </div>
      )}
    </div>
  );
}
