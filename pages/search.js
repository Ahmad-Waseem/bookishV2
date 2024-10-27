import SearchBar from "@/components/Searchbar";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search Page</h1>
      <SearchBar />
    </div>
  );
}