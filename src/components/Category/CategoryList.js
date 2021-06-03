import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../config/variables";
import CategoryItem from "./CategoryItem";
import { useSelector, useDispatch } from "react-redux";
import { GET_CATEGORIES } from "../../store/Category/actionTypes";
import AddRow from "../Shared/AddRow";
import { setCategories } from "../../store/Category";

const CategoryList = (props) => {
  // get the crrent state
  const categories = useSelector((state) => state.category.all);
  const [showModal, setShowModal] = useState(false);
  let credentials = JSON.parse(localStorage.getItem("credentials"));
  const openNewRowHandler = () => {
    setShowModal(true);
  };
  const closeNewRowHandler = () => {
    setShowModal(false);
  };
  const dispatch = useDispatch();
  const GetCategories = async () => {
    const response = await axios({
      method: "get",
      url: SERVER_URL + "/categories",
      headers: { Authorization: "Bearer " + credentials.token },
    }).catch((err) => {
      console.log(err);
    });
    // console.log("GetCategories=>", response);
    if (response) {
      // update store
      // dispatch({ type: GET_CATEGORIES, payload: response.data.categories });
      dispatch(setCategories(response.data.categories));
    }
  };
  // get api data
  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <>
      <div className="card text-white mb-3">
        <div className="card-header text-white bg-secondary">
          Categories
          <a
            href="#"
            className="btn btn-sm btn-primary float-right"
            style={{ float: "right" }}
            onClick={openNewRowHandler}
          >
            Add Category
          </a>
        </div>
        <div className="card-body">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Max.Amount</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category, index) => {
                  return <CategoryItem key={index} item={category} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <AddRow
          showModal={showModal}
          closeModal={closeNewRowHandler}
          headerText={"Add New Category"}
          addObjFor={"categories"}
          schema={"CATEGORY"}
          mode={"add"}
        />
      )}
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     categories: state.category.categories,
//   };
// };
// const mapDispatchToProps = {
//   getCategories,
// };
export default CategoryList; //connect(mapStateToProps, mapDispatchToProps)(CategoryList);
