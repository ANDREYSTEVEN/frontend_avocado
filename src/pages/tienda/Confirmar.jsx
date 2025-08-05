import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Confirmar() {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(datos);
  }, []);

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  const token = localStorage.getItem("token");

  const confirmarPedido = async () => {
    if (!token) {
      setMensaje("Debes iniciar sesión para confirmar el pedido.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productos: carrito.map((p) => p.id),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "No se pudo confirmar el pedido");
      }

      // Pedido exitoso
      localStorage.removeItem("carrito");
      navigate("/pedido-confirmado");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Confirmar Pedido</h2>

      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-end mt-4">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Button variant="success" onClick={confirmarPedido}>
              Confirmar pedido
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
