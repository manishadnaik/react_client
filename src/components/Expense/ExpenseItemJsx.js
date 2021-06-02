import React from "react";
import { SERVER_URL } from "../../config/variables";
import AddRow from "../Shared/AddRow";
import Modal from "../Shared/Modal";

const ExpenseItemJsx = ({ params }) => {
  const {
    index,
    expense,
    showModal,
    imageModal,
    headerText,
    showImageModalHandler,
    closeImageModalHandler,
    onEditHandler,
    onDeleteHandler,
    closeNewRowHandler,
  } = params;
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td className="text-ellipses" title={expense.title}>
          {expense.title}
        </td>
        <td>{expense.max_amount}</td>
        <td>
          {expense.imageUrl ? (
            <div className="form-control col-sm-9" style={{ margin: 0 }}>
              <img
                src={`${SERVER_URL}/${expense.imageUrl}`}
                alt="Expense image"
                style={{ height: "20px", width: "40px" }}
                onClick={showImageModalHandler}
                className="row-image"
              />
            </div>
          ) : (
            "-"
          )}
        </td>
        <td>{expense.description ? expense.description : "-"}</td>
        <td>
          <i
            className="fa fa-pencil btn btn-light"
            onClick={onEditHandler}
            id={expense._id}
          ></i>
          <i
            className="fa fa-trash btn btn-light"
            onClick={onDeleteHandler}
            id={expense._id}
          ></i>
        </td>
      </tr>
      {showModal && (
        <AddRow
          showModal={showModal}
          closeModal={closeNewRowHandler}
          headerText={"Edit Expense"}
          addObjFor={"expenses"}
          schema={"EXPENSE"}
          parent={""}
          mode={"edit"}
          editingObject={expense}
        />
      )}
      {imageModal && (
        <Modal
          show={imageModal}
          onCancel={closeImageModalHandler}
          header={headerText}
          contentClass="modal-content"
          footerClass="modal_actions"
          dismis={
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeImageModalHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          }
          style={{ display: "block" }}
          header={headerText}
        >
          <div className="image-wrapper" style={{ alignItems: "center" }}>
            <img
              src={`${SERVER_URL}/${expense.imageUrl}`}
              style={{ height: "20em", width: "28em" }}
              className="modal-image"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExpenseItemJsx;
