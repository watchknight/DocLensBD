import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, frameShapes, frameColors } from '../data/products';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
  const [selectedShape, setSelectedShape] = useState(searchParams.get('frameShape') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('frameType') || '');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Sync filter state when URL params change (e.g. from mega menu navigation)
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const gen = searchParams.get('gender') || '';
    const shape = searchParams.get('frameShape') || '';
    const type = searchParams.get('frameType') || '';
    setSelectedCategory(cat);
    setSelectedGender(gen);
    setSelectedShape(shape);
    setSelectedType(type);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedGender) filtered = filtered.filter(p => p.gender === selectedGender);
    if (selectedShape) filtered = filtered.filter(p => p.frameShape === selectedShape);
    if (selectedType) filtered = filtered.filter(p => p.frameType === selectedType);
    if (selectedColor) filtered = filtered.filter(p => p.color.toLowerCase().includes(selectedColor.toLowerCase()));
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    const search = searchParams.get('search');
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: filtered.sort((a, b) => b.reviews - a.reviews); break;
    }
    return filtered;
  }, [selectedCategory, selectedGender, selectedShape, selectedType, selectedColor, priceRange, sortBy, searchParams]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedShape('');
    setSelectedType('');
    setSelectedColor('');
    setPriceRange([0, 10000]);
  };

  const activeFilterCount = [selectedCategory, selectedGender, selectedShape, selectedType, selectedColor]
    .filter(Boolean).length + (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);

  const getCategoryLabel = (cat: string) => {
    if (!cat) return 'All';
    return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-[129px] z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[#000042] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#000060] transition-colors text-sm">
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#00BAC6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-sm text-[#00BAC6] hover:underline">Clear all</button>
              )}
              <span className="text-sm text-gray-500">{filteredProducts.length} products found</span>
            </div>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#000042]">
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#000042] text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                  aria-label="Grid view">
                  <Grid size={18} />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#000042] text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                  aria-label="List view">
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-5 sticky top-[200px] space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                {/* Category */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Category</h3>
                  {['', 'eyeglasses', 'sunglasses', 'computer-glasses', 'kids', 'reading'].map(cat => (
                    <label key={cat || 'all'} className="flex items-center gap-2 py-1 cursor-pointer text-sm">
                      <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)}
                        className="accent-[#000042]" />
                      <span className={selectedCategory === cat ? 'text-[#000042] font-semibold' : 'text-gray-600'}>
                        {getCategoryLabel(cat)}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Gender */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Gender</h3>
                  {['', 'men', 'women', 'unisex', 'kids'].map(g => (
                    <label key={g || 'all'} className="flex items-center gap-2 py-1 cursor-pointer text-sm">
                      <input type="radio" name="gender" checked={selectedGender === g} onChange={() => setSelectedGender(g)}
                        className="accent-[#000042]" />
                      <span className={selectedGender === g ? 'text-[#000042] font-semibold' : 'text-gray-600'}>
                        {g ? g.charAt(0).toUpperCase() + g.slice(1) : 'All'}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Frame Shape */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Frame Shape</h3>
                  <div className="flex flex-wrap gap-2">
                    {frameShapes.map(shape => (
                      <button key={shape.id} onClick={() => setSelectedShape(selectedShape === shape.id ? '' : shape.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedShape === shape.id ? 'bg-[#000042] text-white border-[#000042]' : 'border-gray-200 text-gray-600 hover:border-[#000042]'}`}>
                        {shape.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frame Type */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Frame Type</h3>
                  {['', 'full-rim', 'half-rim', 'rimless'].map(t => (
                    <label key={t || 'all'} className="flex items-center gap-2 py-1 cursor-pointer text-sm">
                      <input type="radio" name="frameType" checked={selectedType === t} onChange={() => setSelectedType(t)}
                        className="accent-[#000042]" />
                      <span className={selectedType === t ? 'text-[#000042] font-semibold' : 'text-gray-600'}>
                        {getCategoryLabel(t)}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Color */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {frameColors.slice(0, 8).map(c => (
                      <button key={c} onClick={() => setSelectedColor(selectedColor === c ? '' : c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedColor === c ? 'bg-[#000042] text-white border-[#000042]' : 'border-gray-200 text-gray-600 hover:border-[#000042]'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-bold text-[#000042] text-sm uppercase tracking-wider mb-3">Price Range</h3>
                  <input type="range" min="0" max="10000" step="500" value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#000042]" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>৳0</span><span>৳{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-bold text-[#000042] mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="bg-[#00BAC6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00a8b3] transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
