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
    "Place Order": "تأكيد وإتمام الطلب"
  };

  // Translate a node recursively
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.nodeValue;
      const trimmed = originalText.trim();
      if (trimmed && translations[trimmed]) {
        // Keep spaces around the text
        const leadingSpace = originalText.match(/^\s*/)[0];
        const trailingSpace = originalText.match(/\s*$/)[0];
        node.nodeValue = leadingSpace + translations[trimmed] + trailingSpace;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

      // Translate common attributes
      const attrs = ['placeholder', 'title', 'alt'];
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

  // Initialize Translation
  function initTranslation() {
    injectLanguageSwitcher();

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
