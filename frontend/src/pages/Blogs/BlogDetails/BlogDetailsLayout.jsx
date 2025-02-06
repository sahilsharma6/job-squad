import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { blog_posts } from '../blog-data';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogDetailsLayout = () => {
  const { id } = useParams();

  console.log(id);
  
  
  // Convert id to number for comparison
  const postId = Number(id);
  
  // Find the specific blog post
  const post = blog_posts.find(post => post.id === postId);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Blog Post Not Found</h1>
        <Link to="/blogs" className="block text-center mt-4">
          <Button variant="outline">
            <ChevronLeft className="mr-2" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blogs" className="mb-6 block">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2" /> Back to Blog
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="space-y-4">
            <span className="text-blue-ultra font-bold text-sm">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full"
                />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.timeToRead}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-96 object-cover mb-6 rounded-lg"
          />
          
          {/* Placeholder content since original data lacks full text */}
          <div className="prose lg:prose-xl">
            <p>Stay tuned for the full article about "{post.title}".</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetailsLayout;