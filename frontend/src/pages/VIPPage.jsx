export default function VIPPage() {
  const benefits = [
    {
      icon: "🎁",
      title: "Exclusive Discounts",
      description: "Enjoy up to 20% off on all purchases, plus early access to sales"
    },
    {
      icon: "✨",
      title: "Early Access",
      description: "Be the first to shop new collections before they're released to the public"
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Complimentary shipping on all orders, no minimum purchase required"
    },
    {
      icon: "🎉",
      title: "Birthday Rewards",
      description: "Special birthday gift and extra discounts during your birthday month"
    },
    {
      icon: "💎",
      title: "VIP Events",
      description: "Invitations to exclusive events, trunk shows, and private shopping experiences"
    },
    {
      icon: "⭐",
      title: "Priority Support",
      description: "Dedicated customer service line for quick assistance with all your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Become a VIP Member</h1>
          <p className="text-xl text-gray-600 mb-2">Join our exclusive membership program</p>
          <p className="text-gray-500">Unlock exclusive benefits and rewards designed just for you</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-lg p-8 sm:p-12 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">AMIORE VIP Club</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of members enjoying exclusive perks, early access, and special rewards
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-4xl font-bold mb-2">Free to Join</p>
            <p className="opacity-80">Start earning rewards from your first purchase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600 text-sm">Create your free VIP account in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Shop & Earn</h3>
              <p className="text-gray-600 text-sm">Earn points with every purchase you make</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Redeem Rewards</h3>
              <p className="text-gray-600 text-sm">Use your points for discounts and exclusive items</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Ready to Join?</h2>
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
            <button type="submit" className="btn w-full bg-gray-900 text-white hover:bg-gray-800">
              Become a VIP Member
            </button>
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
