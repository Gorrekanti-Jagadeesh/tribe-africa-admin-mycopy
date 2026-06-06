export const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200"
        style={{ borderTopColor: '#FF6600' }}
      />
    </div>
  );
};
