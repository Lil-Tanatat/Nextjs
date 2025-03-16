const categories = [
  { name: "Boy Love", icon: "❤️" },
  { name: "Girl Love", icon: "💖" },
  { name: "Travel", icon: "👜" },
  { name: "Healthy", icon: "💪" },
  { name: "Food & Drink", icon: "🥗" },
  { name: "Comics", icon: "📖" },
];

const books = [
  { title: "พี่ครับผมอยากถอดพุง", image: "book1.png" },
  { title: "ใครๆก็ไปเที่ยวอเมริกา", image: "book2.png" },
  { title: "Eat Smart", image: "book3.png" },
  { title: "วันหนึ่งผมเดินเข้าป่า", image: "book4.png" },
];

export default function BookStore() {
  return (
    <div className="bg-gradient-to-b from-purple-500 to-purple-700 min-h-screen p-4">
      <div className="text-center text-white text-2xl font-bold">
        DEER and BOOK
      </div>
      <div className="mt-4 text-white font-semibold">Categories</div>
      <div className="flex overflow-x-auto gap-3 mt-2 pb-2">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center min-w-[80px]">
            <div className="bg-white rounded-full p-2 text-lg">{cat.icon}</div>
            <span className="text-xs text-white text-center mt-1">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-4">
        <input
          className="rounded-full pl-10 text-black"
          placeholder="Search by name"
        />
        <svg
          className="absolute left-3 top-2 text-gray-500"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {books.map((book, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden">
            <div className="p-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-center text-sm font-semibold">
                {book.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-purple-500 to-purple-700 p-3 flex justify-around">
        <div className="flex flex-col items-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M3 12l18-12v24z" />
          </svg>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M6 6h12v12h-12z" />
          </svg>
          <span className="text-xs">Cart</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M12 12m-6 0a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
          <span className="text-xs">User</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M16 12h-8m4-4v8" />
          </svg>
          <span className="text-xs">Logout</span>
        </div>
      </div>
    </div>
  );
}
