import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";
import { blogApiURL } from "../services/api";
import { toast } from "sonner";
import { encodeToBase64 } from "../utils/Base64";
import { useSelector } from "react-redux";

const EditArticle = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const initialArticleData = location.state?.articleData || {
    title: "",
    excerpt: "",
    image: "",
    category: "",
    author: "",
  };

  const [article, setArticle] = useState(initialArticleData);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Authentification Required as 'admin'
  useEffect(() => {
    document.title = "LibriTech - Edit Article";

    if (!user || user.role !== "admin") window.location.href = "/";
  }, [user]);

  // Categories - replace with your actual categories or fetch from API
  const categories = location.state?.categories;

  useEffect(() => {
    if (!location.state?.articleData && id) {
      fetchArticle();
    }
  }, [id, location.state]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blogApiURL}/${id}`, {
        headers: {
          Authorization: "Bearer " + user?.token,
          "Content-Type": "application/json",
        },
      });
      setArticle(data.data);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error(error?.response?.data?.message || "Failed to load article", {
        action: { label: "✖️" },
      });
      navigate("/libritech/blog");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const fileBase64 = await encodeToBase64(file);
    setArticle({ ...article, image: fileBase64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !article?.title ||
      !article?.excerpt ||
      !article?.image ||
      !article?.category ||
      !article?.author
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await axios.put(`${blogApiURL}/${id}`, article, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success(data?.message || "Article updated successfully");
      navigate("/libritech/blog");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update article");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Article
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Article Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured Image
          </label>
          <div className="mt-1 flex flex-col items-center">
            {article?.image ? (
              <div className="relative w-full h-64 mb-4">
                <img
                  src={article?.image}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setArticle((prev) => ({ ...prev, image: "" }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-64 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No image selected
                  </p>
                </div>
              </div>
            )}
            <label
              htmlFor="image-upload"
              className="mt-2 cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              {article?.image ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={article?.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={article?.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={article?.author}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Excerpt (Short Summary)
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows="10"
            value={article?.excerpt}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
