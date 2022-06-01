import styles from './admins.module.css';
import App from './App';

function Admins() {
  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a href="/admins/Add">
        <button>Add New</button>
      </a>
      <App />
    </section>
  );
}

export default Admins;
