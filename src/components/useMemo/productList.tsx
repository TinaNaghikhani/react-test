import React, { useState, useEffect, useMemo } from 'react'
import { GetProducts } from '../services/getproducts';
import Input from '../base/input/input';

export default function ProductList() {
  const [products, setProducts] = useState<{ id: number; name: string; image?: string }[]>([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filterProduct = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <div className='p-10 bg-zinc-200'>
      <h2 className='font-bold text-zinc-800 mb-3 text-2xl'>Product List</h2>
      <div>
        {/* <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none w-full p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 border-pink"
        /> */}
        <Input className="mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 boder-pink" type="text" placeholder="Search..." value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        <div className='flex flex-wrap gap-10 justify-around p-8'>
          {loading ? (
            <p className='text-32 text-pink-700 m-3'>Loading...</p>
          ) : error ? (
            <p className='text-32 text-red-700 m-3'>{error}</p>
          ) : filterProduct.length > 0 ? (
            filterProduct.map((product) => (
              <div
                key={product.id}
                className='flex justify-center gap-2 flex-col w-40 p-3 border border-pink-400 rounded-lg text-center'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='text-center'
                />
                <p className='font-semibold text-zinc-600'>{product.name}</p>
              </div>
            ))
          ) : (
            <p className='text-32 text-pink-700 m-3'>No products found...</p>
          )}
        </div>
      </div>
    </div>
  );
}

