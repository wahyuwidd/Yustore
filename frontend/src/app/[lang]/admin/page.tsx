import DataTable from "@/components/DataTable"

const AdminDashboard = () => {
    return (
        <main className="container mt-10">
            <h1>Admin Dashboard</h1>
            <div className="mt-5">
                <DataTable />
            </div>
        </main>
    )
}

export default AdminDashboard