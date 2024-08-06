'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; 

const Description = ({ product, home }: { product: Product, home: Home }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-lg bg-muted/75 px-4 py-2 text-left text-xs font-medium text-card-foreground focus:outline-none"
        onClick={toggleCollapse}
      >
        <span>Deskripsi dan cara melakukan transaksi</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className='mt-2'>
          <div className='rounded-xl bg-muted/50 px-4 pb-4 pt-2 shadow-2xl'>
            <div className='prose prose-sm text-xs text-foreground'>
              <div>
                {product.category.Category_name === 'Pulsa Data' ? (
                 <>
                 <p>Beli Pulsa {product.product_name} dengan harga paling murah. Cara beli Pulsa {product.product_name} termurah :</p> 
                 <p className='mt-1'>
                   1. Masukkan No Hp Kamu
                 </p>
                 <p className='mt-1'>
                   2. Pilih Nominal Voucher
                 </p>
                 <p className='mt-1'>
                   3. Pilih Pembayaran
                 </p>
                 <p className='mt-1'>
                   4. Masukkan No WhatsApp
                 </p>
                 <p className='mt-1'>
                   5. Klik Order Now & lakukan Pembayaran
                 </p>
                 <p className='mt-1'>
                   6. Pulsa otomatis masuk ke nomer HP Kamu
                 </p>
                 </>
                ): product.category.Category_name === 'Voucher' ? (
                  <>
                  <p>Beli {product.product_name} dengan harga paling murah. Cara beli {product.product_name} termurah :</p> 
                  <p className='mt-1'>
                    1. Masukkan No Hp Kamu
                  </p>
                  <p className='mt-1'>
                    2. Pilih Nominal Voucher
                  </p>
                  <p className='mt-1'>
                    3. Pilih Pembayaran
                  </p>
                  <p className='mt-1'>
                    4. Masukkan No WhatsApp
                  </p>
                  <p className='mt-1'>
                    5. Klik Order Now & lakukan Pembayaran
                  </p>
                  <p className='mt-1'>
                    6  . Voucher akan muncul di halaman invoice
                  </p>
                  </>
                ): (
                  <><p dir='ltr'>
                  {home.title} menghadirkan penawaran spesial untuk gamers! Dapatkan layanan Top Up resmi dan legal untuk 
                  <strong> {product.product_name}</strong> yang meningkatkan pengalaman bermain Anda dengan harga terjangkau.
                </p>
                <p dir='ltr' className='mt-2'>
                  Top Up <strong>{product.product_name}</strong>: Resmi, Murah, Aman & Terpercaya.
                </p>
                <p dir='ltr' className='mt-2'>
                  Cara Top Up <strong>{product.product_name}</strong>:
                </p>
                <p dir='ltr' className='mt-2'>
                  1. Masukkan Data Akun (Pastikan benar dan lengkap)
                  <br />
                  2. Pilih Nominal Diamond sesuai kebutuhan
                  <br />
                  3. Pilih Metode Pembayaran yang mudah dan aman
                  <br />
                  4. Masukkan Kode Promo (jika ada) untuk diskon
                  <br />
                  5. Masukkan Nomor Whatsapp & Email valid untuk konfirmasi
                  <br />
                  6. Klik Order Now & Bayar
                  <br />
                  7. Diamond otomatis masuk ke akun Anda
                </p>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
