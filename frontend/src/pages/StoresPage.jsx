export default function StoresPage() {
  const stores = [
    {
      id: 1,
      name: "AMIORE Flagship Store",
      address: "123 Fashion Street, Style District",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 12:00 PM - 6:00 PM"
    },
    {
      id: 2,
      name: "AMIORE Los Angeles",
      address: "456 Rodeo Drive",
      city: "Beverly Hills, CA 90210",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 12:00 PM - 6:00 PM"
    },
    {
      id: 3,
      name: "AMIORE Chicago",
      address: "789 Magnificent Mile",
      city: "Chicago, IL 60611",
      phone: "+1 (555) 345-6789",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 12:00 PM - 6:00 PM"
    },
    {
      id: 4,
      name: "AMIORE Miami",
      address: "321 Ocean Drive",
      city: "Miami Beach, FL 33139",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 7:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Our Stores</h1>
        <p className="text-center text-gray-600 mb-12">Visit us in person to experience AMIORE firsthand</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Store Image</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{store.name}</h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{store.address}<br />{store.city}</span>
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{store.phone}</span>
                </p>
                <p className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{store.hours}</span>
                </p>
              </div>
              <button className="btn btn-outline btn-sm mt-4 w-full">Get Directions</button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Can't find a store near you?</h2>
          <p className="text-gray-600 mb-6">Shop online and enjoy free shipping on orders over $100</p>
          <button className="btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
}
