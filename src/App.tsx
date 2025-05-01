import { FormEvent } from 'react';
import './App.css'
import { useAddProductMutation, useGetProductsQuery } from './redux/services/productsApi';

function App() {

  const { data = [] } = useGetProductsQuery();

  const [addProduct] = useAddProductMutation();

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    await addProduct({ title: "Prod", price: 123 });
  }

  return (
    <>
      <h1>Hello World!</h1>
      <div className="max-w-[1400px] m-auto grid grid-cols-4 gap-2">
        {data.map((product) => {
          return (
            <div className="rounded border-2 shadow-2xl" key={product.id}>
              <img
                className="w-full h-[300px] object-contain flex justify-center"
                src={product.image}
              ></img>
              <p className="h-[50px] box-border truncate w-full overflow-hidden">
                title: {product.title}
              </p>
              <p className="h-[50px] box-border truncate w-full overflow-hidden">
                description: {product.description}
              </p>
              <p>price: {product.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App
