import { useState, useEffect } from "react";
import {
  Star,
  Heart,
  BookOpen,
  User,
  ShoppingCart,
  Quote,
  Flower,
  Flower2,
} from "lucide-react";
import imageAsset from "./assets/image.png";
import Navigation from "./components/Navigation";
import { Blog } from "./components/blog";
import { Shop } from "./components/shop";

const quotes = [
  {
    text: "אני מנתח את עיניה ורואה בכל הגוונים שבהן זיכרון ילדות, ציטוטים מודפסים מהספרים האהובים עליי",
    author: "אוליבר",
  },
  {
    text: "אוהבת ומסוגלת אלו שני דברים שונים",
    author: "קית'יה",
  },
  {
    text: "יש לפרחים יכולת הארה זהה לזו של השמש, ואני מרגיש שהשמש שוקעת",
    author: "מהספר",
  },
];

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentView, setCurrentView] = useState<"home" | "blog" | "shop">("home");

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Heart,
      title: "רומן פסיכולוגי",
      desc: "סיפור עמוק על אהבה, אובדן והתמודדות",
      flower: Flower,
    },
    {
      icon: BookOpen,
      title: "ספר ביכורים",
      desc: "יצירת בכורה מרגשת ומעוררת השראה",
      flower: Flower2,
    },
    {
      icon: Star,
      title: "סיפורת איכותית",
      desc: "כתיבה שמימית וקסומה שנוגעת ללב",
      flower: Flower,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-100 to-amber-200 text-gray-800 font-['Segoe_UI',_'Tahoma',_'Arial',_'David',_'Frank_Ruehl_CLM',_sans-serif]"
      dir="rtl"
    >
      {/* Navigation */}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {/* Hero Section */}
      {currentView === "home" && (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Floating Flowers Background */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20 text-amber-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              >
                {i % 3 === 0 ? (
                  <Flower className="w-8 h-8 animate-pulse" />
                ) : i % 3 === 1 ? (
                  <Flower2 className="w-6 h-6 animate-bounce" />
                ) : (
                  <div className="w-3 h-3 bg-rose-300 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>

          <div
            className={`container mx-auto px-6 text-center z-10 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-yellow-600 to-rose-400 bg-clip-text text-transparent leading-tight">
                לילה בחנות פרחים
              </h1>
              <div className="flex items-center justify-center gap-3 mb-8">
                <Flower className="w-6 h-6 text-rose-400 animate-pulse" />
                <User className="w-6 h-6 text-amber-700" />
                <p className="text-2xl text-amber-800 font-medium">
                  ליאל ויידנפלד
                </p>
                <Flower2 className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl text-amber-800 mb-12 leading-relaxed max-w-3xl mx-auto">
                ספר שמימי, קסום ונוגה על אהבה שפורחת בין הצללים, על אובדן שמחפש
                נחמה ועל שני אנשים שמוצאים זה את זה באור הפרחים הבהירים
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-gradient-to-r from-amber-600 via-rose-400 to-blue-500 hover:from-amber-700 hover:via-rose-500 hover:to-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl text-white">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                    רכישת הספר
                  </div>
                </button>
                <button className="border-2 border-amber-700 hover:bg-amber-700 hover:text-amber-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 text-amber-800">
                  קראו פרק לדוגמה
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quote Carousel */}
      {currentView === "home" && (
        <section className="py-20 bg-gradient-to-r from-amber-50 via-rose-50 to-blue-50 backdrop-blur-sm relative">
          {/* Decorative Flowers */}
          <div className="absolute top-10 right-10 opacity-30">
            <Flower className="w-16 h-16 text-amber-400 animate-pulse" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-30">
            <Flower2 className="w-12 h-12 text-rose-400 animate-pulse" />
          </div>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Flower className="w-8 h-8 text-amber-600 opacity-60" />
                <Quote className="w-12 h-12 text-amber-700" />
                <Flower2 className="w-8 h-8 text-rose-400 opacity-60" />
              </div>
              <div className="relative h-32 flex items-center justify-center">
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      currentQuote === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <blockquote className="text-2xl md:text-3xl font-medium text-amber-800 mb-4 leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-amber-700 font-semibold">
                      - {quote.author}
                    </cite>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {currentView === "home" && (
        <section className="py-20 relative">
          {/* Corner Flower Decorations */}
          <div className="absolute top-0 right-0 opacity-20">
            <div className="flex items-center gap-2 p-4">
              <Flower className="w-10 h-10 text-amber-500" />
              <Flower2 className="w-8 h-8 text-rose-400" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-20">
            <div className="flex items-center gap-2 p-4">
              <Flower2 className="w-10 h-10 text-blue-400" />
              <Flower className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4 mb-16">
              <Flower className="w-8 h-8 text-amber-600 opacity-70" />
              <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800">
                למה כדאי לקרוא את הספר?
              </h2>
              <Flower2 className="w-8 h-8 text-rose-500 opacity-70" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-amber-50/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-amber-100 hover:via-rose-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-105 border border-amber-200/50"
                >
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 via-rose-400 to-blue-500 rounded-full mb-6 group-hover:animate-pulse">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Small decorative flower */}
                    <feature.flower className="absolute -top-1 -right-1 w-4 h-4 text-amber-500 opacity-60" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-amber-800">
                    {feature.title}
                  </h3>
                  <p className="text-amber-700 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About the Book */}
      {currentView === "home" && (
        <section className="py-20 bg-gradient-to-r from-amber-100/60 via-rose-50/60 to-blue-50/60 relative">
          {/* Subtle flower pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  top: `${20 + Math.floor(i / 3) * 40}%`,
                }}
              >
                {i % 2 === 0 ? (
                  <Flower className="w-24 h-24 text-amber-400" />
                ) : (
                  <Flower2 className="w-20 h-20 text-rose-300" />
                )}
              </div>
            ))}
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-12">
                <Flower2 className="w-8 h-8 text-rose-500 opacity-70" />
                <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-800">
                  על הספר
                </h2>
                <Flower className="w-8 h-8 text-amber-600 opacity-70" />
              </div>
              <div className="bg-amber-50/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-amber-200/60 shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="flex-1">
                    <img
                      src={imageAsset}
                      alt="Book Cover"
                      className="w-full h-auto rounded-2xl shadow-md"
                    />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-lg md:text-xl text-amber-800 leading-relaxed mb-6">
                      <strong className="text-amber-900">אוליבר</strong> עובד
                      בחנות הפרחים של אמו, מנסה להתאושש מטראומה קשה. בלילה אחד,
                      חמש דקות לפני סגירת החנות, נכנסת{" "}
                      <strong className="text-rose-600">קית'יה</strong> - אישה
                      שמגיעה לחנות פעמיים בשבוע כדי להרגיש קרובה לאדם יקר שאיבדה.
                    </p>
                    <p className="text-lg md:text-xl text-amber-800 leading-relaxed mb-6">
                      פגישה זו תשנה את שני חייהם לנצח. בין הפרחים הבהירים שעדיין
                      קל לראות בחושך, נרקמת אהבה שמחברת בין שני אנשים פצועים
                      המחפשים דרך להתמודד עם הכאב.
                    </p>
                    <div className="bg-gradient-to-r from-amber-200/80 via-rose-100/60 to-blue-100/60 rounded-2xl p-6 border-r-4 border-amber-600 relative">
                      <Flower className="absolute top-2 left-2 w-6 h-6 text-amber-500 opacity-50" />
                      <p className="text-lg font-medium text-amber-900 pr-8">
                        "ספר שמימי, קסום ונוגה" - רומן פסיכולוגי מרגש על אהבה,
                        אובדן והתמודדות עם טראומה
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Author */}
      {currentView === "home" && (
        <section className="py-20 relative">
          {/* Floating flowers around author section */}
          <div className="absolute top-10 left-20 opacity-20 animate-pulse">
            <Flower2 className="w-12 h-12 text-rose-400" />
          </div>
          <div
            className="absolute top-32 right-20 opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Flower className="w-10 h-10 text-amber-500" />
          </div>
          <div
            className="absolute bottom-20 left-32 opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            <Flower className="w-8 h-8 text-blue-400" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <Flower className="w-8 h-8 text-amber-600 opacity-70" />
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800">
                  על הסופרת
                </h2>
                <Flower2 className="w-8 h-8 text-rose-500 opacity-70" />
              </div>
              <div className="bg-amber-50/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-amber-200/60 shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-amber-600 via-rose-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-3xl font-bold mb-4 text-amber-800">
                      ליאל ויידנפלד
                    </h3>
                    <p className="text-lg text-amber-800 leading-relaxed">
                      סופרת צעירה וסטודנטית לפסיכולוגיה מעמק יזרעאל. "לילה בחנות
                      פרחים" הוא ספר הביכורים שלה - יצירה מרגשת שמשלבת הבנה עמוקה
                      של הנפש האנושית עם כתיבה רגישה ומלאת רגש.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {currentView === "home" && (
        <section className="py-20 bg-gradient-to-r from-amber-500 via-rose-400 to-blue-500 text-white relative overflow-hidden">
          {/* Large decorative flowers */}
          <div className="absolute top-0 right-0 opacity-20">
            <Flower className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 opacity-20">
            <Flower2 className="w-28 h-28 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-10">
            <Flower className="w-20 h-20 text-white animate-pulse" />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Flower2 className="w-10 h-10 text-white opacity-80 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold">
                מוכנים לצלול לתוך הסיפור?
              </h2>
              <Flower className="w-10 h-10 text-white opacity-80 animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              הצטרפו לאוליבר וקית'יה במסע רגשי מרגש בין הפרחים. ספר שישאיר אתכם עם
              תחושה של תקווה ואור.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-amber-800 hover:bg-amber-50 px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                  רכישת הספר עכשיו
                </div>
              </button>
              <div className="flex items-center gap-2 text-lg">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-300 text-yellow-300"
                    />
                  ))}
                </div>
                <span className="opacity-90">דירוג מעולה מקוראים</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {currentView === "blog" && <Blog />}

      {/* Shop Section */}
      {currentView === "shop" && <Shop />}

      {/* Footer */}
      <footer className="py-12 bg-amber-800/90 backdrop-blur-sm text-amber-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-amber-200 mb-4">
            © 2025 ליאל ויידנפלד - כל הזכויות שמורות
          </p>
          <p className="text-amber-300 text-sm">
            זמין לרכישה בחנויות ספרים מובחרות ובפלטפורמות דיגיטליות
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
