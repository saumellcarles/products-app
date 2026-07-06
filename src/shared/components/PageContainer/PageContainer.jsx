import styles from './PageContainer.module.scss';

export function PageContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
