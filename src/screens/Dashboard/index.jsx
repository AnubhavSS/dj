import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { fetchDetails, sendDetails } from "../../services";
import Graph from "../../components/Graph";
const Dashboard = () => {
  const [details, setdetails] = useState({});
  const [changedValue, setchangedValue] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      fetchDetails(id)
        .then((resonse) => {
          setdetails(resonse?.data);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);


  const onValueChange = (e) => {
    if (e.target.value === "false") {
      setdetails({ ...details, charge_customers: false });
      setchangedValue({ ...changedValue, charge_customers: false });
    } else if (e.target.value === "true") {
      setdetails({ ...details, charge_customers: true });
      setchangedValue({ ...changedValue, charge_customers: true });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setdetails({
      ...details,
      amount: { ...details.amount, [id]: parseInt(value) },
    });
  };

  const handleNewChange = (e) => {
    const { id, value } = e.target;
    setchangedValue((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const onSave = async () => {
    let payload = {};
    if (changedValue.hasOwnProperty("charge_customers")) {
      delete changedValue.charge_customers;
      payload = {
        amount: { ...changedValue },
      };
    } else {
      payload = {
        amount: { ...changedValue },
      };
    }
    sendDetails(payload,id)
      .then((res) =>alert("Success"))
      .catch((err) => console.log(err));
  };

  return (
    <div >
      <div className="dashBoard">
        <h3 className="heading">
          {details?.name}, {details?.location}
        </h3>

        {/* Charge Your Customers */}
        <div className="options">
          <p className="reg" style={{ textAlign: "start" }}>
            Do you want to charge your customers for requesting songs?
          </p>
          {/* Radio button for "Yes" */}
          <div style={{ display: "flex", gap: 6,justifyContent:'center',alignItems:'center' }}>
            <label className="radioLabel">
              <input
                id="charge_customers"
                type="radio"
                value="true"
                className="radio"
                // Checking this radio button if the selected option is "Yes"
                checked={details?.charge_customers === true}
                onChange={onValueChange}
              />
              Yes
            </label>

            {/* Radio button for "No" */}
            <label className="radioLabel">
              <input
                id="charge_customers"
                type="radio"
                value="false"
                className="radio"
                // Checking this radio button if the selected option is "No"
                checked={details?.charge_customers === false}
                onChange={onValueChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Custom Song Request */}
        <div className="options">
          <p className="reg">Custom song request amount-</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Amount"
              className={`amount ${
                !details?.charge_customers ? "disable" : "enable"
              }`}
              id="category_6"
              value={details?.amount?.category_6 || ""}
              onChange={(e) => {
                handleChange(e);
                handleNewChange(e);
              }}
              disabled={!details?.charge_customers}
            />
            {details?.amount?.category_6 < 99 && (
              <p className="error">Amount should be more than 99</p>
            )}
          </div>
        </div>

        {/* Regular Song request amount */}
        <div className="options">
          <p className="reg">Regular song request amounts, from high to low-</p>
          <div
            style={{
              display: "flex",
              flexWrap:'wrap',
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                id="category_7"
                className={`card ${
                  !details?.charge_customers ? "disable" : "enable"
                }`}
                disabled={!details?.charge_customers}
                type="text"
                value={details?.amount?.category_7 || ""}
                onChange={(e) => {
                  handleChange(e);
                  handleNewChange(e);
                }}
              />{" "}
              {details?.amount?.category_7 < 79 && (
                <p className="error">{">"}79</p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                id="category_8"
                className={`card ${
                  !details?.charge_customers ? "disable" : "enable"
                }`}
                disabled={!details?.charge_customers}
                type="text"
                value={details?.amount?.category_8 || ""}
                onChange={(e) => {
                  handleChange(e);
                  handleNewChange(e);
                }}
              />{" "}
              {details?.amount?.category_8 < 59 && (
                <p className="error">{">"}59</p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                id="category_9"
                className={`card ${
                  !details?.charge_customers ? "disable" : "enable"
                }`}
                disabled={!details?.charge_customers}
                type="text"
                value={details?.amount?.category_9 || ""}
                onChange={(e) => {
                  handleChange(e);
                  handleNewChange(e);
                }}
              />{" "}
              {details?.amount?.category_9 < 39 && (
                <p className="error">{">"}39</p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                id="category_10"
                className={`card ${
                  !details?.charge_customers ? "disable" : "enable"
                }`}
                disabled={!details?.charge_customers}
                type="text"
                value={details?.amount?.category_10 || ""}
                onChange={(e) => {
                  handleChange(e);
                  handleNewChange(e);
                }}
              />{" "}
              {details?.amount?.category_10 < 19 && (
                <p className="error">{">"}19</p>
              )}
            </div>
          </div>
        </div>

        {/* Graph */}
        {details && details?.charge_customers && (
          <Graph changedValue={details} />
        )}
        <button
          onClick={onSave}
          disabled={
            !details?.charge_customers ||
            !(
              details?.amount?.category_8 > 59 &&
              details?.amount?.category_9 > 39 &&
              details?.amount?.category_10 > 19
            )
          }
          style={{
            backgroundColor: `${
              !details?.charge_customers ||
              !(
                details?.amount?.category_8 > 59 &&
                details?.amount?.category_9 > 39 &&
                details?.amount?.category_10 > 19
              )
                ? "#C2C2C2"
                : ""
            }`,
            margin:'auto'
          }}
          className="btn"
          
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
