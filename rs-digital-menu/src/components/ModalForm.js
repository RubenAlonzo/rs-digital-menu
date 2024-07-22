const ModalForm = ({ isOpen, onClose, onSave, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full py-2 m-3">
          <div className="bg-white m-2">
            <h2 className="text-lg font-medium text-gray-900 m-4">Formulario</h2>
            {children}
          </div>
          <div className="my-4 px-4 py-3 sm:px-6 flex justify-end">
            <button onClick={onClose} className="mx-3 px-5 py-1 bg-gray-400 text-white font-semibold rounded-full">Cancelar</button>
            <button onClick={onSave} className="px-5 py-1 bg-lime-500 text-white font-semibold rounded-full">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;