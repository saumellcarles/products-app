import { Container, Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header.jsx';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <Flex direction="column" className={styles.layout}>
      <Header />
      <Container size="4" px={{ initial: '4', sm: '6' }} py="6">
        <Outlet />
      </Container>
    </Flex>
  );
}
