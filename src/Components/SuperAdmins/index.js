import styles from './super-admins.module.css';
import App from './App';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Super Admins</h2>
      <App />
    </section>
  );
}

export default SuperAdmins;
