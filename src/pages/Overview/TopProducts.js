import { Card, Carousel } from "react-bootstrap";

const TopProducts = ({ topProducts }) => {
  return (
    <Card className="shadow-lg rounded">
      <Card.Body>
        <Card.Title className="text-center mb-4 text-primary fw-bold">
          Top 10 Expensive Products
        </Card.Title>
        <Carousel interval={3000} controls indicators>
          {topProducts.map((product, index) => (
            <Carousel.Item key={index}>
              <Card className="shadow-sm rounded">
                <div className="overflow-hidden rounded">
                  <img
                    className="d-block w-100"
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="h5 text-dark fw-bold">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-5">${product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};

export default TopProducts;
