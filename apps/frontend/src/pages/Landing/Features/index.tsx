import { Braces, FileText, Video } from 'lucide-react';
import styles from './Features.module.scss';

export function Features() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Всё необходимое. Ничего лишнего.</h2>
      <h6 className={styles.subtitle}>Создано разработчиками для разработчиков.</h6>
      <div className={styles.feats}>
        <div className={styles.feats__item}>
          <span className={styles.feats__icon}>
            <Braces />
          </span>
          <span className={styles.feats__title}>Совместная IDE</span>
          <span className={styles.feats__desc}>
            Синхронизация кода в реальном времени с <br />
            подсветкой синтаксиса и встроенной <br />
            средой выполнения.
          </span>
        </div>
        <div className={styles.feats__item}>
          <span className={styles.feats__icon}>
            <Video />
          </span>
          <span className={styles.feats__title}>Встроенная связь</span>
          <span className={styles.feats__desc}>
            Кристально чистое видео и аудио с низкой
            <br /> задержкой прямо в рабочей области.
          </span>
        </div>
        <div className={styles.feats__item}>
          <span className={styles.feats__icon}>
            <FileText />
          </span>
          <span className={styles.feats__title}>Структурированные отзывы</span>
          <span className={styles.feats__desc}>
            Стандартизированные критерии оценки и <br />
            приватные заметки, которые <br />
            синхронизируются с профилем.
          </span>
        </div>
      </div>
    </div>
  );
}
