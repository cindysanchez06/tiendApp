import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string()
    .required("Requerido"),
  size: Yup.string()
    .required("Requerido"),
  observation: Yup.string()
    .required('Requerido'),
  quantity: Yup.number()
      .required("Requerido"),
  mark_id: Yup.number()
    .required('Requerido')
});

export const INITIAL_VALUES = {
  name: "",
  size: "",
  observation: "",
  boarding_date: "",
  quantity: 1,
  mark_id : 1
};
