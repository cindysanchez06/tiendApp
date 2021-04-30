import React, { useEffect, useState } from "react"
import { MarkService } from "../../services"
import { Table, Dialog } from "../../components"
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const columns = [
    { id: 'name', label: 'Nombre'},
    { id: 'reference', label: 'Referencia'}
]

const MarkList  = () => {
    const [list, setList] = useState([])
    const router = useRouter();
    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        MarkService.getList().then((response) => {
            setList(response.data)
        })
    }

    const handleEdit = (id) => {
        const mark = list.find((m) => m.id === id);
        localStorage.setItem("mark", JSON.stringify(mark))
        router.push("/mark_create");
    }

    const handleDelete = (id) => {
        MarkService.delete(id).then((response) => {
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
                        onClick={() => router.push("/mark_create")}
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

export default MarkList;