import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X, ExternalLink, ArrowUp, Code, Database, Brain, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";

/* ================== EDIT ONLY THIS SECTION ================== */
const USER = {
  name: "Ritika Srivastava",
  city: "Delhi",
  email: "ritika.srivastava315@gmail.com",
  linkedin: "https://www.linkedin.com/in/ritika-srivastava-10093525a/",
  resume: "/Ritika_Srivastava_Résumé.pdf",
  github: "https://github.com/ritika-315/",
  service: import.meta.env.VITE_EMAIL_SERVICE,
  template: import.meta.env.VITE_EMAIL_TEMPLATE,
  public: import.meta.env.VITE_EMAIL_PUBLIC,
};

const FEATURED = [
  {
    title: "Movie Recommendation System",
    desc: "Content based engine using TF-IDF & Cosine Similarity with FastAPI and Streamlit.",
    tech: ["Python", "NLP", "FastAPI", "Streamlit"],
    github: "https://github.com/ritika-315/Movie_Recommendation_System",
    live: "https://movierecommendationsystem-zn8jemcmnpbyfsqwecqohl.streamlit.app",
    img: "/movie-recommendation.png",
  },
  {
    title: "Zero Touch Sales Analytics",
    desc: "Automated pipeline converting raw sales data into business insights.",
    tech: ["Python", "Analytics", "Dashboard"],
    github: "https://github.com/ritika-315/zero-touch-sales-analytics",
    live: "https://zero-touch-sales-analytics-zaagbzvutr6jta3azzcdpk.streamlit.app",
    img: "/zero-touch-analytics.png",
  },
  {
    title: "Resume Analyzer",
    desc: "JD vs Resume matching with NLP and skill gap visualization.",
    tech: ["Python", "NLP", "Flask"],
    github: "https://github.com/ritika-315/Resume-Analyzer",
    live: " https://resume-analyzer-y2by.onrender.com",
    img: "/resume-analyzer.png",
  },
  {
    title: "Customer Sentiment Webapp",
    desc: "Sentiment prediction dashboard using ML and Flask.",
    tech: ["NLP", "Flask", "ML"],
    github: "https://github.com/ritika-315/customer-sentiment-webapp",
    // live: "",
    img: "/customer-sentiment.png",
  },
];

const OTHER_PROJECTS = [
  {
    title: "MERN Book Store",
    desc: "Full‑stack bookstore with Firebase auth and admin panel.",
    tech: ["React", "Node", "MongoDB"],
    github: "https://github.com/ritika-315/book-store",
    live: "https://book-store-eight-lac.vercel.app",
    img: "/book-store.png",
  },
  {
    title: "Weather App",
    desc: "5‑day forecast app using OpenWeather API and Context state.",
    tech: ["React", "API", "UI"],
    github: "https://github.com/ritika-315/weatherapp",
    live: "https://ritika-315.github.io/weatherapp/",
    img: "/weather-forecast.png",
  },
  {
    title: "TOMATO Food Ordering",
    desc: "MERN platform with Stripe payments & JWT authentication.",
    tech: ["MERN", "Stripe", "JWT"],
    github: "https://github.com/ritika-315/food-del",
    live: "https://food-del-frontend-og4n.onrender.com",
    img: "food-del.png",
  },
  {
    title: "PG Life",
    desc: "PHP/MySQL PG accommodation portal with AJAX filters.",
    tech: ["PHP", "MySQL", "AJAX"],
    github: "https://github.com/ritika-315/PGLife",
    // live: "",
    img: "pg-life.png",
  },
  {
    title: "Facial Expression Recognition",
    desc: "Real‑time emotion detection using custom VGG‑style CNN and OpenCV.",
    tech: ["Python", "CNN", "OpenCV"],
    github: "https://github.com/ritika-315/facial-expression-recognition",
    // live: "",
    // img: "/screens/emotion.png",
  },
  {
    title: "Customer Churn Prediction",
    desc: "Telecom churn prediction with ~89% accuracy using XGBoost & Neural Networks.",
    tech: ["ML", "XGBoost", "EDA"],
    github: "https://github.com/ritika-315/Customer_Churn_Prediction",
    // live: "",
    // img: "/screens/churn.png",
  },
  {
    title: "Titanic Survival Prediction",
    desc: "Logistic regression model achieving ~86% accuracy with feature engineering.",
    tech: ["Python", "ML", "EDA"],
    github: "https://github.com/ritika-315/Titanic-Survival-Prediction",
    // live: "",
    // img: "/screens/titanic.png",
  },
];
/* ============================================================ */

const Toast = ({msg, type}) => (
  <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    className={`fixed bottom-6 right-6 px-4 py-2 rounded-xl shadow-lg z-50 ${
      type==='error'?'bg-red-600':'bg-green-600'
    }`}>{msg}</motion.div>
);

const TypeText = () => {
  const words = [
    "AI Developer",
    "Web Builder",
    "Data Explorer",
    "Problem Solver",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);
  return <span className="text-purple-400">{words[index]}</span>;
};

