"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SubStack() {
  const [articles, setArticles] = useState([]);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Factiveie.substack.com%2Ffeed"
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "ok") {
          setFeed(data.feed);
          setArticles(data.items);
        } else {
          console.error("Invalid response status:", data.status);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <motion.div
      className="max-w-4xl mx-auto py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {feed && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{feed.title}</h1>
          <p className="text-gray-600 mb-4">{feed.description}</p>
          <img
            src={feed.image}
            alt={feed.title}
            className="w-32 h-32 rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.guid}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(article.pubDate).toLocaleDateString()}</span>
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
