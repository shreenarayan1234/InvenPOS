import React, { useState } from "react";
import BreadCrumb from "../BreadCrumb";
import { Link } from "react-router-dom";
import style from "./AddCategory.module.css";
import axios from "axios";
import Constants from "../../../Constants";

const AddCategory = () => {
  const [input, setInput] = useState({
    name: "",
    slug: "",
    serial: "",
    status: 1,
    description: "",
    photo: null,
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value.toLowerCase().replaceAll(" ", "-");
      setInput((prevState) => ({ ...prevState, slug: slug }));
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({ ...prevState, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryCreate = () => {
    setIsLoading(true);
    axios
      .post(`${Constants.BASE_URL}/category`, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response && errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

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
                {/* Name Input */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Name</p>
                    <input
                      type="text"
                      className={`form-control mt-2 ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter category name"
                    />
                    <p className={style.login_error_msg}>
                      <small>{errors.name?.[0]}</small>
                    </p>
                  </label>
                </div>

                {/* Slug Input */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Slug</p>
                    <input
                      type="text"
                      className={`form-control mt-2 ${
                        errors.slug ? "is-invalid" : ""
                      }`}
                      name="slug"
                      value={input.slug}
                      onChange={handleInput}
                      placeholder="Enter category slug"
                    />
                    <p className={style.login_error_msg}>
                      <small>{errors.slug?.[0]}</small>
                    </p>
                  </label>
                </div>

                {/* Serial Input */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Serial</p>
                    <input
                      type="number"
                      className={`form-control mt-2 ${
                        errors.serial ? "is-invalid" : ""
                      }`}
                      name="serial"
                      value={input.serial}
                      onChange={handleInput}
                      placeholder="Enter category serial"
                    />
                    <p className={style.login_error_msg}>
                      <small>{errors.serial?.[0]}</small>
                    </p>
                  </label>
                </div>

                {/* Status Input */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Status</p>
                    <select
                      className={`form-control mt-2 ${
                        errors.status ? "is-invalid" : ""
                      }`}
                      name="status"
                      value={input.status}
                      onChange={handleInput}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    <p className={style.login_error_msg}>
                      <small>{errors.status?.[0]}</small>
                    </p>
                  </label>
                </div>

                {/* Description Input */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Description</p>
                    <textarea
                      className={`form-control mt-2 ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      name="description"
                      value={input.description}
                      onChange={handleInput}
                      placeholder="Enter category description"
                    />
                    <p className={style.login_error_msg}>
                      <small>{errors.description?.[0]}</small>
                    </p>
                  </label>
                </div>

                {/* Photo Upload */}
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Photo</p>
                    <input
                      className={`form-control mt-2 ${
                        errors.photo ? "is-invalid" : ""
                      }`}
                      type="file"
                      name="photo"
                      onChange={handlePhoto}
                    />
                    <p className={style.login_error_msg}>
                      <small>{errors.photo?.[0]}</small>
                    </p>
                  </label>
                  {input.photo && (
                    <div className="row">
                      <div className="col-6">
                        <img
                          src={input.photo}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <button
                        className="btn btn-primary d-block w-100 mt-4"
                        onClick={handleCategoryCreate}
                        dangerouslySetInnerHTML={{
                          __html: isLoading
                            ? '<span class="spinner-grow spinner-grow-sm"></span> Loading...'
                            : "Add Category",
                        }}
                      />
                    </div>
                  </div>
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
