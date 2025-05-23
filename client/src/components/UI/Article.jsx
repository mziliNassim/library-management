import React, { useState } from "react";
import {
  User,
  Tag,
  ChevronRight,
  Trash2,
  Edit,
  Clock,
  Eye,
  BookmarkPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ariclePosterNull from "../../assets/images/blog/ariclePosterNull.jpg";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import axios from "axios";
import { blogApiURL } from "../../services/api";
import { toast } from "sonner";

const Article = ({ post, fetchArticles, categories }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${blogApiURL}/${post?._id}`, {
        headers: {
          Authorization: "Bearer " + user?.token,
          "Content-Type": "application/json",
        },
      });
      toast.success(data?.message || "Article deleted successfully", {
        action: { label: "✖️" },
      });
      fetchArticles();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        action: { label: "✖️" },
      });
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEdit = () => {
    navigate(`/libriTech/blog/edit/${post?._id}`, {
      state: { articleData: post, categories: categories },
    });
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          loading={loading}
          type="Article"
        />
      )}

      <div
        className="relative h-fit bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Category badge - positioned absolutely */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/70 text-purple-800 dark:text-purple-200 backdrop-blur-sm">
            <Tag className="h-3 w-3 mr-1" />
            {post?.category}
          </span>
        </div>

        {/* Admin Actions - floating on hover */}
        {user?.role === "admin" && (
          <div
            className={`absolute right-4 z-20 flex space-x-2 transition-all duration-300 ${
              isHovered ? "opacity-100 top-4" : "opacity-0 -top-10"
            }`}
          >
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 shadow-sm backdrop-blur-sm"
              aria-label="Delete article"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleEdit}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 shadow-sm backdrop-blur-sm"
              aria-label="Edit article"
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Image container with gradient overlay */}
        <div className="relative h-56 overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div> */}

          <img
            src={post?.image || ariclePosterNull}
            alt={post?.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center text-white">
                <User className="h-3.5 w-3.5 mr-1.5 text-white/80" />
                <span className="text-sm font-medium">{post?.author}</span>
              </div>
            </div>
            <div className="flex items-center text-white/80 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(post?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5 flex flex-col justify-between gap-4">
          <div className="h-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {post?.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 text-sm">
              {post?.excerpt}
            </p>
          </div>

          <div className="h-full flex items-end">
            <Link
              to={`/libritech/blog/${post?._id}`}
              className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
            >
              Read Article
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
