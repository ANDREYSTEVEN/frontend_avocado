import { Container, Alert, Button } from "react-bootstrap";

export default function PedidoConfirmado() {
  return (
    <Container className="my-5 text-center">
      <Alert variant="success">
        <h4 className="mb-3">¡Pedido confirmado con éxito!</h4>
        <p>Gracias por tu compra. Pronto recibirás tu aguacate 🥑</p>
      </Alert>
      <Button href="/" variant="primary">Volver a la tienda</Button>
    </Container>
  );
}
