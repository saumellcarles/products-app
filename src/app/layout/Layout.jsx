import { Outlet } from 'react-router-dom';
import { PageContainer } from '../../shared/components';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.layout}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
}
