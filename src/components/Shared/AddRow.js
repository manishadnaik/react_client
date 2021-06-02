import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../config/variables";
import { setRemainingBalance } from "../../store/Category";
import { convertToFixed } from "../../util/number";
import Modal from "../Shared/Modal";
import AddRowJsx from "./AddRowJsx";
import Swal from "sweetalert2";

const AddRow = (props) => {
  const {
    showModal,
    closeModal,
    headerText,
    addObjFor,
    schema,
    parent,
    remainingAmount,
    mode,
    editingObject,
  } = props;
  // console.log(props);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [image, setImage] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [error, seterror] = useState(null);
  // error state
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [expenseAmountError, setExpenseAmountError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // for edit purpose
  const [imageUrl, setImageUrl] = useState("");

  // get remaining amount from store
  const remainingAmountFromStore = useSelector(
    (state) => state.category.remainingAmountFromStore
  );
  // console.log("remainingAmountFromStore==>", remainingAmountFromStore);
  var remainingBalance = 0;
  if (remainingAmountFromStore) {
    remainingBalance = remainingAmountFromStore;
  }
  // category add: get categories from store to check unique when adding new
  const categories = useSelector((state) => state.category.all);
  if (schema === "CATEGORY") {
    // console.log(categories);
    var categoriesTitle = [];
    for (const cat of categories) {
      categoriesTitle = [...categoriesTitle, cat.title.toLowerCase()];
    }
    // console.log(categoriesTitle);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (mode == "edit") {
      // console.log(editingObject);
      setTitle(editingObject.title);
      setDescription(editingObject.description);
      setExpenseAmount(editingObject.max_amount);
      setImageUrl(editingObject.imageUrl);
    }
  }, []);

  const titleHandler = (e) => {
    let title = e.target.value;
    return validateTitle(title);
  };
  const descriptionHandler = (e) => {
    let description = e.target.value;
    return validateDescription(description);
  };
  const expenseAmountHandler = (e) => {
    let expenseAmt = convertToFixed(e.target.value);
    validateExpenseAmount(expenseAmt);
  };
  const imageHandler = (e) => {
    let image = e.target.files[0];
    validateImage(image);
  };
  const validateTitle = (title) => {
    setTitle(title);
    if (!title) {
      return setTitleError("Title is required!");
    }
    if (title.length < 5 || title.length > 200) {
      return setTitleError("Allowed title length is 5-200.");
    }
    if (title.length > 20 && title.split(" ").length < 2) {
      return setTitleError("Please enter spaces between long titles");
    }
    if (
      schema === "CATEGORY" &&
      mode === "edit" &&
      editingObject.title.toLowerCase() !== title.toLowerCase() &&
      categoriesTitle.indexOf(title.toLowerCase()) !== -1
    ) {
      return setTitleError(`Title with ${title} already exists.`);
    }
    if (
      schema === "CATEGORY" &&
      mode === "add" &&
      categoriesTitle.indexOf(title.toLowerCase()) !== -1
    ) {
      return setTitleError(`Title with ${title} already exists.`);
    }
    setTitleError(false);
  };
  const validateDescription = (description) => {
    setDescription(description);
    if (!description.length) {
      return setDescriptionError("Description is required.");
    }
    if (description.length < 5 || description.length > 400) {
      return setDescriptionError(
        "Allowed length of description is 5-400 characters."
      );
    }
    setDescriptionError(false);
  };
  const validateExpenseAmount = (expenseAmt) => {
    if (expenseAmt <= 0) {
      return setExpenseAmountError("Expense amount cannot be zero.");
    }
    // validation for expense
    if (schema === "EXPENSE") {
      if (expenseAmt > remainingBalance) {
        return setExpenseAmountError(
          `You can spend upto:  ${remainingBalance}.`
        );
      }
    }
    setExpenseAmountError(false);
    setExpenseAmount(expenseAmt);
  };
  const validateImage = (image) => {
    setImage(image);
    if (!image) {
      return setImageError(false);
    }
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

    if (!allowedExtensions.exec(image.name)) {
      return setImageError("Allowed extension are jpg|jpeg|png|gif|bmp.");
    }
    console.log(image);
    let sizeInMb = image ? image.size / 1024 / 1024 : 4;
    if (sizeInMb > 2) {
      return setImageError(
        "Uploaded file size is greater then 2 MB which is not allowed."
      );
    }
    return setImageError(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!valid()) {
      return;
    }
    if (!title || !expenseAmount || !description) {
      return;
    }
    addOrUpdateRow().then((obj) => {
      let actionType =
        mode == "add"
          ? "ADD_" + schema + "_TO_LIST"
          : "UPDATE_" + schema + "_TO_LIST";
      if (typeof obj === "object" && Object.keys(obj).length) {
        dispatch({
          // add data to all list
          type: actionType,
          payload: obj,
        });
        // if created an expense then also update the POPULATE_REMAINING_AMOUNT
        if (schema === "EXPENSE") {
          dispatch(
            setRemainingBalance(remainingAmountFromStore - obj.max_amount)
          );
        }
        // close the popup
        closeModal();
      }
    });
  };

  const addOrUpdateRow = async () => {
    let credentials = JSON.parse(localStorage.getItem("credentials"));
    const rowObj = {
      title: title,
      description: description,
      max_amount: expenseAmount,
      userId: credentials.id,
      image: image,
    };

    let formData = new FormData();
    formData.append("image", rowObj.image);
    formData.append("title", rowObj.title);
    formData.append("description", rowObj.description);
    formData.append("max_amount", rowObj.max_amount);
    formData.append("userId", rowObj.userId);
    if (schema === "EXPENSE" && parent) {
      formData.append("categoryId", parent);
    }
    var response;
    if (mode == "add") {
      response = await axios
        .post(
          SERVER_URL + "/" + addObjFor,
          formData,
          { data: rowObj },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + credentials.token,
            },
          }
        )
        .catch((err) => {
          //set error display to on
          displayServerValidationErrors(err.response.data);
        });
    }
    if (mode == "edit") {
      let url = SERVER_URL + "/" + addObjFor + "/" + editingObject._id;
      response = await axios
        .put(url, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentials.token,
          },
        })
        .catch((err) => {
          displayServerValidationErrors(err.response.data);
        });
    }
    // check for server errors
    if (response) {
      if (addObjFor == "categories") {
        return response.data.category;
      }
      if (addObjFor == "expenses") {
        return response.data.expense;
      }
    }
  };
  const displayServerValidationErrors = (data) => {
    if (typeof data.data === "undefined") {
      return;
    }
    setServerError(data.message);
    let errors = data.data.errors;
    if (Object.keys(errors).length) {
      let errorTemp = "<ul>";
      errorTemp += Object.keys(errors).map((field) => {
        return `<li>${errors[field] !== "," ? errors[field] : ""}</li>`;
      });
      errorTemp += "</ul>";
      Swal.fire("Error!", errorTemp.replaceAll(",", ""), "error");
    }
  };
  const valid = () => {
    validateTitle(title);
    validateDescription(description);
    validateImage(image);
    validateExpenseAmount(expenseAmount);
    console.log(titleError, descriptionError, expenseAmountError, imageError);
    if (titleError || descriptionError || expenseAmountError || imageError) {
      return false;
    }

    return true;
  };
  var showExpenseField = false;
  if (mode === "add" || schema === "EXPENSE") {
    showExpenseField = true;
  }
  const addCategoryForm = () => {
    return (
      <AddRowJsx
        params={{
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
        }}
      />
    );
  };
  return (
    <Modal
      show={showModal}
      onCancel={closeModal}
      header={headerText}
      contentClass="modal-content"
      footerClass="modal_actions"
      onSubmit={onSubmitHandler}
      dismis={
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      }
      style={{ display: "block" }}
      header={headerText}
    >
      <div className="container">{addCategoryForm()}</div>
    </Modal>
  );
};

export default AddRow;
