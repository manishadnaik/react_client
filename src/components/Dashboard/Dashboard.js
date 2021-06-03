import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config/variables";
import "./Dashboard.css";
import DashboardJsx from "./DashboardJsx";
const Dashboard = () => {
  let credentials = JSON.parse(localStorage.getItem("credentials"));
  var date = new Date();
  // const [month, setMonth] = useState(
  //   date.getMonth() + "-" + date.getMonth() + 1
  // );
  const [totalExpenses, setTotalExpenses] = useState(0);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const formatDate = (date) => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  const [months, setMonths] = useState({
    startDate: formatDate(firstDay),
    endDate: formatDate(lastDay),
  });
  const ifDatesAreEqual = () => {
    if (months.startDate === months.endDate) {
      let day = new Date(months.endDate);
      setMonths({
        ...months,
        endDate: formatDate(new Date(day.setDate(day.getDate() + 1))),
      });
      console.log("updatedd->", months.endDate);
    }
  };
  const getExpenseForMonth = async () => {
    return await axios
      .get(SERVER_URL + "/expenses/get-expense-by-month", {
        params: {
          month: months,
        },
        headers: { Authorization: "Bearer " + credentials.token },
      })
      .catch((error) => console.log(error));
  };
  // useEffect(() => {
  //   console.log("in callback", months);
  // }, [months]);

  useEffect(() => {
    getExpenseForMonth().then((res) => {
      if (typeof res !== "undefined") {
        setTotalExpenses(res.data.totalExpense);
      }
    });
  }, [months]);

  const getExpenseAmount = (e) => {
    e.preventDefault();
    ifDatesAreEqual();
    getExpenseForMonth().then((res) => {
      setTotalExpenses(res.data.totalExpense);
    });
  };
  const expenseStartMonthhandler = (e) => {
    setMonths({ ...months, [e.target.name]: e.target.value });
  };
  const expenseEndMonthhandler = (e) => {
    setMonths({ ...months, [e.target.name]: e.target.value });
  };
  // console.log(months);
  return (
    <DashboardJsx
      params={{
        months,
        totalExpenses,
        credentials,
        getExpenseAmount,
        expenseStartMonthhandler,
        expenseEndMonthhandler,
      }}
    />
  );
};

export default Dashboard;
