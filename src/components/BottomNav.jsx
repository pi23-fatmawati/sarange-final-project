const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-28 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex h-full items-center justify-between max-w-lg-xl mx-auto font-medium">
        <label className="ml-8">Total Produk:</label>
        <label className="">Total Koin:</label>
        <button
          className=" text-white px-4 py-2 rounded mr-8"
          style={{
            backgroundColor: "#52C41A",
          }}
        >
          Atur Jadwal
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
