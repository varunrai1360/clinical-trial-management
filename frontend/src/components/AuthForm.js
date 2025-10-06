import { Card, Form, Button, Alert } from "react-bootstrap";

export default function AuthForm({ title, fields, onSubmit, error, footer }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">{title}</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
              />
            </Form.Group>
          ))}
          <Button type="submit" variant="primary" className="w-100">
            {title}
          </Button>
        </Form>

        {footer && <div className="text-center mt-3">{footer}</div>}
      </Card>
    </div>
  );
}
