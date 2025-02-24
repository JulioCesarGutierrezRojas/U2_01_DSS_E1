import { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    telefono: "",
    edad: "",
    rol: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo debe contener letras y espacios.";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "El apellido es obligatorio.";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.apellidos)) {
      newErrors.apellidos = "El apellido solo debe contener letras y espacios.";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingrese un correo válido.";
    }

    if (!formData.contrasenia.trim()) {
      newErrors.contrasenia = "La contraseña es obligatoria.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.contrasenia)) {
      newErrors.contrasenia = "Debe tener al menos 6 caracteres, mayúsculas, minúsculas, un número y un carácter especial.";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos.";
    }

    if (!formData.edad.trim()) {
      newErrors.edad = "La edad es obligatoria.";
    } else if (!/^\d+$/.test(formData.edad) || formData.edad < 18 || formData.edad > 100) {
      newErrors.edad = "Ingrese una edad válida (entre 18 y 100).";
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
      console.log("Datos a enviar:", formData);
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token not provided. Inicia sesión primero.");
          return;
        }
  
        const response = await axios.post(
          "http://localhost:3000/api/persons/register",
          JSON.stringify(formData), 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
  
        console.log("Registro exitoso:", response.data);
        alert("Registro exitoso");
  
        setFormData({
          nombre: "",
          apellidos: "",
          correo: "",
          contrasenia: "",
          telefono: "",
          edad: "",
          rol: "",
        });
  
        setErrors({});
      } catch (error) {
        console.error("Error en el registro:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Error en el registro");
      }
    }
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="form-box p-4 shadow rounded bg-light" style={{ width: "30rem" }}>
        <h2 className="text-center mb-4">Registro</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} isInvalid={!!errors.nombre} />
            <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} isInvalid={!!errors.apellidos} />
            <Form.Control.Feedback type="invalid">{errors.apellidos}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control type="email" name="correo" value={formData.correo} onChange={handleInputChange} isInvalid={!!errors.correo} />
            <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleInputChange}
                isInvalid={!!errors.contrasenia}
              />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
              <Form.Control.Feedback type="invalid">{errors.contrasenia}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} isInvalid={!!errors.telefono} />
            <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad:</Form.Label>
            <Form.Control type="number" name="edad" value={formData.edad} onChange={handleInputChange} isInvalid={!!errors.edad} />
            <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Rol:</Form.Label>
            <Form.Select name="rol" value={formData.rol} onChange={handleInputChange}>
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </Form.Select>
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
