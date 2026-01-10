export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-center text-gray-500 text-sm mb-12">Last updated: January 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AMIORE MENSWEAR ("we," "our," or "us") is committed to protecting your privacy. This 
              Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">Personal Information</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4 mb-4">
              <li>Register for an account</li>
              <li>Make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer service</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              This information may include your name, email address, phone number, shipping address, 
              billing address, payment information, and other details you choose to provide.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-4">Automatically Collected Information</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, 
              including information about your web browser, IP address, time zone, and some of the cookies 
              that are installed on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and shipping updates</li>
              <li>Respond to your customer service requests</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Service providers who perform services on our behalf (payment processors, shipping companies)</li>
              <li>Business partners in connection with services they perform for us</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and 
              store certain information. Cookies are files with a small amount of data which may include 
              an anonymous unique identifier.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
              sent. However, if you do not accept cookies, you may not be able to use some portions of 
              our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify inaccurate or incomplete personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Request transfer of your personal information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 18. We do not knowingly 
              collect personal information from children. If you become aware that a child has provided 
              us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 leading-relaxed">
              Email: privacy@amiore.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Fashion Street, Style District, NY 10001, United States
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
