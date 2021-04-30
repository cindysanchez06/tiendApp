import React, { useEffect, useState } from "react"
import { ProductService } from "../../services"
import { Table, Dialog } from "../../components"
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const columns = [
    { id: 'name', label: 'Nombre'},
    { id: 'size', label: 'Talla'},
    { id: 'observation', label: 'Observacion'},
    { id: 'boarding_date', label: 'Fecha embargo'},
    { id: 'quantity', label: 'Cantidad'},
    { id: 'mark', label: 'Marca'}
]

const ProductList  = () => {
    const [list, setList] = useState([])
    const router = useRouter();
    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        ProductService.getList().then((response) => {
            setList(response.data)
        })
    }

    const handleEdit = (id) => {
        const product = list.find((m) => m.id === id);
        localStorage.setItem("product", JSON.stringify(product))
        router.push("/product_create");
    }

    const handleDelete = (id) => {
        ProductService.delete(id).then((response) => {
            if (response.status === 200) {
                getList()
            setDialog({
                content: {
                  title: ``,
                  description: `Se ha eliminado con exito!`,
                },
                open: !dialog.open,
              });
            } else {
                setDialog({
                    content: {
                      title: `No se puede Eliminar!`,
                      description: response.error,
                    },
                    open: !dialog.open,
                });
            }
        })
    }
    const [dialog, setDialog] = useState({ open: false, content: {} });

    const handleShowDialog = () => {
        setDialog({ ...dialog, open: !dialog.open });
      };

    return (
    <>
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.containerButton}>
                    <Button
                        className={styles.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() =>{
                            localStorage.setItem("product",'')
                            router.push("/product_create")}}
                    >
                        Crear
                    </Button>
                    <Button
                        className={styles.button}
                        type="submit"
                        variant="contained"
                        color="default"
                        onClick={() => router.push("/")}
                    >
                        Atras
                    </Button>
                </div>
                
                <Table data={list} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
            </main>
        </div>
        <Dialog {...dialog} handleShow={handleShowDialog} />
    </>)
}

export default ProductList;