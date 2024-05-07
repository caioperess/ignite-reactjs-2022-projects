import { stripe } from '@/lib/stripe';
import { HomeContainer, Product } from '@/styles/pages/home';
import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import { formatToBRL } from '@/utils/formatToBRL';
import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number | null;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} alt="" width={520} height={480} />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price ?? 'Sem valor'}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? formatToBRL(price.unit_amount / 100) : null,
    };
  });

  return {
    props: {
      products,
    },
  };
};
