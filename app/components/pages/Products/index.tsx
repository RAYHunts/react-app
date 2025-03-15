import { useEffect, useState } from "react";
import { data, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import ImageLoader from "~/components/ui/ImageLoader";
import { useDebounce } from "~/hooks/useDebounce";
import type { Product, ProductResponseApi } from "~/types/product.type";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedQuery = useDebounce(searchParams, 500);

  const fetchProducts = async () => {
    let url = "https://dummyjson.com/products";
    if (searchParams.get("query")) {
      url += `/search?q=${searchParams.get("query")}`;
    }

    const response = await fetch(url);
    const result = (await response.json()) as ProductResponseApi;
    setProducts(result.products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedQuery]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("query", e.target.value);
    setSearchParams(searchParams);
  };

  const handlePagination = (direction: "next" | "previous") => {
    const currentSkip = Number(searchParams.get("skip")) || 0;
    const newSkip = direction === "next" ? currentSkip + 10 : Math.max(0, currentSkip - 10);
    searchParams.set("skip", String(newSkip));
    setSearchParams(searchParams);
  };

  return (
    <div className="flex-col flex gap-3 items-center">
      <h1 className="text-2xl font-bold text-white">Products</h1>

      <input className="text-white p-3 rounded-2xl w-4xl bg-amber-400" type="text" placeholder="Search" name="query" id="query" defaultValue={searchParams.get("query") || ""} onChange={onInputChange} />

      <div className="grid grid-cols-5 gap-4">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col gap-2 bg-green-800 p-4 rounded-2xl group hover:cursor-pointer relative">
                  <div className="flex items-center justify-center overflow-hidden aspect-video animate-pulse rounded-2xl bg-slate-800 w-3xs"></div>
                  <div className="w-1/2 bg-slate-600 animate-pulse h-2.5">{""}</div>
                  <div className="w-full bg-slate-900 animate-pulse block h-2">{""}</div>
                </div>
              ))
          : products?.map((product) => (
              <div key={product.id} className="flex flex-col gap-2 bg-green-800 p-4 rounded-2xl group hover:cursor-pointer relative">
                <div className="flex items-center justify-center overflow-hidden aspect-video">
                  {/* <img src={"https://picsum.photos/300/200"} alt={product.title} width={300} height={200} className="group-hover:scale-150 object-cover transition-all" /> */}
                  <ImageLoader src={"https://picsum.photos/300/200"} alt={product.title} width={300} height={200} className="group-hover:scale-150 object-cover transition-all" />
                </div>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>
            ))}

        {!isLoading && products?.length === 0 && <h1 className="text-2xl font-bold text-red-600 place-self-center col-span-5 my-4">Sorry u got no products</h1>}
      </div>

      {/* <div className="flex gap-4 items-center">
        <Button className="p-2 bg-green-900 rounded-2xl hover:cursor-pointer" onClick={() => handlePagination("previous")} disabled={searchParams.get("skip") === "0" || isLoading}>
          Previous
        </Button>
        <h1>Page: {searchParams.get("skip") ? Number(searchParams.get("skip")) / 10 + 1 : 1}</h1>
        <Button className="p-2 bg-green-900 rounded-2xl cursor-pointer" onClick={() => handlePagination("next")} disabled={(products && products.length < 10) || isLoading}>
          Next
        </Button>
      </div> */}
    </div>
  );
}
