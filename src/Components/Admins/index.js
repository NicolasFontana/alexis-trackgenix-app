import styles from './admins.module.css';
import App from './App';

function Admins() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Admins</h2>
      <a href="/admins/Add">
        <button className={styles.button}>Add New</button>
      </a>
      <App />
    </section>
  );
}

export default Admins;
