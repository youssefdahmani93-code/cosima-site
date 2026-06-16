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
    "Store Location": "موقع المتجر",

    // ── FAQ Page ──────────────────────────────────────────────────────────────────
    "Frequently Asked Questions": "الأسئلة الشائعة",
    "Welcome to our FAQ section! We have gathered here the answers to the most frequently asked questions to help you navigate our site and fully enjoy your shopping experience at COSIMA.": "مرحبًا بكم في قسم الأسئلة الشائعة! لقد جمعنا هنا الإجابات على الأسئلة الأكثر شيوعًا لمساعدتك في تصفح موقعنا والاستمتاع الكامل بتجربة التسوق الخاصة بك في كوزيما.",
    "Orders & Products": "الطلبات والمنتجات",
    "Q1: How can I place an order on COSIMA?": "س1: كيف يمكنني تقديم طلب على كوزيما؟",
    "To place an order, simply browse our catalog, add the desired products to your cart, then follow the checkout process steps. You will need to create an account or log in if you already have one, choose your delivery and payment method, then confirm your purchase.": "لتقديم طلب، ما عليك سوى تصفح الكتالوج الخاص بنا، وإضافة المنتجات المطلوبة إلى سلتك، ثم اتباع خطوات عملية إتمام الشراء. ستحتاج إلى إنشاء حساب أو تسجيل الدخول إذا كان لديك حساب بالفعل، واختيار طريقة التوصيل والدفع، ثم تأكيد الشراء.",
    "Q2: Can I modify or cancel my order after placing it?": "س2: هل يمكنني تعديل أو إلغاء طلبي بعد تقديمه؟",
    "If you wish to modify or cancel your order, please contact our customer service as quickly as possible. We will do our best to accommodate your request if the order has not yet been processed or shipped.": "إذا كنت ترغب في تعديل أو إلغاء طلبك، يرجى الاتصال بخدمة العملاء في أسرع وقت ممكن. سنبذل قصارى جهدنا لتلبية طلبك إذا لم يتم بعد معالجة الطلب أو شحنه.",
    "Q3: How do I know if a product is in stock?": "س3: كيف أعرف ما إذا كان المنتج متوفرًا في المخزون؟",
    "Product availability is indicated on each product page. If an item is out of stock, this will be clearly stated. You can also contact us to find out the estimated restocking date.": "يتم توضيح توفر المنتج على صفحة كل منتج. إذا كان العنصر غير متوفر، فسيتم ذكر ذلك بوضوح. يمكنك أيضًا الاتصال بنا لمعرفة تاريخ إعادة التخزين المتوقع.",
    "Q4: Are COSIMA products authentic?": "س4: هل منتجات كوزيما أصلية؟",
    "Yes, at COSIMA, we guarantee the authenticity of all our products. We work directly with recognized suppliers and brands to ensure you receive premium quality items.": "نعم، في كوزيما، نضمن أصالة جميع منتجاتنا. نحن نعمل مباشرة مع الموردين والعلامات التجارية المعترف بها لضمان حصولك على سلع عالية الجودة.",
    "Payment": "الدفع",
    "Q5: What payment methods are accepted?": "س5: ما هي طرق الدفع المقبولة؟",
    "We accept payments by credit/debit card (Visa, MasterCard, American Express, etc.) through a secure payment platform. Cash on delivery is also available for most orders in the GCC region.": "نقبل المدفوعات عن طريق بطاقة الائتمان/الخصم (فيزا، ماستركارد، أمريكان إكسبريس، إلخ) من خلال منصة دفع آمنة. يتوفر الدفع عند الاستلام أيضًا لمعظم الطلبات في منطقة الخليج العربي.",
    "Q6: Is online payment secure?": "س6: هل الدفع عبر الإنترنت آمن؟",
    "Absolutely. All credit card transactions are secured by advanced encryption protocols. Your payment information is processed directly by our banking partners and is never stored on our servers.": "بالتأكيد. جميع معاملات بطاقات الائتمان مؤمنة ببروتوكولات تشفير متقدمة. يتم معالجة معلومات الدفع الخاصة بك مباشرة من قبل شركائنا المصرفيين ولا يتم تخزينها مطلقًا على خوادمنا.",
    "Shipping & Delivery": "الشحن والتوصيل",
    "Q7: Where do you deliver?": "س7: أين تقومون بالتوصيل؟",
    "We deliver our products across all six Gulf Cooperation Council (GCC) countries: UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.": "نقوم بتوصيل منتجاتنا إلى جميع دول مجلس التعاون الخليجي الست: الإمارات، السعودية، الكويت، قطر، البحرين، وعُمان.",
    "Q8: What are the delivery times?": "س8: ما هي أوقات التوصيل؟",
    "Orders are generally processed within 24 to 48 business hours. Delivery times then vary from 3 to 5 business days for major cities and 5 to 7 business days for other regions. For more details, please see our": "تتم معالجة الطلبات عمومًا في غضون 24 إلى 48 ساعة عمل. وتختلف أوقات التوصيل بعد ذلك من 3 إلى 5 أيام عمل للمدن الكبرى و5 إلى 7 أيام عمل للمناطق الأخرى. لمزيد من التفاصيل، يرجى مراجعة",
    "Q9: What are the shipping fees?": "س9: ما هي رسوم الشحن؟",
    "Shipping fees depend on your address and the weight of your order. They are calculated and displayed before you confirm your purchase. We also offer free shipping for orders exceeding a certain amount.": "تعتمد رسوم الشحن على عنوانك ووزن طلبك. يتم حسابها وعرضها قبل تأكيد الشراء. كما نقدم شحنًا مجانيًا للطلبات التي تتجاوز قيمة معينة.",
    "Q10: How can I track my order?": "س10: كيف يمكنني تتبع طلبي؟",
    "Once your order has been shipped, you will receive a confirmation email containing a tracking number. You can use this number on our logistics partner's website to track the delivery of your package.": "بمجرد شحن طلبك، ستتلقى رسالة تأكيد بالبريد الإلكتروني تحتوي على رقم التتبع. يمكنك استخدام هذا الرقم على موقع شريكنا اللوجستي لتتبع تسليم طردك.",
    "Q11: Can I return or exchange a product?": "س11: هل يمكنني إرجاع منتج أو استبداله؟",
    "Yes, you have 14 calendar days from the date of receiving your order to request a return or exchange, subject to certain conditions. For hygiene reasons, opened or used products cannot be returned or exchanged. For more information, please see our": "نعم، لديك 14 يومًا تقويميًا من تاريخ استلام طلبك لطلب إرجاع أو استبدال، مع مراعاة شروط معينة. لأسباب تتعلق بالنظافة والصحة، لا يمكن إرجاع أو استبدال المنتجات المفتوحة أو المستخدمة. لمزيد من المعلومات، يرجى مراجعة",
    "Q12: What should I do if I receive a damaged or incorrect product?": "س12: ماذا يجب أن أفعل إذا استلمت منتجًا تالفًا أو غير صحيح؟",
    "If you receive a damaged or non-conforming item, please contact our customer service immediately (within 24 hours of receipt) with photos of the product and packaging. We will do everything necessary to resolve the issue promptly.": "إذا استلمت منتجًا تالفًا أو غير مطابق، يرجى الاتصال بخدمة العملاء لدينا على الفور (في غضون 24 ساعة من الاستلام) مع إرسال صور للمنتج والتغليف. سنفعل كل ما يلزم لحل المشكلة على وجه السرعة.",
    "Q13: How is my personal data protected?": "س13: كيف يتم حماية بياناتي الشخصية؟",
    "We take the protection of your data very seriously. All your personal information is processed in accordance with our": "نحن نأخذ حماية بياناتك على محمل الجد. يتم معالجة جميع معلوماتك الشخصية وفقًا لـ",
    "and applicable data protection laws in the UAE and the European Union (GDPR).": "وقوانين حماية البيانات المعمول بها في الإمارات والاتحاد الأوروبي (GDPR).",
    "Q14: Do you use cookies on your website?": "س14: هل تستخدمون ملفات تعريف الارتباط على موقعكم؟",
    "Yes, we use cookies to improve your browsing experience, analyze traffic, and personalize content. You can manage your cookie preferences through your browser settings or our cookie consent tool. For more details, see our": "نعم، نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك، وتحليل حركة المرور، وتخصيص المحتوى. يمكنك إدارة تفضيلات ملفات تعريف الارتباط الخاصة بك من خلال إعدادات متصفحك أو أداة الموافقة على ملفات تعريف الارتباط الخاصة بنا. لمزيد من التفاصيل، راجع",
    "Q15: How can I contact COSIMA customer service?": "س15: كيف يمكنني الاتصال بخدمة عملاء كوزيما؟",
    "You can contact us by email at": "يمكنك الاتصال بنا عن طريق البريد الإلكتروني على",
    "or by phone at": "أو عن طريق الهاتف على",
    "Our team is available 7 days a week, 24 hours a day.": "فريقنا متوفر 7 أيام في الأسبوع، 24 ساعة في اليوم.",

    // ── Shipping Policy ──────────────────────────────────────────────────────────
    "SHIPPING POLICY — GULF REGION": "سياسة الشحن — منطقة الخليج العربي",
    "1. Delivery Coverage": "1. تغطية التوصيل",
    "COSIMA delivers its beauty and elegance products across all six Gulf Cooperation Council (GCC) countries:": "تقوم كوزيما بتوصيل منتجات التجميل والأناقة الخاصة بها إلى جميع دول مجلس التعاون الخليجي الست:",
    "United Arab Emirates (UAE)": "الإمارات العربية المتحدة (UAE)",
    "Kingdom of Saudi Arabia (KSA)": "المملكة العربية السعودية (KSA)",
    "Sultanate of Oman": "سلطنة عمان",
    "We partner with trusted international and regional logistics providers to ensure reliable nationwide coverage within each country.": "نحن نشترك مع مقدمي خدمات لوجستية دوليين وإقليميين موثوقين لضمان تغطية وطنية موثوقة داخل كل دولة.",
    "2. Order Processing Times": "2. أوقات معالجة الطلبات",
    "All orders are processed within 24 to 48 business hours after payment confirmation. Orders placed on weekends or public holidays will be processed on the next available business day.": "تتم معالجة جميع الطلبات في غضون 24 إلى 48 ساعة عمل بعد تأكيد الدفع. الطلبات المقدمة في عطلات نهاية الأسبوع أو العطلات الرسمية سيتم معالجتها في يوم العمل التالي المتاح.",
    "You will receive an order confirmation email immediately after your purchase, followed by a shipping confirmation once your order has been dispatched.": "ستتلقى رسالة تأكيد بالبريد الإلكتروني فورًا بعد الشراء، تليها رسالة تأكيد الشحن بمجرد إرسال طلبك.",
    "3. Estimated Delivery Times": "3. أوقات التوصيل المقدرة",
    "Delivery times vary by destination. The following table provides estimated timeframes:": "تختلف أوقات التوصيل حسب الوجهة. يوضح الجدول التالي الأطر الزمنية المقدرة:",
    "Standard Delivery": "التوصيل العادي",
    "Express Delivery": "التوصيل السريع",
    "3–5 business days": "3–5 أيام عمل",
    "1–2 business days": "1–2 أيام عمل",
    "4–6 business days": "4–6 أيام عمل",
    "2–3 business days": "2–3 أيام عمل",
    "5–7 business days": "5–7 أيام عمل",
    "3–4 business days": "3–4 أيام عمل",
    "Note: These timeframes are estimates and may be affected by customs clearance, public holidays, adverse weather conditions, or other unforeseen logistical factors. COSIMA will notify you promptly in the event of any significant delay.": "ملاحظة: هذه الأطر الزمنية هي تقديرات وقد تتأثر بالتخليص الجمركي، أو العطلات الرسمية، أو الأحوال الجوية السيئة، أو أي عوامل لوجستية أخرى غير متوقعة. ستقوم كوزيما بإخطارك على الفور في حالة حدوث أي تأخير كبير.",
    "4. Shipping Fees": "4. رسوم الشحن",
    "Shipping costs are calculated based on your order value, destination country, and chosen delivery method. The exact amount will be displayed at checkout before order confirmation.": "يتم حساب تكاليف الشحن بناءً على قيمة طلبك، وبلد الوجهة، وطريقة التوصيل المحددة. سيتم عرض المبلغ الدقيق عند الدفع قبل تأكيد الطلب.",
    "Shipping Method": "طريقة الشحن",
    "Order Value": "قيمة الطلب",
    "Cost": "التكلفة",
    "Standard Shipping": "الشحن العادي",
    "Under AED 300": "أقل من 300 درهم إماراتي",
    "AED 25–40": "25–40 درهم إماراتي",
    "AED 300 and above": "300 درهم إماراتي وأكثر",
    "FREE": "مجاني",
    "Express Shipping": "الشحن السريع",
    "All orders": "جميع الطلبات",
    "AED 60–80": "60–80 درهم إماراتي",
    "*Thresholds and fees may vary slightly by destination country. Final amounts are confirmed at checkout.": "قد تختلف الحدود والرسوم قليلاً حسب بلد الوجهة. يتم تأكيد المبالغ النهائية عند الدفع.",
    "5. Order Tracking": "5. تتبع الطلب",
    "Once your order has been dispatched, you will receive a shipping confirmation email containing a tracking number. You can use this number to monitor your delivery status directly on our logistics partner's website.": "بمجرد إرسال طلبك، ستتلقى رسالة تأكيد الشحن بالبريد الإلكتروني تحتوي على رقم التتبع. يمكنك استخدام هذا الرقم لمراقبة حالة التوصيل مباشرة على موقع شريكنا اللوجستي.",
    "For any tracking issues or inquiries, please contact our customer service team using the details provided at the end of this policy.": "لأي مشاكل أو استفسارات تتعلق بالتتبع، يرجى الاتصال بفريق خدمة العملاء لدينا باستخدام التفاصيل القدمة في نهاية هذه السياسة.",
    "6. Receiving Your Order": "6. استلام طلبك",
    "Upon receiving your package, we recommend the following:": "عند استلام طردك، نوصي بما يلي:",
    "Inspect the packaging for any visible damage before accepting delivery.": "فحص العبوة بحثًا عن أي تلف ظاهر قبل قبول التوصيل.",
    "Verify the contents match your order.": "التحقق من مطابقة المحتويات لطلبك.",
    "Report any damage, missing items, or discrepancies to the delivery agent immediately and notify COSIMA within 24 hours of receipt.": "الإبلاغ عن أي تلف أو عناصر مفقودة أو فروق لوكيل التوصيل على الفور وإخطار كوزيما في غضون 24 ساعة من الاستلام.",
    "For issues with your order, please refer to our Returns & Exchange Policy for further guidance.": "في حال وجود مشاكل في طلبك، يرجى الرجوع إلى سياسة المرتجعات والاستبدال لمزيد من التوجيه.",
    "7. Customs & Import Duties": "7. الجمارك ورسوم الاستيراد",
    "Orders shipped to GCC countries may be subject to local customs duties, taxes, or import fees upon arrival. These charges are determined by the destination country's customs authority and are the sole responsibility of the customer.": "قد تخضع الطلبات المشحونة إلى دول مجلس التعاون الخليجي للرسوم الجمركية المحلية أو الضرائب أو رسوم الاستيراد عند وصولها. يتم تحديد هذه الرسوم من قبل سلطة الجمارك في بلد الوجهة وهي مسؤولية العميل وحده.",
    "COSIMA is not responsible for delays caused by customs processing. We recommend checking your country's import regulations for beauty and cosmetic products before placing your order.": "كوزيما ليست مسؤولة عن التأخيرات الناجمة عن المعالجة الجمركية. نوصي بالتحقق من لوائح الاستيراد في بلدك الخاصة بمنتجات التجميل ومستحضرات التجميل قبل تقديم طلبك.",
    "8. Failed or Missed Delivery": "8. التوصيل الفاشل أو الفائت",
    "In the event of a failed delivery attempt, the carrier will typically:": "في حالة محاولة توصيل فاشلة، عادة ما يقوم الناقل بما يلي:",
    "Make a second delivery attempt on the following business day.": "إجراء محاولة توصيل ثانية في يوم العمل التالي.",
    "Leave a delivery notification with instructions for collection from a local depot or pickup point.": "ترك إشعار توصيل مع تعليمات للاستلام من مستودع محلي أو نقطة استلام.",
    "If a package is returned to us due to repeated failed delivery attempts or an incorrect address provided by the customer, re-shipping fees will be charged to the customer.": "إذا تمت إعادة الطرد إلينا بسبب تكرار محاولات التوصيل الفاشلة أو تقديم عنوان غير صحيح من قبل العميل، فسيتم فرض رسوم إعادة الشحن على العميل.",
    "9. Contact Us": "9. اتصل بنا",
    "For any questions regarding your shipment or delivery, our customer service team is here to help:": "لأي أسئلة تتعلق بشحنتك أو توصيلها، فإن فريق خدمة العملاء لدينا هنا للمساعدة:",

    // ── Returns & Exchange Policy ────────────────────────────────────────────────
    "RETURNS & EXCHANGE POLICY — GULF REGION": "سياسة المرتجعات والاستبدال — منطقة الخليج العربي",
    "At COSIMA, your satisfaction is our priority. We understand that occasionally a product may not meet your expectations. This policy outlines the conditions and procedures for returns and exchanges for orders placed on www.cosima.beauty and delivered across the Gulf Cooperation Council (GCC) region.": "في كوزيما، رضاكم هو أولويتنا. نحن نتفهم أنه في بعض الأحيان قد لا يلبي المنتج توقعاتك. تحدد هذه السياسة الشروط والإجراءات الخاصة بالمرتجعات والاستبدال للطلبات المقدمة على www.cosima.beauty والتي يتم توصيلها عبر دول مجلس التعاون الخليجي.",
    "1. Return & Exchange Window": "1. فترة الإرجاع والاستبدال",
    "You have 14 calendar days from the date of delivery to request a return or exchange. Requests submitted after this period will not be accepted.": "لديك 14 يومًا تقويميًا من تاريخ التوصيل لطلب إرجاع أو استبدال. لن يتم قبول الطلبات المقدمة بعد هذه الفترة.",
    "To be eligible, items must meet all of the following conditions:": "لكي تكون العناصر مؤهلة، يجب أن تفي بجميع الشروط التالية:",
    "The product is unused and in its original, sealed condition.": "المنتج غير مستخدم وفي حالته الأصلية المغلقة.",
    "Original packaging, labels, and accessories are intact.": "التعبئة والتغليف الأصلي والملصقات والملحقات سليمة.",
    "Proof of purchase (order confirmation or invoice) is provided.": "يتم تقديم إثبات الشراء (تأكيد الطلب أو الفاتورة).",
    "The request is submitted within 14 days of the confirmed delivery date.": "يتم تقديم الطلب في غضون 14 يومًا من تاريخ التوصيل المؤكد.",
    "2. Eligibility at a Glance": "2. الأهلية في لمحة",
    "Return Eligible?": "هل يقبل الإرجاع؟",
    "Exchange Eligible?": "هل يقبل الاستبدال؟",
    "Unused, sealed product": "منتج غير مستخدم ومغلق",
    "Opened but unused": "مفتوح ولكن غير مستخدم",
    "Damaged on arrival": "تالف عند الوصول",
    "Wrong item received": "تم استلام عنصر خاطئ",
    "Used product": "منتج مستخدم",
    "Past 14-day window": "تجاوز فترة 14 يومًا",
    "Yes": "نعم",
    "No": "لا",
    "Case by case": "كل حالة على حدة",
    "3. Non-Returnable Items": "3. العناصر غير القابلة للإرجاع",
    "For hygiene and safety reasons, the following items cannot be returned or exchanged:": "لأسباب تتعلق بالنظافة والسلامة، لا يمكن إرجاع العناصر التالية أو استبدالها:",
    "Opened or used beauty, skincare, or cosmetic products.": "منتجات التجميل أو العناية بالبشرة أو مستحضرات التجميل المفتوحة أو المستخدمة.",
    "Products without original packaging or missing seals.": "المنتجات بدون تغليف أصلي أو الأختام المفقودة.",
    "Items purchased during final sale or promotional events (clearly marked at time of purchase).": "العناصر المشتراة أثناء التصفية النهائية أو الأحداث الترويجية (المحددة بوضوح وقت الشراء).",
    "Gift cards or vouchers.": "بطاقات الهدايا أو القسائم.",
    "These restrictions are in place to protect the health and safety of all our customers and are in line with GCC consumer protection standards.": "تُفرض هذه القيود لحماية صحة وسلامة جميع عملائنا وتتماشى مع معايير حماية المستهلك بدول الخليج العربي.",
    "4. Damaged or Incorrect Items": "4. العناصر التالفة أو غير الصحيحة",
    "If you receive a damaged, defective, or incorrect item, please notify us within 24 hours of delivery. To process your claim, we will require:": "إذا استلمت عنصرًا تالفًا أو معيبًا أو غير صحيح، يرجى إخطارنا في غضون 24 ساعة من التوصيل. لمعالجة مطالبتك، سنطلب:",
    "Clear photographs of the damaged or incorrect item.": "صور واضحة للعنصر التالف أو غير الصحيح.",
    "A photo of the outer packaging showing any visible damage.": "صورة للتغليف الخارجي تظهر أي ضرر مرئي.",
    "Your order number and a brief description of the issue.": "رقم طلبك ووصف قصير للمشكلة.",
    "COSIMA will cover all return shipping costs and arrange a replacement or full refund at no additional charge to you.": "ستغطي كوزيما جميع تكاليف شحن الإرجاع وترتيب استبدال أو استرداد كامل للمبلغ دون أي تكلفة إضافية عليك.",
    "5. How to Submit a Return or Exchange Request": "5. كيفية تقديم طلب إرجاع أو استبدال",
    "Step": "الخطوة",
    "Action": "الإجراء",
    "Timeframe": "الإطار الزمني",
    "Contact our customer service team by email": "اتصل بفريق خدمة العملاء لدينا عبر البريد الإلكتروني",
    "Within 14 days of receipt": "في غضون 14 يومًا من الاستلام",
    "Receive a Return Merchandise Authorization (RMA) number": "استلام رقم ترخيص إرجاع البضائع (RMA)",
    "Within 48 business hours": "في غضون 48 ساعة عمل",
    "Ship the item(s) in original packaging with RMA number clearly marked": "شحن العناصر في عبوتها الأصلية مع كتابة رقم RMA بوضوح",
    "Within 7 days of RMA issuance": "في غضون 7 أيام من إصدار RMA",
    "COSIMA inspects the returned item(s)": "تقوم كوزيما بفحص العناصر المرتجعة",
    "3-5 business days upon receipt": "3-5 أيام عمل عند الاستلام",
    "Refund or exchange processed and confirmed by email": "معالجة الاسترداد أو الاستبدال والتأكيد بالبريد الإلكتروني",
    "5-10 business days": "5-10 أيام عمل",
    "Do not return items without a valid RMA number. Unauthorized returns will not be accepted and may be returned to sender at the customer's expense.": "لا تعيد أي عناصر بدون رقم RMA صالح. لن يتم قبول المرتجعات غير المصرح بها وقد تتم إعادتها إلى المرسل على نفقة العميل.",
    "6. Return Shipping": "6. شحن المرتجعات",
    "Unless the return is due to a COSIMA error (wrong or defective item), return shipping costs are the responsibility of the customer. We recommend using a trackable shipping service to ensure safe return of the product.": "ما لم يكن الإرجاع بسبب خطأ من كوزيما (منتج خاطئ أو معيب)، فإن العميل يتحمل تكاليف شحن الإرجاع. نوصي باستخدام خدمة شحن قابلة للتتبع لضمان الإرجاع الآمن للمنتج.",
    "COSIMA is not responsible for items lost or damaged during return transit.": "كوزيما ليست مسؤولة عن العناصر المفقودة أو التالفة أثناء نقل المرتجعات.",
    "7. Refunds": "7. المبالغ المستردة",
    "Once we receive and inspect your return, we will notify you by email of the approval or rejection of your refund.": "بمجرد استلامنا لمرتجعك وفحصه، سنخطرك عبر البريد الإلكتروني بالموافقة على استرداد الأموال أو رفضه.",
    "Approved refunds will be processed as follows:": "سيتم معالجة المبالغ المستردة المعتمدة على النحو التالي:",
    "Credit/Debit Card: Refunded to the original payment method within 5–10 business days.": "بطاقة الائتمان/الخصم: تُعاد إلى طريقة الدفع الأصلية في غض غضون 5–10 أيام عمل.",
    "Bank Transfer: Processed within 7–14 business days depending on your bank.": "التحويل البنكي: يتم معالجته في غضون 7–14 يوم عمل حسب بنكك.",
    "Store Credit: Available immediately upon approval and valid for 12 months.": "رصيد المتجر: متاح فورًا عند الموافقة وصالح لمدة 12 شهرًا.",
    "Original shipping fees are non-refundable unless the return is due to our error.": "رسوم الشحن الأصلية غير قابلة للاسترداد ما لم يكن الإرجاع بسبب خطأ منا.",
    "8. Exchanges": "8. الاستبدال",
    "If you would like to exchange an item for a different variant (shade, size, or formulation), please indicate your preference when submitting your return request. Exchanges are subject to stock availability.": "إذا كنت ترغب في استبدال عنصر بمتغير آخر (درجة اللون أو الحجم أو التركيبة)، يرجى تحديد تفضيلك عند تقديم طلب الإرجاع. الاستبدال يخضع لتوفر المخزون.",
    "If your requested exchange item is unavailable, we will offer you the choice of a full refund or store credit.": "إذا كان عنصر الاستبدال المطلوب غير متوفر، فسنقدم لك خيار استرداد الأموال بالكامل أو الحصول على رصيد متجر.",
    "9. GCC Consumer Rights": "9. حقوق المستهلك في الخليج العربي",
    "This policy is designed to comply with consumer protection regulations across GCC member states. Customers retain all statutory rights afforded under local laws. Nothing in this policy limits or excludes your legal rights as a consumer.": "تم تصميم هذه السياسة للامتثال للوائح حماية المستهلك في جميع الدول الأعضاء في مجلس التعاون الخليجي. يحتفظ العملاء بجميع الحقوق القانونية التي تمنحها القوانين المحلية. لا شيء في هذه السياسة يحد من حقوقك القانونية كمستهلك أو يستبعدها.",
    "UAE: Federal Law No. 15 of 2020 on Consumer Protection.": "الإمارات: القانون الاتحادي رقم 15 لسنة 2020 بشأن حماية المستهلك.",
    "KSA: Consumer Protection Law issued by Royal Decree M/25.": "السعودية: نظام حماية المستهلك الصادر بالمرسوم الملكي م/25.",
    "Kuwait, Qatar, Bahrain, Oman: Applicable national consumer protection legislation.": "الكويت، قطر، البحرين، عمان: تشريعات حماية المستهلك الوطنية المعمول بها.",

    // ── Privacy Policy ───────────────────────────────────────────────────────────
    "At COSIMA, we are committed to protecting the privacy of our customers and users. This privacy policy describes how we collect, use, disclose, process, and protect your personal information when you visit our website www.cosima.beauty/ and use our services. We comply with the provisions of Law No. 09-08 relating to the protection of individuals with regard to the processing of personal data in Morocco and the General Data Protection Regulation (GDPR) of the European Union.": "في كوزيما، نحن ملتزمون بحماية خصوصية عملائنا ومستخدمينا. تصف سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها والإفصاح عنها ومعالجتها وحمايتها عند زيارة موقعنا الإلكتروني www.cosima.beauty واستخدام خدماتنا. نحن نمتثل لأحكام القانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي في المغرب واللائحة العامة لحماية البيانات (GDPR) للاتحاد الأوروبي.",
    "Information We Collect": "المعلومات التي نجمعها",
    "We collect different categories of information to provide and improve our services:": "نحن نجمع فئات مختلفة من المعلومات لتقديم خدماتنا وتحسينها:",
    "Personal Identification Information:": "معلومات التعريف الشخصية:",
    "Last name, first name, email address, postal address, phone number, date of birth, login information (username, encrypted password).": "اسم العائلة، الاسم الأول، البريد الإلكتروني، العنوان البريدي، رقم الهاتف، تاريخ الميلاد، معلومات تسجيل الدخول (اسم المستخدم، كلمة المرور المشفرة).",
    "Order and Transaction Information:": "معلومات الطلبات والمعاملات:",
    "Details of purchased products, order history, payment information (not stored directly by COSIMA, but processed by secure payment providers).": "تفاصيل المنتجات المشتراة، تاريخ الطلبات، معلومات الدفع (لا يتم تخزينها مباشرة بواسطة كوزيما، ولكن تتم معالجتها بواسطة مزودي خدمة دفع آمنين).",
    "Technical and Navigation Information:": "المعلومات التقنية ومعلومات التصفح:",
    "IP address, browser type, operating system, pages visited, time spent on the site, referring URLs, location data (if enabled).": "عنوان IP، نوع المتصفح، نظام التشغيل، الصفحات التي تمت زيارتها، الوقت الذي تم قضاؤه على الموقع، روابط الإحالة، بيانات الموقع الجغرافي (إذا كانت مفعلة).",
    "Communication Information:": "معلومات الاتصال:",
    "Correspondence with our customer service, comments, product reviews.": "المراسلات مع خدمة العملاء لدينا، والتعليقات، وتقييمات المنتجات.",
    "How We Use Your Information": "كيف نستخدم معلوماتك",
    "We use the collected information for the following purposes:": "نحن نستخدم المعلومات التي تم جمعها للأغراض التالية:",
    "Order Processing:": "معالجة الطلبات:",
    "Manage your purchases, deliver products, process payments, and send you order-related notifications.": "إدارة مشترياتك، وتوصيل المنتجات، ومعالجة المدفوعات، وإرسال الإشعارات المتعلقة بالطلب.",
    "Customer Account Management:": "إدارة حساب العميل:",
    "Create and manage your account, identify you, and personalize your experience on our site.": "إنشاء حسابك وإدارته، والتعرف عليك، وتخصيص تجربتك على موقعنا.",
    "Service Improvement:": "تحسين الخدمة:",
    "Analyze the use of our site to improve our products, services, and the user experience.": "تحليل استخدام موقعنا لتحسين منتجاتنا وخدماتنا وتجربة المستخدم.",
    "Marketing and Communication:": "التسويق والاتصال:",
    "Send you information about our products, promotions, and special offers, subject to your prior consent (opt-in).": "إرسال معلومات لك عن منتجاتنا، وعروضنا الترويجية، وعروضنا الخاصة، بشرط موافقتك المسبقة.",
    "Security and Fraud Prevention:": "الأمن ومنع الاحتيال:",
    "Protect our site and users against fraud and illegal activities.": "حماية موقعنا ومستخدمينا ضد الاحتيال والأنشطة غير القانونية.",
    "Legal Compliance:": "الامتثال القانوني:",
    "Comply with our legal and regulatory obligations, particularly under Law 09-08 and the GDPR.": "الامتثال لالتزاماتنا القانونية والتنظيمية، لا سيما بموجب القانون 09-08 واللائحة العامة لحماية البيانات (GDPR).",
    "Sharing and Disclosure of Information": "مشاركة وإفشاء المعلومات",
    "We do not sell, rent, or trade your personal information with third parties. We may share your information with:": "نحن لا نبيع أو نؤجر أو نتبادل معلوماتك الشخصية مع أطراف ثالثة. قد نشارك معلوماتك مع:",
    "Service Providers:": "مقدمو الخدمات:",
    "Delivery partners, payment providers, website hosts, data analytics services, who act on our behalf and are required to respect the confidentiality of your data.": "شركاء التوصيل، ومقدمو خدمات الدفع، ومستضيفو المواقع الإلكترونية، وخدمات تحليل البيانات، الذين يعملون نيابة عنا والمطالبون باحترام سرية بياناتك.",
    "Legal Authorities:": "السلطات القانونية:",
    "If required by law or in response to a valid legal process (e.g., a court order or government request).": "إذا كان ذلك مطلوبًا بموجب القانون أو استجابة لإجراءات قانونية صالحة (على سبيل المثال، أمر قضائي أو طلب حكومي).",
    "International Data Transfers:": "نقل البيانات الدولي:",
    "If your data is transferred outside of Morocco or the European Union, we ensure that appropriate safeguards are in place to protect your data, in accordance with Law 09-08 and the GDPR (e.g., standard contractual clauses).": "إذا تم نقل بياناتك خارج المغرب أو الاتحاد الأوروبي، فإننا نضمن وجود ضمانات مناسبة لحماية بياناتك، وفقًا للقانون 09-08 واللائحة العامة لحماية البيانات (مثل البنود التعاقدية القياسية).",
    "Data Retention Period": "فترة الاحتفاظ بالبيانات",
    "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements. Order data is generally kept for the legal duration required for product warranties and accounting.": "نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضروريًا لتحقيق الأغراض التي جمعت من أجلها، بما في ذلك تلبية أي متطلبات قانونية أو محاسبية أو تقارير. يتم الاحتفاظ ببيانات الطلب عمومًا للمدة القانونية المطلوبة لضمانات المنتج والمحاسبة.",
    "Your Data Protection Rights": "حقوق حماية بياناتك",
    "In accordance with Law 09-08 and the GDPR, you have the following rights regarding your personal data:": "وفقًا للقانون 09-08 واللائحة العامة لحماية البيانات (GDPR)، لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:",
    "Right of Access:": "حق الوصول:",
    "You can request a copy of the personal information we hold about you.": "يمكنك طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.",
    "Right to Rectification:": "حق التصحيح:",
    "You can request the correction of any inaccurate or incomplete information.": "يمكنك طلب تصحيح أي معلومات غير دقيقة أو غير كاملة.",
    "Right to Object:": "حق الاعتراض:",
    "You can object to the processing of your personal data for legitimate reasons, especially for direct marketing purposes.": "يمكنك الاعتراض على معالجة بياناتك الشخصية لأسباب مشروعة، خاصة لأغراض التسويق المباشر.",
    "Right to Erasure (Right to be Forgotten):": "حق المسح (الحق في النسيان):",
    "You can request the deletion of your personal data in certain circumstances.": "يمكنك طلب حذف بياناتك الشخصية في ظروف معينة.",
    "Right to Restriction of Processing:": "حق تقييد المعالجة:",
    "You can request the limitation of the processing of your data in certain situations.": "يمكنك طلب تحديد معالجة بياناتك في حالات معينة.",
    "Right to Data Portability:": "حق نقل البيانات:",
    "You can request to receive your personal data in a structured, commonly used, and machine-readable format, and transmit it to another data controller.": "يمكنك طلب استلام بياناتك الشخصية بتنسيق منظم وشائع الاستخدام وقابل للقراءة آليًا، ونقلها إلى مراقب بيانات آخر.",
    "Right to Withdraw Consent:": "حق سحب الموافقة:",
    "If the processing is based on your consent, you have the right to withdraw it at any time.": "إذا كانت المعالجة قائمة على موافقتك، فلديك الحق في سحبها في أي وقت.",
    "To exercise these rights, please contact us using the information provided below.": "لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة أدناه.",
    "Data Security": "أمن البيانات",
    "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. This includes encryption, firewalls, physical access controls, and security management procedures.": "نحن نطبق تدابير أمنية تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية ضد الوصول غير المصرح به، أو الإفصاح، أو التغيير، أو التدمير. يشمل ذلك التشفير، وجدران الحماية، وضوابط الوصول المادي، وإجراءات إدارة الأمن.",
    "Cookies and Similar Technologies": "ملفات تعريف الارتباط والتقنيات المشابهة",
    "Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can accept or decline cookies through your browser settings. For more information, please see our Cookie Policy.": "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك، وتحليل حركة المرور على الموقع، وتخصيص المحتوى. يمكنك قبول ملفات تعريف الارتباط أو رفضها من خلال إعدادات متصفحك. لمزيد من المعلومات، يرجى الاطلاع على سياسة ملفات تعريف الارتباط الخاصة بنا.",
    "Changes to This Privacy Policy": "تغييرات على سياسة الخصوصية هذه",
    "We may update this privacy policy from time to time. Any changes will be posted on this page with a new effective date. We encourage you to review this page regularly to stay informed about our privacy practices.": "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ نفاذ جديد. نحن نشجعك على مراجعة هذه الصفحة بانتظام للبقاء على اطلاع بممارسات الخصوصية لدينا.",

    // ── Cookie Policy ────────────────────────────────────────────────────────────
    "COOKIE POLICY — GULF REGION": "سياسة ملفات تعريف الارتباط — منطقة الخليج العربي",
    "This Cookie Policy explains how COSIMA (\"we\", \"us\", or \"our\") uses cookies and similar tracking technologies when you visit our website at www.cosima.beauty. It describes what those technologies are, why we use them, and your rights to control our use of them.": "توضح سياسة ملفات تعريف الارتباط هذه كيف تستخدم كوزيما (يُشار إليها بـ \"نحن\" أو \"نا\") ملفات تعريف الارتباط وتقنيات التتبع المماثلة عند زيارة موقعنا الإلكتروني www.cosima.beauty. وهي تصف ماهية تلك التقنيات، ولماذا نستخدمها، وحقوقك في التحكم في استخدامنا لها.",
    "By continuing to use our Website, you consent to the use of cookies in accordance with this Policy. You may adjust or withdraw your consent at any time using the methods described below.": "من خلال الاستمرار في استخدام موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لهذه السياسة. يمكنك ضبط موافقتك أو سحبها في أي وقت باستخدام الطرق الموضحة أدناه.",
    "By continuing to use our Website, you consent to the use of cookies in accordance with this Policy. You may withdraw or adjust your consent at any time using the methods described below.": "من خلال الاستمرار في استخدام موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط وفقًا لهذه السياسة. يمكنك سحب موافقتك أو ضبطها في أي وقت باستخدام الطرق الموضحة أدناه.",
    "1. What Are Cookies?": "1. ما هي ملفات تعريف الارتباط؟",
    "Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites function efficiently, provide a better user experience, and give website owners useful information about how their site is being used.": "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك (كمبيوتر، هاتف ذكي، أو جهاز لوحي) عند زيارة موقع ويب. وهي تُستخدم على نطاق واسع لجعل مواقع الويب تعمل بكفاءة، وتقديم تجربة مستخدم أفضل، وإعطاء أصحاب المواقع معلومات مفيدة حول كيفية استخدام موقعهم.",
    "In addition to cookies, we may use similar tracking technologies such as:": "بالإضافة إلى ملفات تعريف الارتباط، قد نستخدم تقنيات تتبع مماثلة مثل:",
    "Pixels / Web Beacons:": "البكسلات / منارات الويب:",
    "Tiny invisible images embedded in web pages or emails that track whether content has been viewed.": "صور صغيرة غير مرئية مدمجة في صفحات الويب أو رسائل البريد الإلكتروني تتتبع ما إذا كان المحتوى قد تم عرضه أم لا.",
    "Local Storage:": "التخزين المحلي:",
    "Data stored directly in your browser that persists beyond a session.": "البيانات المخزنة مباشرة في متصفحك والتي تستمر بعد انتهاء الجلسة.",
    "Session Storage:": "تخزين الجلسة:",
    "Temporary data cleared when you close your browser tab.": "البيانات المؤقتة التي يتم مسحها عند إغلاق علامة تبويب المتصفح الخاصة بك.",
    "2. Types of Cookies We Use": "2. أنواع ملفات تعريف الارتباط التي نستخدمها",
    "Essential Cookies": "ملفات تعريف الارتباط الأساسية",
    "These cookies are strictly necessary for the Website to function. They enable core features such as secure login, shopping cart management, and session continuity. Essential cookies cannot be disabled without affecting Website functionality.": "ملفات تعريف الارتباط هذه ضرورية للغاية ليعمل الموقع. وهي تمكن الميزات الأساسية مثل تسجيل الدخول الآمن، وإدارة سلة التسوق، واستمرار الجلسة. لا يمكن تعطيل ملفات تعريف الارتباط الأساسية دون التأثير على وظائف الموقع.",
    "Analytics Cookies": "ملفات تعريف الارتباط التحليلية",
    "These cookies help us understand how visitors interact with our Website by collecting anonymous data on pages visited, time spent, and navigation paths. This information helps us improve our Website and user experience.": "تساعدنا ملفات تعريف الارتباط هذه على فهم كيفية تفاعل الزوار مع موقعنا عن طريق جمع بيانات مجهولة المصدر حول الصفحات التي تمت زيارتها، والوقت الذي تم قضاؤه، ومسارات التصفح. تساعدنا هذه المعلومات في تحسين موقعنا وتجربة المستخدم.",
    "Marketing & Advertising Cookies": "ملفات تعريف الارتباط للتسويق والإعلان",
    "These cookies track your browsing activity across websites to deliver personalized advertisements relevant to your interests. They are set by our advertising partners (Meta, TikTok, Google) and help us measure the effectiveness of our marketing campaigns.": "تتتبع ملفات تعريف الارتباط هذه نشاط التصفح الخاص بك عبر مواقع الويب لتقديم إعلانات مخصصة ذات صلة باهتماماتك. يتم تعيينها من قبل شركائنا الإعلانيين (ميتا، تيك توك، جوجل) وتساعدنا في قياس مدى فعالية حملاتنا التسويقية.",
    "Functional Cookies": "ملفات تعريف الارتباط الوظيفية",
    "These cookies remember your preferences and settings (such as language and currency) to provide a more personalized and convenient browsing experience.": "تتذكر ملفات تعريف الارتباط هذه تفضيلاتك وإعداداتك (مثل اللغة والعملة) لتقديم تجربة تصفح أكثر تخصيصًا وملاءمة.",
    "3. Cookies We Use — Detailed Overview": "3. ملفات تعريف الارتباط التي نستخدمها — نظرة عامة مفصلة",
    "Cookie Type": "نوع ملف تعريف الارتباط",
    "Name / Provider": "الاسم / الموفر",
    "Purpose": "الغرض",
    "Duration": "المدة",
    "Essential": "أساسي",
    "Functional": "وظيفي",
    "Analytics": "تحليلي",
    "Marketing": "تسويقي",
    "session_id": "session_id",
    "Maintains user session": "يحافظ على جلسة المستخدم",
    "Session": "جلسة",
    "cart_token": "cart_token",
    "Preserves shopping cart contents": "يحفظ محتويات سلة التسوق",
    "14 days": "14 يومًا",
    "csrf_token": "csrf_token",
    "Security — prevents cross-site request forgery": "الأمان — يمنع تزوير الطلبات عبر المواقع",
    "lang_pref": "lang_pref",
    "Remembers language preference": "يتذكر تفضيل اللغة",
    "1 year": "سنة واحدة",
    "currency_pref": "currency_pref",
    "Remembers currency selection": "يتذكر اختيار العملة",
    "_ga (Google Analytics)": "_ga (تحليلات جوجل)",
    "Tracks unique visitors and page views": "يتتبع الزوار الفريدين ومشاهدات الصفحات",
    "2 years": "سنتان",
    "_gid (Google Analytics)": "_gid (تحليلات جوجل)",
    "Identifies users for 24-hour analytics": "يحدد المستخدمين للتحليلات على مدار 24 ساعة",
    "24 hours": "24 ساعة",
    "_fbp (Meta Pixel)": "_fbp (ميتا بكسل)",
    "Tracks visits for Facebook ad targeting": "يتتبع الزيارات لاستهداف إعلانات فيسبوك",
    "3 months": "3 أشهر",
    "_tt (TikTok Pixel)": "_tt (تيك توك بكسل)",
    "Measures TikTok ad conversions": "يقيس تحويلات إعلانات تيك توك",
    "_gcl_au (Google Ads)": "_gcl_au (إعلانات جوجل)",
    "Tracks Google Ads conversions": "يتتبع تحويلات إعلانات جوجل",
    "This list may be updated periodically as we add or remove services. Please check this page regularly for the latest information.": "قد يتم تحديث هذه القائمة بشكل دوري مع إضافة خدمات أو إزالتها. يرجى مراجعة هذه الصفحة بانتظام للحصول على أحدث المعلومات.",
    "4. Third-Party Cookies": "4. ملفات تعريف الارتباط الخاصة بأطراف ثالثة",
    "Some cookies on our Website are set by third-party services we use to enhance functionality and marketing. These third parties have their own privacy and cookie policies, which we encourage you to review:": "يتم تعيين بعض ملفات تعريف الارتباط على موقعنا بواسطة خدمات أطراف ثالثة نستخدمها لتحسين الوظائف والتسويق. هذه الأطراف الثالثة لديها سياسات خصوصية وملفات تعريف ارتباط خاصة بها، ونحن نشجعك على مراجعتها:",
    "Google Analytics & Google Ads:": "تحليلات جوجل وإعلانات جوجل:",
    "Meta (Facebook & Instagram):": "ميتا (فيسبوك وإنستغرام):",
    "TikTok:": "تيك توك:",
    "Hotjar:": "هوتجار:",
    "COSIMA does not control these third-party cookies and is not responsible for how these parties use the data they collect.": "لا تتحكم كوزيما في ملفات تعريف الارتباط هذه الخاصة بأطراف ثالثة وليست مسؤولة عن كيفية استخدام هذه الأطراف للبيانات التي يجمعونها.",
    "5. Your Cookie Choices & Controls": "5. خياراتك وضوابط ملفات تعريف الارتباط الخاصة بك",
    "You have the right to accept, decline, or manage cookies at any time. You can exercise this right through the following methods:": "لديك الحق في قبول أو رفض أو إدارة ملفات تعريف الارتباط في أي وقت. يمكنك ممارسة هذا الحق من خلال الطرق التالية:",
    "Cookie Consent Banner": "بنر الموافقة على ملفات تعريف الارتباط",
    "When you first visit our Website, a cookie consent banner will appear. You can choose to accept all cookies, accept only essential cookies, or customize your preferences by category.": "عند زيارة موقعنا لأول مرة، سيظهر بنر الموافقة على ملفات تعريف الارتباط. يمكنك اختيار قبول جميع ملفات تعريف الارتباط، أو قبول ملفات تعريف الارتباط الأساسية فقط، أو تخصيص تفضيلاتك حسب الفئة.",
    "Browser Settings": "إعدادات المتصفح",
    "Most browsers allow you to view, manage, and delete cookies through their settings. Common browser instructions:": "تسمح لك معظم المتصفحات بعرض ملفات تعريف الارتباط وإدارتها وحذفها من خلال إعداداتها. إرشادات المتصفح الشائعة:",
    "Google Chrome: Settings > Privacy and Security > Cookies and other site data": "جوجل كروم: الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع الأخرى",
    "Safari: Preferences > Privacy > Manage Website Data": "سفاري: التفضيلات > الخصوصية > إدارة بيانات موقع الويب",
    "Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data": "موزيلا فايرفوكس: الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات الموقع",
    "Microsoft Edge: Settings > Cookies and site permissions": "مايكروسوفت إيدج: الإعدادات > ملفات تعريف الارتباط وأذونات الموقع",
    "Please note that disabling certain cookies may affect the functionality and performance of our Website.": "يرجى العلم أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف موقعنا وأدائه.",
    "Opt-Out of Analytics & Advertising": "إلغاء الاشتراك في التحليلات والإعلانات",
    "Google Analytics opt-out:": "إلغاء الاشتراك في تحليلات جوجل:",
    "Google Ads personalization:": "تخصيص إعلانات جوجل:",
    "Meta Ad preferences:": "تفضيلات إعلانات ميتا:",
    "6. Cookies and Data Privacy in the GCC": "6. ملفات تعريف الارتباط وخصوصية البيانات في دول الخليج",
    "COSIMA is committed to respecting the privacy of its customers across the Gulf region. Our use of cookies complies with applicable data protection and e-commerce regulations, including:": "تلتزم كوزيما باحترام خصوصية عملائها في جميع أنحاء منطقة الخليج. يتوافق استخدامنا لملفات تعريف الارتباط مع لوائح حماية البيانات والتجارة الإلكترونية المعمول بها، بما في ذلك:",
    "UAE: Federal Decree-Law No. 45 of 2021 on Personal Data Protection.": "الإمارات: مرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية.",
    "KSA: Personal Data Protection Law (PDPL), effective 2023.": "السعودية: نظام حماية البيانات الشخصية (PDPL)، الساري منذ 2023.",
    "Qatar: Law No. 13 of 2016 on Personal Data Privacy Protection.": "قطر: القانون رقم 13 لسنة 2016 بشأن حماية خصوصية البيانات الشخصية.",
    "Bahrain: Personal Data Protection Law (2018).": "البحرين: قانون حماية البيانات الشخصية (2018).",
    "Kuwait & Oman: Applicable national regulations on electronic transactions and data privacy.": "الكويت وعمان: اللوائح الوطنية المعمول بها بشأن المعاملات الإلكترونية وخصوصية البيانات.",
    "Where required by local law, we will seek your explicit consent before placing non-essential cookies on your device.": "عندما يقتضي القانون المحلي ذلك، سنطلب موافقتك الصريحة قبل وضع ملفات تعريف الارتباط غير الأساسية على جهازك.",
    "7. Data Retention": "7. الاحتفاظ بالبيانات",
    "Cookie data is retained only for as long as necessary to fulfill the purposes for which it was collected, as indicated in the cookie table above. Analytics and marketing data collected via cookies may be aggregated and anonymized for statistical purposes and retained for up to 24 months.": "يتم الاحتفاظ ببيانات ملفات تعريف الارتباط فقط للمدة اللازمة لتحقيق الأغراض التي جمعت من أجلها، كما هو موضح في جدول ملفات تعريف الارتباط أعلاه. قد يتم تجميع بيانات التحليل والتسويق التي يتم جمعها عبر ملفات تعريف الارتباط وإخفاء هويتها لأغراض إحصائية والاحتفاظ بها لمدة تصل إلى 24 شهرًا.",
    "8. Updates to This Policy": "8. تحديثات هذه السياسة",
    "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. Any significant changes will be communicated via a notice on our Website. The effective date at the top of this page indicates when the Policy was last revised.": "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في التكنولوجيا أو التشريع أو ممارساتنا التجارية. سيتم الإبلاغ عن أي تغييرات جوهرية عبر إشعار على موقعنا. يشير تاريخ السريان في أعلى هذه الصفحة إلى تاريخ آخر مراجعة للسياسة.",
    "We encourage you to review this Policy periodically to stay informed about how we use cookies.": "نحن نشجعك على مراجعة هذه السياسة بشكل دوري للبقاء على اطلاع بكيفية استخدامنا لملفات تعريف الارتباط.",

    // ── General Terms & Conditions of Sale ─────────────────────────────────────────
    "GENERAL TERMS & CONDITIONS OF SALE — GULF REGION": "الشروط والأحكام العامة للبيع — منطقة الخليج العربي",
    "These General Terms and Conditions of Sale (\"Terms\") govern all purchases made through the COSIMA website (www.cosima.beauty) by customers located in the Gulf Cooperation Council (GCC) region, including the United Arab Emirates, Kingdom of Saudi Arabia, Kuwait, Qatar, Bahrain, and the Sultanate of Oman.": "تحكم هذه الشروط والأحكام العامة للبيع (\"الشروط\") جميع عمليات الشراء التي تتم من خلال موقع كوزيما الإلكتروني (www.cosima.beauty) من قبل العملاء المقيمين في منطقة دول مجلس التعاون الخليجي، بما في ذلك الإمارات العربية المتحدة، المملكة العربية السعودية، الكويت، قطر، البحرين، وسلطنة عمان.",
    "By placing an order with COSIMA, you confirm that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not accept these Terms, please refrain from placing an order.": "من خلال تقديم طلب مع كوزيما، فإنك تؤكد أنك قد قرأت وفهمت وتوافق على الالتزام بهذه الشروط بالكامل. إذا كنت لا تقبل هذه الشروط، يرجى الامتناع عن تقديم طلب.",
    "Article 1 — Company Information": "المادة 1 — معلومات الشركة",
    "Company Name": "اسم الشركة",
    "Legal Form": "الشكل القانوني",
    "E-commerce Beauty & Elegance Brand": "علامة تجارية للتجارة الإلكترونية في الجمال والأناقة",
    "Registered Address": "العنوان المسجل",
    "Dubai, United Arab Emirates": "دبي، الإمارات العربية المتحدة",
    "Website": "الموقع الإلكتروني",
    "Email": "البريد الإلكتروني",
    "Phone": "الهاتف",
    "Article 2 — Definitions": "المادة 2 — تعريفات",
    "For the purposes of these Terms, the following definitions apply:": "لأغراض هذه الشروط، تنطبق التعريفات التالية:",
    "\"COSIMA\" or \"We\" refers to the company operating the COSIMA brand and website.": "يشير لفظ \"كوزيما\" أو \"نحن\" إلى الشركة التي تدير علامة وموقع كوزيما.",
    "\"Customer\" or \"You\" refers to any individual or legal entity placing an order through the Website.": "يشير لفظ \"العميل\" أو \"أنت\" إلى أي شخص طبيعي أو اعتباري يقدم طلبًا من خلال الموقع.",
    "\"Website\" refers to www.cosima.beauty and any associated mobile applications.": "يشير لفظ \"الموقع الإلكتروني\" إلى www.cosima.beauty وأي تطبيقات جوال مرتبطة به.",
    "\"Products\" refers to all beauty, skincare, and elegance items offered for sale on the Website.": "تشير لفظة \"المنتجات\" إلى جميع مستحضرات التجميل والعناية بالبشرة والأناقة المعروضة للبيع على الموقع.",
    "\"Order\" refers to any purchase request submitted by the Customer through the Website.": "يشير لفظ \"الطلب\" إلى أي طلب شراء يقدمه العميل من خلال الموقع.",
    "\"GCC Region\" refers to the six member states of the Gulf Cooperation Council: UAE, KSA, Kuwait, Qatar, Bahrain, and Oman.": "يشير لفظ \"منطقة الخليج\" إلى الدول الأعضاء الست في مجلس التعاون الخليجي: الإمارات، السعودية، الكويت، قطر، البحرين، وعمان.",
    "Article 3 — Scope and Applicability": "المادة 3 — النطاق والصلاحية",
    "These Terms apply exclusively to retail sales made online through the COSIMA Website to customers in the GCC region. They supersede any prior agreements, representations, or understandings between COSIMA and the Customer relating to the subject matter hereof.": "تنطبق هذه الشروط حصريًا على مبيعات التجزئة التي تتم عبر الإنترنت من خلال موقع كوزيما للعملاء في منطقة الخليج العربي. وهي تحل محل أي اتفاقيات أو تعهدات أو تفاهمات سابقة بين كوزيما والعميل تتعلق بموضوع هذه الاتفاقية.",
    "COSIMA reserves the right to amend these Terms at any time. Updated Terms will be posted on the Website with a revised effective date. Continued use of the Website following any update constitutes acceptance of the revised Terms.": "تحتفظ كوزيما بالحق في تعديل هذه الشروط في أي وقت. وسيتم نشر الشروط المحدثة على الموقع مع تاريخ نفاذ مراجع. ويشكل الاستمرار في استخدام الموقع بعد أي تحديث قبولاً للشروط المعدلة.",
    "Article 4 — Products and Availability": "المادة 4 — المنتجات وتوفرها",
    "COSIMA offers a curated selection of beauty, skincare, and elegance products. All Products are subject to availability. We reserve the right to withdraw, modify, or discontinue any Product without prior notice.": "تقدم كوزيما تشكيلة مختارة من منتجات التجميل والعناية بالبشرة والأناقة. تخضع جميع المنتجات للتوفر. ونحتفظ بالحق في سحب أو تعديل أو إيقاف أي منتج دون إشعار مسبق.",
    "Product descriptions, images, and specifications on the Website are provided in good faith and are as accurate as reasonably possible. However, minor variations in color, texture, or packaging may occur due to screen settings or manufacturing updates. Such variations do not constitute a defect.": "يتم تقديم أوصاف المنتجات وصورها ومواصفاتها على الموقع بحسن نية وهي دقيقة قدر الإمكان عملياً. ومع ذلك، قد تحدث اختلافات طفيفة في اللون أو الملمس أو التعبئة بسبب إعدادات الشاشة أو تحديثات التصنيع. ولا تشكل هذه الاختلافات عيبًا.",
    "In the event that an ordered Product is out of stock after order placement, COSIMA will notify the Customer promptly and offer either a full refund or an alternative product of equivalent value.": "في حالة عدم توفر المنتج المطلوب بعد تقديم الطلب، ستقوم كوزيما بإخطار العميل على الفور وتقديم خيار استرداد كامل المبلغ أو منتج بديل بالقيمة نفسها.",
    "Article 5 — Pricing and Currency": "المادة 5 — التسعير والعملة",
    "All prices displayed on the Website are quoted in Moroccan Dirhams (MAD) or the applicable GCC local currency as indicated at checkout. Prices include applicable taxes where required by law.": "جميع الأسعار المعروضة على الموقع مقومة بالدرهم المغربي (MAD) أو العملة المحلية المطبقة لدول الخليج كما هو موضح عند الدفع. تشمل الأسعار الضرائب المعمول بها حيثما يقتضي القانون.",
    "COSIMA reserves the right to modify prices at any time without prior notice. The price applicable to an Order is the price displayed at the time the Order is confirmed by the Customer.": "تحتفظ كوزيما بالحق في تعديل الأسعار في أي وقت دون إشعار مسبق. السعر المطبق على الطلب هو السعر المعروض وقت تأكيد الطلب من قبل العميل.",
    "Customers in GCC countries may be subject to customs duties, import taxes, or VAT upon delivery. These charges are the sole responsibility of the Customer and are not included in the product price or shipping fees displayed on the Website.": "قد يخضع العملاء في دول مجلس التعاون الخليجي للرسوم الجمركية أو ضرائب الاستيراد أو ضريبة القيمة المضافة عند التوصيل. وتعتبر هذه الرسوم مسؤولية العميل وحده ولا يتم تضمينها في سعر المنتج أو رسوم الشحن المعروضة على الموقع.",
    "Article 6 — Order Process": "المادة 6 — عملية الطلب",
    "To place an Order, the Customer must:": "لتقديم طلب، يجب على العميل:",
    "Select the desired Products and add them to the shopping cart.": "تحديد المنتجات المطلوبة وإضافتها إلى سلة التسوق.",
    "Provide accurate and complete billing and delivery information.": "تقديم معلومات فوترة وتوصيل دقيقة وكاملة.",
    "Review the Order summary, including total price and shipping fees.": "مراجعة ملخص الطلب، بما في ذلك السعر الإجمالي ورسوم الشحن.",
    "Accept these Terms and Conditions.": "قبول هذه الشروط والأحكام.",
    "Confirm payment via one of the accepted payment methods.": "تأكيد الدفع عبر إحدى طرق الدفع المقبولة.",
    "An order confirmation email will be sent to the Customer's registered email address upon successful submission. This confirmation constitutes acknowledgment of the Order but does not represent final acceptance by COSIMA.": "سيتم إرسال رسالة تأكيد بالبريد الإلكتروني للطلب إلى البريد الإلكتروني المسجل للعميل عند التقديم بنجاح. يشكل هذا التأكيد إقرارًا بالطلب ولكنه لا يمثل قبولًا نهائيًا من كوزيما.",
    "COSIMA reserves the right to cancel or refuse any Order in cases of suspected fraud, incorrect pricing, stock unavailability, or failure to meet eligibility requirements. The Customer will be notified and any payment received will be refunded in full.": "تحتفظ كوزيما بالحق في إلغاء أو رفض أي طلب في حالات الاشتباه في الاحتيال، أو التسعير الخاطئ، أو عدم توفر المخزون، أو عدم تلبية متطلبات الأهلية. سيتم إخطار العميل وسيتم رد أي مبالغ مدفوعة بالكامل.",
    "Article 7 — Payment": "المادة 7 — الدفع",
    "COSIMA accepts the following payment methods:": "تقبل كوزيما طرق الدفع التالية:",
    "Credit and debit cards (Visa, Mastercard, American Express).": "بطاقات الائتمان والخصم (فيزا، ماستركارد، أمريكان إكسبريس).",
    "Secure online payment gateways as indicated at checkout.": "بوابات الدفع الآمنة عبر الإنترنت كما هو موضح عند الدفع.",
    "Any additional methods displayed on the Website at the time of purchase.": "أي طرق إضافية معروضة على الموقع وقت الشراء.",
    "All transactions are processed through secure, encrypted payment systems. COSIMA does not store or have access to full card details. Payment is due in full at the time of order placement.": "يتم معالجة جميع المعاملات من خلال أنظمة دفع آمنة ومفرّرة. لا تقوم كوزيما بتخزين أو الوصول إلى تفاصيل البطاقة الكاملة. الدفع مستحق بالكامل وقت تقديم الطلب.",
    "In the event of a payment failure or dispute, the Order will not be processed until payment is successfully received and confirmed.": "في حالة فشل الدفع أو النزاع، لن يتم معالجة الطلب حتى يتم استلام الدفع وتأكيده بنجاح.",
    "Article 8 — Delivery": "المادة 8 — التوصيل",
    "Delivery terms, timelines, shipping fees, and coverage areas are governed by COSIMA's Shipping Policy, which forms an integral part of these Terms and is available on the Website.": "تخضع شروط التوصيل والجداول الزمنية ورسوم الشحن ومناطق التغطية لسياسة الشحن الخاصة بكوزيما، والتي تشكل جزءًا لا يتجزأ من هذه الشروط ومتاحة على الموقع.",
    "Key delivery terms for GCC customers:": "شروط التوصيل الرئيسية لعملاء دول الخليج العربي:",
    "Orders are processed within 24–48 business hours of payment confirmation.": "تتم معالجة الطلبات في غضون 24-48 ساعة عمل من تأكيد الدفع.",
    "Estimated delivery times range from 3 to 7 business days depending on the destination country.": "تتراوح أوقات التوصيل المقدرة من 3 إلى 7 أيام عمل حسب بلد الوجهة.",
    "Free standard shipping is available on orders exceeding the threshold displayed at checkout.": "يتوفر الشحن العادي المجاني للطلبات التي تتجاوز الحد المعروض عند الدفع.",
    "Risk of loss or damage to Products passes to the Customer upon delivery to the specified address.": "تنتقل مخاطر خسارة أو تلف المنتجات إلى العميل عند التوصيل إلى العنوان المحدد.",
    "Article 9 — Transfer of Ownership": "المادة 9 — انتقال الملكية",
    "Ownership of the Products is transferred to the Customer upon full receipt of payment and physical delivery of the items to the delivery address provided. Until such time, COSIMA retains full title to the Products.": "تنتقل ملكية المنتجات إلى العميل عند استلام كامل المبلغ والتسليم الفعلي للسلع إلى عنوان التوصيل المقدم. وحتى ذلك الوقت، تحتفظ كوزيما بالملكية الكاملة للمنتجات.",
    "Article 10 — Right of Withdrawal and Returns": "المادة 10 — حق الانسحاب والمرتجعات",
    "Returns and exchanges are governed by COSIMA's Returns & Exchange Policy, which forms an integral part of these Terms and is available on the Website.": "تخضع المرتجعات والاستبدال لسياسة المرتجعات والاستبدال الخاصة بكوزيما، والتي تشكل جزءًا لا يتجزأ من هذه الشروط ومتاحة على الموقع.",
    "In summary:": "باختصار:",
    "Customers have 14 calendar days from the date of delivery to request a return or exchange.": "لدى العملاء 14 يومًا تقويميًا من تاريخ التوصيل لطلب إرجاع أو استبدال.",
    "Products must be unused, unsealed, and in their original condition.": "يجب أن تكون المنتجات غير مستخدمة وغير مفتوحة وفي حالتها الأصلية.",
    "Opened or used beauty and cosmetic products cannot be returned for hygiene reasons.": "لا يمكن إرجاع منتجات التجميل ومستحضرات التجميل المفتوحة أو المستخدمة لأسباب تتعلق بالنظافة.",
    "Damaged or incorrect items must be reported within 24 hours of receipt.": "يجب الإبلاغ عن العناصر التالفة أو غير الصحيحة في غضون 24 ساعة من الاستلام.",
    "COSIMA complies with applicable GCC consumer protection laws regarding the right of withdrawal and refunds.": "تمتثل كوزيما لقوانين حماية المستهلك المعمول بها في دول الخليج بشأن حق الانسحاب واسترداد المبالغ.",
    "Article 11 — Product Warranties": "المادة 11 — ضمانات المنتج",
    "All Products sold by COSIMA are authentic and sourced from verified suppliers. COSIMA warrants that Products conform to their description and are free from manufacturing defects at the time of delivery.": "جميع المنتجات التي تبيعها كوزيما أصلية ومصادرها من موردين معتمدين. وتضمن كوزيما مطابقة المنتجات لوصفها وخلوها من عيوب التصنيع وقت التوصيل.",
    "This warranty does not apply to:": "لا ينطبق هذا الضمان على:",
    "Damage caused by improper use, storage, or handling by the Customer.": "التلف الناتج عن سوء الاستخدام أو التخزين أو التعامل غير السليم من قبل العميل.",
    "Normal wear and deterioration.": "البلى والتدهور الطبيعي.",
    "Products modified or tampered with after delivery.": "المنتجات المعدلة أو العبث بها بعد التوصيل.",
    "In the event of a valid warranty claim, COSIMA will arrange for a replacement or refund at its discretion, in accordance with the Returns & Exchange Policy.": "في حالة وجود مطالبة ضمان صالحة، ستقوم كوزيما بترتيب استبدال أو استرداد وفقًا لتقديرها، وبما يتوافق مع سياسة المرتجعات والاستبدال.",
    "Article 12 — Limitation of Liability": "المادة 12 — تحديد المسؤولية",
    "To the fullest extent permitted by applicable law, COSIMA's total liability to the Customer for any claim arising from or related to an Order shall not exceed the total amount paid by the Customer for the Product(s) in question.": "إلى أقصى حد يسمح به القانون المعمول به، لا تتجاوز المسؤولية الإجمالية لكوزيما تجاه العميل عن أي مطالبة تنشأ عن أو تتعلق بطلب ما، المبلغ الإجمالي الذي دفعه العميل للمنتج (المنتجات) المعنية.",
    "COSIMA shall not be liable for:": "لن تكون كوزيما مسؤولة عن:",
    "Indirect, incidental, special, or consequential damages.": "الأضرار غير المباشرة أو العرضية أو الخاصة أو التبعية.",
    "Loss of profit, revenue, data, or business opportunity.": "خسارة الأرباح أو الإيرادات أو البيانات أو فرص العمل.",
    "Delays caused by force majeure events, including but not limited to natural disasters, pandemics, strikes, government actions, or customs delays.": "التأخيرات الناجمة عن أحداث القوة القاهرة، بما في ذلك على سبيل المثال لا الحصر الكوارث الطبيعية، الأوبئة، الإضرابات، الإجراءات الحكومية، أو التأخيرات الجمركية.",
    "Nothing in these Terms limits COSIMA's liability for death, personal injury, or fraud caused by our negligence.": "لا شيء في هذه الشروط يحد من مسؤولية كوزيما عن الوفاة أو الإصابة الشخصية أو الاحتيال الناجم عن إهمالنا.",
    "Article 13 — Intellectual Property": "المادة 13 — الملكية الفكرية",
    "All content on the COSIMA Website — including but not limited to logos, brand names, product images, text, graphics, and design elements — is the exclusive property of COSIMA and is protected by applicable intellectual property laws.": "جميع المحتويات الموجودة على موقع كوزيما — بما في ذلك على سبيل المثال لا الحصر الشعارات، الأسماء التجارية، صور المنتجات، النصوص، الرسومات، وعناصر التصميم — هي ملك حصري لكوزيما ومحمية بموجب قوانين الملكية الفكرية المعمول بها.",
    "No content may be reproduced, distributed, modified, or used for commercial purposes without the prior written consent of COSIMA. Unauthorized use may result in legal action.": "لا يجوز إعادة إنتاج أي محتوى أو توزيعه أو تعديله أو استخدامه لأغراض تجارية دون موافقة كتابية مسبقة من كوزيما. قد يؤدي الاستخدام غير المصرح به إلى اتخاذ إجراءات قانونية.",
    "Article 14 — Personal Data & Privacy": "المادة 14 — البيانات الشخصية والخصوصية",
    "COSIMA collects and processes personal data provided by Customers solely for the purposes of processing orders, managing customer accounts, and improving our services. Data is handled in accordance with our Privacy Policy, available on the Website.": "تجمع كوزيما وتعالج البيانات الشخصية المقدمة من العملاء فقط لأغراض معالجة الطلبات وإدارة حسابات العملاء وتحسين خدماتنا. يتم التعامل مع البيانات وفقًا لسياسة الخصوصية الخاصة بنا المتاحة على الموقع.",
    "By placing an Order, the Customer consents to the collection and processing of their personal data for the purposes described. COSIMA will not sell or share personal data with third parties for marketing purposes without explicit consent.": "من خلال تقديم طلب، يوافق العميل على جمع ومعالجة بياناته الشخصية للأغراض الموضحة. لن تقوم كوزيما ببيع أو مشاركة البيانات الشخصية مع أطراف ثالثة لأغراض التسويق دون موافقة صريحة.",
    "Article 15 — Governing Law and Dispute Resolution": "المادة 15 — القانون الحاكم وتسوية النزاعات",
    "These Terms are governed by and construed in accordance with the laws of the United Arab Emirates. In the event of a dispute arising from or related to these Terms or any Order, the parties agree to first seek resolution through good-faith negotiation.": "تخضع هذه الشروط وتفسر وفقًا لقوانين الإمارات العربية المتحدة. في حالة حدوث نزاع ينشأ عن أو يتعلق بهذه الشروط أو أي طلب، يوافق الطرفان على السعي أولاً لحله من خلال المفاوضات بحسن نية.",
    "If a dispute cannot be resolved amicably within 30 days, it shall be submitted to the competent courts of Dubai, UAE, unless mandatory local consumer protection laws in the Customer's country of residence require otherwise.": "إذا تعذر حل النزاع ودياً في غضون 30 يومًا، يتم تقديمه إلى المحاكم المختصة في دبي، الإمارات، ما لم تقتض قوانين حماية المستهلك المحلية الإلزامية في بلد إقامة العميل خلاف ذلك.",
    "Customers in GCC countries retain all statutory rights afforded under their respective national consumer protection legislation, which shall prevail over these Terms to the extent of any conflict.": "يحتفظ العملاء في دول مجلس التعاون الخليجي بجميع الحقوق القانونية التي تمنحها تشريعات حماية المستهلك الوطنية الخاصة بهم، والتي تسود على هذه الشروط في حالة وجود أي تعارض.",
    "Article 16 — Severability": "المادة 16 — القابلية للفصل",
    "If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a competent court, such provision shall be deemed severed from these Terms without affecting the validity or enforceability of the remaining provisions.": "إذا تبين أن أي حكم من هذه الشروط باطل أو غير قانوني أو غير قابل للتنفيذ من قبل محكمة مختصة، يعتبر هذا الحكم مفصولاً عن هذه الشروط دون التأثير على صحة أو قابلية تنفيذ الأحكام المتبقية.",

    // ── Missing translations added to complete translation coverage ──────────────
    "Kuwait": "الكويت",
    "Qatar": "قطر",
    "Bahrain": "البحرين",
    "Oman": "عُمان",
    "Saudi Arabia": "المملكة العربية السعودية",
    "UAE": "الإمارات العربية المتحدة",
    "Price": "السعر",
    "Total": "الإجمالي",
    "Shopping Cart": "سلة التسوق",
    "Subtotal": "المجموع الفرعي",
    "Shipping": "الشحن",
    "Free Shipping": "شحن مجاني",
    "Change Address": "تغيير العنوان",
    "Select an option...": "اختر خياراً...",
    "Postcode / ZIP": "الرمز البريدي",
    "Update Totals": "تحديث الإجمالي",
    "Coupon Code": "رمز الكوبون",
    "Ceckout": "إتمام الشراء",
    "Checkout": "الدفع",
    "Returning Customer?": "هل أنت عميل سابق؟",
    "Click here to login": "انقر هنا لتسجيل الدخول",
    "If you have shopped with us before, please enter your details in the boxes below. If you are a new customer, please proceed to the Billing & Shipping section.": "إذا كنت قد تسوقت معنا من قبل، يرجى إدخال بياناتك في الحقول أدناه. أما إذا كنت عميلاً جديداً، فيرجى الانتقال إلى قسم الفواتير والشحن.",
    "User Name or Email": "اسم المستخدم أو البريد الإلكتروني",
    "Remember me": "تذكرني",
    "Lost your password?": "هل نسيت كلمة المرور؟",
    "Have a coupon?": "هل لديك كوبون خصم؟",
    "Click here to enter your code": "انقر هنا لإدخال الرمز الخاص بك",
    "Company Name": "اسم الشركة",
    "Email Address": "عنوان البريد الإلكتروني",
    "Phone": "رقم الهاتف",
    "Select Country": "اختر الدولة",
    "Street Address": "عنوان الشارع",
    "Apartment, suite, unit etc. (optional)": "شقة، جناح، وحدة، إلخ (اختياري)",
    "Town / City": "البلدة / المدينة",
    "State / Country": "الولاية / المنطقة",
    "Create an account?": "إنشاء حساب جديد؟",
    "Ship to a Diffrent Address?": "هل ترغب في الشحن لعنوان آخر؟",
    "Order Notes": "ملاحظات الطلب",
    "Check Payments": "الدفع بشيكات",
    "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.": "يرجى إرسال الشيك إلى اسم المتجر، شارع المتجر، مدينة المتجر، ولاية المتجر، الرمز البريدي للمتجر.",
    "Paypal": "بايبال",
    "What is PayPal?": "ما هو بايبال؟",
    "I have read and agree to the website": "لقد قرأت وأوافق على",
    "terms and conditions": "الشروط والأحكام الخاصة بالموقع",
    "OUR STORE": "متجرنا",
    "CONTACT INFO": "بيانات الاتصال",
    "BUSINESS HOURS": "أوقات العمل",
    "Send Message": "إرسال الرسالة",
    "Click on your nearest store location below to set the road on Google Map.": "انقر على أقرب موقع متجر أدناه لتحديد المسار على خريطة Google.",
    "Returns & Exchanges": "المرتجعات والاستبدال",
    "Privacy & Security": "الخصوصية والأمان",
    "Privacy & Data": "الخصوصية والبيانات",
    "Customer Support": "دعم العملاء",
    "Description": "الوصف",
    "Additional Information": "معلومات إضافية",
    "Weight": "الوزن",
    "Dimensions": "الأبعاد",
    "Composition": "التركيب",
    "Colour": "اللون",
    "Size": "المقاس",
    "SKU:": "رمز SKU:",
    "Tags:": "الوسوم:",
    "Share:": "مشاركة:",
    "Add to Wishlist": "إضافة إلى المفضلة",
    "Size Guide": "دليل المقاسات",
    "Add To Cart": "إضافة إلى السلة",
    "BUY IT NOW": "شراء الآن",
    "(25 Customer reviews)": "(25 تقييم للعملاء)",
    "Availability: ": "حالة التوفر: ",
    "Availability:": "حالة التوفر:",
    "Related products": "منتجات ذات صلة",
    "Related Products": "منتجات ذات صلة",
    "You Might Also Like": "قد يعجبك أيضاً",
    "Hydrating Glow Serum": "سيروم التألق المرطب",
    "Rose Petal Day Cream": "كريم الورد اليومي",
    "Botanical Body Oil": "زيت الجسم النباتي",
    "Silk Touch Hand Cream": "كريم اليدين الحريري",
    "Retinol Night Repair": "كريم الريتينول للإصلاح الليلي",
    "Hyaluronic Acid Toner": "تونر حمض الهيالورونيك",
    "Gentle Foam Cleanser": "رغوة منظفة لطيفة للوجه",
    "Cross of Light Pendant": "قلادة صليب الضوء",
    "Oud Rose Eau de Parfum": "عطر عود روز أو دي بارفان",
    "Jasmine Noir Body Mist": "رذاذ الجسم ياسمين نوار",
    "Amber Wood Cologne": "كولونيا خشب العنبر",
    "Lavender Soy Candle": "شمعة الصويا باللافندر",
    "Rose Bath Salt Set": "مجموعة أملاح الاستحمام بالورد",
    "Essential Oil Diffuser": "موزع الزيوت العطرية الأساسية",
    "Birds of Paradise Pendant": "قلادة طيور الجنة",
    "Four-Leaf Clover Rings": "خواتم نفل رباعية الأوراق",
    "Circle of Chain Necklace": "قلادة سلسلة دائرية",
    "Hendry Backpack": "حقيبة ظهر هندري",
    "Join the Cosima Club!": "انضم إلى نادي كوزيما!",
    "Get 15% off on your first order.": "واحصل على خصم 15% على طلبك الأول.",
    "Sign up to our Newsletter and receive your golden discount code!": "اشترك في نشرتنا الإخبارية واحصل على رمز الخصم الذهبي الخاص بك!",
    "SUBSCRIBE": "اشترك",
    "Cookie dragee croissant dessert. Powder marshmallow pie wafer dessert sweet roll tootsie roll cupcake. Tart oat cake lollipop lollipop halvah chupa chups bonbon sugar plum dessert. Carrot cake marzipan cupcake cotton candy powder wafer sugar plum powder.": "حلوى الكوكيز والكرواسون. مسحوق حلوى الخطمي وفطيرة الويفر وحلوى الكب كيك الدائرية. تارت الشوفان وحلوى اللولي بوب المصاصة وحلوى البرقوق والكراميل.",
    "Macaroon topping chocolate. Cake jelly beans icing tiramisu. Ice cream bonbon tart sesame snaps. Bear claw chocolate bar candy pudding cake caramels.": "تغطية شوكولاتة الماكرون. كيك هلام التيراميسو. كرات آيس كريم بونبون تارت السمسم. بار شوكولاتة وبودنج كيك الكراميل.",
    "Banner Space": "مساحة إعلانية",
    "End of Summer!": "نهاية الصيف!",
    "Up to 20% off": "خصم يصل إلى 20%",
    "on all items.": "على جميع المنتجات.",
    "Signup": "تسجيل",
    "Sign up to our Newsletter and get the discount code.": "اشترك في نشرتنا الإخبارية واحصل على رمز الخصم.",
    "30 Days Return": "إرجاع خلال 30 يومًا"
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
