import { useParams } from 'react-router-dom';

export function ProductDetailsPage() {
  const { id } = useParams();

  return <h1>Detalle del producto {id}</h1>;
}
