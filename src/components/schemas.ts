import * as yup from "yup";

export const schemaDriver = yup.object({
  id: yup.string(),
  name: yup.string().required('Nome obrigatório!'),
  document: yup.string().required('Documento obrigatório!'),
  bond: yup.string(),
})

export const schemaVehicle = yup.object({
  id: yup.string(),
  mark: yup.string().required('Marca obrigatória!'),
  plate: yup.string().required('Placa obrigatória!'),
})