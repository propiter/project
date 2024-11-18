import React from "react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Discovering Medellín: The City of Eternal Spring",
    image:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80",
    excerpt:
      "Explore the vibrant culture, perfect weather, and innovative transformation of Colombia's second-largest city.",
    content: `
      Medellín, known as the City of Eternal Spring, has transformed itself into one of Latin America's most innovative and welcoming cities. With its perfect year-round climate averaging 72°F (22°C), the city offers visitors an ideal environment to explore its many attractions.

      Must-visit locations include: \n
      
      1. Plaza Botero - featuring Fernando Botero's iconic sculptures \n
      2. Parque Arví - an ecological nature preserve accessible by cable car\n
      3. Comuna 13 - famous for its outdoor escalators and street art \n
      4. Jardín Botánico - a peaceful oasis in the heart of the city\n
      5. El Poblado - the city's trendy neighborhood full of restaurants and nightlife\n

      The city's modern metro system, including its innovative cable cars (Metrocable), showcases the city's commitment to sustainable urban development while providing spectacular views of the valley.

      Whether you're interested in cultural experiences, outdoor adventures, or urban exploration, Medellín offers something for everyone. Don't miss the opportunity to experience the warmth of its people, known as 'Paisas,' who are famous for their hospitality and pride in their city.
    `,
  },
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Our Blog</h1>

      <div className="grid gap-12">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h2>
              <div className="prose max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
