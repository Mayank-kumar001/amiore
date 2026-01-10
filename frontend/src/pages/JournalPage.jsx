export default function JournalPage() {
  const journalPosts = [
    {
      id: 1,
      imgSrc: "https://images.unsplash.com/photo-1761839256547-0a1cd11b6dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      title: "Spring Collection 2025: The New Essentials",
      date: "March 15, 2025",
      excerpt: "Discover our latest spring collection featuring versatile pieces that transition seamlessly from day to night.",
      category: "Fashion"
    },
    {
      id: 2,
      title: "The Art of Tailoring: Perfect Fit Guide",
      date: "March 10, 2025",
      excerpt: "Learn how proper tailoring can transform your wardrobe and elevate your personal style.",
      category: "Style Tips"
    },
    {
      id: 3,
      title: "Sustainable Fashion: Our Commitment",
      date: "March 5, 2025",
      excerpt: "Exploring our journey towards more sustainable practices in menswear manufacturing.",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Wardrobe Essentials Every Man Should Own",
      date: "February 28, 2025",
      excerpt: "A curated guide to building a timeless wardrobe that stands the test of time.",
      category: "Style Tips"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">AMIORE Journal</h1>
        <p className="text-center text-gray-600 mb-12">Insights, inspiration, and style stories</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journalPosts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm"></span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                <button className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Stay updated with our latest articles</p>
          <button className="btn btn-outline">Subscribe to Newsletter</button>
        </div>
      </div>
    </div>
  );
}
