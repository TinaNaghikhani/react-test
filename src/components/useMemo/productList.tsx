import React, { useState, useEffect, useMemo } from 'react'
import { GetProducts } from '../services/products'; 
import Input from '../base/input/input';


export default function ProductList() {
  const [products, setProducts] = useState<{ id: number; name: string; image?: string }[]>([])
  
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const data = await GetProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const filterProduct = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);


  return (
    <div>
      <h2>Product List</h2>
      <div>
        <Input className="mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 boder-pink" type="text" placeholder="Search..." value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        <div>
          {filterProduct.length > 0 ? (
            filterProduct.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>

            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>


    </div>
  );
}


// import React, { useState, useEffect, useMemo } from "react";
// import { Products } from "../services/products";

// export default function ProductList() {
//   const [products, setProducts] = useState<{ id: number; name: string; image?: string }[]>([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await Products();
//       setProducts(data);
//     };
//     fetchData();
//   }, []);

//   // فیلتر کردن محصولات با useMemo
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) =>
//       product.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, products]);

//   return (
//     <div>
//       <h2>Product List</h2>

//       {/* فیلد جستجو */}
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{
//           padding: "8px",
//           marginBottom: "10px",
//           width: "100%",
//           maxWidth: "300px",
//           display: "block",
//         }}
//       />

//       {/* لیست محصولات */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 textAlign: "center",
//                 width: "150px",
//               }}
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               />
//               <p>{product.name}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found...</p>
//         )}
//       </div>
//     </div>
//   );
// }
