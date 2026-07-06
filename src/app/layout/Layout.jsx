import { Box, Container, Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header.jsx';
import { BreadcrumbProvider } from './context/BreadcrumbProvider.jsx';
import styles from './Layout.module.scss';

// Header con tamaño fijo + área de contenido con el resto del viewport.
// El scroll ocurre dentro de esa área (no en <body>), lo que permite a una
// página como la PDP conocer su alto disponible real y decidir si necesita
// scroll propio en vez de desbordar la página completa.
export function Layout() {
  return (
    <BreadcrumbProvider>
      <Flex direction="column" className={styles.layout}>
        <Header />
        <Box className={styles.scrollArea}>
          {/* Container renderiza un wrapper exterior + un div interno con el
              contenido real; `height="100%"` solo afecta al interno, así que
              el exterior necesita también su propia clase con height:100%
              para que la cadena de porcentajes no se rompa. */}
          <Container size="4" px={{ initial: '4', sm: '6' }} py="6" height="100%" className={styles.container}>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </BreadcrumbProvider>
  );
}
