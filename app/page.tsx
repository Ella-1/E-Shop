import Image from "next/image";
import Container from "./components/Container";
import HomeBanner from "./components/Homebanner";
import { products } from "@/utils/products";
import { Truncate } from "@/utils/truncateTex";
import ProductCards from "./components/products/ProductCards";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div>
       <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
       {products.map((product: any )=> {
          return (
            <div>
              <ProductCards data={product}/>
        
            </div>
          )
        })}
       </div>
        </div>
      </Container>
    </div>
  );
}
