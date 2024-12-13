import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto bg-dark">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <small className="text-white">
            Copyright &copy; Inventory and POS Nepal {new Date().getFullYear()}
          </small>
          <div>
            <small>Design and Develop By 
            <a href="https://shreens.com">Shree</a></small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
