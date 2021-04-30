import Head from "next/head";
import styles from "./styles.module.css";
import { Formik } from "formik";
import { Input, Dialog } from "../../components";
import Button from "@material-ui/core/Button";
import { schema, INITIAL_VALUES } from "./create.schema";
import { useEffect, useState } from "react";
import { MarkService } from "../../services";
import { useRouter } from "next/router";

export default function MarkCreate() {
  const [initialValues, setValues] = useState(INITIAL_VALUES);
  const [fetchData, setFetchData] = useState({});
  const [dialog, setDialog] = useState({ open: false, content: {} });
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem("mark")) {
      const mark = JSON.parse(localStorage.getItem("mark"));
      setValues(mark)
    }
  }, [])

  const onRedirect = () => {
    localStorage.setItem("mark", '')
    router.push("/");
  };

  const onSubmit = (values) => {
    if (initialValues.id) {
      handleEdit(values)
    } else {
      handleCreate(values)
    }
  };

  const handleEdit = (values) => {
    localStorage.setItem("mark", '')
    MarkService.edit({ ...values, id: initialValues.id })
      .then(() => {
        setFetchData({ isLoading: false });
        setDialog({
          content: {
            title: ``,
            description: `Se ha editado la marca con exito!`,
          },
          open: !dialog.open,
        });
      })
      .catch(() => {
        setDialog({
          content: {
            title: `Error en Solicitud!`,
            description: `Error en los datos, por favor verifique los datos ingresados y luego intente de nuevo.`,
          },
          open: !dialog.open,
        });
      });
  }

  const handleCreate = (values) => {
    MarkService.register({ ...values })
      .then((response) => {
        if (response.status === 200) {
          setFetchData({ isLoading: false });
          setDialog({
            content: {
              title: ``,
              description: `Se ha creado la marca con exito!`,
            },
            open: !dialog.open,
          });
        } else  {
          setDialog({
            content: {
              title: `Error en Solicitud!`,
              description: `Error en los datos, por favor verifique los datos ingresados y luego intente de nuevo.`,
            },
            open: !dialog.open,
          });
        }
      })
  }

  const handleShowDialog = () => {
    setDialog({ ...dialog, open: !dialog.open });
    onRedirect();
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{initialValues.id ? 'Editar Marca': 'Crear Marca'}</title>
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
                <h1 className={styles.title}>{initialValues.id ? 'Editar Marca': 'Crear Marca'}</h1>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  label={"Nombre de la marca"}
                  error={touched.name && errors.name}
                />
                <Input
                  type="text"
                  name="reference"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reference}
                  label={"Referencia"}
                  error={touched.reference && errors.reference}
                />
                <Button
                  className={styles.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={fetchData.isLoading}
                >
                  {fetchData.isLoading ? "Cargando" : initialValues.id ? 'Editar Marca': 'Crear Marca'}
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
