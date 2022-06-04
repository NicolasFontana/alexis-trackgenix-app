import styles from './tasks.module.css';
import List from './List/List';

function Tasks() {
  return (
    <section className={styles.container}>
      <List />
      <a className={styles.anchor} href="/tasks/add">
        Add New Task
      </a>
    </section>
  );
}

export default Tasks;
