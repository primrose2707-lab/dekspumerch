import React, { useState } from 'react';
import { 
  Search, ShoppingBag, PlusCircle, User, ShieldCheck, 
  MapPin, Star, Filter, Heart, ChevronRight, MessageSquare, 
  Instagram, Phone, Share2, Tag, CheckCircle2, ArrowLeft, Image as ImageIcon, Sparkles,
  Lock, Trash2, Check, X, ShieldAlert, LogOut
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: '🌸' },
  { id: 'fashion', name: 'เสื้อผ้า & แฟชั่น', icon: '🎀' },
  { id: 'food', name: 'ขนม & อาหาร', icon: '🍰' },
  { id: 'handmade', name: 'งานแฮนด์เมด', icon: '🎨' },
  { id: 'secondhand', name: 'หนังสือ & มือสอง', icon: '📚' },
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'คุกกี้โฮมเมดเนยสดแท้ Soft-baked (กล่อง 6 ชิ้น)',
    price: 120,
    category: 'food',
    condition: 'สินค้าใหม่',
    location: 'หน้าคณะวิศวะ / หอพักชาย 1',
    university: 'มหาวิทยาลัยเกษตรศาสตร์',
    rating: 4.9,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    description: 'คุกกี้เนยสดทำเองสดใหม่ทุกวัน ใช้เนยแท้ 100% ไม่ใส่สารกันบูด ช็อกโกแลตชิพแน่นๆ อบเช้าส่งบ่าย นัดรับใต้ตึกเรียนหรือส่งพัสดุก็ได้ค่ะ!',
    seller: {
      name: 'น้องมายด์ (บัญชี ปี 3)',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      lineId: '@mind_bakery',
      instagram: 'mind.homemade',
      phone: '081-234-5678',
      rating: 4.9,
      joined: 'ม.ค. 2024'
    },
    reviews: [
      { id: 1, user: 'กิตติพงษ์', comment: 'อร่อยมากครับ หวานกำลังดี นัดรับตรงเวลาด้วย', rating: 5, date: '2 วันที่แล้ว' },
      { id: 2, user: 'Pang_Pang', comment: 'คุกกี้นุ่มช็อกชิพเยอะมากกกก อุดหนุนอีกแน่นอนค่า', rating: 5, date: '1 สัปดาห์ที่แล้ว' }
    ]
  },
  {
    id: 2,
    title: 'เสื้อเชิ้ตโอเวอร์ไซส์สไตล์เกาหลี สภาพ 95%',
    price: 180,
    category: 'fashion',
    condition: 'มือสองสภาพดี',
    location: 'โรงอาหารกลาง / ประตู 1',
    university: 'จุฬาลงกรณ์มหาวิทยาลัย',
    rating: 4.7,
    reviewsCount: 6,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    description: 'ใส่ไปเรียนแค่ 2 ครั้ง ผ้าคอตตอนใส่นุ่มสบายมากๆ ไม่ร้อน อก 44 นิ้ว ยาว 28 นิ้ว ส่งต่อเพราะซื้อมาผิดไซส์ครับ',
    seller: {
      name: 'พัชร (สถาปัตย์ ปี 4)',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      lineId: 'pat_arch',
      instagram: 'pat.closet',
      phone: '089-876-5432',
      rating: 4.8,
      joined: 'ก.ย. 2023'
    },
    reviews: [
      { id: 1, user: 'มุกกี้', comment: 'เสื้อใหม่มากตรงปกค่ะ แม่ค้าตอบไว', rating: 5, date: '3 วันที่แล้ว' }
    ]
  },
  {
    id: 3,
    title: 'พวงกุญแจไหมพรมถักน้องแมว Handcrafted 100%',
    price: 89,
    category: 'handmade',
    condition: 'สินค้าใหม่',
    location: 'ลานเกียร์ / หอใน',
    university: 'มหาวิทยาลัยธรรมศาสตร์',
    rating: 5.0,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=600',
    description: 'พวงกุญแจไหมพรมถักมือ น่ารักมากๆ สั่งทำเลือกสีได้ตามชอบ ใช้เวลาถัก 1-2 วัน นัดรับใน ม. หรือจัดส่งลงทะเบียน 30 บาทค่ะ',
    seller: {
      name: 'พลอย (ศิลปกรรม ปี 2)',
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      lineId: 'ploy_crochet',
      instagram: 'ploy.crafts',
      phone: '082-111-2233',
      rating: 5.0,
      joined: 'ก.พ. 2024'
    },
    reviews: [
      { id: 1, user: 'นัดดา', comment: 'งานประณีตน่ารักมากกก ห้อยกระเป๋าแล้วมีแต่คนทักค่ะ', rating: 5, date: 'เมื่อวานนี้' }
    ]
  },
  {
    id: 4,
    title: 'หนังสือสรุปการตลาด Principles of Marketing (มีรอยไฮไลท์เล็กน้อย)',
    price: 150,
    category: 'secondhand',
    condition: 'มือสองสภาพดี',
    location: 'ใต้ตึกคณะบริหาร / สำนักหอสมุด',
    university: 'มหาวิทยาลัยมศว',
    rating: 4.5,
    reviewsCount: 4,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    description: 'หนังสือเรียนวิชาการตลาดพื้นฐาน สภาพดีมาก 85%+ มีสรุปสาระสำคัญไฮไลท์ไว้แล้ว อ่านเข้าใจง่าย เอาไปอ่านสอบ A แน่นอน!',
    seller: {
      name: 'พี่เบนช์ (บริหาร ปี 4)',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      lineId: 'bench_biz',
      instagram: 'bench.mkt',
      phone: '085-444-5566',
      rating: 4.6,
      joined: 'ต.ค. 2023'
    },
    reviews: [
      { id: 1, user: 'Jun', comment: 'สรุปอ่านง่าย ช่วยชีวิตตอนไฟนอลได้เยอะเลยครับ', rating: 5, date: '2 สัปดาห์ที่แล้ว' }
    ]
  }
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home'); // home, detail, post, seller, admin, adminLogin
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Admin Authentication State
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Form State for New Post
  const [newPost, setNewPost] = useState({
    title: '',
    price: '',
    category: 'fashion',
    condition: 'สินค้าใหม่',
    location: '',
    university: 'มหาวิทยาลัยเกษตรศาสตร์',
    description: '',
    sellerName: '',
    lineId: '',
    instagram: '',
    image: ''
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.university.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
    setCurrentView('seller');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === '123456') {
      setIsAdminLoggedIn(true);
      setAdminError('');
      setAdminPassword('');
      setCurrentView('admin');
    } else {
      setAdminError('รหัสผ่านไม่ถูกต้อง! (ลองใช้รหัส: 123456)');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('home');
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleToggleVerifySeller = (productId) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          seller: {
            ...p.seller,
            isVerified: !p.seller.isVerified
          }
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.price || !newPost.sellerName) {
      alert('กรุณากรอกข้อมูลสำคัญให้ครบถ้วน');
      return;
    }

    const createdProduct = {
      id: Date.now(),
      title: newPost.title,
      price: Number(newPost.price),
      category: newPost.category,
      condition: newPost.condition,
      location: newPost.location || 'นัดรับในมหาวิทยาลัย',
      university: newPost.university,
      rating: 5.0,
      reviewsCount: 0,
      image: newPost.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      description: newPost.description,
      seller: {
        name: `${newPost.sellerName}`,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        lineId: newPost.lineId || '-',
        instagram: newPost.instagram || '-',
        phone: '08X-XXX-XXXX',
        rating: 5.0,
        joined: 'เพิ่งเริ่มขาย'
      },
      reviews: []
    };

    setProducts([createdProduct, ...products]);
    alert('🎉 ประกาศขายสินค้าของคุณบน dekspumerch สำเร็จแล้ว!');
    setCurrentView('home');
    setNewPost({
      title: '', price: '', category: 'fashion', condition: 'สินค้าใหม่',
      location: '', university: 'มหาวิทยาลัยเกษตรศาสตร์', description: '',
      sellerName: '', lineId: '', instagram: '', image: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#2C2C2C] font-sans antialiased selection:bg-[#FFB6C1] selection:text-white">
      {/* --- HEADER BAR --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#FFE4E8] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
              🎀
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#FF69B4] font-serif">
                dekspu<span className="text-[#FF1493]">merch</span>
              </span>
              <span className="block text-[10px] text-[#FF8DA1] -mt-1 font-medium">ตลาดนัดเด็กมหาลัยน่ารักๆ</span>
            </div>
          </div>

          {/* Quick Navigation / Action */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('post')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF69B4] hover:bg-[#FF1493] text-white font-medium text-sm shadow-md shadow-[#FFD1DC] transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ลงขายสินค้า</span>
            </button>

            {isAdminLoggedIn ? (
              <button 
                onClick={() => setCurrentView('admin')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFF0F5] text-[#FF1493] font-semibold text-xs border border-[#FFD1DC] hover:bg-[#FFE4E8] transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>แผงควบคุมแอดมิน</span>
              </button>
            ) : (
              <button 
                onClick={() => setCurrentView('adminLogin')}
                className="p-2 rounded-full bg-[#FFF0F5] text-[#FF69B4] hover:bg-[#FFE4E8] transition-colors"
                title="เข้าสู่ระบบผู้ดูแลระบบ (Admin)"
              >
                <Lock className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT ROUTING --- */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* ==================== VIEW 1: HOME PAGE ==================== */}
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-[#FFF0F5] via-[#FFE4E8] to-[#FFD1DC] rounded-3xl p-6 md:p-10 shadow-sm border border-[#FFE4E8] relative overflow-hidden">
              <div className="max-w-xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#FF1493] text-xs font-semibold backdrop-blur-sm border border-[#FFD1DC]">
                  <Sparkles className="w-3.5 h-3.5" /> ตลาดนัดสุดคิวท์สำหรับเด็กมหาลัย
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-[#4A2E35] leading-tight">
                  dekspu<span className="text-[#FF69B4]">merch</span> <br />
                  <span className="text-[#FF1493]">พื้นที่ปล่อยของ ช็อปน่ารัก ราคามิตรภาพ</span>
                </h1>
                <p className="text-sm md:text-base text-[#7A525D]">
                  รวมสารพัดของน่ารัก ขนมทำเอง เสื้อผ้ามือสองสุดเก๋ และงานแฮนด์เมด นัดรับใน ม. ได้ง่ายๆ ปลอดภัย ไร้ค่าธรรมเนียม 💕
                </p>
              </div>
              <div className="hidden md:block absolute -right-6 -bottom-10 opacity-30 text-[180px] pointer-events-none select-none">
                🎀
              </div>
            </section>

            {/* Search & Filter Bar */}
            <section className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8DA1]" />
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้าคิวท์ๆ, พิกัดนัดรับ, หรือชื่อ มหาลัย..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#FFE4E8] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40 text-sm shadow-sm transition-all placeholder-[#FFB6C1]"
                  />
                </div>
              </div>

              {/* Categories Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
                      selectedCategory === cat.id
                        ? 'bg-[#FF69B4] text-white border-[#FF69B4] shadow-sm scale-[1.02]'
                        : 'bg-white text-[#7A525D] border-[#FFE4E8] hover:bg-[#FFF0F5]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Product Listing Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#4A2E35] flex items-center gap-2">
                  <span>🛍️ สินค้าแนะนำล่าสุด</span>
                  <span className="text-xs font-normal text-[#FF8DA1]">({filteredProducts.length} รายการ)</span>
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#FFE4E8] space-y-3">
                  <div className="text-4xl">🌸</div>
                  <h3 className="text-base font-bold text-[#4A2E35]">ไม่พบสินค้าที่คุณกำลังตามหา</h3>
                  <p className="text-xs text-[#A0707E]">ลองเปลี่ยนคำค้นหา หรือเลือกดูหมวดหมู่อื่นดูนะครับ</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="group bg-white rounded-2xl border border-[#FFE4E8] overflow-hidden hover:shadow-md hover:border-[#FFB6C1] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-[#FFF0F5]">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#FF1493] shadow-sm border border-[#FFE4E8]">
                            {product.condition}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert('บันทึกในรายการโปรดแล้ว'); }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#FF8DA1] hover:text-[#FF1493] transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold text-[#2C2C2C] text-sm line-clamp-2 group-hover:text-[#FF69B4] transition-colors">
                            {product.title}
                          </h3>
                          
                          <div className="text-lg font-bold text-[#FF1493]">
                            ฿{product.price.toLocaleString()}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-[#8C6B75] pt-1 border-t border-[#FFF0F5]">
                            <MapPin className="w-3.5 h-3.5 text-[#FF69B4] shrink-0" />
                            <span className="truncate">{product.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Seller Badge */}
                      <div className="px-4 py-2.5 bg-[#FFF0F5]/50 border-t border-[#FFE4E8] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-medium text-[#4A2E35] truncate">{product.seller.name}</span>
                          {product.seller.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-[#FF1493] shrink-0" title="นักศึกษายืนยันตัวตนแล้ว" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[#FFB300] shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-medium text-[#4A2E35]">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ==================== VIEW 2: PRODUCT DETAIL ==================== */}
        {currentView === 'detail' && selectedProduct && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#FFE4E8] text-xs font-medium text-[#7A525D] hover:bg-[#FFF0F5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> กลับหน้าแรก
            </button>

            <div className="bg-white rounded-3xl border border-[#FFE4E8] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Product Image */}
              <div className="space-y-3">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFF0F5] border border-[#FFE4E8]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF1493] text-xs font-semibold border border-[#FFE4E8]">
                      {selectedProduct.condition}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFE4E8] text-[#FF69B4] text-xs font-semibold">
                      {CATEGORIES.find(c => c.id === selectedProduct.category)?.name}
                    </span>
                  </div>

                  <h1 className="text-xl md:text-2xl font-bold text-[#2C2C2C] leading-snug">
                    {selectedProduct.title}
                  </h1>

                  <div className="text-3xl font-extrabold text-[#FF1493]">
                    ฿{selectedProduct.price.toLocaleString()}
                  </div>

                  {/* Location & Uni Card */}
                  <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#FFE4E8] space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-[#4A2E35] font-medium">
                      <MapPin className="w-4 h-4 text-[#FF69B4]" />
                      <span>พิกัดนัดรับ: {selectedProduct.location}</span>
                    </div>
                    <div className="text-[#8C6B75] pl-6">
                      มหาวิทยาลัย: {selectedProduct.university}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#FF8DA1] uppercase tracking-wider">รายละเอียดสินค้า</h3>
                    <p className="text-sm text-[#4A2E35] leading-relaxed whitespace-pre-line">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                {/* Seller Box & Contact CTA */}
                <div className="space-y-4 pt-4 border-t border-[#FFE4E8]">
                  <div 
                    onClick={() => handleSellerClick(selectedProduct.seller)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF0F5] hover:bg-[#FFE4E8] transition-colors cursor-pointer border border-[#FFE4E8]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedProduct.seller.avatar}
                        alt={selectedProduct.seller.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm text-[#4A2E35]">{selectedProduct.seller.name}</span>
                          {selectedProduct.seller.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-[#FF1493]" title="นักศึกษายืนยันตัวตนแล้ว" />
                          )}
                        </div>
                        <div className="text-xs text-[#8C6B75] flex items-center gap-2">
                          <span>★ {selectedProduct.seller.rating}</span>
                          <span>•</span>
                          <span>เข้าร่วม {selectedProduct.seller.joined}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#FF8DA1]" />
                  </div>

                  {/* Contact Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://line.me/ti/p/~${selectedProduct.seller.lineId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-medium text-sm shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>ทัก Line ID</span>
                    </a>
                    <a
                      href={`https://instagram.com/${selectedProduct.seller.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-medium text-sm shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>ทัก IG Direct</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW 3: POST NEW ITEM ==================== */}
        {currentView === 'post' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#FFE4E8] text-xs font-medium text-[#7A525D] hover:bg-[#FFF0F5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> ยกเลิก
            </button>

            <div className="bg-white rounded-3xl border border-[#FFE4E8] p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h1 className="text-xl font-bold text-[#4A2E35]">🎀 ลงขายสินค้าใหม่บน dekspumerch</h1>
                <p className="text-xs text-[#8C6B75]">กรอกรายละเอียดสินค้าของคุณเพื่อเริ่มโปรโมตให้เพื่อนๆ ได้เห็นกันเลย!</p>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 text-sm">
                {/* Title */}
                <div className="space-y-1">
                  <label className="font-medium text-[#4A2E35] text-xs">ชื่อสินค้า *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุกกี้เนยสดน่ารักๆ, เสื้อเชิ้ตโอเวอร์ไซส์..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-[#4A2E35] text-xs">ราคา (บาท) *</label>
                    <input
                      type="number"
                      required
                      placeholder="เช่น 150"
                      value={newPost.price}
                      onChange={(e) => setNewPost({...newPost, price: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-[#4A2E35] text-xs">หมวดหมู่สินค้า *</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Condition & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-[#4A2E35] text-xs">สภาพสินค้า</label>
                    <select
                      value={newPost.condition}
                      onChange={(e) => setNewPost({...newPost, condition: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                    >
                      <option value="สินค้าใหม่">สินค้าใหม่ (Handmade/ของกิน)</option>
                      <option value="มือสองสภาพดี">มือสองสภาพดี (90%+)</option>
                      <option value="มือสองผ่านการใช้งาน">มือสองผ่านการใช้งาน</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-[#4A2E35] text-xs">โซนนัดรับสินค้า</label>
                    <input
                      type="text"
                      placeholder="เช่น หน้าตึกเรียน, โรงอาหารกลาง"
                      value={newPost.location}
                      onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                    />
                  </div>
                </div>

                {/* Image URL Mock */}
                <div className="space-y-1">
                  <label className="font-medium text-[#4A2E35] text-xs">ลิงก์รูปภาพสินค้า (URL)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newPost.image}
                    onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-medium text-[#4A2E35] text-xs">รายละเอียดสินค้า</label>
                  <textarea
                    rows={4}
                    placeholder="อธิบายรายละเอียดสินค้าของคุณเพิ่มเติม..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                  />
                </div>

                {/* Seller Info */}
                <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#FFE4E8] space-y-3">
                  <h3 className="font-bold text-xs text-[#4A2E35] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FF1493]" />
                    <span>ข้อมูลผู้ขายและการติดต่อ</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="ชื่อผู้ขาย (เช่น น้องส้ม ปี 2) *"
                      value={newPost.sellerName}
                      onChange={(e) => setNewPost({...newPost, sellerName: e.target.value})}
                      className="px-3 py-2 rounded-lg border border-[#FFE4E8] bg-white text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Line ID"
                      value={newPost.lineId}
                      onChange={(e) => setNewPost({...newPost, lineId: e.target.value})}
                      className="px-3 py-2 rounded-lg border border-[#FFE4E8] bg-white text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Instagram"
                      value={newPost.instagram}
                      onChange={(e) => setNewPost({...newPost, instagram: e.target.value})}
                      className="px-3 py-2 rounded-lg border border-[#FFE4E8] bg-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF69B4] text-white font-bold text-sm shadow-md shadow-[#FFD1DC] hover:bg-[#FF1493] transition-colors"
                >
                  ลงขายสินค้าทันที 💕
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== VIEW 4: ADMIN LOGIN ==================== */}
        {currentView === 'adminLogin' && (
          <div className="max-w-md mx-auto py-8">
            <div className="bg-white rounded-3xl border border-[#FFE4E8] p-8 shadow-sm text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border border-[#FFE4E8] text-[#FF1493] flex items-center justify-center mx-auto text-2xl">
                🔐
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#4A2E35]">เข้าสู่ระบบแอดมินหลังบ้าน</h1>
                <p className="text-xs text-[#8C6B75] mt-1">กรอกรหัสผ่านเพื่อเข้าจัดการระบบ dekspumerch</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#4A2E35]">รหัสผ่านแอดมิน (Admin Key)</label>
                  <input
                    type="password"
                    required
                    placeholder="ป้อนรหัสผ่าน..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#FFE4E8] bg-[#FFF9FB] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF69B4]/40"
                  />
                </div>

                {adminError && (
                  <div className="p-3 rounded-xl bg-[#FFEBEE] text-[#C62828] text-xs font-medium border border-[#FFCDD2]">
                    {adminError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF1493] text-white font-bold text-sm shadow-md hover:bg-[#D81B60] transition-colors"
                >
                  เข้าสู่ระบบแอดมิน
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== VIEW 5: ADMIN DASHBOARD ==================== */}
        {currentView === 'admin' && isAdminLoggedIn && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-[#FFE4E8]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#FF1493] text-xs font-bold border border-[#FFE4E8] mb-2">
                  <ShieldCheck className="w-4 h-4" /> ระบบจัดการผู้ดูแลระบบ (Admin Mode)
                </div>
                <h1 className="text-xl font-bold text-[#4A2E35]">แผงควบคุมหลังบ้าน dekspumerch</h1>
              </div>

              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFCDD2] transition-colors text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>ออกจากระบบแอดมิน</span>
              </button>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-[#FFE4E8] space-y-1">
                <span className="text-xs text-[#8C6B75] font-semibold">จำนวนสินค้าทั้งหมด</span>
                <div className="text-2xl font-black text-[#FF1493]">{products.length} รายการ</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#FFE4E8] space-y-1">
                <span className="text-xs text-[#8C6B75] font-semibold">ผู้ขายที่ยืนยันแล้ว</span>
                <div className="text-2xl font-black text-[#4A7C59]">
                  {products.filter(p => p.seller.isVerified).length} คน
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#FFE4E8] space-y-1">
                <span className="text-xs text-[#8C6B75] font-semibold">สถานะระบบ</span>
                <div className="text-2xl font-black text-[#06C755]">ปกติ 🟢</div>
              </div>
            </div>

            {/* Admin Product Management Table */}
            <div className="bg-white rounded-3xl border border-[#FFE4E8] overflow-hidden p-6 space-y-4">
              <h2 className="text-base font-bold text-[#4A2E35]">จัดการประกาศสินค้าทั้งหมด</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4A2E35]">
                  <thead className="bg-[#FFF0F5] text-[#7A525D] font-bold border-b border-[#FFE4E8]">
                    <tr>
                      <th className="p-3">สินค้า</th>
                      <th className="p-3">ผู้ขาย</th>
                      <th className="p-3">ราคา</th>
                      <th className="p-3">ยืนยันตัวตน</th>
                      <th className="p-3 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFE4E8]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FFF9FB]">
                        <td className="p-3 font-semibold flex items-center gap-2">
                          <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="truncate max-w-[200px]">{p.title}</span>
                        </td>
                        <td className="p-3">{p.seller.name}</td>
                        <td className="p-3 font-bold text-[#FF1493]">฿{p.price}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleVerifySeller(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              p.seller.isVerified 
                                ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]' 
                                : 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]'
                            }`}
                          >
                            {p.seller.isVerified ? '✅ Verified' : '⏳ รอตรวจสอบ'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFCDD2] transition-colors"
                            title="ลบประกาศนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-16 bg-white border-t border-[#FFE4E8] py-8 text-center text-xs text-[#FF8DA1]">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-[#FF69B4] text-sm">🎀 dekspumerch — ตลาดนัดสินค้านักศึกษา</p>
          <p>พื้นที่ลงขายสินค้าฟรีสำหรับนักศึกษา ปลอดภัย น่ารัก ใช้งานง่าย 💕</p>
        </div>
      </footer>
    </div>
  );
}
