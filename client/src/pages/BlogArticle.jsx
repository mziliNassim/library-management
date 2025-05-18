import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  User,
  Clock,
  ArrowLeft,
  Eye,
  BookmarkPlus,
  Share2,
  Tag,
  Loader2,
} from "lucide-react";
import { blogApiURL } from "../services/api";
import ariclePosterNull from "../assets/images/blog/ariclePosterNull.jpg";

const BlogArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${blogApiURL}/${id}`);
        setArticle(data.data);
        console.log(" fetchArticle ~ data.data:", data.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error?.response?.data?.message || "Failed to load article");
        toast.error("Failed to load article", {
          action: { label: "✖️" },
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/libritech/blog"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      <Toaster position="top-center" />

      {/* Back navigation */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link
          to="/libritech/blog"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <header className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/70 text-purple-800 dark:text-purple-200">
            <Tag className="h-3 w-3 mr-1" />
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {article.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(article.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2"></div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
          <img
            src={article.image || ariclePosterNull}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-4">
        {/* If excerpt exists, show it as a lead paragraph */}
        {article.excerpt && (
          <div className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-300 italic border-l-4 border-purple-500 pl-4">
            {article.excerpt}
          </div>
        )}

        {/* Main content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300" />
      </article>
    </div>
  );
};

export default BlogArticle;
