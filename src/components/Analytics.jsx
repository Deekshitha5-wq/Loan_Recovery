export default function Analytics() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">
        Recovery Analytics
      </h1>

      <div className="space-y-4">
        <div>
          <p>Recovered</p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-green-400 h-4 rounded-full w-[74%]"></div>
          </div>
        </div>

        <div>
          <p>Pending</p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-pink-400 h-4 rounded-full w-[26%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}