const Fade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") !== "light",
  );
  useEffect(
    () => localStorage.setItem("theme", dark ? "dark" : "light"),
    [dark],
  );
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toast,setToast] = useState(null);
  const [light,setLight] = useState(null);
  const [sending,setSending] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const bar = useSpring(scrollYProgress,{stiffness:120,damping:20});

  /* EmailJS submit */
  const send = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.sendForm(USER.service, USER.template, e.target, USER.public)
      .then(()=>{
        setToast({msg:'Message Sent ✓', type:'ok'});
      })
      .catch(()=> setToast({msg:'Failed to send',type:'error'}))
      .finally(()=> setSending(false));
  };

  return (
    <div className={dark ? "bg-black text-white" : "bg-gray-50 text-black"}>
      {/* PROGRESS BAR */}
      <motion.div style={{scaleX:bar}} className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"/>
      {toast && <Toast {...toast}/>}
      {light && <Lightbox img={light} onClose={()=>setLight(null)}/>}

      {/* Parallax Gradient */}
      <motion.div style={{ y }} className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-600/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-600/10 blur-3xl rounded-full" />
      </motion.div>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <span className="font-semibold">{USER.name}</span>
          <div className="hidden md:flex items-center gap-5">
            <a href="#contact">Contact</a>
            <a href={USER.linkedin}>
              <Linkedin size={18} />
            </a>
            <a href={USER.github}>
              <Github size={18} />
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-xl bg-white/10"
            >
              Theme
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        {menu && (
          <div className="md:hidden p-4 border-t border-white/10 space-y-3 bg-black/80">
            <a className="block" href="#contact">
              Contact
            </a>
            <a className="block" href={USER.linkedin}>
              LinkedIn
            </a>
            <a className="block" href={USER.github}>
              Github
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-xl bg-white/10"
            >
              Theme
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-28 text-center max-w-5xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hi, I'm {USER.name}
        </motion.h1>

        <p className="mt-4 text-xl opacity-80">
          I am a <TypeText />
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:scale-105 transition"
          >
            Projects
          </a>
          <a
            href={USER.resume}
            className="px-6 py-3 rounded-xl bg-green-600 hover:scale-105 transition"
          >
            Resume
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl mb-4 font-semibold border-b border-white/10 pb-2">
          About Me
        </h2>
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          Builder mindset focused on creating practical AI & data applications.
          Comfortable across Python, Web and Analytics with ability to learn
          fast and convert ideas into working products.
        </motion.div>
      </section>

      {/* SKILLS WITH ICONS */}
      <Fade>
      <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl mb-4 font-semibold">Skills</h2>
      <div className="grid md:grid-cols-4 gap-4">
      {[
        { name: "Python", icon: <Code size={18}/> },
        { name: "JavaScript", icon: <Code size={18}/> },
        { name: "Machine Learning", icon: <Brain size={18}/> },
        { name: "NLP", icon: <Brain size={18}/> },
        { name: "Flask", icon: <Globe size={18}/> },
        { name: "FastAPI", icon: <Globe size={18}/> },
        { name: "React", icon: <Globe size={18}/> },
        { name: "SQL", icon: <Database size={18}/> }
        ].map((s) => (
            <motion.div
            key={s.name}
            whileHover={{ y: -4 }}
            className="flex items-center gap-3 p-4 text-center rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 transition"
            >
            <span className="text-purple-400">{s.icon}</span>
            {s.name}
            </motion.div>
            ))}
            </div>
            </section>
            </Fade>

      {/* FEATURES */}
      <Fade>
        <section id="projects" className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl mb-6 font-semibold border-b border-white/10 pb-2">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400 transition"
              >
                <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={p.img}
                    className="w-full h-44 object-cover"
                    alt={p.title}
                  />
                </div>

                <h3 className="text-2xl mb-2">{p.title}</h3>
                <p className="opacity-70 mb-3">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-lg bg-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-x-4">
                  <a href={p.github} className="text-blue-400 hover:underline">
                    GitHub
                  </a>
                  <a href={p.live} className="text-green-400 hover:underline">
                    Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          {/* OTHERS */}
          <div className="mt-10 text-center">
            <button
              onClick={() => setOpen(!open)}
              className="px-6 py-2 rounded-xl bg-white/10"
            >
              View More Projects
            </button>
          </div>

          {open && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {OTHER_PROJECTS.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 transition"
                >
                  <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={p.img}
                      className="w-full h-40 object-cover"
                      alt=""
                    />
                  </div>

                  <h4 className="text-xl mb-1">{p.title}</h4>
                  <p className="opacity-70 text-sm mb-2">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs bg-white/10 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-x-3 text-sm">
                    <a href={p.github} className="text-blue-400 hover:underline">
                      GitHub
                    </a>
                    {p.live && (
                      <a href={p.live} className="text-green-400 hover:underline">
                        Live
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </Fade>

      {/* CONTACT WITH EMAILJS */}
    <Fade>
    <section id="contact" className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl mb-4 font-semibold border-b border-white/10 pb-2">Contact</h2>

      <form onSubmit={send} className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
        <input name="name" placeholder="Name" required className="w-full p-2 bg-white/5 border border-white/10 rounded"/>
        <input name="email" placeholder="Email" required className="w-full p-2 bg-white/5 border border-white/10 rounded"/>
        <textarea name="message" placeholder="Message" required className="w-full p-2 bg-white/5 border border-white/10 rounded"/>

        <button disabled={sending}className="px-5 py-2 bg-purple-600 rounded-xl flex items-center gap-2">
          {sending?'sending...':'Send'} <ExternalLink size={16}/>
        </button>
      </form>
    </section>
    </Fade>

    {/* BACK TO TOP */}
    <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
      className="fixed bottom-6 left-6 p-3 rounded-full bg-purple-600 shadow-lg">
      <ArrowUp/>
    </button>
    </div>
  );
}
