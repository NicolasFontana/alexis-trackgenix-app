import styles from './super-admins.module.css';
import App from './App';
import Buttons from './Buttons/Buttons';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <Buttons />
      <App />
    </section>
  );
}

export default SuperAdmins;
