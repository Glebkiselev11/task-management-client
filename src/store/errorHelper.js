// Генерирует сообщение об ошибке
export default function(error) {
  if (error.response.data) {
    return {
      message: error.response.data.message || error.response.statusText,
      statusCode: error.response.data.statusCode || error.response.status,
    }
  } else {
    return {
      message: 'Error connecting to server.',
      statusCode: 503
    };
  }
}