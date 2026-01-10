export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Returns & Exchanges</h1>
        <p className="text-center text-gray-600 mb-12">Easy and hassle-free returns for your peace of mind</p>
        
        <div className="space-y-8 mb-12">
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            <p className="text-gray-600 mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              you can return it within 30 days of delivery for a full refund or exchange.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Items must be unworn, unwashed, and in original condition with tags attached</li>
              <li>Original packaging and receipt required</li>
              <li>Return shipping is free for all customers</li>
              <li>Refunds will be processed within 5-7 business days after we receive your return</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Initiate Return</h3>
                  <p className="text-gray-600">Log into your account or use the return portal with your order number.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Print Label</h3>
                  <p className="text-gray-600">Print the prepaid return shipping label provided in your account.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pack Items</h3>
                  <p className="text-gray-600">Pack the items securely in the original packaging with tags attached.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ship Back</h3>
                  <p className="text-gray-600">Drop off your package at any post office or schedule a pickup.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p className="text-gray-600 mb-4">
              Need a different size or color? Exchanges are easy! Simply return your original item and place a new order 
              for the item you want. We'll refund your original purchase once we receive the return.
            </p>
            <p className="text-gray-600">
              For size exchanges, we recommend checking our Size Guide before placing your exchange order.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
            <p className="text-gray-600 mb-2">The following items cannot be returned:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li>Items that have been worn, washed, or damaged</li>
              <li>Items without original tags or packaging</li>
              <li>Final sale items (clearly marked)</li>
              <li>Personalized or customized items</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
            <p className="text-gray-600 mb-4">
              Once we receive and inspect your return, we'll process your refund within 5-7 business days. 
              The refund will be issued to the original payment method used for the purchase.
            </p>
            <p className="text-gray-600">
              <strong>Note:</strong> Depending on your bank, it may take 5-10 business days for the refund 
              to appear in your account after processing.
            </p>
          </section>
        </div>

        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Return?</h2>
          <p className="mb-6">Start your return process now - it only takes a few minutes</p>
          <button className="btn bg-white text-gray-900 hover:bg-gray-100">Start Return</button>
        </div>
      </div>
    </div>
  );
}
