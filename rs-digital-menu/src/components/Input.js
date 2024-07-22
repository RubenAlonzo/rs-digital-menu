const Input = ({ label, ...props }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      <input
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        {...props}
      />
    </div>
  );
};

export default Input;