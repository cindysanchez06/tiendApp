import Head from "next/head";
import styles from "../styles/index.module.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Banco</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a className={styles.link} href="/mark_list">
          <Button className={styles.button} variant="contained" color="primary">
            Marcas
          </Button>
        </a>
        <a className={styles.link} href="/product_list">
          <Button className={styles.button} variant="contained" color="primary">
            Productos
          </Button>
        </a>
      </main>
    </div>
  );
}
