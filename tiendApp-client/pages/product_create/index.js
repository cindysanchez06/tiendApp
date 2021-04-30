import Head from "next/head";
import styles from "./styles.module.css";
import { Formik } from "formik";
import { Input, Dialog, Select } from "../../components";
import Button from "@material-ui/core/Button";
import { schema, INITIAL_VALUES } from "./create.schema";
import { useEffect, useState } from "react";
import { ProductService, MarkService } from "../../services";
import { useRouter } from "next/router";

export default function Increase() {
  const [initialValues, setValues] = useState(INITIAL_VALUES);
  const [marks, setMarks] = useState([])
  const [fetchData, setFetchData] = useState({});
  const [dialog, setDialog] = useState({ open: false, content: {} });
  const router = useRouter();
  
  console.log(initialValues)
  useEffect(() => {
    if(localStorage.getItem("product")) {
      const product = JSON.parse(localStorage.getItem("product"));
      setValues({...product, boarding_date: product.boarding_date.substring(0, 10)})
    }
    getMarks()
  }, [])

  const getMarks = () => {
    MarkService.getList()
    .then((response) => {
      setMarks(response.data)
    })
  }

  const onRedirect = () => {
    localStorage.setItem("product", '')
    router.push("/");
  };

  const onSubmit = (values) => {
    if (initialValues.id) {
      handleEdit(values)
    } else {
      handleRegister(values)
    }
  };

  const handleEdit = (values) => {
    localStorage.setItem("product", '')
    ProductService.edit({ ...values })
    .then((response) => {
      if (response.status === 200) {
        setFetchData({ isLoading: false });
        setDialog({
          content: {
            title: ``,
            description: `El producto se ha creado con exito!`,
          },
          open: !dialog.open,
        });
      } else {
        setDialog({
          content: {
            title: `Error en Solicitud!`,
            description: `Error en los datos, por favor verifique los datos ingresados y luego intente de nuevo.`,
          },
          open: !dialog.open,
        });
      }
    });
  }

  const handleRegister = (values) => {
    ProductService.register({ ...values })
    .then((response) => {
      if (response.status === 200) {
        setFetchData({ isLoading: false });
        setDialog({
          content: {
            title: ``,
            description: `El producto se ha creado con exito!`,
          },
          open: !dialog.open,
        });
      } else {
        setDialog({
          content: {
            title: `Error en Solicitud!`,
            description: `Error en los datos, por favor verifique los datos ingresados y luego intente de nuevo.`,
          },
          open: !dialog.open,
        });
      }
    });
  }

  const handleShowDialog = () => {
    setDialog({ ...dialog, open: !dialog.open });
    onRedirect();
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{initialValues.id ? "Editar Product" : "Crear Producto"}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>{initialValues.id ? "Editar Product" : "Crear Producto"}</h1>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  label={"Nombre del producto"}
                  error={touched.name && errors.name}
                />
                <Select
                  label="Talla"
                  options={[{'id':'S','value':'S'},{'id':'M','value':'M'}, {'id':'L','value':'L'}]}
                  name='size'
                  handleChange={handleChange}
                  value={values.size}
                  error={touched.reference && errors.reference}
                />
                <Input
                  type="text"
                  name="observation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.observation}
                  label={"Observacion"}
                  error={touched.observation && errors.observation}
                  rows={4}
                  multiline={true}
              />
                <Input
                  type="date"
                  name="boarding_date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.boarding_date}
                  label={"Fecha de embargue"}
                  error={touched.boarding_date && errors.boarding_date}
                />
                <Input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  label={"Cantidad en Inventario"}
                  error={touched.quantity && errors.quantity}
                />
                <Select
                  label="marca"
                  options={marks.map((mark) => ({
                    id: mark.id,
                    value: mark.name
                  }))}
                  name='mark_id'
                  handleChange={handleChange}
                  value={values.mark_id}
                  error={touched.mark_id && errors.mark_id}
                />
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={fetchData.isLoading}
                >
                  {fetchData.isLoading ? "Cargando" : initialValues.id ? "Editar" : "Crear"}
                </Button>
                <Button
                  className={styles.button}
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={onRedirect}
                >
                  Salir
                </Button>
              </form>
            )}
          </Formik>
        </main>
      </div>
      <Dialog {...dialog} handleShow={handleShowDialog} />
    </>
  );
}
