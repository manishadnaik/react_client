import React from "react";
import CategoryList from "../Category/CategoryList";

const DashboardJsx = ({ params }) => {
  const {
    months,
    totalExpenses,
    credentials,
    getExpenseAmount,
    expenseStartMonthhandler,
    expenseEndMonthhandler,
  } = params;
  return (
    <>
      <div className="total-expense-container">
        <form onSubmit={getExpenseAmount} className="form-inline">
          <div className="form-group">
            <label className="col-form-label text-left mr-1">Start Date</label>
            <div>
              <input
                type="date"
                id="expenseMonth"
                name="startDate"
                className="form-control"
                value={months.startDate}
                onChange={expenseStartMonthhandler}
              ></input>
            </div>
          </div>
          <div className="form-group ml-2">
            <label className="col-form-label text-left  mr-1">End Date</label>
            <input
              type="date"
              id="expenseMonth"
              name="endDate"
              className="form-control"
              value={months.endDate}
              onChange={expenseEndMonthhandler}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary ml-2">
            Find Expense
          </button>
        </form>
        {Object.keys(months).length && (
          <div>
            Total expense from <b>{months.startDate}</b> to
            <b> {months.endDate}</b>: <b>{totalExpenses}</b>
          </div>
        )}
      </div>
      {/* load categories */}
      {credentials && <CategoryList />}
    </>
  );
};

export default DashboardJsx;
