import { Header } from './Header';
import styles from './Landing.module.scss';
export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Header />
      </div>
    </div>
  );
}
