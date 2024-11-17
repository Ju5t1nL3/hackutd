// app/components/SocialButton.js
export function SocialButton({ icon, children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-gray-50 mb-3 hover:text-gray-900"
      >
        {icon}
        <span>{children}</span>
      </button>
    );
  }