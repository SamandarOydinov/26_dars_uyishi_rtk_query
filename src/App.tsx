import { FormEvent, useState } from 'react';
import './App.css';
import {
  useAddProductMutation,
  useGetProductsQuery,
} from './redux/services/productsApi';

function App() {
  const { data = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    await addProduct({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      price: parseFloat(formData.price),
    });
    setShowModal(false); // Modalni yopish
    setFormData({ title: '', description: '', image: '', price: '' }); // Formani tozalash
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Hello World!</h1>
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product) => {
          return (
            <div className="rounded border-2 shadow-2xl p-4" key={product.id}>
              <img
                className="w-full h-[200px] object-contain mx-auto"
                src={product.image}
                alt={product.title}
              />
              <p
                className="text-sm font-semibold truncate w-full overflow-hidden whitespace-nowrap"
                title={product.title}
              >
                title: {product.title}
              </p>
              <p
                className="text-sm truncate w-full overflow-hidden whitespace-nowrap"
                title={product.description}
              >
                description: {product.description}
              </p>
              <p className="text-base font-bold mt-2">
                price: ${product.price}
              </p>
            </div>
          );
        })}
      </div>
      <br />
      <div className="text-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Product
        </button>
      </div>
    </>
  );
}

export default App;
