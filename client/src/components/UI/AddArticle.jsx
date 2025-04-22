import React, { useState } from "react";
import { useSelector } from "react-redux";
import { X, Plus, Image as ImageIcon, Trash2 } from "lucide-react";

const AddArticle = ({ categories }) => {
  const { user } = useSelector((state) => state.user);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    author: user?.nom || "",
    category: "",
    readTime: "",
    image: "",
    imageFile: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewArticle({
        ...newArticle,
        imageFile: file,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleClearImage = () => {
    setNewArticle({
      ...newArticle,
      image: "",
      imageFile: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("New article:", newArticle);
    setShowAddForm(false);
    setNewArticle({
      title: "",
      excerpt: "",
      author: user?.nom || "",
      category: "",
      readTime: "",
      image: "",
      imageFile: null,
    });
  };

  return (
    user?.role === "admin" && (
      <div className="fixed bottom-0 right-8 flex flex-col items-end">
        {showAddForm && (
          <div className="">
            <div className="bg-white relative dark:bg-gray-800 rounded-xl px-4 sm:px-6 md:px-8 pb-8 w-[90vw] sm:w-[80vw] md:w-[600px] shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 sm:p-6 md:p-8 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Add New Article
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newArticle.title}
                      onChange={(e) =>
                        setNewArticle({ ...newArticle, title: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      required
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={newArticle.excerpt}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          excerpt: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={newArticle.author}
                      disabled
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newArticle.category}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={newArticle.readTime}
                      onChange={(e) =>
                        setNewArticle({
                          ...newArticle,
                          readTime: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="e.g., 5 min read"
                      required
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <label className="flex-1">
                          <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                            <div className="flex items-center justify-center space-x-2">
                              <ImageIcon className="h-5 w-5" />
                              <span>Choose Image</span>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {newArticle.image && (
                          <button
                            type="button"
                            onClick={handleClearImage}
                            className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      {newArticle.image && (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            src={newArticle.image}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Article Button */}
        <div className="relative group mb-5">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <Plus className="h-6 w-6" />
          </button>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Add New Article
          </div>
        </div>
      </div>
    )
  );
};

export default AddArticle;
