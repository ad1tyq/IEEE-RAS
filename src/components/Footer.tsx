import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800/50 bg-black/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side - Organization Branding */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Footer Logo */}
            <Image
              src="/images/logos/logo.png"
              alt="IEEE RAS Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            {/* Organization Details */}
            <div>
              <h3 className="font-semibold text-white">IEEE RAS MUJ</h3>
              <p className="text-gray-400 text-sm">Robotics & Automation Society</p>
            </div>
          </div>

          {/* Right Side - Copyright Information */}
          <div className="text-center md:text-right">
            <div className="text-gray-400 text-sm md:text-right">
              © 2026 IEEE RAS Manipal University Jaipur. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
