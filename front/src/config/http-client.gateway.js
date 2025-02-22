import AxiosClient from './axios';
import router from '@/router';

AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data.message;
      switch (status) {
        case 400:
          switch (errorMessage) {
            case 'TOKEN_EXPIRED':
              console.log('Código expirado', 'Solicita un nuevo código de recuperación de contraseña');
              break;
            default:
              console.log('Error en la solicitud');
              break;
          }
          break;
        case 401:
          switch (errorMessage) {
            case 'USER_BLOCKED':
              console.log('Usuario bloqueado', 'Contáctate con tu administrador');
              break;
            case 'BAD_CREDENTIALS':
              console.log('Credenciales incorrectas');
              break;
            default:
              localStorage.removeItem('token');
              if (router.currentRoute.name !== 'login') {
                router.push({ name: 'login' });
              }
              console.log('Sesión expirada', 'Es necesario iniciar sesión nuevamente');
              break;
          }
          break;
        case 403:
          console.log('Acceso denegado');
          break;
        case 404:
          switch (errorMessage) {
            case 'USER_NOT_FOUND':
              console.log('Usuario no encontrado');
              break;
            default:
              console.log('Recurso no encontrado');
              break;
          }
          break;
        case 409:
          switch (errorMessage) {
            case 'USER_ALREADY_EXISTS':
              console.log('Correo electrónico duplicado');
              break;
            default:
              break;
          }
          break;
        case 500:
          console.log('Error en el servidor');
          break;
        default:
          console.log('Error inesperado');
          break;
      }
    } else {
      console.log('Error de conexión');
    }
    return Promise.reject(error);
  }
);

export default {
  get(endpoint) {
    return AxiosClient.get(endpoint);
  },
  post(endpoint, payload, config) {
    return AxiosClient.post(endpoint, payload, config);
  },
  postBlob(endpoint, payload) {
    return AxiosClient.post(endpoint, payload, { responseType: 'blob' });
  },
  put(endpoint, payload) {
    return AxiosClient.put(endpoint, payload);
  },
  patch(endpoint, payload) {
    return AxiosClient.patch(endpoint, payload);
  },
};
