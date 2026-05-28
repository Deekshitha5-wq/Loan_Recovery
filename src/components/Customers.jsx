import { useEffect, useState } from "react";
import { getCustomers } from "../api";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-[#1F2937] p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {customer.name}
            </h2>

            <p className="mt-3">
              Phone: {customer.phone}
            </p>

            <p>Status: {customer.status}</p>
          </div>
        ))}

      </div>
    </div>
  );
}