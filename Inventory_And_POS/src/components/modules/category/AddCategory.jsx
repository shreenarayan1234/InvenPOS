import React, { useState } from "react";
import BreadCrumb from "../BreadCrumb";
import { Link } from "react-router-dom";
import style from "./AddCategory.module.css";

const AddCategory = () => {
  const [input, setInput] = useState({}); //it should be object other wise it show error when we write value = {input.email} it show error in email
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleCategoryCreate = () => {};
  return (
    <>
      <BreadCrumb title={"Add Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4>Add Category</h4>
                <button className={`btn ${style["custom-hover"]}`}>
                  <Link to={""}>
                    <i className="fa-solid fa-list"></i>List
                  </Link>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Name</p>
                    <input
                      type="text"
                      className={
                        errors.name != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"name"}
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter category name"
                    />
                    <p className={style.login_error_msg}>
                      <small>
                        {errors.name != undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Slug</p>
                    <input
                      type="text"
                      className={
                        errors.slug != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"slug"}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder="Enter category slug"
                    />
                     <p className={style.login_error_msg}>
                      <small>
                        {errors.slug != undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Serial</p>
                    <input
                      type="number"
                      className={
                        errors.serial != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"serial"}
                      value={input.serial}
                      onChange={handleInput}
                      placeholder="Enter category serial"
                    />
                     <p className={style.login_error_msg}>
                      <small>
                        {errors.serial != undefined ? errors.serial[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Status</p>
                    <select
                      className={
                        errors.status != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"status"}
                      value={input.status}
                      onChange={handleInput}
                      placeholder="Select category status"
                    > 
                        <option disabled={true}>Select Category Status</option>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                     <p className={style.login_error_msg}>
                      <small>
                        {errors.status != undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Description</p>
                    <textarea
                      className={
                        errors.description != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"description"}
                      value={input.description}
                      onChange={handleInput}
                      placeholder="Enter category description"
                    />
                     <p className={style.login_error_msg}>
                      <small>
                        {errors.description != undefined ? errors.description[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
