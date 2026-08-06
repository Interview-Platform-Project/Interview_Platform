import { CircleCheckBig } from 'lucide-react';
import styles from './Flow.module.scss';

export function Flow() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Улучшенный процесс</h2>
      <ul className={styles.flow}>
        <li className={styles.flow__item}>
          <span className={styles.flow__number}>01</span>
          <span className={styles.flow__text}>
            Создайте техническую сессию менее чем за 10 секунд.
          </span>
          <span className={styles.flow__icon}>
            <CircleCheckBig />
          </span>
        </li>
        <li className={styles.flow__item}>
          <span className={styles.flow__number}>02</span>
          <span className={styles.flow__text}>
            Приглашайте кандидатов по безопасной одноразовой ссылке.
          </span>
          <span className={styles.flow__icon}>
            <CircleCheckBig />
          </span>
        </li>
        <li className={styles.flow__item}>
          <span className={styles.flow__number}>03</span>
          <span className={styles.flow__text}>
            Оценивайте навыки с помощью реальных инженерных инструментов.
          </span>
          <span className={styles.flow__icon}>
            <CircleCheckBig />
          </span>
        </li>
        <li className={styles.flow__item}>
          <span className={styles.flow__number}>04</span>
          <span className={styles.flow__text}>
            Оставляйте объективные отзывы сразу после сессии.
          </span>
          <span className={styles.flow__icon}>
            <CircleCheckBig />
          </span>
        </li>
      </ul>
    </div>
  );
}
