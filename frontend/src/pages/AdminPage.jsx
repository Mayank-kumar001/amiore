import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import AddProductComponent from "../components/AddProductComponent";




function AdminPage() {



	const [addProductPageOpen, setAddProductPageOpen] = useState(false);
	const [pendingOrders, setPendingOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updatingOrderId, setUpdatingOrderId] = useState(null);

	useEffect(() => {
		fetchPendingOrders();
	}, []);

	const fetchPendingOrders = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("payments/pending-orders");
			if (response.data.success) {
				setPendingOrders(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching pending orders:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleMarkAsSuccess = async (orderId) => {
		try {
			setUpdatingOrderId(orderId);
			const response = await axiosInstance.patch("payments/update-order-status", {
				orderId: orderId
			});
			if (response.data.success) {
				// Remove the order from the list
				setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
			}
		} catch (error) {
			console.error("Error updating order status:", error);
			alert(error.response?.data?.message || "Failed to update order status");
		} finally {
			setUpdatingOrderId(null);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + " " + date.toLocaleTimeString();
	};

	const formatAmount = (amount) => {
		return `₹${(amount / 100).toFixed(2)}`;
	};

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden p-2 sm:p-4">
			{addProductPageOpen && <div className='min-h-screen absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 overflow-hidden p-4 z-50'>
				<AddProductComponent closeComponent={setAddProductPageOpen} />
			</div>}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
				<h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
				<button className="btn btn-sm sm:btn-md w-full sm:w-auto" onClick={() => setAddProductPageOpen(true)}>Add Product</button>
			</div>

			<div className="flex-1">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">Pending Orders</h2>

				{loading ? (
					<div className="flex justify-center items-center h-64">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
					
				) : pendingOrders.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-gray-500">No pending orders found</p>
					</div>
				) : (
					<>
						{/* Mobile Card View */}
						<div className="block md:hidden space-y-4">
							{pendingOrders.map((order) => (
								<div key={order.id} className="card bg-base-200 shadow-md">
									<div className="card-body p-4 gap-3">
										<div className="flex justify-between items-start">
											<div>
												<p className="text-xs text-gray-500">Order ID</p>
												<p className="font-mono text-sm font-semibold">{order.id.slice(0, 8)}...</p>
											</div>
											<span className={`badge badge-sm ${order.status === 'PAID' ? 'badge-success' : order.status === 'COD' ? 'badge-info' : 'badge-warning'}`}>
												{order.status}
											</span>
										</div>
										
										<div>
											<p className="text-xs text-gray-500">Customer</p>
											<p className="text-sm truncate">{order.user?.email || order.userInfo?.email || "N/A"}</p>
										</div>

										<div className="flex justify-between items-center">
											<div>
												<p className="text-xs text-gray-500">Amount</p>
												<p className="text-lg font-bold">{formatAmount(order.amount)}</p>
											</div>
											<div>
												<p className="text-xs text-gray-500">Items</p>
												{Array.isArray(order.lineItems) && order.lineItems.length > 0 ? (
													<span className="badge badge-primary badge-sm">
														{order.lineItems.length}
													</span>
												) : (
													<span className="text-xs text-gray-400">0</span>
												)}
											</div>
										</div>

										<div>
											<p className="text-xs text-gray-500">Date</p>
											<p className="text-xs">{formatDate(order.createdAt)}</p>
										</div>

										<div className="pt-2">
											<button
												className={`btn btn-success btn-block btn-sm ${updatingOrderId === order.id ? "loading" : ""}`}
												onClick={() => handleMarkAsSuccess(order.id)}
												disabled={updatingOrderId === order.id}
											>
												{updatingOrderId === order.id ? "" : "Mark as Delivered"}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Desktop Table View */}
						<div className="hidden md:block overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
									<tr>
										<th className="text-xs sm:text-sm">Order ID</th>
										<th className="text-xs sm:text-sm">Customer Email</th>
										<th className="text-xs sm:text-sm">Amount</th>
										<th className="text-xs sm:text-sm">Status</th>
										<th className="text-xs sm:text-sm">Date</th>
										<th className="text-xs sm:text-sm">Items</th>
										<th className="text-xs sm:text-sm">Action</th>
									</tr>
								</thead>
								<tbody>
									{pendingOrders.map((order) => (
										<tr key={order.id}>
											<td className="font-mono text-xs sm:text-sm">{order.id.slice(0, 8)}...</td>
											<td className="text-xs sm:text-sm">{order.user?.email || order.userInfo?.email || "N/A"}</td>
											<td className="text-xs sm:text-sm font-semibold">{formatAmount(order.amount)}</td>
											<td>
												<span className={`badge badge-sm ${order.status === 'PAID' ? 'badge-success' : order.status === 'COD' ? 'badge-info' : 'badge-warning'}`}>
													{order.status}
												</span>
											</td>
											<td className="text-xs sm:text-sm">{formatDate(order.createdAt)}</td>
											<td>
												{Array.isArray(order.lineItems) && order.lineItems.length > 0 ? (
													<span className="badge badge-primary badge-sm">
														{order.lineItems.length} item(s)
													</span>
												) : (
													<span className="text-gray-400 text-xs">No items</span>
												)}
											</td>
											<td>
												<button
													className={`btn btn-xs sm:btn-sm btn-success ${updatingOrderId === order.id ? "loading" : ""}`}
													onClick={() => handleMarkAsSuccess(order.id)}
													disabled={updatingOrderId === order.id}
												>
													{updatingOrderId === order.id ? "" : "Mark as Delivered"}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default AdminPage