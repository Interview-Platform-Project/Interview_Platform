import { getHeaderMock } from '@/widgets/header/api';
import styles from './HeaderContent.module.scss';

export default function HeaderContent() {
  const { name, date } = getHeaderMock();
  const d = new Date(date);
  const formatted = d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.root}>
      <div className={styles.greeting}>С возвращением, {name}</div>
      <div className={styles.date}>{formatted}</div>
    </div>
  );
}
