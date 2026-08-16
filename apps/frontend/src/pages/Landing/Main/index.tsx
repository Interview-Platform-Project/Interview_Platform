import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';
import styles from './Main.module.scss';
export function Main() {
  return (
    <article className={styles.wrapper} aria-labelledby="main-title">
      <div className={styles.content}>
        <p className={styles.preamble}>Платформа v2.0 уже доступна</p>
        <h1 id="main-title" className={styles.title}>
          Технические интервью
          <br /> без лишних сложностей.
        </h1>
        <p className={styles.subtitle}>
          Хватит переключаться между звонками, документами и IDE.
          <br /> Проводите профессиональные инженерные собеседования в единой
          <br /> специализированной среде.
        </p>
        <div className={styles.btnContainer} role="group" aria-label="Действия">
          <Button aria-label="Начать интервью">
            <span>Начать интервью</span>
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button variant="ghost" aria-label="Обзор среды">
            Обзор среды
          </Button>
        </div>
      </div>
    </article>
  );
}
