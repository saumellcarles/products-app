import { Outlet } from 'react-router-dom';
import { PageContainer } from '../../shared/components';
import { Header } from './Header/Header.jsx';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
}
