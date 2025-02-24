import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Validación del nombre (solo letras y espacios)
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.name)) {
      newErrors.name = "El nombre solo debe contener letras y espacios.";
    }

    // Validación del correo (formato correcto)
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un correo válido.";
    }

    // Validación del teléfono (exactamente 10 dígitos)
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 10 dígitos.";
    }

    // Validación de la edad (debe ser un número entre 1 y 120)
    if (!formData.age.trim()) {
      newErrors.age = "La edad es obligatoria.";
    } else if (!/^\d+$/.test(formData.age) || formData.age < 18 || formData.age > 100) {
      newErrors.age = "Ingrese una edad válida (entre 18 y 100).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Aquí iría la petición al backend con axios
        console.log("Datos enviados:", formData);
        // await axios.post("URL_DEL_BACKEND", formData);

        alert("Registro exitoso");
        setFormData({ name: "", email: "", phone: "", age: "" });
        setErrors({});
      } catch (error) {
        console.error("Error en el registro:", error);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="form-box p-4 shadow rounded bg-light">
        <h2 className="text-center mb-4">Registro</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad:</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Registrar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default RegisterForm;
