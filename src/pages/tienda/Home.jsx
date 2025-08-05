import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch(() => setMensaje("Error al cargar productos"));
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carritoActual.find((p) => p.id === producto.id);
    if (!existe) {
      localStorage.setItem("carrito", JSON.stringify([...carritoActual, producto]));
      alert("Producto agregado al carrito");
    } else {
      alert("El producto ya está en el carrito");
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center text-success mb-4">Tienda en Línea</h2>

      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

      {productos.length > 0 ? (
        <Row xs={1} sm={2} md={3} className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={producto.imagen_url || "https://img.icons8.com/color/96/avocado.png"}
                  alt={producto.nombre}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    ${producto.precio.toFixed(2)}
                  </Card.Text>
                  <Button
                    variant="outline-success"
                    className="mt-auto"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        !mensaje && (
          <Alert variant="info" className="text-center mt-5">
            No hay productos disponibles en este momento.
          </Alert>
        )
      )}
    </Container>
  );
}
