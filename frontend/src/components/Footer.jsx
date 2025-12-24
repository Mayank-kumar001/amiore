export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-12 py-5 px-6 border-t border-gray-200">
      <div className="max-w-7xl ">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <a href="/about" className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
              ABOUT
            </a>
            <a
              href="/journal"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              JOURNAL
            </a>
            <a
              href="/contact"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              CONTACT
            </a>
            <a href="/stores" className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
              STORES
            </a>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <a
              href="/size-guides"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              SIZE GUIDES
            </a>
            <a
              href="/delivery"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              DELIVERY
            </a>
            <a
              href="/returns"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              RETURNS
            </a>
            <a href="/vip" className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
              BECOME A VIP
            </a>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <a href="/faq" className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
              FAQ'S
            </a>
            <a
              href="/careers"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              CAREERS
            </a>
            <a href="/terms" className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors">
              TERMS AND CONDITIONS
            </a>
            <a
              href="/privacy"
              className="block text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              PRIVACY POLICY
            </a>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <span className="block text-xs font-medium text-gray-900">FOLLOW US</span>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807s.105-.595.315-.807c.21-.21.49-.315.807-.315s.595.105.807.315c.21.21.315.49.315.807s-.105.595-.315.807c-.21.193-.49.315-.807.315z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with logo and copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            {/* Logo placeholder - replace with actual logo */}
            <div className="relative top-5 w-16 h-16 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs w-full h-full"><img src="https://res.cloudinary.com/dinmal6os/image/upload/v1758807332/image_la5ywz.png" alt="" /></span>
            </div>
            <div className="text-xs text-gray-600">
              <p>© AMIORE MENSWEAR 2025. ALL RIGHTS RESERVED.</p>
              <a
                href="https://calibre.com.au/pages/contact"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                https://amiore.com/
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}