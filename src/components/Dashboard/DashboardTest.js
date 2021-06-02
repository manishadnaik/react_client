import React, { Component } from "react";
import { connect } from "react-redux";
// import {
//   getJsonData,
//   getPostData,
//   getCommentsData,
//   postLoginData,
// } from "../../store/Home";
// import { getCommentsData } from "../../Store/Comment";

class DashboardTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "oldValue",
      jsonArrData: [],
      postData: [],
      commentsData: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    // console.log(props.commentsData);
    if (props.jsonArr !== state.jsonArrData) {
      return {
        jsonArrData: props.jsonArr,
      };
    }
    if (props.postData !== state.postData) {
      return {
        postData: props.postData, //.slice(0, 10), // show only first 10 records
      };
    }
    if (props.commentsData !== state.commentsData) {
      return {
        commentsData: props.commentsData, // show only first 10 records
      };
    }
    return null;
  }
  componentDidMount() {
    this.props.getJsonData();
    this.props.getPostData();
    this.props.getCommentsData();
    let loginInfo = {
      userid: 1,
      title: "My post",
      body: "the post description goes here!!",
    };
    this.props.postLoginData(loginInfo);
    console.log("===>", this.state.commentsData);
  }
  handleUpdate = (newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    console.log("===>", this.state.commentsData);
    const { value, flag } = this.state;

    return (
      <div>
            
        {/* {this.state.commentsData} */}
        {/* && (
          <Table
            data={{
              data: this.state.commentsData,
              header: ["id", "name", "email"],
            }}
          />
        )} */}
                {/* {this.props.commentsData && */}        
        {/* <table>          <tr>            <th>Id</th>            <th>Name</th>            <th></th>            <th></th>          </tr>          <tbody>            {this.props.commentsData.map((data, index) => {              console.log(data);              return (                <tr key={index}>                  <td>{data.id}</td>                  <td></td>                  <td></td>                  <td>{data.name}</td>                </tr>              );            })}          </tbody>        </table> */}
              
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  jsonArr: state.home.jsonData,
  postData: state.home.postData,
  commentsData: state.home.commentsData,
  loginStatus: state.home.loginStatus,
});
const mapDispatchToProps = {
  getJsonData,
  getPostData,
  getCommentsData,
  postLoginData,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTest);
