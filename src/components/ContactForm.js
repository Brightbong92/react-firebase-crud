import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";

const ContactForm = (props) => {
  const initialFieldValues = {
    id: "",
    num: "",
    title: "",
    contents: "",
    writer: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "") {
      console.log("if", { ...initialFieldValues });
      setValues({ ...initialFieldValues });
    } else {
      //setValues({ ...props.contactObjects[props.currentId] });
      // console.log("else", {
      //   ...props.contactObjects[props.seq],
      // });
      setValues({ ...props.contactObjects[props.seq] });
    }
  }, [props.seq, props.contactObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          name="num"
          placeholder="num"
          value={values.num}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>

          <input
            className="form-control"
            name="title"
            placeholder="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input
            className="form-control"
            name="contents"
            placeholder="contents"
            value={values.contents}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="writer"
          placeholder="writer"
          value={values.writer}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={props.currentId === "" ? "create" : "update"}
        />
      </div>
    </form>
  );
};

export default ContactForm;
