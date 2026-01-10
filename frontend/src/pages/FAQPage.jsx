import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our collection, select your desired items and sizes, add them to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Cash on Delivery (COD) for select regions."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and chosen shipping method. Standard delivery takes 5-7 business days, express delivery takes 2-3 business days, and overnight delivery arrives the next business day."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this number to track your package in real-time on our website or the carrier's website."
    },
    {
      question: "What is your return policy?",
      answer: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Original packaging and receipt are required."
    },
    {
      question: "How do I exchange an item for a different size?",
      answer: "To exchange an item, simply return your original purchase and place a new order for the size you need. We'll refund your original purchase once we receive the return."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping takes 7-14 business days and starts at $25.00. Duties and taxes may apply depending on your location."
    },
    {
      question: "How do I care for my AMIORE garments?",
      answer: "Care instructions are provided on each product's label. Generally, we recommend following the washing instructions on the tag. Most items should be washed in cold water and hung to dry to maintain their quality."
    },
    {
      question: "What sizes do you offer?",
      answer: "We offer sizes ranging from Small (S) to Extra Extra Large (XXL) for most items. Please refer to our Size Guide for detailed measurements to help you find the perfect fit."
    },
    {
      question: "How can I become a VIP member?",
      answer: "Sign up for our VIP membership program on our website. It's completely free to join and you'll immediately start earning points and receiving exclusive benefits with your first purchase."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mb-12">Find answers to common questions about shopping with AMIORE</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <button className="btn">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
