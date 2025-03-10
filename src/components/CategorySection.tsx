
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1227&auto=format&fit=crop',
    count: 128,
  },
  {
    id: 'laptops',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1471&auto=format&fit=crop',
    count: 94,
  },
  {
    id: 'gaming',
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1471&auto=format&fit=crop',
    count: 112,
  },
  {
    id: 'audio',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop',
    count: 86,
  },
  {
    id: 'wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop',
    count: 73,
  },
  {
    id: 'home-tech',
    name: 'Home Tech',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1374&auto=format&fit=crop',
    count: 98,
  },
];

const CategorySection = () => {
  return (
    <section className="container mx-auto py-24">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="text-sm font-medium text-primary mb-2">Browse Categories</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Collections</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the perfect tech for your lifestyle from our carefully curated product categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/category/${category.id}`}
            className="group relative overflow-hidden rounded-xl h-64 transition-all duration-500"
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-foreground/60 z-10"></div>
            <img 
              src={category.image} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
              <div className="bg-background/10 backdrop-blur-sm border border-white/10 rounded-full py-1 px-3 text-xs text-white w-fit">
                {category.count} products
              </div>
              
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                
                <div className="relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-foreground transform transition-transform duration-500 group-hover:translate-y-[-100%]">
                    <ArrowUpRight size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground absolute top-0 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
