export function LandingFooter() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="bg-primary/5 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 via-gray-300 to-[#d52f68] rounded-lg flex items-center justify-center text-white font-bold">
                  T
                </div>
                <span className="font-bold text-text">TaskFlow</span>
              </div>
              <p className="text-text-muted text-sm">Professional task management made simple and intuitive.</p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-text mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href="#features" className="hover:text-text transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-text transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-text transition-colors">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h4 className="font-semibold text-text mb-4">Contact</h4>
              <p className="text-text-muted text-sm">
                For support and inquiries, reach out to our team. We're here to help!
              </p>
            </div>
          </div>
  
          {/* Divider */}
          <div className="bg-gradient-to-t from-[#a03e60ac] via-gray-200 to-gray-100 border-t border-border pt-8">
            <p className="text-center text-text-muted text-sm font-normal">&copy; {currentYear} TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  