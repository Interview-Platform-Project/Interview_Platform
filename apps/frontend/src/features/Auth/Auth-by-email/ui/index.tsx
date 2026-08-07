// import { Radio } from '@base-ui/react/radio';
// import { RadioGroup } from '@base-ui/react/radio-group';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import styles from '../../auth.module.scss';

// const roles = [
//   { value: 'candidate', label: 'Кандидат', Icon: CodeXml },
//   { value: 'interviewer', label: 'Интервьюер', Icon: User },
// ] as const;

export function AuthByEmail() {
  return (
    <div className={styles['auth-form']}>
      <header className={styles['auth-form__header']}>
        <h2>Регистрация</h2>
        <p>Присоединяйтесь к платформе</p>
      </header>

      <form className={styles['auth-form__form']}>
        {/* <RadioGroup
          name="role"
          defaultValue="candidate"
          className={styles['auth-form__role']}
        >
          <span className={styles['auth-form__role-label']}>Я присоединяюсь как:</span>
          <div className={styles['auth-form__role-options']}>
            {roles.map(({ value, label, Icon }) => (
              <Radio.Root
                key={value}
                value={value}
                className={styles['auth-form__role-option']}
              >
                <Icon aria-hidden size={20} strokeWidth={1.75} />
                <span>{label}</span>
              </Radio.Root>
            ))}
          </div>
        </RadioGroup> */}

        <div className={styles['auth-form__fields']}>
          <Input type="text" placeholder="Алекс Разработчик">
            Полное имя
          </Input>
          <Input type="email" placeholder="alex@example.com">
            Email адрес
          </Input>
          <Input type="password" placeholder="••••••••">
            Пароль
          </Input>
        </div>

        <Button className={styles['auth-form__button']} type="submit">
          Создать аккаунт
          <ArrowRight aria-hidden size={16} />
        </Button>

        <p className={styles['auth-form__legal']}>
          Создавая аккаунт, вы соглашаетесь с нашими{' '}
          <Link href="/terms">Условиями использования</Link> и{' '}
          <Link href="/privacy">Политикой конфиденциальности</Link>.
        </p>
      </form>

      <p className={styles['auth-form__footer']}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </div>
  );
}
