// Генерирует сообщение об ошибке
export default function(error) {
  if (error.response.data) {
    return error.response.data.message[0];
  } else {
    return 'Error connecting to server.';
  }
}