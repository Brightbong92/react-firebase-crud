import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [seq, setSeq] = useState("");

  //   useEffect(() => {
  //     firebaseDb.child("contacts").on("value", (snapshot) => {
  //       if (snapshot.val() != null) {
  //         setContactObjects({ ...snapshot.val() });
  //       }
  //     });
  //   }, []); //similar to componentDidMount

  //   const onDelete = (id) => {
  //     if (window.confirm("are you sure?")) {
  //       firebaseDb.child(`contacts/${id}`).remove((err) => {
  //         if (err) console.log(err);
  //         else setCurrentId("");
  //       });
  //     }
  //   };

  //   const addOrEdit = (obj) => {
  //     if (currentId === "") {
  //       firebaseDb.child("contacts").push(obj, (err) => {
  //         if (err) console.log(err);
  //       });
  //     } else {
  //       firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
  //         if (err) console.log(err);
  //         else setCurrentId("");
  //       });
  //     }
  //   };

  useEffect(() => {
    console.log("seq", seq);

    firebaseDb
      .collection("board")
      .orderBy("num", "desc")
      .get()
      .then((snapshot) => {
        //console.clear();
        var rows = [];

        snapshot.forEach((doc) => {
          var childData = doc.data();
          childData.id = doc.id;
          //console.log(childData);
          rows.push(childData);
        });

        setContactObjects(rows);
      });
  }, [currentId, seq]);

  const onDelete = (id) => {};

  const addOrEdit = (obj) => {
    if (currentId === "") {
      delete obj.id;
      console.log(obj);
      firebaseDb
        .collection("board")
        .doc()
        .set(obj)
        .then(() => {
          console.log("then");
          setCurrentId("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //console.log(currentId);
      //firebaseDb.collection("board").doc(currentId).update(obj);
    }
  };

  const setCurrentIdSeq = (value, seq) => {
    setSeq(seq);
    setCurrentId(value);
    //console.log("value", value, "seq: ", seq);
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Manager</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          {/* <ContactForm addOrEidt={addOrEdit()} /> */}
          <ContactForm {...{ addOrEdit, currentId, contactObjects, seq }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>num</th>
                <th>title</th>
                <th>contents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{contactObjects[idx].num} </td>
                    <td>{contactObjects[idx].title} </td>
                    <td>{contactObjects[idx].contents} </td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          //setCurrentId(contactObjects[idx].id);
                          setCurrentIdSeq(contactObjects[idx].id, idx);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => onDelete(contactObjects[idx].id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
