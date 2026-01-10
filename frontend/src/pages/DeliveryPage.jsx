export default function DeliveryPage() {
  const deliveryOptions = [
    {
      name: "Standard Delivery",
      duration: "5-7 business days",
      price: "Free on orders over $100",
      description: "Standard shipping for all locations within the United States"
    },
    {
      name: "Express Delivery",
      duration: "2-3 business days",
      price: "$15.00",
      description: "Faster delivery option for urgent orders"
    },
    {
      name: "Overnight Delivery",
      duration: "Next business day",
      price: "$35.00",
      description: "For orders placed before 2 PM EST, delivered next day"
    },
    {
      name: "International Delivery",
      duration: "7-14 business days",
      price: "Starting at $25.00",
      description: "Worldwide shipping available to most countries"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Delivery Information</h1>
        <p className="text-center text-gray-600 mb-12">Fast and reliable shipping options for all your orders</p>
        
        <div className="space-y-6 mb-12">
          {deliveryOptions.map((option, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{option.name}</h3>
                <span className="text-lg font-bold text-gray-900">{option.price}</span>
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Delivery Time:</strong> {option.duration}
              </p>
              <p className="text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Delivery Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Confirmation</h3>
                <p className="text-gray-600">You'll receive an email confirmation immediately after placing your order.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Processing</h3>
                <p className="text-gray-600">We'll process and prepare your order within 1-2 business days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shipping</h3>
                <p className="text-gray-600">You'll receive a tracking number once your order ships.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Delivery</h3>
                <p className="text-gray-600">Your order arrives at your specified delivery address.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Tracking Your Order</h3>
            <p className="text-gray-600 mb-4">
              Once your order ships, you'll receive a tracking number via email. Use it to track your package in real-time.
            </p>
            <button className="btn btn-outline btn-sm">Track Order</button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Have questions about delivery? Our customer service team is here to assist you.
            </p>
            <button className="btn btn-outline btn-sm">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}
