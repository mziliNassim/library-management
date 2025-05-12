import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "LibriTech - FAQ";
  }, []);

  // FAQ categories
  const categories = [
    { id: "all", name: "All" },
    { id: "account", name: "Account & Settings" },
    { id: "books", name: "Books & Reading" },
    { id: "subscription", name: "Subscription" },
    { id: "technical", name: "Technical" },
    { id: "privacy", name: "Privacy & Security" },
  ];

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "How do I create an account on LibriTech?",
      answer:
        "Creating an account is simple. Click on the 'Sign Up' button in the top right corner of our homepage. You'll need to provide your email address, create a password, and fill in some basic information. After verifying your email address, you'll have full access to your LibriTech account.",
      category: "Account & Settings",
    },
    {
      id: 2,
      question: "Can I read books offline?",
      answer:
        "Yes! LibriTech allows you to download books for offline reading. Simply find the book you want to read offline, click the download icon, and it will be available in your 'Downloads' section. You can access these books anytime without an internet connection through our mobile or desktop apps.",
      category: "Books & Reading",
    },
    {
      id: 3,
      question: "What subscription plans do you offer?",
      answer:
        "LibriTech offers three subscription tiers:\n\n1. Basic (Free): Access to our catalog with limited downloads and basic features.\n2. Standard ($9.99/month): Unlimited downloads, no ads, and access to exclusive content.\n3. Premium ($14.99/month): All Standard features plus early access to new releases, personalized recommendations, and virtual reading groups.",
      category: "Subscription",
    },
    {
      id: 4,
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Login' button, then select 'Forgot Password?' Enter the email address associated with your LibriTech account, and we'll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, the link will expire after 24 hours.",
      category: "Account & Settings",
    },
    {
      id: 5,
      question: "Can I share my account with family members?",
      answer:
        "Standard and Premium subscribers can create up to 5 profiles under one account with our Family Sharing feature. Each profile maintains its own reading history, bookmarks, and preferences. To enable Family Sharing, go to 'Account Settings' > 'Family Sharing' and follow the prompts to add family members.",
      category: "Account & Settings",
    },
    {
      id: 6,
      question: "How do I track my reading progress?",
      answer:
        "LibriTech automatically tracks your reading progress across all your devices. You can view detailed statistics including pages read, reading time, and completion rates in the 'My Progress' section. You can also set reading goals, earn achievements, and share milestones with friends.",
      category: "Books & Reading",
    },
    {
      id: 7,
      question: "Is my reading data private?",
      answer:
        "We take your privacy seriously. Your reading habits, book selections, and personal information are never shared with third parties without your explicit consent. You can review and adjust your privacy settings at any time in the 'Privacy & Security' section of your account settings.",
      category: "Privacy & Security",
    },
    {
      id: 8,
      question: "What devices are compatible with LibriTech?",
      answer:
        "LibriTech is available on iOS and Android mobile devices, as well as web browsers on desktop computers. We also offer dedicated apps for Kindle Fire, Windows, and macOS. Your reading progress and library sync automatically across all your devices when connected to the internet.",
      category: "Technical",
    },
    {
      id: 9,
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to 'Account Settings' > 'Subscription' and click on 'Cancel Subscription'. You'll continue to have access to your premium benefits until the end of your current billing period. You can reactivate your subscription at any time.",
      category: "Subscription",
    },
    {
      id: 10,
      question: "Can I highlight and take notes while reading?",
      answer:
        "Yes! LibriTech offers robust annotation features. While reading, simply select text to highlight it or add notes. All your annotations are saved to your account and can be accessed in the 'Notes & Highlights' section. You can also export your notes as text files or PDFs for external use.",
      category: "Books & Reading",
    },
    {
      id: 11,
      question: "How do I report technical issues?",
      answer:
        "If you encounter any technical problems, go to 'Help & Support' > 'Report an Issue'. Provide as much detail as possible about the problem, including screenshots if available. Our technical team will investigate and respond within 24-48 hours. For urgent issues, you can also contact us through live chat available on our website.",
      category: "Technical",
    },
    {
      id: 12,
      question: "How are my payment details secured?",
      answer:
        "LibriTech uses industry-standard encryption to protect your payment information. We never store complete credit card details on our servers. All payment processing is handled by trusted third-party payment processors that comply with PCI DSS standards. You can manage your payment methods in the 'Billing' section of your account.",
      category: "Privacy & Security",
    },
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Find answers to common questions about LibriTech's features,
              accounts, and services
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white/90 backdrop-blur-sm text-gray-800"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.name
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 pb-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <HelpCircle className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any FAQs matching your search. Please try
                different keywords or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Still need help section */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Still Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Live Chat
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Chat with our support team in real-time
              </p>
              <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Start Chat
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Email Support
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Send us an email and we'll respond within 24 hours
              </p>
              <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Contact Us
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Help Center
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse our detailed guides and tutorials
              </p>
              <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
