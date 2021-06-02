import React from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../config/variables";
import AddRow from "../Shared/AddRow";
import Modal from "../Shared/Modal";

const CategoryItemJsx = ({ params }) => {
  const {
    item,
    showModal,
    imageModal,
    closeNewRowHandler,
    showImageModalHandler,
    closeImageModalHandler,
    onEditHandler,
    onDeleteHandler,
  } = params;
  return (
    <>
      <tr>
        <td className="text-ellipses" title={item["title"]}>
          <Link to={`/categories/${item._id}`}>{item["title"]}</Link>
        </td>
        <td>{item["max_amount"]}</td>
        <td>
          {item["imageUrl"] ? (
            <div className="form-control col-sm-9" style={{ margin: 0 }}>
              <img
                src={`${SERVER_URL}/${item["imageUrl"]}`}
                onClick={showImageModalHandler}
                className="row-image"
              />
            </div>
          ) : (
            "-"
          )}
        </td>
        <td>
          <i
            className="fa fa-pencil btn btn-light"
            onClick={onEditHandler}
            id={item._id}
          ></i>
          <i
            className="fa fa-trash btn btn-light"
            onClick={onDeleteHandler}
            id={item._id}
          ></i>
        </td>
      </tr>
      {showModal && (
        <AddRow
          showModal={showModal}
          closeModal={closeNewRowHandler}
          headerText={"Edit Category"}
          addObjFor={"categories"}
          schema={"CATEGORY"}
          parent={""}
          remainingAmount={item.max_amount}
          mode={"edit"}
          editingObject={item}
        />
      )}
      {imageModal && (
        <Modal
          show={imageModal}
          onCancel={closeImageModalHandler}
          header={"Category Details"}
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
          header={""}
        >
          <div className="image-wrapper" style={{ alignItems: "center" }}>
            <img
              src={`${SERVER_URL}/${item["imageUrl"]}`}
              style={{ height: "20em", width: "28em" }}
              className="modal-image"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default CategoryItemJsx;
