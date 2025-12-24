import React, { useEffect, useState } from 'react';
import { cartStore } from '../store/cartStore';
import { Loader2 } from 'lucide-react';
import { axiosInstance } from '../utils/axiosInstance';
import { authStore } from '../store/authStore';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { fetchCartItems, cartItems, isLoading, emptyCart } = cartStore();
  const userData = JSON.parse(localStorage.getItem('user-storage'));
  const [userDetails, setUserDetails] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    mobileNumber: '',
    address: '',
    city: '',
    zipcode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [paymentProcess, setPaymentProcess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subTotalAmount = cartItems.reduce(
    (acc, elem) => acc + elem.product.price * elem.quantity,
    0
  );
  const deliveryFee = 149;

  const orderList = cartItems.map((elem) => ({
    productId: elem.productId,
    inventoryId: elem.inventoryId,
    name: elem.product.name,
    price: elem.product.price,
    quantity: elem.quantity,
    size: elem.inventory.size,
  }));

  const handleRazorPayCheckout = async ({ amount, items, userDetails, cod }) => {
    setPaymentProcess(true);
    try {
      console.log("hello hello", amount)
      const res = await axiosInstance.post('/payments/create-order', {
        amount,
        items,
        userDetails,
        cod,
      });

      const { id, razorpayOrder } = res.data;

      if (cod) {
        await emptyCart();
        navigate(`/orderSucessful/${id}`);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Amiore',
        description: 'Order payment',
        order_id: razorpayOrder.id,
        prefill: { name: userData.username, email: userData.email },
        handler: async (response) => {
          await axiosInstance.post('/payments/verify', response);
          await emptyCart();
          navigate(`/orderSucessful/${id}`);
        },
        theme: { color: '#111827' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setPaymentProcess(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90%] mx-auto mt-10 flex flex-col md:flex-row gap-8">
      {/* LEFT: Billing Details */}
      <div className="flex-1 md:max-w-[60%] overflow-auto pb-10">
        <h2 className="text-3xl font-bold mb-5">Billing Details</h2>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={userData.username}
              readOnly
              className="mt-1 block w-full px-3 py-3 bg-neutral-200 cursor-not-allowed border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="mt-1 block w-full px-3 py-3 bg-neutral-200 cursor-not-allowed border border-gray-300 rounded-md"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <PhoneInput
              inputProps={{ required: true }}
              inputStyle={{ width: '100%', height: '48px' }}
              country={'in'}
              onChange={(mobileNumber) =>
                setUserDetails((prev) => ({ ...prev, mobileNumber }))
              }
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* City & Zip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    zipcode: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="w-full md:w-[40%] h-fit sticky top-6 self-start bg-neutral-50 border-1 border-neutral-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-5">Your Order</h2>

        <div className="divide-y divide-neutral-300 mb-5 overflow-y-auto md:h-[10rem]">
          {cartItems.map((elem) => (
            <div
              key={elem.id}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={elem.product.mainImage}
                  alt={elem.product.name}
                  className="w-[60px] h-[70px] object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{elem.product.name}</p>
                  <p className="text-gray-500 text-sm">{elem.inventory.size}</p>
                  <p className="text-gray-500 text-sm">
                    Qty: {elem.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                ₹{elem.product.price * elem.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t border-gray-300 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>₹{subTotalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
            <span>Total</span>
            <span>₹{subTotalAmount + deliveryFee}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={paymentMethod === 'ONLINE'}
                onChange={() => setPaymentMethod('ONLINE')}
              />
              UPI / Card / Net Banking
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={() => {
            for (const key in userDetails) {
              if (userDetails[key] === '') {
                toast.error('Please fill all fields');
                return;
              }
            }
            handleRazorPayCheckout({
              amount: subTotalAmount + deliveryFee,
              items: orderList,
              userDetails,
              cod: paymentMethod === 'COD',
            });
          }}
          className="mt-6 w-full py-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-md font-medium text-lg flex justify-center items-center"
        >
          {paymentProcess ? <Loader2 className="animate-spin" /> : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
