export const generateUserErrorInfo = (user) => {
  return `
  Alguno de los campos para crear el usuario no es valido:
  Lista de campos requeridos:
  first_name: Debe ser un campo string, pero recibio ${user.first_name}
  last_name: Debe ser un campo string, pero recibio ${user.last_name}
  email: Debe ser un campo string, pero recibio ${user.email}
  `;
};
export const generateProductErrorInfo = (
  title,
  description,
  price,
  stock,
  thumbnail,
  code,
  category,
  status
) => {
  const errorMessage = `Faltan datos para crear el producto correctamente 
  Lista de campos requeridos:  
  title: Debe ser un campo string, pero recibio   ${title}
  description: Debe ser un campo string, pero recibio  ${description}
  price: Debe ser un campo number, pero recibio  ${price}
  stock: Debe ser un campo number, pero recibio  ${stock}
  thumbnail: Debe ser un campo string, pero recibio ${thumbnail}
  code: Debe ser un campo string, pero recibio ${code}
  category: Debe ser un campo string, pero recibio ${category}
  `;
  console.log("Mensaje de error generado:", errorMessage);
  return errorMessage;
};
export const generateCartErrorInfo = () => {
  const errorMessage = "faltan datos";
  console.log("Mensaje de error generado:", errorMessage);
  return errorMessage;
};
