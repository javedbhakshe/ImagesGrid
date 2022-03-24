import React, { useState, useEffect } from "react";
import { Row, Container, Button, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import API from "./service";
import Thumbnail from "./Thumbnail";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [serachTerm, setserachTerm] = useState("");
  const [imageList, setimageList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  /* Load Images on initial load and subsequent change of search term and page change*/
  useEffect(() => {
    setisLoading(true);
    API.get("/", {
      params: { q: serachTerm, page: currentPage },
    })
      .then(({ data }) => {
        let { hits } = data;
        setimageList(hits);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [currentPage, serachTerm]);

  return (
    <>
      <Outlet />
      <Container fluid>
        <Row className="justify-content-center">
          <header className="text-center">
            <h1>Image Gallery</h1>
          </header>
          <Col lg={6} md={8} sm={12}>
            <SearchBar
              onSearch={(e) => {
                setCurrentPage(1);
                setserachTerm(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          {imageList.map((e) => (
            <Thumbnail data={e} key={e.id} />
          ))}
        </Row>
        {imageList.length ? (
          <Row className="my-5">
            <Col>
              <Button
                disabled={currentPage === 1}
                onClick={(e) => setCurrentPage((prev) => prev - 1)}
                title="Prev"
              >
                <i className="bi bi-chevron-double-left"></i>
              </Button>
            </Col>
            <Col className="text-center">{`Current Page : ${currentPage}`}</Col>
            <Col className="text-end">
              <Button
                onClick={(e) => setCurrentPage((prev) => prev + 1)}
                title="Next"
              >
                <i className="bi bi-chevron-double-right"></i>
              </Button>
            </Col>
          </Row>
        ) : (
          <div>
            {isLoading ? "Loading..." : "Images for this search not found"}
          </div>
        )}
      </Container>
    </>
  );
};

export default App;
