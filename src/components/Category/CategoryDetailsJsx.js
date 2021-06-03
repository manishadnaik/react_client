import React from "react";
import { DUMMY_IMAGE, SERVER_URL } from "../../config/variables";
import ExpenseList from "../Expense/ExpenseList";
import AddRow from "../Shared/AddRow";

const CategoryDetailsJsx = ({ params }) => {
  const {
    category,
    showAddExpenseBtn,
    maximumAmount,
    maximumAmountError,
    totalExpenseAmount,
    remainingAmount,
    expenses,
    showModal,
    maximumAmountHandler,
    openNewRowHandler,
    saveAmountsHandler,
    closeNewRowHandler,
  } = params;
  return (
    <>
      {Object.keys(category).length ? (
        <div
          className="category-container"
          style={{
            backgroundImage: `url(${
              category.imageUrl
                ? `${SERVER_URL}/${category.imageUrl}`
                : { DUMMY_IMAGE }
            })`,
            overflow: "auto",
          }}
        >
          <div className="col-sm-12" style={{ paddingTop: "10px" }}>
            <h4>
              {category.title} - Category Details
              {showAddExpenseBtn && (
                <a
                  href="#"
                  className="btn btn-sm btn-primary float-right"
                  style={{ float: "right" }}
                  onClick={openNewRowHandler}
                >
                  Add Expense
                </a>
              )}
            </h4>
            <p>{category.description}</p>
            <hr />
            <form onSubmit={saveAmountsHandler}>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label htmlFor="maxAmount" className="col-form-label">
                    Max. Amount
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className={`form-control ${
                        maximumAmountError ? "alert-danger" : ""
                      }`}
                      name="maximumAmount"
                      id="maximumAmount"
                      value={maximumAmount ? maximumAmount : 0}
                      onChange={maximumAmountHandler}
                      required
                      step=".01"
                    />
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="totalExpenses" className="col-form-label">
                    Total Expenses
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className="form-control"
                      name="totalExpenses"
                      id="totalExpenses"
                      value={totalExpenseAmount}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="remainingAmount" className="col-form-label">
                    Remaining Amount
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className="form-control"
                      name="remainingAmount"
                      id="remainingAmount"
                      value={remainingAmount ? remainingAmount : 0}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-inline">
                  <div className="">
                    <button
                      type="submit"
                      className={`btn mt-4  ${
                        maximumAmountError ? "btn-secondary" : "btn-primary"
                      }`}
                      disabled={maximumAmountError ? "disabled" : ""}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {maximumAmountError && (
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <div className="alert alert-danger">
                      Max. amount cannot be zero or less then total expenses.
                    </div>
                  </div>
                </div>
              )}
            </form>
            <hr />
            {expenses.length ? (
              <ExpenseList category={category} />
            ) : (
              <h5>No expenses created yet.</h5>
            )}
            {showModal && (
              <AddRow
                showModal={showModal}
                closeModal={closeNewRowHandler}
                headerText={"Add New Expense"}
                addObjFor={"expenses"}
                parent={category._id}
                schema={"EXPENSE"}
                mode={"add"}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      )}
    </>
  );
};

export default CategoryDetailsJsx;
