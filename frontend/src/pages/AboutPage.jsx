export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">About AMIORE</h1>
        
        <div className="space-y-8 text-gray-700">
          <section className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              Welcome to AMIORE MENSWEAR, where sophistication meets modern elegance. 
              We are dedicated to crafting premium menswear that embodies timeless style 
              and exceptional quality.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="leading-relaxed">
              Founded with a vision to redefine men's fashion, AMIORE has been at the forefront 
              of creating distinctive clothing that reflects individuality and confidence. 
              Our commitment to excellence drives every collection we design.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              To provide discerning gentlemen with meticulously crafted apparel that seamlessly 
              blends classic elegance with contemporary trends. We believe that great style 
              is an expression of one's personality, and we're here to help you make that statement.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Quality Promise</h2>
            <p className="leading-relaxed">
              Every piece in our collection is thoughtfully designed and crafted using premium 
              materials and attention to detail. We partner with skilled artisans to ensure 
              that each garment meets our exacting standards of quality and durability.
            </p>
          </section>

          <section className="text-center pt-8">
            <p className="text-gray-600 italic">
              "Style is a way to say who you are without having to speak." - AMIORE
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
