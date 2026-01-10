export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Terms and Conditions</h1>
        <p className="text-center text-gray-500 text-sm mb-12">Last updated: January 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on AMIORE's 
              website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All orders are subject to product availability and acceptance by AMIORE. We reserve 
              the right to refuse or cancel any order for any reason, including but not limited to 
              product availability, errors in the description or price of the product, or error in 
              your order.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Prices for our products are subject to change without notice. We reserve the right 
              to modify prices at any time. Payment must be received by us before we accept an order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We will arrange for shipment of the products to you. Shipping terms are detailed in 
              our Delivery Information page. We are not responsible for delays caused by carriers 
              or customs clearance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our return policy is detailed in our Returns & Exchanges page. To be eligible for a 
              return, items must be unworn, unwashed, and in original condition with tags attached. 
              Refunds will be processed within 5-7 business days after we receive your return.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content included on this site, such as text, graphics, logos, images, and software, 
              is the property of AMIORE or its content suppliers and protected by international 
              copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In no event shall AMIORE or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on AMIORE's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Revisions and Errata</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The materials appearing on AMIORE's website could include technical, typographical, or 
              photographic errors. AMIORE does not warrant that any of the materials on its website 
              are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Any claim relating to AMIORE's website shall be governed by the laws of the State of 
              New York without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="text-gray-600 leading-relaxed">
              Email: legal@amiore.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Fashion Street, Style District, NY 10001, United States
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
