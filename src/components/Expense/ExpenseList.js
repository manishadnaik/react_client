import React from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ category }) => {
  // fetch expense list for this category user and send to expenseItem
  const expe = useSelector((state) => state.expense);
  const expenses = expe.all;
  return Object.keys(expenses).length === 0 ? (
    <div className="text-center">
      <h4>Loading..., If none please add amount and then add new expense</h4>
    </div>
  ) : (
    <div className="">
      <div
        className="card text-white mb-3"
        style={{
          border: "1px solid #6c757d",
          borderRadius: "5px",
        }}
      >
        <div className="card-header text-white bg-secondary">
          Expenses({expenses.length})
        </div>
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td>Sr.no</td>
                <td>Title</td>
                <td>Expense Amount</td>
                <td>Image</td>
                <td>Description</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => {
                return (
                  <ExpenseItem
                    key={index}
                    index={index}
                    expense={expense}
                    category={category}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
