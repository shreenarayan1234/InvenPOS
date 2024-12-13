import React from "react";
import { Helmet } from "react-helmet";

const BreadCrumb = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <h3 className="breadcrumb mt-4">Dashboard</h3>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item text-primary">Dashboard</li>
        <li className="breadcrumb-item active">{props.title}</li>
      </ol>
    </>
  );
};

export default BreadCrumb;
