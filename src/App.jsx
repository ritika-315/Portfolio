import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Database, FileText, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Terminal, Users, X } from 'lucide-react';
const PROFILE = {
  github: 'https://github.com/ritika-315/',
  linkedin: 'https://www.linkedin.com/in/ritika-srivastava-10093525a/',
  email: 'ritika.srivastava315@gmail.com',
  resume: '/Ritika_Srivastava_Resume.pdf'
};
const NAV = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];
const SKILLS = [{
  title: 'Languages',
  icon: Code2,
  items: ['Python', 'JavaScript', 'SQL', 'C', 'C++']
}, {
  title: 'Frontend',
  icon: Layers3,
  items: ['React.js', 'HTML', 'CSS']
}, {
  title: 'Backend',
  icon: Terminal,
  items: ['Node.js', 'Express.js', 'REST APIs']
}, {
  title: 'Data and Databases',
  icon: Database,
  items: ['Pandas', 'NumPy', 'scikit-learn', 'Streamlit', 'MongoDB', 'MySQL']
}, {
  title: 'Developer Tools',
  icon: Code2,
  items: ['Git', 'GitHub', 'Postman', 'Linux', 'Google Colab']
}, {
  title: 'Core Fundamentals',
  icon: BookOpen,
  items: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'DBMS', 'Operating Systems']
}];
const PROJECTS = [{
  title: 'Resume Analyzer and Job Match System',
  category: 'TEXT ANALYSIS',
  description: 'Compares a résumé with a job description to surface relevant skills and gaps, helping candidates understand how their experience aligns with a role.',
  tech: ['Python', 'FastAPI', 'spaCy', 'scikit-learn'],
  repo: 'Resume-Analyzer',
  image: '/resume-analyzer.png',
  alt: 'Resume Analyzer interface for comparing a résumé with a job description'
}, {
  title: 'Sales Analytics and Forecasting Dashboard',
  category: 'DATA & AUTOMATION',
  description: 'Turns raw sales data into a dashboard of trends and forecasts, making business performance easier to explore and interpret.',
  tech: ['Python', 'Pandas', 'Streamlit', 'Prophet'],
  repo: 'zero-touch-sales-analytics',
  image: '/zero-touch-analytics.png',
  alt: 'Sales analytics dashboard displaying business performance insights'
}, {
  title: 'Movie Recommendation System',
  category: 'RECOMMENDATION SYSTEM',
  description: 'Helps users discover similar movies with content-based recommendations using TF-IDF and cosine similarity.',
  tech: ['Python', 'NLP', 'FastAPI', 'Streamlit'],
  repo: 'Movie_Recommendation_System',
  image: '/movie-recommendation.png',
  alt: 'Movie recommendation interface with suggested films'
}, {
  title: 'MERN Book Store',
  category: 'FULL-STACK APPLICATION',
  description: 'A full-stack bookstore with a user-facing browsing experience and an admin panel for managing the book catalog.',
  tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
  repo: 'book-store',
  image: '/book-store.png',
  alt: 'Book store interface displaying books available to browse'
}, {
  title: 'Customer Churn Prediction',
  category: 'MACHINE LEARNING',
  description: 'Explores churn across 7,043 telecom customer records. Compares classification algorithms, with the best model reaching approximately 81% accuracy, to inform retention strategies.',
  tech: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
  repo: 'Customer_Churn_Prediction'
}];
function ExternalLink({
  href,
  children,
  ...props
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>;
}
function SocialLinks() {
  return <div className="social-links">
    <ExternalLink href={PROFILE.github} aria-label="Ritika Srivastava on GitHub">
      <Github aria-hidden="true" size={19} />
    </ExternalLink>
    <ExternalLink href={PROFILE.linkedin} aria-label="Ritika Srivastava on LinkedIn">
      <Linkedin aria-hidden="true" size={19} />
    </ExternalLink>
  </div>;
}
function SectionHeading({
  number,
  title,
  subtitle
}) {
  return <div className="section-heading">
    <p className="eyebrow">{number} / {title}</p>
    <h2>
      {subtitle}
    </h2>
  </div>;
}
function ProjectCard({
  project,
  index
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return <article className={`project-card ${project.image ? '' : 'project-wide'}`}>
    {project.image && !imageFailed && <div className="project-image">
      <img src={project.image} alt={project.alt} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
    </div>}
    <div className="project-body">
      <div className="project-meta">
        <span>
          {project.category}
        </span>
        <span aria-hidden="true">0{index + 1}</span>
      </div>
      <h3>
        {project.title}
      </h3>
      <p>
        {project.description}
      </p>
      <ul className="tags" aria-label="Project technologies">
        {project.tech.map(tech => <li key={tech}>
          {tech}
        </li>)}
      </ul>
      <ExternalLink className="project-link" href={`${PROFILE.github}${project.repo}`} aria-label={`View ${project.title} on GitHub`}><Github aria-hidden="true" size={16} /> View source <ArrowUpRight aria-hidden="true" size={16} /></ExternalLink>
    </div>
  </article>;
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 800px)');
    const closeOnDesktop = event => {
      if (event.matches) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);
  const navigateFromMenu = event => {
    setMenuOpen(false);
    const target = document.querySelector(event.currentTarget.hash);
    target?.focus({
      preventScroll: true
    });
  };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="shell nav-bar">
        <a href="#home" className="wordmark" aria-label="Ritika Srivastava, home" onClick={() => setMenuOpen(false)}>rs<span>.</span></a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {NAV.map(item => <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>)}
        </nav>
        <div className="nav-actions">
          <SocialLinks />
          <button ref={menuButton} className="menu-button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!menuOpen}>
        {NAV.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={navigateFromMenu}>
          {item}
        </a>)}
      </nav>
    </header>
    <main id="main" tabIndex={-1}>
      <section id="home" tabIndex={-1} className="hero shell">
        <Motion.div initial={reduceMotion ? false : {
          opacity: 0,
          y: 12
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.45
        }}>
          <p className="availability"><span aria-hidden="true" /> Open to Software Engineer opportunities</p>
          <p className="hero-name">Ritika Srivastava</p>
          <h1>Software Engineer building <span>Python, backend, and full-stack</span> applications.</h1>
          <p className="hero-description">Computer Science Engineering graduate from IGDTUW. I build practical data-processing applications, user-facing interfaces, and automation workflows.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View Projects <ArrowUpRight aria-hidden="true" size={18} /></a>
            <ExternalLink className="button button-secondary" href={PROFILE.resume}>View Résumé <FileText aria-hidden="true" size={17} /></ExternalLink>
            <ExternalLink className="button button-text" href={PROFILE.linkedin}>LinkedIn <ArrowUpRight aria-hidden="true" size={17} /></ExternalLink>
          </div>
          <div className="hero-bottom">
            <span>PYTHON <span aria-hidden="true">/</span> BACKEND <span aria-hidden="true">/</span> FULL-STACK</span>
            <a href="#about" aria-label="Explore the About section">
              <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>
        </Motion.div>
      </section>
      <section id="about" tabIndex={-1} className="section shell">
        <SectionHeading number="01" title="About" subtitle="Practical software. Thoughtful execution." />
        <div className="about-grid">
          <div className="about-copy">
            <p>I’m a B.Tech graduate in Computer Science and Engineering from IGDTUW, having graduated in June 2026. My focus is Python, backend, and full-stack development.</p>
            <p>I’m interested in building practical, reliable, user-focused software—from processing data to creating interfaces people can use. I’m currently open to Software Engineer opportunities at product-focused companies.</p>
          </div>
          <aside className="education-card">
            <GraduationCap aria-hidden="true" size={25} />
            <p className="eyebrow">Education</p>
            <h3>B.Tech · Computer Science and Engineering</h3>
            <p>IGDTUW</p>
            <span>Graduated June 2026</span>
          </aside>
        </div>
      </section>
      <section id="skills" tabIndex={-1} className="section shell">
        <SectionHeading number="02" title="Technical Skills" subtitle="The tools behind the work." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map(({
            title,
            icon,
            items
          }) => {
            const Icon = icon;
            return <article className="skill-card" key={title}>
            <Icon aria-hidden="true" size={21} />
            <h3>
              {title}
            </h3>
            <ul className="tags">
              {items.map(item => <li key={item}>
                {item}
              </li>)}
            </ul>
          </article>;
          })}
        </div>
      </section>
      <section id="projects" tabIndex={-1} className="section shell">
        <SectionHeading number="03" title="Featured Projects" subtitle="From an idea to a working application." />
        <p className="section-intro">Selected work in data processing, automation, and full-stack development.</p>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => <ProjectCard key={project.repo} project={project} index={index} />)}
        </div>
      </section>
      <section id="experience" tabIndex={-1} className="section shell">
        <SectionHeading number="04" title="Experience" subtitle="Applying machine learning to a real problem." />
        <article className="experience-card">
          <div className="experience-heading">
            <div>
              <BriefcaseBusiness aria-hidden="true" size={24} />
              <h3>Machine Learning Intern</h3>
              <p>COE-AI, Anveshan Foundation</p>
            </div>
            <span className="date">June 2023 – July 2023</span>
          </div>
          <ul className="experience-list">
            <li>Built an end-to-end telecom churn prediction workflow using 7,043 customer records.</li>
            <li>Worked on preprocessing, feature engineering, model training, and evaluation.</li>
            <li>Compared multiple classification algorithms and achieved approximately 81% accuracy with the best-performing model.</li>
            <li>Translated model results into insights that could support targeted customer-retention strategies.</li>
          </ul>
        </article>
      </section>
      <section id="publication-leadership" tabIndex={-1} className="section shell">
        <SectionHeading number="05" title="Publication and Leadership" subtitle="Research and community." />
        <div className="credentials-grid">
          <article className="credential-card">
            <BookOpen aria-hidden="true" size={23} />
            <p className="eyebrow">Publication · ICAAIC 2025</p>
            <h3>AI-Driven Synthetic Data for Better Lung Cancer Prediction with TabDDPM and CTGAN</h3>
            <p>Presented at ICAAIC 2025.</p>
          </article>
          <article className="credential-card">
            <Users aria-hidden="true" size={23} />
            <p className="eyebrow">Leadership</p>
            <h3>Contributing beyond the classroom</h3>
            <ul className="leadership-list">
              <li>
                <span>Research Team, ARC Society</span>
                <span>2023–2026</span>
              </li>
              <li>
                <span>PR Team, Rotaract Club</span>
                <span>2024–2025</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
      <section id="contact" tabIndex={-1} className="section shell">
        <div className="contact-panel">
          <p className="eyebrow">06 / Contact</p>
          <h2>Let’s build something useful.</h2>
          <p>Open to Software Engineer roles in Python, backend, and full-stack development at product-focused companies.</p>
          <a className="email-link" href={`mailto:${PROFILE.email}`}>
            <Mail aria-hidden="true" size={21} />
            <span>
              {PROFILE.email}
            </span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </a>
          <div className="contact-socials">
            <ExternalLink href={PROFILE.linkedin}><Linkedin aria-hidden="true" size={18} /> LinkedIn <ArrowUpRight aria-hidden="true" size={15} /></ExternalLink>
            <ExternalLink href={PROFILE.github}><Github aria-hidden="true" size={18} /> GitHub <ArrowUpRight aria-hidden="true" size={15} /></ExternalLink>
          </div>
        </div>
      </section>
    </main>
    <footer className="shell footer">
      <p>© {new Date().getFullYear()} Ritika Srivastava</p>
      <SocialLinks />
    </footer>
  </>;
}
