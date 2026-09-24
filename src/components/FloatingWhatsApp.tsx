import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/923014002475"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      aria-label="Order on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        className="w-5 h-5 fill-current shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 0C5.393 0 0 5.394 0 12.032c0 2.118.552 4.186 1.603 6.01L0 24l6.143-1.613c1.764.962 3.754 1.47 5.888 1.47 6.637 0 12.03-5.394 12.03-12.025C24.061 5.394 18.668 0 12.031 0zm6.98 17.012c-.288.814-1.427 1.492-2.348 1.691-.632.136-1.458.245-4.24-1.047-3.557-1.652-5.85-5.275-6.027-5.512-.178-.237-1.442-1.92-1.442-3.66 0-1.741.91-2.597 1.233-2.953.324-.356.708-.445.945-.445.236 0 .473.003.68.013.218.01.509-.083.796.606.297.712 1.018 2.484 1.107 2.665.09.178.149.387.03.624-.118.238-.178.386-.356.594-.177.208-.375.465-.534.624-.178.178-.365.375-.157.731.207.356.92 1.516 1.975 2.455 1.357 1.208 2.502 1.583 2.858 1.761.356.178.563.149.771-.09.208-.237.89-1.037 1.127-1.393.237-.356.474-.297.791-.178.317.119 2.016.95 2.362 1.128.347.178.574.267.653.405.079.139.079.802-.209 1.616z" />
      </svg>

      <span className="hidden sm:inline font-bold text-xs whitespace-nowrap tracking-wide">
        Order on WhatsApp
      </span>
    </a>
  );
};
