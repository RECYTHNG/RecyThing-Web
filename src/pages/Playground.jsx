import React from 'react';
import { useDeleteData, useFetch } from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Playground = () => {
  const { data: products, isLoading, error } = useFetch('/products', 'products');
  const { mutateAsync: deletePost, isLoading: isDeleting, isSuccess } = useDeleteData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    const deletingToastId = toast.error('Deleting...');
    try {
      await deletePost({ endpoint: `/products/${id}` });
      toast.dismiss(deletingToastId);
      toast.success('Success Deleting');
    } catch (error) {
      toast.dismiss(deletingToastId);
      toast.error('Error Deleting');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.productName}</h2>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => onPostSelect(product.id)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;
