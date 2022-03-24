import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Container,
  Image,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import API from "./service";
import "bootstrap-icons/font/bootstrap-icons.css";

const ImageDetails = () => {
  const parmas = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    let { imageid } = parmas;
    API.get("/", {
      params: {
        id: imageid,
      },
    })
      .then(({ data }) => {
        let { hits } = data;
        if (hits[0]) {
          setCurrentImage(hits[0]);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <Modal show={true} fullscreen={true} onHide={(e) => navigate("/")}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col className="my-4">
              {currentImage ? (
                <Card>
                  <Row>
                    <Col lg={8} md={6} sm={12}>
                      <Card.Img
                        variant="top"
                        src={currentImage.largeImageURL}
                      />
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Card.Body>
                        <div className="caption">
                          {currentImage.userImageURL && (
                            <Image
                              src={currentImage.userImageURL}
                              alt={currentImage.user}
                              className="user-img"
                            />
                          )}
                          <span className="d-inline-block mx-3">
                            {currentImage.user}
                          </span>
                        </div>
                        <div className="my-3">
                          <Button className="mx-2" size="sm" title="Views">
                            <i className="bi bi-eye"></i>{" "}
                            <span> {currentImage.views}</span>
                          </Button>
                          <Button className="mx-2" size="sm" title="Downloads">
                            <i className="bi bi-cloud-download"></i>{" "}
                            <span> {currentImage.downloads}</span>
                          </Button>
                          <Button className="mx-2" size="sm" title="Comments">
                            <i className="bi bi-chat"></i>{" "}
                            <span> {currentImage.comments}</span>
                          </Button>
                        </div>
                        <div className="my-3">
                          {currentImage.tags?.split(",").map((e, i) => {
                            return (
                              <Badge bg="secondary" className="mx-2" key={i}>
                                {e}
                              </Badge>
                            );
                          })}
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ) : (
                <div>
                  {isLoading ? "Fetching Data" : "Something went wrong"}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default ImageDetails;
