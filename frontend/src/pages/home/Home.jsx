import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Home() {
  const tourData = [
    { date: "JUL 16", place: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
    { date: "JUL 19", place: "TORONTO, ON", venue: "BUDWEISER STAGE" },
    { date: "JUL 22", place: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
    { date: "JUL 29", place: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
    { date: "AUG 2", place: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
    { date: "AUG 7", place: "CONCORD, CA", venue: "CONCORD PAVILION" },
  ];

  return (
    <>
      <Container className="text-center my-5"></Container>

      <Container id="tours" className="my-4">
        <h2 className="text-center mb-4">TOURS</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {tourData.map((tour, index) => (
            <Col key={index}>
              <Card className="text-center shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold">{tour.date}</Card.Title>
                  <Card.Text>{tour.place}</Card.Text>
                  <Card.Text className="text-muted">{tour.venue}</Card.Text>
                  <Button variant="primary" className="mt-3">
                    BUY TICKETS
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
