export default function Analytics() {
  return (
    <div className="bg-white border border-gray-200 shadow-md p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        Recovery Analytics
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-gray-900">Recovered</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-400 h-4 rounded-full w-[74%]"></div>
          </div>
        </div>

        <div>
          <p className="text-gray-900">Pending</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-yellow-400 h-4 rounded-full w-[26%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}