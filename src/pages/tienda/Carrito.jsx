import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(datos);
  }, []);

  const eliminarDelCarrito = (id) => {
    const nuevo = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío.</Alert>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {carrito.map((producto) => (
              <Col key={producto.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={producto.imagen_url || "https://img.icons8.com/color/96/avocado.png"}
                  />
                  <Card.Body>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>${producto.precio.toFixed(2)}</Card.Text>
                    <Button variant="danger" onClick={() => eliminarDelCarrito(producto.id)}>
                      Quitar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-end mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Button variant="primary" href="/confirmar">
              Confirmar pedido
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
