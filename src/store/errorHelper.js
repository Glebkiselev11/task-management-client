// Генерирует сообщение об ошибке
export default function(error) {
  if (error.response.data) {
    return {
      message: error.response.data.message,
      statusCode: error.response.data.statusCode
    }
  } else {
    return {
      message: 'Error connecting to server.',
      statusCode: 503
    };
  }
}