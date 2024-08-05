// pages/edit/[id].js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProduct = ({params}:{params: {lang: string, slug: string}}) => {
  const {lang, slug} = params
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState({
    product_name: '',
    product_slug: '',
    product_img: '',
    product_banner: '',
    product_description: '',
    product_code: '',
    product_type: '',
    product_provider: '',
    product_special: '',
  }) as any;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null) as any;

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const response = await axios.post(`${API_URL}/products/${slug}`); 
          setProduct(response.data);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [slug]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/products/${slug}`, product);
    // Redirect to homepage or another page after successful update
      window.location.href = '/admin';
    } catch (err:any) {
      setError(err);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(product).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-white">
              {key.replace(/_/g, ' ')}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={product[key]}
              onChange={handleChange}
              className="border rounded px-3 py-1 bg-muted"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
