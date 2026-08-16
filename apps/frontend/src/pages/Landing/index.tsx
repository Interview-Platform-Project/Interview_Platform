import { Features } from './Features';
import { Flow } from './Flow';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Landing.module.scss';
import { Main } from './Main';
export default function Landing() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <Header />
        <Main />
        <Features />
        <Flow />
        <Footer />
      </main>
    </div>
  );
}
