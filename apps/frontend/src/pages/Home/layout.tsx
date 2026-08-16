import Header from '@/widgets/header';
import SidebarNav from '@/widgets/sidebar';
import styles from './Home.module.scss';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <SidebarNav />
      </aside>

      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
