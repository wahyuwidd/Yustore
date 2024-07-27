import Countdown from "@/components/Countdown";
import PaymentButton from "@/components/PaymentButton";
import formatDateTime from "@/utils/formatDatetime";
import axios from "axios";
import Link from "next/link";
import React from "react";

interface Instruction {
    title: string;
    steps: string[];
}

const Invoice = async ({ params }: { params: { lang: string, id: string } }) => {
    const { id } = params;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Mengambil data invoice dari API
        const response = await axios.post(`${API_URL}/invoice/${id}`);
        const data = response.data;
        const data_tripay = JSON.parse(data.response_tripay);

        // Mencari instruksi QRIS
        const qrisInstruction = data_tripay.data.instructions.find((instruction: Instruction) => instruction.title === "Pembayaran via QRIS");

        // Mendapatkan kelas status berdasarkan status transaksi
        const getStatusClass = (status: string) => {
            switch (status) {
                case 'Completed':
                    return 'bg-green-300 text-green-800';
                case 'Processing':
                    return 'bg-blue-300 text-blue-800';
                case 'Error':
                case 'Failed':
                case 'Cancelled':
                    return 'bg-red-300 text-red-800';
                case 'Pending':
                default:
                    return 'bg-yellow-300 text-yellow-800';
            }
        };

        return (
            <main className="relative bg-[#393E46]">
                <div className="container pb-8 pt-12 md:pt-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-base font-semibold text-secondary-foreground print:text-black">
                            Terima Kasih!
                        </h1>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-secondary-foreground md:text-4xl print:text-black">
                            {data.status_pembayaran === 'UNPAID' ? 'Harap lengkapi pembayaran.' : 'Transaksi sudah selesai.'}
                        </p>
                        <p className="mt-3.5 text-base text-secondary-foreground print:text-black">
                            Pesanan kamu
                            <button className="mx-1 rounded-md border border-border/75 bg-secondary/25 px-1 font-bold text-secondary-foreground print:text-black">
                                {id}
                            </button>
                            {data.status_pembayaran === 'UNPAID' ? 'menunggu pembayaran sebelum dikirim.' : 'telah berhasil!'}
                        </p>
                    </div>
                </div>
                <div className="container flex w-full justify-end pb-4 print:hidden">
                    <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75">
                        Download Invoice
                    </button>
                </div>
                <div className="container grid grid-cols-3 gap-4">
                    <div className="col-span-3 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-2">
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-secondary-foreground print:text-black">
                                Detail Pembelian
                            </h3>
                            <p className="text-sm mt-1 max-w-2xl leading-6">
                                Pembelian produk {data.produk} {data.item}
                            </p>
                        </div>
                        <div className="mt-4 border-t border-border/75">
                            <dl className="divide-secondary-700/25 divide-y">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        Nomor Invoice
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        {id}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        Status Transaksi
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0 ${getStatusClass(data.status_transaksi)}`}>
                                            {data.status_transaksi}
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        Status Pembayaran
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0 ${data.status_pembayaran === 'PAID' ? 'bg-green-300 text-green-800' : 'bg-rose-300 text-rose-800'}`}>
                                            {data.status_pembayaran}
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        Pesan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        {data.pesan}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        Rincian Pembayaran
                                    </dt>
                                    <div className="mt-1 flex items-center justify-between rounded-md bg-primary/25 p-4 text-sm leading-6 text-secondary-foreground sm:mt-0 print:py-0 print:text-black">
                                        <div>Total Pembayaran</div>
                                        <div>Rp {data.harga}</div>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-4 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-1">
                        <div className="w-full text-center text-sm font-medium">
                            <dt className="text-secondary-foreground print:text-black">
                                {data.status_pembayaran === 'UNPAID' ? 'Pesanan ini akan kedaluwarsa pada' : 'Transaksi ini dibuat pada'}
                            </dt>
                            <dd className="text-primary-500 mt-2">
                                <div className={`rounded-md ${data.status_pembayaran === 'UNPAID' ? 'bg-red-500' : 'bg-green-500'} px-4 py-2 text-center text-foreground print:p-0 print:text-left print:text-slate-800`}>
                                    {data.status_pembayaran === 'UNPAID' ? <Countdown targetTimestamp={data_tripay.data.expired_time} /> : formatDateTime(data.createdAt)}
                                </div>
                            </dd>
                        </div>
                        <div className="rounded-md bg-secondary/50 p-4">
                            <h2 className="text-sm font-semibold leading-6">
                                Metode Pembayaran
                            </h2>
                            <h3 className="text-sm font-semibold leading-6">
                                {data.payment_name}
                            </h3>
                        </div>
                        <div className="prose prose-sm">
                            {qrisInstruction && data.status_pembayaran === 'UNPAID' && (
                                <button className="flex w-full justify-between rounded-lg bg-secondary/50 px-4 py-3 text-left text-sm font-medium text-secondary-foreground focus:outline-none print:text-black">
                                    <span>Cara Melakukan Pembayaran</span>
                                </button>
                            )}
                            <div className="mt-1 rounded-lg border border-border/75 bg-secondary/50 px-4 pb-1 pt-1 text-sm">
                                <div>
                                    {qrisInstruction && data.status_pembayaran === 'UNPAID' && (
                                        <p className="selectable-text copyable-text x15bjb6t x1n2onr6">
                                            {qrisInstruction.steps.map((step: string, stepIndex: number) => (
                                                <span key={stepIndex} className="selectable-text copyable-text">
                                                    {stepIndex + 1}. {step}
                                                    <br />
                                                </span>
                                            ))}
                                            <br />
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {data_tripay.data.qr_url && data.status_pembayaran === 'UNPAID' && (
                                        <>
                                            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-56 sm:w-56">
                                                <div>
                                                    <img src={data_tripay.data.qr_url} alt="QR Code" />
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 mt-2 w-64 py-2 !text-xs sm:w-56 print:hidden">
                                                Unduh Kode QR
                                            </div>
                                        </>
                                    )}
                                    {data_tripay.data.pay_code && data.status_pembayaran === 'UNPAID' && (
                                        <div className="flex flex-col items-center justify-between">
                                            <div className="flex w-full items-center justify-between">
                                                <div className="col-span-3 inline-flex items-center md:col-span-4">Nomor Pembayaran</div>
                                                <button>{data_tripay.data.pay_code}</button>
                                            </div>
                                        </div>
                                    )}
                                    {data_tripay.data.pay_url && data.status_pembayaran === 'UNPAID' && (
                                        <PaymentButton payUrl={data_tripay.data.pay_url} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-3">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="grid w-full grid-cols-1 gap-4 rounded-md bg-secondary/25 p-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6">Informasi Akun</h3>
                                    <div className="divide-secondary-700/50 mt-4 divide-y border-t border-border/75 text-sm font-medium text-secondary-foreground print:text-black">
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                Nickname
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.username}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                ID
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.userid}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                Server
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.userserver}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error("Failed to fetch invoice data:", error);
        return (
            <main className="relative bg-[#393E46]">
                <div className="container pb-8 pt-12 md:pt-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-base font-semibold text-secondary-foreground print:text-black">
                            Terjadi Kesalahan
                        </h1>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-secondary-foreground md:text-4xl print:text-black">
                            Kami tidak dapat memuat data invoice saat ini.
                        </p>
                        <p className="mt-3.5 text-base text-secondary-foreground print:text-black">
                            Mohon coba lagi nanti.
                        </p>
                        <p>
                            {error instanceof Error && error.message}
                        </p>
                        <Link href="/" className="inline-flex mt-20 items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white duration-300 hover:bg-primary/75 print:hidden">
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
};

export default Invoice;
