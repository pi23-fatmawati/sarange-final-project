const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex h-full items-center justify-center max-w-lg mx-auto font-medium">
        <label className="mx-2">Total Produk:</label>
        <label className="mx-2">Total Koin:</label>
        <button className="mx-2 bg-blue-500 text-white px-4 py-2 rounded">
          Jual
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
