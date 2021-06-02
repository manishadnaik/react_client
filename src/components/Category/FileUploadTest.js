import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../config/variables";

const FileUploadTest = () => {
  //
  const [image, setImage] = useState();
  const imageHandler = (e) => {
    setImage(e.target.files);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const categoryObj = {
      title: "bsvdgsvf",
      description: "shasfasfv",
      max_amount: 4444,
      userId: "60a7e8a650485b5ec8471561",
      image: image[0],
    };
    let formData = new FormData();
    formData.append("image", categoryObj.image);
    formData.append("title", categoryObj.title);
    formData.append("description", categoryObj.description);
    formData.append("max_amount", categoryObj.max_amount);
    formData.append("userId", categoryObj.userId);
    axios
      .post(SERVER_URL + "/categories", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("file upload response", response);
      });

    // axios({
    //   method: "POST",
    //   url: SERVER_URL + "/categories",
    //   data: categoryObj,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // fetch(SERVER_URL + "/categories", {
    //   method: "POST",
    //   body: JSON.stringify(categoryObj),
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => {
    //     console.log("upload res=>", res);
    //   })
    //   .catch((err) => {
    //     console.log("eror=>", err);
    //   });
  };
  return (
    <>
      {/* // <form
    //   className="modal-form"
    //   onSubmit={onSubmitHandler}
    //   encType="multipart/form-data"
    // > */}
      <div className="form-group row">
        <label htmlFor="image" className="col-sm-3 col-form-label">
          File
        </label>
        <div className="col-sm-7">
          <input
            type="file"
            className="form-control mb-2 mr-sm-2"
            name="image"
            id="image"
            onChange={imageHandler}
          />
        </div>
      </div>
      <button type="submit" onClick={onSubmitHandler}>
        Submit
      </button>
      {/* </form> */}
    </>
  );
};

export default FileUploadTest;

/*
import React from "react";
import axios, { post } from "axios";
import { SERVER_URL } from "../../config/variables";

class FileUploadTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fileUpload(file) {
    console.log(file);
    const categoryObj = {
      title: "bsvdgsvf",
      description: "shasfasfv",
      max_amount: 4444,
      userId: "60a7e8a650485b5ec8471561",
      //   image: image[0],
    };
    let formData = new FormData();
    formData.append("image", file);
    formData.append("title", categoryObj.title);
    formData.append("description", categoryObj.description);
    formData.append("max_amount", categoryObj.max_amount);
    formData.append("userId", categoryObj.userId);
    axios
      .post(SERVER_URL + "/categories", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("file upload response", response);
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default FileUploadTest;
*/
