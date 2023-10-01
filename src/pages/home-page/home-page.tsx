import { Main } from '../../components';
import Products from '../../components/products/products';

export default function HomePage() {
  return (
    <Main>
      <Products isHomePage />
    </Main>
  );
}
