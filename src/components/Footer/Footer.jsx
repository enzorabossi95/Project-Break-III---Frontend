import styles from './Footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <p>© Distrito Cerveza - 2026. Todos los derechos reservados.</p>
                <span>Defensa de las y los consumidores. Para reclamos </span><a href="https://autogestion.produccion.gob.ar/consumidores/" target="_blank" rel="noopener noreferrer">Ingresar acá</a>
            </div>
            <div>Creado por ER</div>
        </footer>
    )
}