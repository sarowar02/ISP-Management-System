import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Bills() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  

  const fetchBills = () => {
    API.get("/bills")
      .then(res => setBills(res.data.data))
      .catch(err => console.error(err));
  };

  const generateAllBills = () => {
    API.post(`/bills/generate`)
      .then(() => {
        alert("Bill generated!");
        fetchBills();
      })
      .catch(err => alert(err.response?.data?.message || "Error"));
  };

  const payBill = (id) => {
    const confirmPay = window.confirm("Are you sure you want to mark this bill as PAID?");
    if (!confirmPay) return;

    API.post(`/bills/pay/${id}`)
      .then(() => {
        alert("Bill paid!");
        fetchBills();
      })
      .catch(err => console.error(err));
  };

    const searchBills = useCallback(() => {
    if (!search) return fetchBills();

    API.get(`/bills/search?keyword=${search}`)
      .then(res => setBills(res.data.data))
      .catch(err => console.error(err));
  }, [search]);


  const resetSearchBills = () =>{
    setSearch("");
    fetchBills();
  }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
    const delay = setTimeout(() => {
      searchBills();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchBills]);
  

  return (
    <div>
      <Navbar />
      <h2>Bills</h2>

      {/* GENERATE BILL */}
      <div>
        <button onClick={generateAllBills}>
          Generate Monthly Bills
        </button>
      </div>

      <br />

      <div className="card">
        <h3>Search Bills</h3>

        <input
          placeholder="Search by username or PAID/UNPAID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchBills}>Search</button>
        <button onClick={resetSearchBills}>Reset</button>
    </div>

      {/* TABLE */}
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Month</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((b) => (
            <tr key={b.id}>
              <td>{b.user.mikrotikUsername}</td>
              <td>{b.amount} ৳</td>
              <td>{b.status}</td>
              <td>{b.billingMonth}</td>
              <td>
                {b.status === "UNPAID" ? (
                  <button onClick={() => payBill(b.id)}>Pay</button>
                ) : <span style={{color:"green",margin:"5px"}}>Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bills;