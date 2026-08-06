import { Features } from './Features';
import { Header } from './Header';
import styles from './Landing.module.scss';
import { Main } from './Main';
export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <Header />
        <Main />
        <Features />
      </main>
    </div>
  );
}
