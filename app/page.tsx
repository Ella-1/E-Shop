export const revalidate = 0
import Image from "next/image";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { Truncate } from "@/utils/truncateTex";
import ProductCards from "./components/products/ProductCards";
import GetProduct, { IProductParams } from "@/actions/getProduct";
import NullData from "./components/nullData";
import { AddRating } from "./product/[productId]/addRating";

interface HomeProps{
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await GetProduct(searchParams)

  // Algorithm thats displays products at random
  if(products?.length === 0) {
    return <NullData title='Oops! No Products Found. Click "All" to clear filter' />
  }

  // fisher-yates shuffle algorithm
  function shuffleArray(array:any) {
    for(let i = array.length -1; i> 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products)




  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div>
       <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
       {shuffledProducts.map((product: any )=> {
          return (
            <div key={product.id}>
              <ProductCards data={product} />
        
            </div>
            
          )
        })}
       </div>
        </div>
      </Container>
    </div>
  );
}
