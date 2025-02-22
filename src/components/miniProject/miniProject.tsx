import React, { useState, useEffect, useMemo, useReducer, useRef } from 'react'
import { GetProducts } from '../services/getproducts';
import Input from '../base/input/input';
import Button from '../base/button/button';
import { PostProducts } from '../services/postProducts';

interface Product {
    id: number;
    name: string;
    image?: string;
}


// تعریف نوع state که شامل شمارنده‌ی هر محصول است
interface State {
    counts: { [key: number]: number };
}

// تعریف نوع اکشن‌های مربوط به reducer
type Action =
    | { type: 'INCREMENT'; id: number }
    | { type: 'DECREMENT'; id: number }
    | { type: 'SET_INITIAL_COUNTS'; products: Product[] };

// مقدار اولیه‌ی state
const initialState: State = {
    counts: {},

};

// تعریف reducer برای مدیریت شمارنده‌ی محصولات
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counts: { ...state.counts, [action.id]: (state.counts[action.id] || 0) + 1 },
            };
        case 'DECREMENT':
            return {
                ...state,
                counts: { ...state.counts, [action.id]: Math.max(0, (state.counts[action.id] || 0) - 1) },
            };
        case 'SET_INITIAL_COUNTS':
            const initialCounts = action.products.reduce((acc, product) => {
                acc[product.id] = 0;
                return acc;
            }, {} as { [key: number]: number });
            return { counts: initialCounts };
        default:
            return state;
    }
}

export default function MiniProject() {

    const [products, setProducts] = useState<{ id: number; name: string; image?: string }[]>([])
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef<HTMLInputElement>(null); // تعریف `useRef` برای اینپوت


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await GetProducts();
                setProducts(data);
                dispatch({ type: 'SET_INITIAL_COUNTS', products: data }); // مقدار اولیه شمارنده‌ها را تنظیم کن

            } catch (err) {
                setError("Failed to fetch products");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // تابع ارسال محصول جدید
    const handleAddProduct = async () => {
        if (inputRef.current) {
            const newProductName = inputRef.current.value.trim();
            if (!newProductName) {
                alert("Product name can't be empty!");
                return;
            }

            const newProduct = { name: newProductName }; // فقط نام محصول ارسال می‌شود، تصویر را API مشخص می‌کند
            const result = await PostProducts(newProduct);

            if (result) {
                setProducts([...products, result]); // محصول جدید را به لیست اضافه کن
                inputRef.current.value = ''; // مقدار اینپوت را پاک کن
            }
        }
    };

    const filterProduct = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);
    return (
        <div className='p-10 bg-zinc-200'>
            <h2 className='font-bold text-zinc-800 mb-3 text-2xl'>Product List</h2>
            <div className='flex flex-col gap-4'>
<div className='flex flex-col gap-2'>
    <Input
        name='tasks'
        placeholder='Sun Glasses'
        type='text'
        label='Add Product:'
        id='tasks'
        className='mt-4 p-2 bg-pink-200 rounded-2xl text-pink-600 border-2 border-pink'
        ref={inputRef} // استفاده از `useRef`
        error=''
    />
    <Button
        label='Add'
        type='button'
        className='w-16 h-16 p-1 text-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300'
        onClick={handleAddProduct}
    />
</div>
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
                                className='flex justify-center items-center gap-2 flex-col w-40 p-3 border border-pink-400 rounded-lg text-center'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='text-center'
                                />
                                <p className='font-semibold text-zinc-600'>{product.name}</p>
                                <div className='flex gap-2 justify-baseline'>
                                    <Button className="w-6 h-6 p-1 flex items-center justify-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300" type="button" label="+" onClick={() => dispatch({ type: "INCREMENT", id: product.id })} />
                                    <span className='w-10 rounded-lg border border-pink-800 border-2xl'>{state.counts[product.id] || 0}</span>
                                    <Button className="w-6 h-6 p-1 flex items-center justify-center rounded-full text-pink-500 font-bold shadow-lg bg-zinc-300" type="button" label="-" onClick={() => dispatch({ type: "DECREMENT", id: product.id })} />

                                </div>

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
