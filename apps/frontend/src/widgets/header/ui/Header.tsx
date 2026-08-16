import styles from './Header.module.scss';
import HeaderContent from './HeaderContent';
import HeaderMenu from './HeaderMenu';

export default function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <HeaderContent />
      </div>
      <div className={styles.right}>
        <HeaderMenu />
      </div>
    </div>
  );
}
