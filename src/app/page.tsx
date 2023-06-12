'use client';

import { SimpleGrid } from "@chakra-ui/react";
import Header from "./components/header";
import Product from "./components/product";


export default function Home() {
  return (
    <main>
      <Header/>

      <SimpleGrid
        padding="10px"
        columns={{
          base: 1,
          md: 3,
          lg: 6,
        }}
        spacing='20px'
      >
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </SimpleGrid>
    </main>
  )
}
