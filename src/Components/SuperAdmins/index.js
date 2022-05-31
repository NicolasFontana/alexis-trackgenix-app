import styles from './super-admins.module.css';
import App from './App';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <a href="/super-admins/add">
        <button>Add New</button>
      </a>
      <App />
    </section>
  );
}

export default SuperAdmins;
