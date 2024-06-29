// Teste de velocidad entre un switch y un ifelse

// Define las funciones de manejo de errores

function handleErrorIfElse(error) {
  if (error.name === "UnauthorizedError") {
    return 401;
  } else if (error.name === "CastError") {
    return 400;
  } else if (error.name === "NotFoundError") {
    return 404;
  } else {
    return 500;
  }
}

function handleErrorSwitch(error) {
  switch (error.name) {
    case "UnauthorizedError":
      return 401;
    case "CastError":
      return 400;
    case "NotFoundError":
      return 404;
    default:
      return 500;
  }
}

// Crear el error para la prueba
const testError = { name: "CastError" };

// Realizar las pruebas de rendimiento

console.time("ifElse");
for (let i = 0; i < 100000000000; i++) {
  handleErrorIfElse(testError);
}
console.timeEnd("ifElse");

console.time("switch");
for (let i = 0; i < 100000000000; i++) {
  handleErrorSwitch(testError);
}
console.timeEnd("switch");
