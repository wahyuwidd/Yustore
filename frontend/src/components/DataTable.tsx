'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DataTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null) as any
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete = (id: number) => {
    // Implement your delete logic here
    console.log(`Delete item with id: ${id}`);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <><button className='bg-primary text-primary-foreground rounded-md px-4 py-2 mb-2'>Add Product</button>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-muted shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            {[
              'id',
              'product_name',
              'product_slug',
              'product_img',
              'product_banner',
              'product_code',
              'product_type',
              'product_provider',
              'product_special',
              'actions',
            ].map((header) => (
              <th key={header} className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold text-left">
                {header.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="even:bg-muted/20 odd:bg-muted">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.product_name}</td>
              <td className="py-2 px-4 border-b">{item.product_slug}</td>
              <td className="py-2 px-4 border-b">
                <img src={item.product_img} alt={item.product_name} className="h-20 w-16 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4 border-b">
                <img src={item.product_banner} alt={`${item.product_name} banner`} className="h-16 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4 border-b">{item.product_code}</td>
              <td className="py-2 px-4 border-b">{item.product_type}</td>
              <td className="py-2 px-4 border-b">{item.product_provider}</td>
              <td className="py-2 px-4 border-b">{item.product_special}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex space-x-4">

                  <Link href={`/admin/edit/${item.product_slug}`}>
                    <button
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

export default DataTable;
