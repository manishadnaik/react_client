import React from "react";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  const content = (
    <div className="modal-open">
      <div
        className={`modal fade show  ${props.className}`}
        style={props.style}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header  ${props.headerClass}`}>
              <h5 className="modal-title">{props.header}</h5>
              {props.dismis}
            </div>
            <form
              className="modal-form"
              onSubmit={
                props.onSubmit ? props.onSubmit : (e) => e.preventDefault()
              }
              encType="multipart/form-data"
            >
              <div className={`modal-body ${props.contentClass}`}>
                {props.children}
              </div>
              {/* <footer className={`modal-footer ${props.footerClass}`}>
              {props.footer}
            </footer> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  // debugger;
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={React.useRef(null)}
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
