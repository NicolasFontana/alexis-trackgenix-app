import styles from './admins.module.css';
import App from './App';

function Admins() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Admins</h2>
      <App />
      <a href="/admins/Add">
        <button className={styles.button}>+</button>
      </a>
    </section>
  );
}

export default Admins;
