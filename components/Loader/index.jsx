export default function Loader({ label='Loading...' }) {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="animate-spin h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-700 mr-3" />
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
