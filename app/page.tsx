import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="about" className="hero-section">
        <div className="hero-grain" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="hero-label">Machine Learning Engineer | Generative AI Specialist</div>

          <div className="hero-profile-container">
            {/* Profile Image */}
            <img
              src="/profile.jpg"
              alt="Alejandro Erick Cano Rosas"
              className="hero-profile-image"
            />

            <div className="hero-content">
              <h1 className="hero-title">
                Alejandro Erick
                <br />
                <span className="hero-title-accent">Cano Rosas</span>
              </h1>
              <p className="hero-subtitle">
                Designing and deploying end-to-end AI solutions in finance and automotive sectors.
                Currently at <strong>BBVA México</strong>, pursuing an M.Sc. in CS (AI Focus) at <strong>UNAM</strong>.
              </p>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">4+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">20%</span>
              <span className="hero-stat-label">Efficiency Improvement</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">87%</span>
              <span className="hero-stat-label">NLP Classification Accuracy</span>
            </div>
          </div>

          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">Get in Touch</a>
            <a href="#experience" className="btn-secondary">View Experience</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <div className="about-grid">
            <div>
              <h2 className="section-label">About</h2>
              <p className="about-text">
                Innovative Machine Learning Engineer with 4+ years of experience designing and deploying end-to-end AI solutions
                in the finance and automotive sectors. Expert in Generative AI, specializing in Multi-agent systems (LangGraph),
                RAG pipelines, and scalable Serverless architectures on AWS.
              </p>
              <p className="about-text">
                Proven track record of enhancing operational efficiency by 20% at Ford Mexico. Currently architecting
                hyper-personalized AI solutions at BBVA Mexico using LangChain, LangGraph, and AWS serverless stack
                (Lambda, App Runner, EventBridge, API Gateway).
              </p>
              <p className="about-text">
                Pursuing a Master&apos;s in Computer Science (AI Focus) at IIMAS, UNAM, with deep expertise in Python,
                LLM orchestration, and production-grade ML systems. Research focus on transformer architectures for
                satellite image analysis.
              </p>
            </div>
            <div className="about-info-card">
              <div className="info-block">
                <h3 className="info-label">Location</h3>
                <p className="info-value">Mexico City, Mexico</p>
              </div>
              <div className="info-block">
                <h3 className="info-label">Contact</h3>
                <a href="mailto:alejandroerickcanorosas@gmail.com" className="info-link">
                  alejandroerickcanorosas@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/alejandro-cano-rosas" target="_blank" rel="noopener noreferrer" className="info-link">
                  LinkedIn Profile
                </a>
                <a href="https://github.com/erickcr99" target="_blank" rel="noopener noreferrer" className="info-link">
                  GitHub Profile
                </a>
              </div>
              <div className="info-block">
                <h3 className="info-label">Availability</h3>
                <p className="info-value">Valid Passport</p>
                <p className="info-value">Available to relocate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-label section-label-light">Experience</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Machine Learning Engineer Mid</h3>
                    <p className="timeline-company">BBVA México</p>
                  </div>
                  <div className="timeline-meta">
                    <span>May 2025 — Present</span>
                    <span>Mexico City</span>
                  </div>
                </div>
                <ul className="timeline-list">
                  <li>Architected multi-agent systems using LangChain and LangGraph to deliver hyper-personalized sales arguments for banking advisors.</li>
                  <li>Automated SME product scripts by developing LLM-based tools, streamlining advisor workflows and response accuracy.</li>
                  <li>Developed interactive customer insights summarizing financial profiles (income, location) into actionable tips using generative AI.</li>
                  <li>Productized ML models on AWS using a serverless stack, including Lambda, App Runner, EventBridge, and API Gateway.</li>
                  <li>Built RAG pipelines integrating Amazon OpenSearch (Vector DB), Textract, and OpenAI APIs to optimize data retrieval and processing.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Machine Learning Engineer</h3>
                    <p className="timeline-company">Ford México</p>
                  </div>
                  <div className="timeline-meta">
                    <span>May 2023 — May 2025</span>
                    <span>Mexico City</span>
                  </div>
                </div>
                <ul className="timeline-list">
                  <li>Designed and deployed data pipelines and predictive models using Python, resulting in a 20% improvement in operational efficiency.</li>
                  <li>Implemented automation solutions with Python, Selenium, and Postman, reducing software integration time by 30%.</li>
                  <li>Managed structured, semi-structured, and unstructured data, ensuring accurate analysis and decision-making.</li>
                  <li>Enhanced Over The Air (OTA) update processes through efficient API integrations, improving data reliability and system accuracy.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Software Support Engineer</h3>
                    <p className="timeline-company">W&amp;Lamp Technologies</p>
                  </div>
                  <div className="timeline-meta">
                    <span>Jul 2022 — Feb 2023</span>
                    <span>Mexico City / Remote</span>
                  </div>
                </div>
                <ul className="timeline-list">
                  <li>Developed scalable software solutions using Java and Python to support core business operations.</li>
                  <li>Managed servers and MySQL databases for optimal performance, incorporating ML-driven monitoring to forecast system loads.</li>
                  <li>Integrated APIs and processed data in JSON and XML formats; implemented predictive analytics to optimize data workflows.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Support Engineer</h3>
                    <p className="timeline-company">University Computing Center, UACh</p>
                  </div>
                  <div className="timeline-meta">
                    <span>Jan 2022 — Aug 2022</span>
                    <span>Texcoco, Mexico</span>
                  </div>
                </div>
                <ul className="timeline-list">
                  <li>Developed and optimized SQL scripts for comprehensive data analysis and report generation.</li>
                  <li>Managed data lifecycles by creating dashboards and visualizations using Power BI and Tableau.</li>
                  <li>Coordinated project integration using GitHub and API tools, ensuring operational continuity and data security.</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">Developer — Quetzal App (Internship)</h3>
                    <p className="timeline-company">Social Tech Mexico</p>
                  </div>
                  <div className="timeline-meta">
                    <span>Feb 2021 — Jul 2021</span>
                    <span>Texcoco, Mexico</span>
                  </div>
                </div>
                <ul className="timeline-list">
                  <li>Developed a mobile application using Flutter SDK and Dart, enhancing user engagement and functionality.</li>
                  <li>Performed ETL from the Quetzal App; integrated machine learning models for personalized recommendations.</li>
                  <li>Created interactive visualizations to support data-driven decision-making processes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-label">Education</h2>

          <div className="edu-grid">
            <div className="edu-card edu-card-primary">
              <div className="edu-card-tag">In Progress</div>
              <h3 className="edu-card-title">M.Sc. in Computer Science &amp; Engineering</h3>
              <p className="edu-card-subtitle">AI Specialization</p>
              <p className="edu-card-school">IIMAS, UNAM</p>
              <p className="edu-card-date">Expected: July 2026</p>
              <div className="edu-card-divider" />
              <p className="edu-card-thesis">
                <strong>Thesis:</strong> Binary prediction of low-resolution satellite images using a unified architecture
                that leverages transformers for global features and neural networks for local features.
              </p>
            </div>

            <div className="edu-card">
              <div className="edu-card-tag edu-card-tag-done">Completed</div>
              <h3 className="edu-card-title">B.Eng. in Agricultural Mechatronics</h3>
              <p className="edu-card-school">UACh</p>
              <p className="edu-card-date">July 2021</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-label section-label-light">Projects &amp; Research</h2>

          <div className="projects-grid">
            <div className="project-card project-card-featured">
              <div className="project-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="project-card-title">Lisbon Machine Learning School (LxMLS 2025)</h3>
              <p className="project-card-date">Selected Participant</p>
              <p className="project-card-desc">
                Intensive training in Deep Learning and NLP led by researchers from top-tier institutions.
                Focused on advanced optimization techniques and sequence modeling with transformers.
              </p>
              <span className="project-card-badge">Academic Excellence</span>
            </div>

            <div className="project-card">
              <div className="project-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="project-card-title">SMM4H 2024 Task</h3>
              <p className="project-card-date">Feb — Jun 2024</p>
              <p className="project-card-desc">
                Achieved 87% accuracy in classifying tweets reporting children&apos;s medical disorders.
                Presented at the SMM4H 2024 conference on Natural Language Processing.
              </p>
              <span className="project-card-badge">Conference Paper</span>
            </div>

            <div className="project-card">
              <div className="project-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
              </div>
              <h3 className="project-card-title">Multi-agent Systems & RAG</h3>
              <p className="project-card-desc">
                Production-grade implementations using LangChain and LangGraph for intelligent agent orchestration
                and retrieval-augmented generation pipelines.
              </p>
            </div>

            <div className="project-card">
              <div className="project-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <h3 className="project-card-title">NLP & Computer Vision</h3>
              <p className="project-card-desc">
                Transformer models for text summarization, sentiment analysis, and object detection systems
                using OpenCV, Spacy, and NLTK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-label">Technical Skills</h2>

          <div className="skills-grid">
            <div className="skill-group">
              <h3 className="skill-group-title">Programming Languages</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-primary">Python</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Java</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title">Generative AI &amp; LLMs</h3>
              <div className="skill-tags">
                <span className="skill-tag skill-tag-primary">LangChain</span>
                <span className="skill-tag skill-tag-primary">LangGraph</span>
                <span className="skill-tag">RAG Pipelines</span>
                <span className="skill-tag">Multi-agent Systems</span>
                <span className="skill-tag">OpenAI APIs</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title">ML / AI Frameworks</h3>
              <div className="skill-tags">
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">Spacy</span>
                <span className="skill-tag">NLTK</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title">Data & Visualization</h3>
              <div className="skill-tags">
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">SciPy</span>
                <span className="skill-tag">Matplotlib</span>
                <span className="skill-tag">Seaborn</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Tableau</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title">AWS Cloud Services</h3>
              <div className="skill-tags">
                <span className="skill-tag">Lambda</span>
                <span className="skill-tag">App Runner</span>
                <span className="skill-tag">OpenSearch</span>
                <span className="skill-tag">DynamoDB</span>
                <span className="skill-tag">API Gateway</span>
                <span className="skill-tag">EventBridge</span>
                <span className="skill-tag">SNS</span>
                <span className="skill-tag">Textract</span>
                <span className="skill-tag">S3</span>
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title">DevOps &amp; Tools</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">Postman</span>
                <span className="skill-tag">Selenium</span>
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-label section-label-light">Let&apos;s Connect</h2>
          <p className="contact-subtitle">
            Interested in collaborating or have a question? Reach out through any of these channels.
          </p>

          <div className="contact-grid">
            <a href="mailto:alejandroerickcanorosas@gmail.com" className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="contact-card-label">Email</span>
              <span className="contact-card-value">Send an email</span>
            </a>

            <a href="https://www.linkedin.com/in/alejandro-cano-rosas" target="_blank" rel="noopener noreferrer" className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 00.1.42V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="currentColor" />
              </svg>
              <span className="contact-card-label">LinkedIn</span>
              <span className="contact-card-value">Connect with me</span>
            </a>

            <a href="https://github.com/erickcr99" target="_blank" rel="noopener noreferrer" className="contact-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="currentColor" />
              </svg>
              <span className="contact-card-label">GitHub</span>
              <span className="contact-card-value">View my repos</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="footer-copy text-center md:text-left">© 2025 Alejandro Erick Cano Rosas</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}
