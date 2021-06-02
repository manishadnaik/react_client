import React from "react";
import { SERVER_URL } from "../../config/variables";
import "./FormElements.css";
const AddRowJsx = ({ params }) => {
  const {
    title,
    titleHandler,
    titleError,
    imageUrl,
    imageHandler,
    imageError,
    description,
    descriptionHandler,
    descriptionError,
    showExpenseField,
    expenseAmount,
    expenseAmountHandler,
    expenseAmountError,
    remainingBalance,
    serverError,
    schema,
    mode,
    error,
  } = params;
  // console.log(params);
  return (
    <>
      {serverError && (
        <div className="form-group">
          <div className="alert alert-danger">{serverError}</div>
        </div>
      )}
      <div className="form-group row">
        <label htmlFor="title" className="col-sm-3 col-form-label">
          Title
        </label>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            name="title"
            id="title"
            value={title}
            onChange={titleHandler}
          />
          {titleError && <div className="alert alert-danger">{titleError}</div>}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="image" className="col-sm-3 col-form-label">
          File
        </label>
        <div className="col-sm-7">
          <input
            type="file"
            className="form-control-file mb-2 mr-sm-2"
            name="image"
            id="image"
            onChange={imageHandler}
            accept={"image/*"}
          />
          {mode == "edit" && imageUrl ? (
            <div>
              <span>Existing: </span>

              <img
                src={`${SERVER_URL}/${imageUrl}`}
                alt={title}
                style={{ height: "20px", width: "40px" }}
              />
            </div>
          ) : (
            ""
          )}
          {imageError && <div className="alert alert-danger">{imageError}</div>}
        </div>
      </div>
      {/* <FileInput onDrop={onDrop} /> */}
      <div className="form-group row">
        <label htmlFor="description" className="col-sm-3 col-form-label">
          Description
        </label>
        <div className="col-sm-7">
          <textarea
            className="form-control mb-2 mr-sm-2"
            name="description"
            id="description"
            value={description}
            onChange={descriptionHandler}
          />
          {descriptionError && (
            <div className="alert alert-danger">{descriptionError}</div>
          )}
        </div>
      </div>
      {showExpenseField && (
        <div className="form-group row">
          <label htmlFor="expenseAmount" className="col-sm-3 col-form-label">
            Expense Amount
          </label>
          <div className="col-sm-7">
            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              name="expenseAmount"
              id="expenseAmount"
              value={expenseAmount}
              onChange={expenseAmountHandler}
            />
            {expenseAmountError && (
              <div className="alert alert-danger">{expenseAmountError}</div>
            )}
          </div>
        </div>
      )}
      <hr />
      <div className="form-group text-center">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </>
  );
};

export default AddRowJsx;
