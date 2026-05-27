export default function Loans() {
  return (
    <div className="glass p-6 rounded-3xl mt-6">
      <h2 className="text-3xl font-bold mb-6">Loans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-pink-500/20 p-5 rounded-2xl">
          <h3 className="text-xl font-bold">Active Loans</h3>
          <p className="text-3xl mt-2">930</p>
        </div>

        <div className="bg-yellow-500/20 p-5 rounded-2xl">
          <h3 className="text-xl font-bold">Pending Loans</h3>
          <p className="text-3xl mt-2">320</p>
        </div>

        <div className="bg-green-500/20 p-5 rounded-2xl">
          <h3 className="text-xl font-bold">Recovered Loans</h3>
          <p className="text-3xl mt-2">740</p>
        </div>
      </div>
    </div>
  );
}