import React, { useState, useEffect } from "react";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Thumbnail = ({ data }) => {
  return (
    <Col
      lg={3}
      md={4}
      sm={6}
      xs={12}
      className="gy-2 gx-2"
      style={{ overflow: "hidden" }}
    >
      <Link to={`${data.id}`}>
        <div className="thumbnail">
          <img
            src={data.imageURL}
            alt={data.tags}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="overlay">
            <div className="caption">
              {data.userImageURL && (
                <Image
                  src={data.userImageURL}
                  alt={data.user}
                  className="user-img"
                />
              )}
              <span className="d-inline-block mx-3">{data.user}</span>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default Thumbnail;
