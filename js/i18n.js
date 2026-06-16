(function() {
  const lang = localStorage.getItem('store_lang') || 'en';

  // Apply basic direction and stylesheet before page renders to avoid flash of LTR layout
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    
    // Inject RTL stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/rtl.css';
    link.id = 'rtl-stylesheet';
    document.head.appendChild(link);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }

  // Translation Dictionary
  const translations = {
    "Need help? Call us:": "هل تحتاج إلى مساعدة؟ اتصل بنا:",
    "Special Offer": "عرض خاص",
    "Services": "الخدمات",
    "Subscribe": "اشترك الآن",
    "Gift Cards": "بطاقات الهدايا",
    "Store Locator": "مواقع الفروع",
    "Search": "بحث",
    "wishlist": "المفضلة",
    "Sign in": "تسجيل الدخول",
    "cart": "السلة",
    
    // Menu navigation
    "Home": "الرئيسية",
    "About": "من نحن",
    "Shop": "المتجر",
    "Pages": "الصفحات",
    "Blog": "المدونة",
    "Contact Us": "اتصل بنا",
    "Shop Right Sidebar": "قائمة المنتجات",
    "Shop Details": "تفاصيل المنتج",
    "Cart Page": "سلة التسوق",
    "Checkout Page": "إتمام الشراء",
    "Blog Grid": "شبكة المقالات",
    "Blog Single": "تفاصيل المقال",

    // Hero / Intro blocks
    "Elevate Your": "ارتقِ بـ",
    "Natural Beauty": "جمالك الطبيعي",
    "Pure & Premium Skincare": "عناية فائقة ونقية بالبشرة",
    "For Women & Men": "للنساء والرجال",
    "Shop Now": "تسوق الآن",
    "Vibrant Health": "صحة وحيوية",
    "& Wellness": "ونشاط",
    "Science-backed Organic Supplements": "مكملات عضوية مدعومة بالعلم",
    "Restore Your Energy": "استعد طاقتك وحيويتك",
    "Exquisite Elegance": "أناقة رائعة",
    "& Perfumes": "وعطور فاخرة",
    "Curated Luxury Fragrances": "عطور فاخرة منتقاة بعناية",
    "Express Your Elegance": "عبر عن جاذبيتك وأناقتك",

    // Features banner
    "Free Shipping": "شحن مجاني",
    "On all orders over $99": "على جميع الطلبات فوق $99",
    "30 Days Return": "إرجاع خلال 30 يوماً",
    "Money back guarantee": "ضمان استعادة الأموال",
    "Secure Payment": "دفع آمن 100%",
    "Safe and encrypted transactions": "معاملات آمنة ومفرّرة",
    "24/7 Support": "دعم متواصل 24/7",
    "Dedicated customer service": "خدمة عملاء متفانية",

    // Banner collections
    "New Collection": "المجموعة الجديدة",
    "Cosmetics Collection": "مستحضرات التجميل",
    "Luxury Perfumes": "العطور الفاخرة",
    "Explore Collection": "استكشف المجموعة",

    // Titles
    "Best Sellers": "الأكثر مبيعاً",
    "New Arrivals": "وصلنا حديثاً",
    "Featured Products": "المنتجات المميزة",
    "What Our Customers Say": "ماذا يقول عملائنا",
    "Latest Blog Posts": "أحدث المقالات",

    // Reviews
    "Outstanding quality and luxurious packaging. My skin has never felt better!": "جودة ممتازة وتغليف فاخر. لم أشعر ببشرتي بهذه الروعة من قبل!",
    "Highly effective supplements. I noticed a significant boost in my daily energy levels.": "مكملات غذائية فعالة للغاية. لاحظت زيادة كبيرة في مستويات طاقتي اليومية.",
    "The fragrance is absolutely divine and lasts all day. Highly recommend Cosima.": "العطر رائع للغاية ويدوم طوال اليوم. أوصي بشدة بـ كوزيما.",
    "Sarah Jenkins": "سارة جينكينز",
    "David Miller": "ديفيد ميلر",
    "Emma Watson": "إيما واتسون",
    "Verified Customer": "عميل موثق",

    // Blog
    "How to build a sustainable daily skincare routine": "كيفية بناء روتين يومي مستدام للعناية بالبشرة",
    "The top wellness trends to watch this year": "أبرز صيحات الصحة والنشاط للمشاهدة هذا العام",
    "Finding your signature fragrance: A complete guide": "البحث عن عطرك المميز: دليل كامل",
    "Read More": "اقرأ المزيد",
    "By": "بواسطة",
    "Admin": "المدير",

    // Product labels / tags
    "Gold Diamond Ring": "خاتم من الذهب والألماس",
    "Silver Necklace": "قلادة من الفضة الاسترلينية",
    "Pearl Earrings": "أقراط من اللؤلؤ الطبيعي",
    "Rose Gold Bracelet": "سوار من الذهب الوردي",
    "Gold Diamond Ring (Fallback)": "خاتم من الذهب والألماس (احتياطي)",
    "Silver Necklace (Fallback)": "قلادة من الفضة (احتياطي)",
    "Pearl Earrings (Fallback)": "أقراط اللؤلؤ (احتياطي)",
    "Rose Gold Bracelet (Fallback)": "سوار الذهب الوردي (احتياطي)",
    "Beautiful 18k gold diamond ring": "خاتم جميل من الذهب عيار 18 قيراط والألماس",
    "Elegant sterling silver necklace": "قلادة أنيقة من الفضة الاسترلينية",
    "Classic freshwater pearl earrings": "أقراط كلاسيكية من لؤلؤ المياه العذبة",
    "Stunning rose gold bracelet": "سوار رائع من الذهب الوردي",
    "Rings": "الخواتم",
    "Necklaces": "القلائد",
    "Earrings": "الأقراط",
    "Bracelets": "الأساور",

    // Footer
    "Cosima": "كوزيما",
    "Luxury Beauty, Cosmetics & Wellness Store": "متجر منتجات الجمال الفاخرة، التجميل والصحة والنشاط",
    "Quick Links": "روابط سريعة",
    "About Us": "من نحن",
    "Terms & Conditions": "الشروط والأحكام",
    "Privacy Policy": "سياسة الخصوصية",
    "Returns Policy": "سياسة الاسترجاع",
    "Shipping Policy": "سياسة الشحن",
    "FAQ": "الأسئلة الشائعة",
    "Newsletter": "النشرة الإخبارية",
    "Sign up to get the latest offers and updates.": "سجل للحصول على أحدث العروض والتحديثات والمستجدات.",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Subscribe Now": "اشترك الآن",
    "All Rights Reserved": "جميع الحقوق محفوظة",
    "Copyright": "حقوق النشر",

    // About Us Page
    "Our Story": "قصتنا",
    "Cosima was founded with a single mission: to bring the world's most luxurious and effective wellness and beauty products together.": "تأسست كوزيما بمهمة واحدة: جمع منتجات الصحة والجمال الأكثر فخامة وفعالية في العالم معاً.",
    "Our Vision": "رؤيتنا",
    "To empower individuals to feel confident, healthy, and beautiful in their own skin.": "تمكين الأفراد من الشعور بالثقة والصحة والجمال في بشرتهم.",
    "Our Mission": "رسالتنا",
    "Providing organic, premium, and science-backed products that elevate daily self-care routines.": "تقديم منتجات عضوية وممتازة ومدعومة بالعلم ترتقي بروتين العناية اليومية بالذات.",

    // Contact Us Page
    "Get In Touch": "تواصل معنا",
    "Contact Information": "بيانات الاتصال",
    "Address:": "العنوان:",
    "Phone:": "رقم الهاتف:",
    "Email:": "البريد الإلكتروني:",
    "123 Luxury Lane, London, UK": "123 ممر الفخامة، لندن، المملكة المتحدة",
    "Your Name": "اسمك الكامل",
    "Your Email": "بريدك الإلكتروني",
    "Subject": "الموضوع",
    "Message": "الرسالة",
    "Send Message": "إرسال الرسالة",

    // Shop Sidebar
    "Filter by Category": "تصفية بالفئات",
    "Price Range": "نطاق السعر",
    "Filter by Price": "تصفية بالسعر",
    "Filter": "تصفية",
    "Showing all products": "عرض جميع المنتجات",
    "Sort By": "ترتيب حسب",
    "Default": "الافتراضي",
    "Price: Low to High": "السعر: من الأقل للأعلى",
    "Price: High to Low": "السعر: من الأعلى للأقل",

    // Cart Page
    "Product": "المنتج",
    "Quantity": "الكمية",
    "Action": "إجراء",
    "Apply Coupon": "تطبيق كوبون الخصم",
    "Update Cart": "تحديث السلة",
    "Cart Totals": "إجمالي السلة",
    "Proceed to Checkout": "الذهاب لصفحة الدفع",
    "Your cart is currently empty.": "سلة المشتريات فارغة حالياً.",

    // Checkout Page
    "Billing Details": "تفاصيل الفاتورة",
    "First Name": "الاسم الأول",
    "Last Name": "اسم العائلة",
    "Phone Number": "رقم الهاتف",
    "Shipping Address": "عنوان الشحن",
    "Apartment, suite, unit, etc. (optional)": "شقة، جناح، وحدة، إلخ (اختياري)",
    "City": "المدينة",
    "Country": "الدولة",
    "Your Order": "طلبك الحالي",
    "Subtotal:": "المجموع الفرعي:",
    "Shipping:": "الشحن:",
    "Free": "مجاني",
    "Total:": "الإجمالي:",
    "Payment Method:": "طريقة الدفع:",
    "Cash on Delivery (COD)": "الدفع عند الاستلام",
    "Credit Card (Stripe)": "بطاقة الائتمان (Stripe)",
    "Card Details": "تفاصيل البطاقة",
    "Place Order": "تأكيد وإتمام الطلب",
    
    // Translations from user feedback & screenshots
    "Follow Us on Instagram": "تابعنا على إنستغرام",
    "@cosimapremium": "@cosimapremium",
    "Support 24/7": "دعم متواصل 24/7",
    "Contact us Anytime": "اتصل بنا في أي وقت",
    "Secured Payment": "دفع آمن",
    "Payment Cards Accepted": "نقبل بطاقات الدفع الآمنة",
    "For an Exchange Product": "لاستبدال المنتج",
    "Free Shipping to Arabian Gulf Countries": "شحن مجاني لدول الخليج العربي",
    "Contact Info": "بيانات الاتصال",
    "Need Any Help?": "هل تحتاج لمساعدة؟",
    "Need Any Help": "هل تحتاج لمساعدة",
    "Dubai": "دبي",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    "Follow Us": "تابعنا على منصاتنا",
    "Our Company": "شركتنا",
    "Cookie Policy": "سياسة ملفات الارتباط",
    "About Cosima": "عن كوزيما",
    "Returns & Exchange": "المرتجعات والاستبدال",
    "Shop Highlights": "مميزات المتجر",
    "Skincare": "العناية بالبشرة",
    "Serums & Oils": "السيروم والزيوت",
    "Moisturizers": "المرطبات",
    "Body & Bath": "الجسم والاستحمام",
    "Fragrances": "العطور",
    "Organic Supplements": "مكملات عضوية",
    "Read Journal": "اقرأ مجلتنا",
    "Latest trends and inspirations in beauty, skincare, and elegance": "أحدث الصيحات والإلهام في الجمال والعناية بالبشرة والأناقة",
    "Holistic Wellness & Beauty": "الجمال والصحة المتكاملة",
    "Finding Elegance: How Holistic Wellness Enhances Beauty": "البحث عن الأناقة: كيف تعزز الصحة المتكاملة الجمال",
    "Continue Reading": "مواصلة القراءة",
    "Summer Elegance: Minimalist Makeup Trends": "أناقة الصيف: صيحات المكياج البسيط",
    "The Ultimate 5-Step Morning Skincare Routine": "روتين الصباح المثالي للعناية بالبشرة في 5 خطوات",
    "Pure Skincare": "عناية نقية بالبشرة",
    "Serums": "سيروم",
    "SHOP MORE": "تسوق المزيد",
    "Signature": "العطور الفاخرة",
    "Perfumes": "عطور",
    "Show All Products": "عرض جميع المنتجات",
    "Home Spa & Wellness": "منتجات السبا والصحة المنزلية",
    "Aromatic Candles": "شموع عطرية",
    "BEAUTY": "الجمال",
    "RESTORED": "المستعاد",
    "Luxury Skincare & Wellness Collections": "مجموعات العناية بالبشرة والصحة الفاخرة",
    "Experience Pure Elegance": "تجربتك الفريدة للأناقة النقية",
    "Skincare Essentials": "أساسيات العناية بالبشرة",
    "Oud Rose Eau de Parfum": "عطر عود روز للرجال والنساء",
    "Jasmine Noir Body Mist": "رذاذ الجسم ياسمين نوار",
    "Amber Wood Cologne": "كولونيا خشب العنبر الفاخر",
    "Lavender Soy Candle": "شمعة الصويا العطرية باللافندر",
    "Rose Bath Salt Set": "مجموعة أملاح الاستحمام بالورد",
    "Essential Oil Diffuser": "موزع الزيوت العطرية الكهربائي",
    "NIGHT CARE": "العناية الليلية",
    "Retinol Night Repair": "كريم ريتينول لإصلاح البشرة الليلي",
    "TONERS": "تونر البشرة",
    "Hyaluronic Acid Toner": "تونر حمض الهيالورونيك المرطب",
    "CLEANSERS": "منظفات البشرة",
    "Gentle Foam Cleanser": "رغوة تنظيف البشرة اللطيفة",
    "BODY MIST": "معطر الجسم",
    "COLOGNE": "كولونيا",
    "CANDLES": "شموع عطرية",
    "BATH & BODY": "الاستحمام والجسم",
    "WELLNESS": "الصحة والنشاط",
    
    // Additional exact matches from user feedback & screenshots
    "Beauty,": "الجمال،",
    "Restored": "المستعاد",
    "Signature Perfumes": "عطورنا المميزة",
    "Pure Skincare Serums": "سيروم العناية بالبشرة النقي",
    "Latest trends and inspirations in beauty, skincare, and elegance.": "أحدث الصيحات والإلهام في الجمال والعناية بالبشرة والأناقة.",
    "Contact us Anytime.": "اتصل بنا في أي وقت.",
    "+971 50 123 4567": "\u200E+971 50 123 4567\u200E",
    "Dubai,": "دبي،",
    "Dubai, United Arab Emirates": "دبي، الإمارات العربية المتحدة",
    "OUR STORE": "معرضنا",
    "CONTACT INFO": "بيانات الاتصال",
    "Telephone:": "الهاتف:",
    "Email:": "البريد الإلكتروني:",
    "BUSINESS HOURS": "ساعات العمل",
    "Monday - Sunday:": "من الاثنين إلى الأحد:",
    "09:00 am - 20:00 pm": "09:00 صباحاً - 08:00 مساءً",
    "Have an question? Contact us!": "لديك سؤال؟ اتصل بنا!",
    "Name": "الاسم",
    "Subject": "الموضوع",
    "Write your comment…": "اكتب تعليقك هنا…",
    "View Cart": "عرض السلة",
    "Shopping Cart": "سلة التسوق",
    "Cart": "السلة",
    "Returning Customer?": "هل أنت عميل سابق؟",
    "Click here to login": "اضغط هنا لتسجيل الدخول",
    "Have a coupon?": "هل لديك كوبون خصم؟",
    "Click here to enter your code": "اضغط هنا لإدخال رمز الكوبون",
    "If you have shopped with us before, please enter your details in the boxes below. If you are a new customer, please proceed to the Billing & Shipping section.": "إذا كنت قد تسوقت معنا من قبل، يرجى إدخال بياناتك في الحقول أدناه. أما إذا كنت عميلاً جديداً، يرجى الانتقال إلى قسم الفاتورة والشحن.",
    "User Name or Email": "اسم المستخدم أو البريد الإلكتروني",
    "Remember me": "تذكرني",
    "Lost your password?": "هل نسيت كلمة المرور؟",
    "Login": "تسجيل الدخول",
    "Coupon Code": "كود الخصم",
    "Street Address": "عنوان الشارع",
    "Apartment, suite, unit etc. (optional)": "شقة، جناح، وحدة، إلخ (اختياري)",
    "State / Country": "الولاية / الدولة",
    "Postcode / ZIP": "الرمز البريدي",
    "Create an account?": "إنشاء حساب؟",
    "Ship to a Diffrent Address?": "الشحن لعنوان مختلف؟",
    "Order Notes": "ملاحظات الطلب",
    "Subtotal": "المجموع الفرعي",
    "Check Payments": "الدفع بشيكات",
    "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.": "يرجى إرسال الشيك إلى: اسم المتجر، شارع المتجر، مدينة المتجر، ولاية المتجر، الرمز البريدي للمتجر.",
    "Cash on Delivery": "الدفع عند الاستلام",
    "Paypal": "بايبال",
    "What is PayPal?": "ما هو بايبال؟",
    "I have read and agree to the website": "لقد قرأت وأوافق على ",
    "Your ultimate destination for luxury beauty, organic skincare, and holistic wellness.": "وجهتك النهائية للجمال الفاخر والعناية بالبشرة العضوية والصحة المتكاملة.",
    "Categories": "الفئات",
    "Pricing Filter": "تصفية السعر",
    "Price: ": "السعر: ",
    "Material": "المادة",
    "Gold": "ذهب",
    "Silver": "فضة",
    "Bronze": "برونز",
    "Colors": "الألوان",
    "Sizes": "المقاسات",
    "Collection": "المجموعة",
    "Originals": "أصلي",
    "Middle of North": "منتصف الشمال",
    "Modern": "حديث",
    "Add To Cart": "أضف إلى السلة",
    "ADD TO CART": "أضف إلى السلة",
    "BUY IT NOW": "اشتري الآن",
    "Add to Wishlist": "أضف إلى المفضلة",
    "Size Guide": "دليل المقاسات",
    "SKU:": "رمز المنتج:",
    "Category:": "الفئة:",
    "Tags:": "الوسوم:",
    "Share:": "مشاركة:",
    "Description": "الوصف",
    "Additional Information": "معلومات إضافية",
    "Weight": "الوزن",
    "Dimensions": "الأبعاد",
    "Composition": "التركيب / المواد",
    "Colour": "اللون",
    "Size": "المقاس",
    "by": "بواسطة",
    "Add your Review": "أضف تقييمك",
    "Your email address will not be published. Required fields are marked": "لن يتم نشر عنوان بريدك الإلكتروني. الحقول الإلزامية مشار إليها بـ",
    "Your Rating": "تقييمك",
    "Your Review": "تقييمك الشخصي",
    "Email Address": "عنوان البريد الإلكتروني",
    "Submit Review": "إرسال التقييم",

    // ── Navigation Bar ──────────────────────────────────────────────────────────
    "Find Store": "ابحث عن متجر",
    "Customer Care": "خدمة العملاء",
    "Browse Categories": "تصفح الفئات",
    "Search Products": "ابحث عن منتج",
    "English": "English",
    "العربية": "العربية",
    "MAKEUP": "مكياج",
    "Makeup": "مكياج",
    "Skincare": "عناية بالبشرة",
    "SKINCARE": "عناية بالبشرة",

    // ── About Us Page ────────────────────────────────────────────────────────────
    "About Our Online Store": "عن متجرنا الإلكتروني",
    "Welcome to Cosima, where luxury meets wellness. We curate the finest organic skincare, premium fragrances, and holistic wellness products designed to elevate your self-care routine. Our philosophy is rooted in purity, authenticity, and natural radiance.": "مرحباً بك في كوزيما، حيث يلتقي الفخامة بالصحة. نقدم لك أرقى منتجات العناية بالبشرة العضوية، والعطور الفاخرة، ومنتجات الصحة المتكاملة المصممة لترتقي بروتين عنايتك بنفسك. فلسفتنا مبنية على النقاء والأصالة والإشراق الطبيعي.",
    "To empower individuals to embrace their natural beauty through clean, sustainable, and high-performance skincare. We commit to sourcing only the purest botanical ingredients that nourish the body and calm the soul.": "نسعى إلى تمكين الأفراد من احتضان جمالهم الطبيعي من خلال منتجات العناية بالبشرة النظيفة والمستدامة وعالية الأداء. نلتزم بتوفير أنقى المكونات النباتية التي تغذي الجسم وتهدئ الروح.",
    "To become a global sanctuary for mindful beauty, redefining self-care as a daily ritual of wellness and peace. We strive to innovate clean beauty while preserving the harmony of nature.": "نطمح إلى أن نصبح ملاذًا عالميًا للجمال الواعي، نُعيد تعريف العناية بالنفس باعتبارها طقسًا يوميًا من الصحة والسلام. نسعى جاهدين إلى الابتكار في مجال الجمال النظيف مع الحفاظ على انسجام الطبيعة.",

    // ── About Page Commitment Section ────────────────────────────────────────────
    "Our Commitment to Pure Beauty": "التزامنا بالجمال النقي",
    "Pure & Premium\n Ingredients": "مكونات نقية\n وفاخرة",
    "Pure & Premium": "مكونات نقية وفاخرة",
    "Ingredients": "مكونات طبيعية",
    "We meticulously source the finest organic botanicals and active compounds to deliver transformative results for your skin and wellbeing.": "نختار بعناية فائقة أجود المكونات النباتية العضوية والمركبات الفعالة لتحقيق نتائج تحويلية لبشرتك وصحتك العامة.",
    "Conscious &\n Cruelty-Free": "واعٍ وخالٍ\n من القسوة",
    "Conscious &": "واعٍ وخالٍ من القسوة",
    "Cruelty-Free": "خالٍ من التجارب على الحيوانات",
    "Beauty with a conscience. Our luxury products are 100% vegan, ethically sourced, and absolutely never tested on animals.": "جمال بضمير. منتجاتنا الفاخرة نباتية 100%، مصادرها أخلاقية، ولا تُختبر أبدًا على الحيوانات.",
    "Clinically Proven\n Results": "نتائج مثبتة\n سريريًا",
    "Clinically Proven": "نتائج مثبتة سريريًا",
    "Results": "نتائج",
    "Expertly formulated by skincare professionals, every product is rigorously tested to ensure safety, potency, and visible efficacy.": "صُممت بخبرة من قِبَل متخصصين في العناية بالبشرة، كل منتج يخضع لاختبارات صارمة لضمان الأمان والفاعلية والنتائج المرئية.",

    // ── Stats / Counter Section ──────────────────────────────────────────────────
    "Glowing Clients": "عميل مشرق",
    "Years of Excellence": "سنة من التميز",
    "Satisfaction Rate": "معدل الرضا",
    "Beauty Awards": "جائزة جمال",

    // ── About Page Testimonials ──────────────────────────────────────────────────
    "Customer Review": "آراء عملائنا",
    "Cosima is my favourite store": "كوزيما متجري المفضل",
    "The organic facial oil is absolutely life-changing. My skin has never looked so glowing and hydrated. The quality is unmatched!": "زيت الوجه العضوي غيّر حياتي تمامًا. لم تبدُ بشرتي بهذا التألق والترطيب من قبل. الجودة لا مثيل لها!",
    "Sarah Jenkins": "سارة جينكينز",
    "Beautiful, natural products": "منتجات طبيعية رائعة",
    "I love the lavender body lotion and botanical perfumes. Knowing that everything is cruelty-free and ethically sourced makes it even better.": "أحب لوشن الجسم باللافندر والعطور النباتية. معرفة أن كل شيء خالٍ من التجارب على الحيوانات ومصادره أخلاقية تجعله أفضل.",
    "Niamh Oxley": "نيامه أوكسلي",
    "Incredible spa scents": "روائح سبا رائعة",
    "The soy wax candles and essential oils have transformed my home into a relaxing spa. The fragrances are pure, subtle, and last for hours.": "حوّلت شموع الصويا والزيوت العطرية منزلي إلى سبا مريحة. الروائح نقية وخفيفة وتدوم لساعات.",
    "Penelope Carter": "بينيلوبي كارتر",
    "Highly recommend": "أنصح بشدة",
    "Fast delivery, elegant sustainable packaging, and exceptional premium quality. The Rose Jasmine mist is my new daily absolute must-have.": "توصيل سريع، تغليف أنيق ومستدام، وجودة فائقة استثنائية. رذاذ الورد والياسمين أصبح ضرورة يومية لي.",
    "Elena Rostova": "إيلينا روستوفا",

    // ── Newsletter / Subscribe Sections ─────────────────────────────────────────
    "Subscribe Newsletter": "اشترك في نشرتنا البريدية",
    "Sign up to our Newsletter and get the discount code.": "اشترك في نشرتنا البريدية واحصل على كود الخصم.",
    "Email address": "عنوان البريد الإلكتروني",
    "SUBSCRIBE": "اشترك الآن",
    "Join the Cosima Club!": "انضم إلى نادي كوزيما!",
    "Get 15% off on your first order.": "احصل على خصم 15% على طلبك الأول.",
    "Sign up to our Newsletter and receive your golden discount code!": "اشترك في نشرتنا البريدية واحصل على كود الخصم الذهبي الخاص بك!",

    // ── Blog / Read Journal Section ──────────────────────────────────────────────
    "Read Journal": "اقرأ مجلتنا",
    "Latest trends and inspirations in beauty, skincare, and elegance.": "أحدث الصيحات والإلهام في الجمال والعناية بالبشرة والأناقة.",
    "SOPHIE LAURENT": "سوفي لوران",
    "JUNE 12, 2026": "12 يونيو 2026",
    "JUNE 14, 2026": "14 يونيو 2026",
    "JUNE 15, 2026": "15 يونيو 2026",
    "EMILY DUPONT": "إيميلي دوبون",
    "CHLOE MARTIN": "كلوي مارتن",
    "The Ultimate 5-Step Morning Skincare Routine": "روتين الصباح المثالي للعناية بالبشرة في 5 خطوات",
    "Finding Elegance: How Holistic Wellness Enhances Beauty": "البحث عن الأناقة: كيف تعزز الصحة المتكاملة الجمال",
    "Summer Elegance: Minimalist Makeup Trends": "أناقة الصيف: صيحات المكياج البسيط",
    "Continue Reading": "مواصلة القراءة",

    // ── Features Strip ───────────────────────────────────────────────────────────
    "Support 24/7": "دعم متواصل 24/7",
    "Contact us Anytime.": "اتصل بنا في أي وقت.",
    "Contact us Anytime": "اتصل بنا في أي وقت",
    "Secured Payment": "دفع آمن",
    "Payment Cards Accepted": "نقبل بطاقات الدفع",
    "30 Days Return": "إرجاع خلال 30 يوماً",
    "For an Exchange Product": "لاستبدال المنتج",
    "Free Shipping to Arabian Gulf Countries": "شحن مجاني لدول الخليج العربي",

    // ── Instagram Section ────────────────────────────────────────────────────────
    "Follow Us on Instagram": "تابعنا على إنستغرام",

    // ── Footer Columns ───────────────────────────────────────────────────────────
    "Contact Info": "بيانات الاتصال",
    "Need Any Help?": "هل تحتاج لمساعدة؟",
    "Our Company": "شركتنا",
    "Cookie Policy": "سياسة الكوكيز",
    "About Cosima": "عن كوزيما",
    "Returns & Exchange": "المرتجعات والاستبدال",
    "Shop Highlights": "مميزات المتجر",
    "Skincare": "العناية بالبشرة",
    "Serums & Oils": "السيروم والزيوت",
    "Moisturizers": "المرطبات",
    "Body & Bath": "الجسم والاستحمام",
    "Fragrances": "العطور",
    "Organic Supplements": "مكملات عضوية",
    "Follow Us": "تابعنا",

    // ── Blog Grid - All Articles ──────────────────────────────────────────────────
    "True elegance starts from within. Learn how mindfulness, balanced nutrition, and organic self-care translate into natural radiance and classic grace\u2026": "الأناقة الحقيقية تبدأ من الداخل. اكتشف كيف يُترجم التأمل والتغذية المتوازنة والعناية العضوية إلى إشراق طبيعي ورقي أصيل…",
    "Achieve a fresh, effortless look with these minimalist summer makeup tips, showcasing clean beauty essentials that let your natural skin breathe\u2026": "احققي إطلالة منعشة وسهلة مع نصائح مكياج الصيف البسيط، التي تُبرز أساسيات الجمال النظيف وتتيح لبشرتك التنفس بحرية…",
    "Revitalize your locks with organic treatment oils. Learn the best washing, deep conditioning, and styling practices for daily hair health and elegance\u2026": "أعيدي حيوية شعرك بزيوت العلاج العضوية. تعرّف على أفضل ممارسات الغسيل والتكييف العميق والتصفيف للحصول على شعر صحي أنيق يومياً…",
    "Streamline your closet and elevate your signature look. Learn how to curate high-quality, sustainable pieces that build classic elegance effortlessly\u2026": "نظّم خزانة ملابسك وارتقِ بأسلوبك المميز. تعلّم كيف تختار قطعاً عالية الجودة ومستدامة تبني أناقة كلاسيكية بلا جهد…",
    "From Retinol to Hyaluronic Acid, understand exactly what these active formulas do and how to layer them in your routine to target specific concerns\u2026": "من الريتينول إلى حمض الهيالورونيك، افهم بالضبط ما تفعله هذه التركيبات الفعالة وكيف تطبّقها في روتينك لمعالجة مخاوف محددة…",
    "Explore the role of collagen, plant antioxidants, and daily vitamins in maintaining youthful, firm skin and boosting your daily physical energy\u2026": "استكشف دور الكولاجين ومضادات الأكسدة النباتية والفيتامينات اليومية في الحفاظ على بشرة شابة وممتدة وتعزيز طاقتك الجسدية اليومية…",
    "Floral, woody, or oriental? Discover the chemistry of fragrances, how notes settle on your skin, and how to select a scent that truly defines you\u2026": "زهري، خشبي، أم شرقي؟ اكتشف كيمياء العطور وكيف تستقر النوتات على بشرتك، واختر العطر الذي يعكس شخصيتك حقاً…",
    "Learn why shifting to vegan, cruelty-free, and sustainably packaged cosmetics protects both your skin wellness and the environment\u2026": "اعرف لماذا يحمي التحول إلى مستحضرات التجميل النباتية وغير المجربة على الحيوانات والمعبأة باستدامة بشرتك والبيئة في آنٍ واحد…",
    "Load More": "تحميل المزيد",

    // ── Blog Authors ─────────────────────────────────────────────────────────────
    "MARCUS VANE": "ماركوس فان",
    "OLIVIA GREY": "أوليفيا غراي",
    "DR. ARIA KHAN": "د. آريا خان",
    "NATHAN DRAKE": "ناثان دريك",
    "ELENA ROSTOVA": "إيلينا روستوفا",
    "CLARA SIMON": "كلارا سيمون",

    // ── More Dates ───────────────────────────────────────────────────────────────
    "JUNE 2, 2026": "2 يونيو 2026",
    "JUNE 5, 2026": "5 يونيو 2026",
    "JUNE 8, 2026": "8 يونيو 2026",
    "JUNE 10, 2026": "10 يونيو 2026",
    "MAY 25, 2026": "25 مايو 2026",
    "MAY 28, 2026": "28 مايو 2026",

    // ── Blog Article Titles ──────────────────────────────────────────────────────
    "The Secret to Silky, Healthy Hair: Natural Oils": "سر الشعر الناعم الصحي: الزيوت الطبيعية",
    "Timeless Style: Building a Sustainable Capsule Wardrobe": "أسلوب خالد: بناء خزانة ملابس مستدامة",
    "Demystifying Serums: Which Ingredients Do You Need?": "كشف أسرار السيروم: ما هي المكونات التي تحتاجها؟",
    "Organic Supplements: Beauty from the Inside Out": "المكملات العضوية: الجمال من الداخل إلى الخارج",
    "Signature Scents: Find Your Perfect Perfume Profile": "عطور مميزة: اعثر على بروفايل عطرك المثالي",
    "Clean Beauty: Why Eco-Friendly Cosmetics Are the Future": "الجمال النظيف: لماذا منتجات التجميل الصديقة للبيئة هي المستقبل",

    // ── Blog Tags / Categories ────────────────────────────────────────────────────
    "Haircare": "العناية بالشعر",
    "Elegance": "الأناقة",
    "Perfumes": "العطور",
    "Beauty": "الجمال",
    "Wellness": "الصحة والنشاط",

    // ── Blog Single Page ──────────────────────────────────────────────────────────
    "Leave a Comment": "اترك تعليقاً",
    "Post Comment": "نشر التعليق",
    "Comment": "التعليق",
    "Recent Posts": "أحدث المقالات",
    "Recent Comments": "أحدث التعليقات",
    "Tags": "الوسوم",
    "Search": "بحث",
    "Categories": "الفئات",
    "Archives": "الأرشيف",

    // ── Shop Pages ────────────────────────────────────────────────────────────────
    "Showing 1–12 of 24 results": "عرض 1-12 من أصل 24 نتيجة",
    "No products found": "لم يتم العثور على منتجات",
    "Out of Stock": "نفذ من المخزون",
    "In Stock": "متوفر",
    "Sale": "تخفيض",
    "New": "جديد",
    "Hot": "رائج",
    "Best": "الأفضل",

    // ── Contact Page ─────────────────────────────────────────────────────────────
    "Have an question? Contact us!": "لديك سؤال؟ تواصل معنا!",
    "Write your comment\u2026": "اكتب تعليقك هنا…",

    // ── FAQ Page ──────────────────────────────────────────────────────────────────
    "Frequently Asked Questions": "الأسئلة الشائعة",
    "Accordion": "أسئلة متكررة",

    // ── Policy Pages ─────────────────────────────────────────────────────────────
    "Privacy Policy": "سياسة الخصوصية",
    "Cookie Policy": "سياسة الكوكيز",
    "Terms & Conditions": "الشروط والأحكام",
    "Returns Policy": "سياسة الإرجاع",
    "Shipping Policy": "سياسة الشحن",

    // ── Breadcrumbs ──────────────────────────────────────────────────────────────
    "Home": "الرئيسية",
    "About Us": "من نحن",
    "Blog Grid": "شبكة المقالات",
    "Blog Single": "تفاصيل المقال",
    "Cart Page": "سلة التسوق",
    "Checkout Page": "إتمام الشراء",
    "Shop": "المتجر",

    // ── Blog Single Article Content ───────────────────────────────────────────────
    "The Ultimate 5-Step Morning Skincare Routine for Glowing Skin": "روتين الصباح المثالي للعناية بالبشرة في 5 خطوات للحصول على بشرة مشرقة",
    "Jewels of Prosperity-2021": "جواهر الازدهار 2021",
    "A great morning skincare routine does not need to be complicated to be highly effective. By focusing on gentle cleansing, hydration, and defense against environmental factors, you can achieve a glowing and healthy complexion every day.": "لا يجب أن يكون روتين العناية بالبشرة الصباحي معقداً ليكون فعّالاً. بالتركيز على التنظيف اللطيف والترطيب والحماية من العوامل البيئية، يمكنك تحقيق بشرة مشرقة وصحية كل يوم.",
    "Starting your day with a dedicated self-care ritual is the ultimate foundation for both elegance and healthy skin. Our modern lifestyles expose our skin to pollution, blue light, and fluctuating weather conditions, making a protective barrier essential. By using clean, active botanical formulations, you respect your skin's natural balance while achieving visible radiance.": "بدء يومك بطقوس العناية بالذات هو الأساس الأمثل للأناقة والبشرة الصحية. أسلوب حياتنا الحديث يعرّض بشرتنا للتلوث والضوء الأزرق وتقلبات الطقس، مما يجعل الحاجز الواقي ضرورة. باستخدام تركيبات نباتية نظيفة وفعّالة، تحترم التوازن الطبيعي لبشرتك مع تحقيق إشراق مرئي.",
    "Step 1 is always a gentle, non-stripping cleanse to prepare your skin. Follow this with a hydrating antioxidant serum (like Vitamin C) to neutralize free radicals, and a deeply nourishing moisturizer to lock in hydration. Don't forget step 5: a broad-spectrum mineral sunscreen to guard against premature aging.": "الخطوة 1 هي دائمًا تنظيف لطيف وغير مجفف لتهيئة بشرتك. اتبع ذلك بسيروم مضاد للأكسدة مرطب (مثل فيتامين C) لتحييد الجذور الحرة، ومرطب مغذٍ بعمق لحفظ الرطوبة. لا تنسَ الخطوة 5: واقي شمس معدني واسع الطيف للحماية من الشيخوخة المبكرة.",
    "Investing in your skin is a lifetime commitment. True beauty is nurtured through": "الاستثمار في بشرتك التزام مدى الحياة. الجمال الحقيقي يُنمّى من خلال",
    "daily rituals of self-love and choosing clean, organic ingredients.": "طقوس يومية من محبة الذات واختيار المكونات العضوية النظيفة.",
    "Sophie Laurent": "سوفي لوران",
    "When selecting skincare products, prioritize sustainability and clean formulations. Plant-based ingredients, hyaluronic acid, and botanical oils work harmoniously with your skin barrier without causing the irritation commonly found in synthetic alternatives.": "عند اختيار منتجات العناية بالبشرة، أعطِ الأولوية للاستدامة والتركيبات النظيفة. المكونات النباتية وحمض الهيالورونيك والزيوت النباتية تعمل بتناسق مع حاجز بشرتك دون التسبب في التهيج الشائع في البدائل الاصطناعية.",
    "By establishing this quick 5-step daily routine, you'll protect your skin from daily stressors and ensure a smooth, makeup-ready base. Remember, consistency is key to achieving that soft, natural, lit-from-within glow.": "من خلال إرساء هذا الروتين اليومي السريع من 5 خطوات، ستحمي بشرتك من ضغوط يومية وتضمن قاعدة ناعمة جاهزة للمكياج. تذكر، الاتساق هو مفتاح تحقيق ذلك اللمعان الطبيعي الناعم المُضاء من الداخل.",
    "Tags:": "الوسوم:",
    "Share:": "مشاركة:",

    // ── Contact Page ─────────────────────────────────────────────────────────────
    "Contact": "تواصل معنا",
    "Click on your neares store location below to set the road on Google Map.": "انقر على أقرب موقع متجر أدناه لتعيين الطريق على خرائط Google.",
    "Monday - Sunday:": "من الاثنين إلى الأحد:",
    "Telephone:": "الهاتف:",
    "Email": "البريد الإلكتروني",
    "Name": "الاسم",
    "Subject": "الموضوع",

    // ── FAQ Page ─────────────────────────────────────────────────────────────────
    "Any questions? We would be happy to help you": "أي أسئلة؟ سنكون سعداء بمساعدتك",
    "What is your return policy?": "ما هي سياسة الإرجاع لديكم؟",
    "How long does shipping take?": "كم يستغرق وقت الشحن؟",
    "Do you offer international shipping?": "هل تقدمون شحناً دولياً؟",
    "Are your products cruelty-free?": "هل منتجاتكم خالية من التجارب على الحيوانات؟",
    "Can I track my order?": "هل يمكنني تتبع طلبي؟",

    // ── Product Category Labels (UPPERCASE) ───────────────────────────────────────
    "SERUMS": "سيروم البشرة",
    "MOISTURIZERS": "مرطبات البشرة",
    "BODY CARE": "العناية بالجسم",
    "HAND CARE": "العناية باليدين",
    "TONER": "تونر",
    "CLEANSER": "منظف البشرة",
    "EYE CARE": "العناية بالعيون",
    "SUN CARE": "واقي الشمس",
    "SUPPLEMENTS": "مكملات غذائية",
    "DIFFUSER": "موزع عطري",

    // ── Product Names ─────────────────────────────────────────────────────────────
    "Hydrating Glow Serum": "سيروم التألق المرطب",
    "Rose Petal Day Cream": "كريم الورد اليومي",
    "Botanical Body Oil": "زيت الجسم النباتي",
    "Silk Touch Hand Cream": "كريم اليدين الحريري",
    "Vitamin C Brightening Serum": "سيروم فيتامين C المضيء",
    "Ultra Hydra Night Cream": "كريم الليل الفائق الترطيب",
    "Purifying Clay Mask": "قناع الطين المنقي",
    "Soothing Aloe Toner": "تونر الألوفيرا المهدئ",
    "Micellar Cleansing Water": "ماء المايسيلار للتنظيف",
    "SPF 50 Mineral Sunscreen": "واقي الشمس المعدني SPF 50",

    // ── Favourites / Explore tooltips ────────────────────────────────────────────
    "favourite": "المفضلة",
    "explore": "استكشاف",

    // ── Beauty, Restored Banner ───────────────────────────────────────────────────
    "Beauty, ": "الجمال، ",
    " Restored": " المستعاد",

    // ── Home Sections ─────────────────────────────────────────────────────────────
    "Skincare Essentials": "أساسيات العناية بالبشرة",
    "Pure Skincare Serums": "سيروم العناية بالبشرة النقي",
    "Show All Products": "عرض جميع المنتجات",
    "SHOP MORE": "تسوق المزيد",
    "Signature Perfumes": "عطورنا المميزة",
    "Home Spa & Wellness": "منتجات السبا والصحة المنزلية",
    "Aromatic Candles": "شموع عطرية",

    // ── Browse Categories Dropdown ────────────────────────────────────────────────
    "New Products": "منتجات جديدة",

    // ── Top Announcement Bar ──────────────────────────────────────────────────────
    "Summer Sale 15% off! Shop Now!": "تخفيضات الصيف 15%! تسوق الآن!",
    "Store Location": "موقع المتجر"
  };

  // Translate a node recursively
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.nodeValue;
      let trimmed = originalText.trim();
      
      if (!trimmed) return;

      // 1. Direct dictionary match
      if (translations[trimmed]) {
        const leadingSpace = originalText.match(/^\s*/)[0];
        const trailingSpace = originalText.match(/\s*$/)[0];
        node.nodeValue = leadingSpace + translations[trimmed] + trailingSpace;
        return;
      }

      // 2. Dynamic pattern: "Your Cart (X)"
      if (trimmed.startsWith("Your Cart (") && trimmed.endsWith(")")) {
        const match = trimmed.match(/Your Cart \((\d+)\)/);
        if (match) {
          node.nodeValue = originalText.replace(match[0], `سلتك (${match[1]})`);
          return;
        }
      }

      // 3. Dynamic pattern: "QTY : X"
      if (trimmed.toUpperCase().startsWith("QTY")) {
        const match = trimmed.match(/QTY\s*:\s*(\d+)/i);
        if (match) {
          node.nodeValue = originalText.replace(match[0], `الكمية: ${match[1]}`);
          return;
        }
      }

      // 4. Dynamic pattern: Copyright
      if (trimmed.includes("Copyright")) {
        node.nodeValue = originalText.replace("Copyright", "حقوق النشر");
        return;
      }

      // 5. Dynamic pattern: X Reviews For Y
      if (trimmed.includes("Reviews For")) {
        const match = trimmed.match(/(\d+)\s+Reviews\s+For\s+(.*)/i);
        if (match) {
          node.nodeValue = originalText.replace(match[0], `${match[1]} تقييمات لـ ${match[2]}`);
          return;
        }
      }

      // 6. Dynamic pattern: Reviews (X)
      if (trimmed.startsWith("Reviews (") && trimmed.endsWith(")")) {
        const match = trimmed.match(/Reviews \((\d+)\)/);
        if (match) {
          node.nodeValue = originalText.replace(match[0], `التقييمات (${match[1]})`);
          return;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

      // Translate attributes (placeholder, title, alt, button value, aria-label)
      const attrs = ['placeholder', 'title', 'alt', 'value', 'aria-label'];
      attrs.forEach(attr => {
        if (node.hasAttribute(attr)) {
          const val = node.getAttribute(attr).trim();
          if (translations[val]) {
            node.setAttribute(attr, translations[val]);
          }
        }
      });

      // Translate all children
      node.childNodes.forEach(translateNode);
    }
  }

  // Inject language switcher inside DOM
  function injectLanguageSwitcher() {
    const actionsList = document.querySelector('#pageHeader .phWrapper .phActionsList');
    if (actionsList) {
      const li = document.createElement('li');
      li.className = 'nav-item-lang';
      const langText = lang === 'ar' ? 'English' : 'العربية';
      li.innerHTML = `
        <a href="javascript:void(0);" id="lang-switcher" class="d-flex align-items-center" style="cursor: pointer;">
          <i class="fa-solid fa-globe mbr" style="font-size: 1.15rem;"></i>
          <span class="txt d-none d-lg-block" style="font-weight: 500;">${langText}</span>
        </a>
      `;
      actionsList.insertBefore(li, actionsList.firstChild);

      document.getElementById('lang-switcher').addEventListener('click', function() {
        const newLang = lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('store_lang', newLang);
        window.location.reload();
      });
    }
  }

  // Setup language dropdown click listeners
  function setupLanguageDropdownListeners() {
    // 1. Update button texts to match current language
    const langButtons = document.querySelectorAll('.phtbLanguageDropdown button');
    langButtons.forEach(btn => {
      btn.textContent = lang === 'ar' ? 'Ara' : 'Eng';
    });

    // 2. Setup click listeners on dropdown items
    const langItems = document.querySelectorAll('.phtbLanguageDropdown .dropdown-item');
    langItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedLang = item.getAttribute('data-lang') || (item.textContent.trim().toLowerCase().includes('ara') || item.textContent.trim().includes('عرب') ? 'ar' : 'en');
        if (selectedLang !== lang) {
          localStorage.setItem('store_lang', selectedLang);
          window.location.reload();
        }
      });
    });
  }

  // Initialize Translation
  function initTranslation() {
    injectLanguageSwitcher();
    setupLanguageDropdownListeners();

    if (lang === 'ar') {
      // Translate the entire body
      translateNode(document.body);

      // Translate dynamic additions to DOM (e.g. loaded products, ratings, cart contents)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            // Prevent translating injected language switcher to avoid loop or text rewrite
            if (node.classList && node.classList.contains('nav-item-lang')) return;
            if (node.id === 'lang-switcher') return;
            
            translateNode(node);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Execute
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslation);
  } else {
    initTranslation();
  }
})();
