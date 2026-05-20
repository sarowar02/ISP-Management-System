import { useEffect, useState } from "react";
import API from "../services/api";
import "./Landing.css";
import Navbar from "../components/Navbar"

function Landing() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ username: "", phone: "" });
  const [bills, setBills] = useState([]);


  useEffect(() => {
    API.get("/packages")
      .then(res => setPackages(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkBills = () => {
    API.post("/public/bills", {
      username: form.username.trim(),
      phone: form.phone.trim()
    })
      .then(res => setBills(res.data.data))
      .catch(err => alert(err.response?.data?.message || "Error"));
  };

    const payOnline = (billId) => {
    alert("Redirecting to payment gateway...");

    API.post(`/payments/initiate/${billId}`)
        .then(() => {
        alert("Payment successful (mock)");
        checkBills();
        });
    };

   

  return (
    <div>

      <div className="landing">

            <Navbar />

            {/* HERO */}
            <div className="hero">
                <h1>Fast & Reliable Internet</h1>
                <p>Connect your world with high-speed internet</p>
                <a href="#bill">
                <button> Check Your Bill</button>
                </a>
            </div>

            {/* PACKAGES */}
            <div className="section" id="packages">
                <h2>Our Packages</h2>

                <div className="package-grid">
                {packages.map((p) => (
                    <div key={p.id} className="package-card">
                    <h3>{p.name}</h3>
                    <p>{p.speed} Mbps</p>
                    <p>{p.price} ৳</p>
                    </div>
                ))}
                </div>
            </div>

            {/* BILL CHECK */}
            <div className="section" id="bill">
                <h2>Check Your Bill</h2>

                <div className="bill-form">
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <button onClick={checkBills}>Check Bill</button>
                </div>

                {/* BILL TABLE */}
                {bills && bills.length > 0 && (
                <table className="bill-table">
                    <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {bills.map((b) => (
                        <tr key={b.id}>
                        <td>{b.billingMonth}</td>
                        <td>{b.amount} ৳</td>
                        <td style={{ color: b.status === "PAID" ? "green" : "red" }}>
                            {b.status}
                        </td>
                        <td>
                            {b.status === "UNPAID" && (
                            <button onClick={payOnline(b.id)}>Pay</button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    </div>
  );
}

export default Landing;