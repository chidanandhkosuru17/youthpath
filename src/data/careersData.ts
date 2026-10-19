import { CareerTrack } from '../types';

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    category: 'Tech',
    tagline: 'Build modern responsive web applications from frontend interfaces to backend databases.',
    overview: 'Full Stack Developers create complete digital products. In the Indian tech ecosystem, full stack engineers are heavily recruited across early-stage startups in Bengaluru and Gurgaon as well as global MNCs in Pune and Hyderabad.',
    responsibilities: [
      'Design and implement responsive, accessible user interfaces using React/Next.js.',
      'Develop scalable server-side APIs, microservices, and business logic with Node.js or Python.',
      'Manage SQL/NoSQL databases, migrations, and performance optimization.',
      'Integrate third-party services, authentication, and cloud deployments on AWS/GCP/Vercel.'
    ],
    requiredSkills: {
      core: ['JavaScript / TypeScript', 'React.js', 'Node.js / Express', 'PostgreSQL / MongoDB', 'HTML5 / CSS / Tailwind CSS'],
      goodToHave: ['Next.js', 'Docker', 'Redis', 'Git & CI/CD', 'REST & GraphQL APIs'],
      soft: ['Problem Solving', 'Code Review Collaboration', 'Agile Teamwork', 'Technical Communication']
    },
    salaryRangeIndia: {
      fresherLPA: '₹4.0 - ₹8.5 LPA',
      midLPA: '₹12.0 - ₹24.0 LPA',
      seniorLPA: '₹28.0 - ₹50.0+ LPA',
      notes: 'Packages vary between service MNCs (₹4-6 LPA), high-growth tech startups (₹8-15 LPA), and product companies/PBCs (₹18+ LPA).'
    },
    educationGuidance: 'B.Tech/B.E. (CSE, IT, ECE), BCA/MCA, or self-taught developers with demonstrable GitHub portfolios and deployed projects.',
    roadmap: [
      { step: 1, title: 'Web Fundamentals & Modern JavaScript', duration: '4-6 Weeks', topics: ['HTML5 semantic markup', 'CSS Flexbox/Grid', 'ES6+ JavaScript', 'DOM manipulation', 'Git version control'] },
      { step: 2, title: 'Frontend Mastery with React & TypeScript', duration: '6-8 Weeks', topics: ['Component architecture', 'React Hooks', 'State management', 'Tailwind CSS', 'TypeScript fundamentals'] },
      { step: 3, title: 'Backend APIs & Relational Databases', duration: '6-8 Weeks', topics: ['Node.js & Express.js', 'RESTful API design', 'PostgreSQL & ORMs (Prisma/Drizzle)', 'JWT authentication', 'Input validation'] },
      { step: 4, title: 'Full Stack Integration & Deployment', duration: '4 Weeks', topics: ['Full stack CRUD apps', 'Cloud deployment (Vercel/Render/AWS)', 'Testing basics', 'Performance optimization'] }
    ],
    certifications: [
      { name: 'Full Stack Web Development', issuer: 'FreeCodeCamp', type: 'Free', link: 'https://www.freecodecamp.org' },
      { name: 'Developing Cloud-Native Applications', issuer: 'NPTEL / IIT Madras', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Meta Front-End & Back-End Professional Certificates', issuer: 'Meta (Coursera)', type: 'Paid', link: 'https://coursera.org' }
    ],
    starterProjects: [
      { name: 'Campus Placement & Job Tracker', description: 'A full-stack dashboard allowing students to track job applications, upcoming interview deadlines, and resume versions.', difficulty: 'Beginner' },
      { name: 'Kirana Store Inventory & Billing App', description: 'Real-time billing, stock alerting, and GST receipt generator tailored for local Indian retail merchants.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Junior Software Engineer', 'Associate Full Stack Developer', 'Graduate Engineer Trainee (GET)', 'Frontend Developer Intern'],
    interviewTips: [
      'Be prepared to write code on a whiteboard or online IDE without autocomplete.',
      'Explain the difference between SQL indexing and database joins with practical examples.',
      'Demonstrate at least one live deployed project with your own domain or live URL.'
    ],
    learningResources: [
      { title: 'The Odin Project - Full Stack JavaScript', provider: 'The Odin Project', type: 'Course', isFree: true, url: 'https://www.theodinproject.com' },
      { title: 'Full Stack Open - University of Helsinki', provider: 'University of Helsinki', type: 'Course', isFree: true, url: 'https://fullstackopen.com/en/' },
      { title: 'MDN Web Docs - Core Web Technologies', provider: 'Mozilla', type: 'Documentation', isFree: true, url: 'https://developer.mozilla.org' }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data & AI',
    tagline: 'Transform raw business data into actionable visual insights and strategic metrics.',
    overview: 'Data Analysts work across banking (HDFC, ICICI), e-commerce (Flipkart, Amazon India), healthcare, and analytics consulting firms (Mu Sigma, Fractal, Tiger Analytics). They query databases, build automated dashboards, and uncover business growth trends.',
    responsibilities: [
      'Extract, clean, and transform data from transactional databases and cloud data warehouses.',
      'Build automated executive dashboards in Power BI, Tableau, or Metabase.',
      'Conduct exploratory data analysis to identify churn, revenue opportunities, and operational bottlenecks.',
      'Present quantitative findings clearly to product and business leaders.'
    ],
    requiredSkills: {
      core: ['SQL (Complex Joins, Window Functions)', 'Advanced Microsoft Excel', 'Power BI / Tableau', 'Python (Pandas, NumPy, Matplotlib)'],
      goodToHave: ['Statistical Analysis', 'dbt', 'BigQuery / Snowflake', 'A/B Testing basics'],
      soft: ['Business Acumen', 'Data Storytelling', 'Critical Thinking', 'Stakeholder Communication']
    },
    salaryRangeIndia: {
      fresherLPA: '₹3.8 - ₹7.5 LPA',
      midLPA: '₹10.0 - ₹18.0 LPA',
      seniorLPA: '₹22.0 - ₹38.0 LPA',
      notes: 'Strong SQL and Python skills give freshers a noticeable salary advantage over Excel-only profiles.'
    },
    educationGuidance: 'B.Com, B.Sc (Stats/Maths/CS), B.Tech, BBA, BCA, or economics graduates with analytical orientation.',
    roadmap: [
      { step: 1, title: 'Advanced Excel & Business Arithmetic', duration: '3 Weeks', topics: ['VLOOKUP/XLOOKUP', 'Pivot Tables & Charts', 'Statistical formulas', 'Scenario analysis'] },
      { step: 2, title: 'SQL for Data Analysis', duration: '4 Weeks', topics: ['Aggregations & GROUP BY', 'Multi-table Joins', 'Subqueries & CTEs', 'Window functions (RANK, ROW_NUMBER)'] },
      { step: 3, title: 'BI Tools & Data Visualization', duration: '4 Weeks', topics: ['Power BI DAX formulas', 'Data modeling star schema', 'Interactive dashboard design', 'KPI reporting'] },
      { step: 4, title: 'Python for Exploratory Data Analysis', duration: '5 Weeks', topics: ['Pandas data manipulation', 'Handling missing values', 'Data cleaning', 'Seaborn/Plotly visualization'] }
    ],
    certifications: [
      { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', type: 'Paid', link: 'https://coursera.org' },
      { name: 'Business Intelligence and Data Analytics', issuer: 'NPTEL / IIT Roorkee', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'SQL for Data Science', issuer: 'UC Davis (Coursera)', type: 'Paid', link: 'https://coursera.org' }
    ],
    starterProjects: [
      { name: 'Indian Railway Passenger Congestion Analysis', description: 'Analyze IRCTC/Kaggle dataset on train punctuality, route congestion, and seasonal travel demand.', difficulty: 'Beginner' },
      { name: 'E-Commerce Return Rate Diagnostic Dashboard', description: 'Interactive Power BI dashboard identifying reasons for high COD returns across Indian tier-2 and tier-3 cities.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Junior Data Analyst', 'Business Intelligence Analyst', 'Analytics Trainee', 'MIS Executive'],
    interviewTips: [
      'Expect hands-on SQL queries during live rounds (e.g., finding the second highest salary, month-over-month growth).',
      'Always structure your dashboard answers around business impact rather than just visual aesthetics.'
    ],
    learningResources: [
      { title: 'Kaggle Learn - SQL & Python Micro-Courses', provider: 'Kaggle', type: 'Course', isFree: true, url: 'https://www.kaggle.com/learn' },
      { title: 'Mode Analytics SQL Tutorial', provider: 'Mode', type: 'Documentation', isFree: true, url: 'https://mode.com/sql-tutorial/' },
      { title: 'Microsoft Power BI Documentation & Guided Learning', provider: 'Microsoft', type: 'Documentation', isFree: true, url: 'https://learn.microsoft.com/en-us/power-bi/' }
    ]
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning Engineering',
    category: 'Data & AI',
    tagline: 'Design, train, and deploy intelligent models and GenAI-powered applications.',
    overview: 'Machine Learning Engineers build predictive algorithms and generative AI tools. India is seeing immense demand for AI engineers capable of integrating modern LLMs, vector search, and fine-tuning open-source models for enterprise use cases.',
    responsibilities: [
      'Prepare and preprocess structured and unstructured datasets for machine learning pipelines.',
      'Train, evaluate, and benchmark regression, classification, and deep learning architectures.',
      'Implement GenAI pipelines using LLMs, embeddings, RAG (Retrieval-Augmented Generation), and prompt engineering.',
      'Deploy models as robust REST APIs using FastAPI and cloud containers.'
    ],
    requiredSkills: {
      core: ['Python', 'Linear Algebra & Statistics', 'Scikit-Learn', 'PyTorch / TensorFlow', 'Hugging Face & GenAI APIs'],
      goodToHave: ['Vector Databases (Pinecone/Chroma)', 'LangChain / LlamaIndex', 'FastAPI', 'MLOps basics (MLflow, Docker)'],
      soft: ['Research Aptitude', 'Mathematical Rigor', 'Ethical AI Awareness', 'Rapid Experimentation']
    },
    salaryRangeIndia: {
      fresherLPA: '₹5.5 - ₹12.0 LPA',
      midLPA: '₹15.0 - ₹32.0 LPA',
      seniorLPA: '₹35.0 - ₹65.0+ LPA',
      notes: 'Entry salaries are significantly boosted by verifiable open-source contributions, Kaggle medals, or research papers.'
    },
    educationGuidance: 'B.Tech/M.Tech (CSE, Data Science, AI), M.Sc in Mathematics/Statistics, or strong mathematical self-study.',
    roadmap: [
      { step: 1, title: 'Mathematical Foundations & Python Tooling', duration: '5 Weeks', topics: ['Multivariable calculus & linear algebra', 'Probability & statistics', 'NumPy vectorization', 'Pandas & Scipy'] },
      { step: 2, title: 'Classical Machine Learning', duration: '6 Weeks', topics: ['Supervised learning (Linear, Trees, SVM)', 'Unsupervised clustering', 'Cross-validation & metrics (ROC, F1)', 'Feature engineering'] },
      { step: 3, title: 'Deep Learning & Neural Networks', duration: '6 Weeks', topics: ['PyTorch fundamentals', 'Feedforward neural nets', 'CNNs for computer vision', 'Transformers & attention mechanism'] },
      { step: 4, title: 'GenAI, RAG & Production Deployment', duration: '5 Weeks', topics: ['Working with Gemini & Hugging Face', 'Vector search & embeddings', 'Building RAG systems', 'FastAPI deployment'] }
    ],
    certifications: [
      { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', type: 'Paid', link: 'https://coursera.org' },
      { name: 'Applied AI & Machine Learning', issuer: 'NPTEL / IIT Kharagpur', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Kaggle Machine Learning Competitions Certificate', issuer: 'Kaggle', type: 'Free', link: 'https://www.kaggle.com' }
    ],
    starterProjects: [
      { name: 'Multilingual Crop Disease Diagnosis Tool', description: 'Computer vision classifier detecting leaf blights in tomato and potato crops with vernacular Hindi/Telugu explanations.', difficulty: 'Intermediate' },
      { name: 'Indian Legal Document Summarizer & QA (RAG)', description: 'Retrieval-Augmented Generation pipeline answering citizen queries against public Indian consumer protection acts.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Junior AI/ML Engineer', 'Associate Data Scientist', 'AI Research Intern', 'Computer Vision Associate'],
    interviewTips: [
      'Be ready to derive loss functions (like Cross-Entropy) and explain gradient descent mathematically.',
      'Explain how you prevent overfitting in small datasets.'
    ],
    learningResources: [
      { title: 'Fast.ai - Practical Deep Learning for Coders', provider: 'Fast.ai', type: 'Course', isFree: true, url: 'https://course.fast.ai' },
      { title: 'Google Machine Learning Crash Course', provider: 'Google', type: 'Course', isFree: true, url: 'https://developers.google.com/machine-learning/crash-course' },
      { title: 'Hugging Face NLP Course', provider: 'Hugging Face', type: 'Course', isFree: true, url: 'https://huggingface.co/learn' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Computing & DevOps',
    category: 'Tech',
    tagline: 'Automate infrastructure, CI/CD pipelines, and scale mission-critical cloud deployments.',
    overview: 'DevOps engineers bridge software development and IT operations. As Indian corporations migrate legacy workloads to AWS, Azure, and Google Cloud, cloud architects and site reliability engineers enjoy exceptionally stable career growth.',
    responsibilities: [
      'Automate cloud infrastructure provisioning using Terraform or CloudFormation.',
      'Configure and maintain continuous integration and deployment (CI/CD) pipelines in GitHub Actions/GitLab.',
      'Containerize microservices using Docker and orchestrate them on Kubernetes.',
      'Monitor system health, error rates, and security baselines with Prometheus and Grafana.'
    ],
    requiredSkills: {
      core: ['Linux Administration & Shell Scripting', 'Docker', 'AWS / Azure Basics', 'Git & GitHub Actions', 'Networking (DNS, VPC, Subnets)'],
      goodToHave: ['Kubernetes (K8s)', 'Terraform (IaC)', 'Ansible', 'Prometheus & Grafana'],
      soft: ['Crisis Management under Outages', 'Automation Mindset', 'System Reliability Focus']
    },
    salaryRangeIndia: {
      fresherLPA: '₹4.2 - ₹8.0 LPA',
      midLPA: '₹12.0 - ₹22.0 LPA',
      seniorLPA: '₹26.0 - ₹48.0 LPA',
      notes: 'Entry candidates with an AWS Certified Cloud Practitioner or Solutions Architect Associate badge stand out immediately.'
    },
    educationGuidance: 'B.Tech/B.E., BCA/MCA, B.Sc IT or systems administrators seeking modern cloud upskilling.',
    roadmap: [
      { step: 1, title: 'Linux Fundamentals & Bash Scripting', duration: '3 Weeks', topics: ['File permissions & systemd', 'Networking commands (curl, ssh, netstat)', 'Cron automation', 'Bash scripting'] },
      { step: 2, title: 'Cloud Infrastructure (AWS Essentials)', duration: '5 Weeks', topics: ['EC2, S3, IAM policies', 'VPC & Security Groups', 'RDS databases', 'CloudWatch monitoring'] },
      { step: 3, title: 'Containers & CI/CD Pipelines', duration: '5 Weeks', topics: ['Dockerfile optimization', 'Docker Compose', 'GitHub Actions automation', 'Automated testing integration'] },
      { step: 4, title: 'Infrastructure as Code & Orchestration', duration: '5 Weeks', topics: ['Terraform modules', 'Kubernetes pods & deployments', 'Helm charts', 'Site Reliability Engineering principles'] }
    ],
    certifications: [
      { name: 'AWS Certified Cloud Practitioner / Solutions Architect', issuer: 'Amazon Web Services', type: 'Paid', link: 'https://aws.amazon.com/certification/' },
      { name: 'Cloud Computing Architecture', issuer: 'NPTEL / IIT Kharagpur', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Docker Certified Associate', issuer: 'Docker', type: 'Paid', link: 'https://www.docker.com' }
    ],
    starterProjects: [
      { name: 'Automated Multi-Stage CI/CD Pipeline', description: 'GitHub Actions workflow that lints, runs unit tests, builds a Docker image, and deploys automatically to AWS ECS.', difficulty: 'Beginner' },
      { name: 'Self-Healing Kubernetes Microservice Cluster', description: 'Deploy a resilient 3-service web app on Minikube with Horizontal Pod Autoscaling and health probes.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Associate Cloud Engineer', 'Junior DevOps Engineer', 'Site Reliability Trainee', 'Systems Engineer (Cloud)'],
    interviewTips: [
      'Be ready to troubleshoot broken Linux network connections or permission errors live.',
      'Explain the difference between vertical scaling and horizontal scaling with practical cost implications.'
    ],
    learningResources: [
      { title: 'AWS Skill Builder Free Tier', provider: 'Amazon Web Services', type: 'Course', isFree: true, url: 'https://explore.skillbuilder.aws' },
      { title: 'Learn Git Branching Interactive Guide', provider: 'Open Source', type: 'Practice', isFree: true, url: 'https://learngitbranching.js.org' },
      { title: 'Kubernetes Official Interactive Tutorials', provider: 'CNCF', type: 'Documentation', isFree: true, url: 'https://kubernetes.io/docs/tutorials/' }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Information Security',
    category: 'Tech',
    tagline: 'Protect digital assets, conduct vulnerability assessments, and secure networks from threats.',
    overview: 'With the enactment of Indias Digital Personal Data Protection (DPDP) Act and the rise of UPI financial transactions, banks, defense contractors, and SaaS companies are rapidly expanding their Security Operations Center (SOC) teams.',
    responsibilities: [
      'Monitor Security Information and Event Management (SIEM) consoles for suspicious activity.',
      'Perform vulnerability scanning, penetration testing, and code audits.',
      'Assist in incident response, containment, and post-mortem digital forensics.',
      'Audit organizational compliance with ISO 27001, CERT-In guidelines, and the Indian DPDP Act.'
    ],
    requiredSkills: {
      core: ['Computer Networking (TCP/IP, OSI, Firewalls)', 'Linux Security', 'Vulnerability Assessment tools (Nmap, Wireshark, Burp Suite)', 'OWASP Top 10'],
      goodToHave: ['Python/Bash for security automation', 'SIEM tools (Splunk, Wazuh)', 'Cryptography basics'],
      soft: ['Integrity & Ethical Judgment', 'Investigative Persistence', 'Calm Communication under Breach']
    },
    salaryRangeIndia: {
      fresherLPA: '₹4.0 - ₹7.5 LPA',
      midLPA: '₹11.0 - ₹20.0 LPA',
      seniorLPA: '₹24.0 - ₹45.0 LPA',
      notes: 'Passing CompTIA Security+ or achieving a high rank on platforms like TryHackMe significantly boosts interview shortlisting.'
    },
    educationGuidance: 'B.Tech/BCA/B.Sc IT, diploma holders with certified ethical hacking background, or electronics engineering graduates.',
    roadmap: [
      { step: 1, title: 'Networking Fundamentals & Protocol Analysis', duration: '4 Weeks', topics: ['Subnetting & routing', 'Packet inspection with Wireshark', 'DNS, DHCP, TLS/SSL handshake', 'Port scanning with Nmap'] },
      { step: 2, title: 'System Security & Linux Hardening', duration: '4 Weeks', topics: ['Access controls (chmod, sudo, chroot)', 'SSH key management', 'Firewall rules (iptables, UFW)', 'Log analysis in /var/log'] },
      { step: 3, title: 'Web Application Security & OWASP Top 10', duration: '5 Weeks', topics: ['SQL Injection & XSS prevention', 'CSRF, SSRF, and broken auth', 'Intercepting proxies (Burp Suite)', 'Secure coding standards'] },
      { step: 4, title: 'SOC Operations & Defensive SIEM', duration: '4 Weeks', topics: ['Wazuh/Splunk dashboarding', 'Threat intelligence feeds', 'Incident response playbooks', 'Indian CERT-In reporting rules'] }
    ],
    certifications: [
      { name: 'CompTIA Security+', issuer: 'CompTIA', type: 'Paid', link: 'https://www.comptia.org' },
      { name: 'Information Security and Cyber Forensics', issuer: 'NPTEL / IIT Madras', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'TryHackMe Pre-Security & Complete Beginner Paths', issuer: 'TryHackMe', type: 'Free', link: 'https://tryhackme.com' }
    ],
    starterProjects: [
      { name: 'Home Lab SOC with Wazuh & Suricata', description: 'Set up an intrusion detection system monitoring an isolated Linux virtual machine simulating unauthorized SSH attempts.', difficulty: 'Intermediate' },
      { name: 'OWASP Juice Shop Penetration Testing Audit Report', description: 'Complete security report documenting vulnerabilities discovered on the OWASP vulnerable test application.', difficulty: 'Beginner' }
    ],
    entryLevelTitles: ['SOC Analyst L1', 'Junior Penetration Tester', 'Cybersecurity Trainee', 'Information Security Associate'],
    interviewTips: [
      'Expect detailed questions on the 3-way TCP handshake and the exact difference between symmetric and asymmetric encryption.',
      'Familiarize yourself with CERT-In 6-hour reporting guidelines for cybersecurity incidents in India.'
    ],
    learningResources: [
      { title: 'TryHackMe Cyber Defense Path', provider: 'TryHackMe', type: 'Practice', isFree: true, url: 'https://tryhackme.com' },
      { title: 'OWASP Foundation Official Guides', provider: 'OWASP', type: 'Documentation', isFree: true, url: 'https://owasp.org' },
      { title: 'PortSwigger Web Security Academy', provider: 'PortSwigger', type: 'Practice', isFree: true, url: 'https://portswigger.net/web-security' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    category: 'Design & Creative',
    tagline: 'Craft intuitive, accessible user journeys and high-fidelity interface design systems.',
    overview: 'Product designers craft digital experiences for Indias diverse next-billion internet users. They understand regional linguistic contexts, vernacular usability, micro-interactions, and design systems for mobile-first apps.',
    responsibilities: [
      'Conduct user interviews, usability audits, and field observation across user segments.',
      'Create wireframes, interactive clickable prototypes, and design systems in Figma.',
      'Ensure high standards of accessibility (WCAG), color contrast, and multi-lingual typography.',
      'Collaborate closely with frontend engineers to ensure design fidelity in production.'
    ],
    requiredSkills: {
      core: ['Figma / FigJam', 'User Research & Journey Mapping', 'Wireframing & Prototyping', 'Design Systems (Tokens, Components)'],
      goodToHave: ['Micro-animations (Lottie)', 'HTML/CSS basics', 'Information Architecture', 'Usability Testing'],
      soft: ['Empathy for Diverse Users', 'Constructive Feedback Reception', 'Storytelling & Presentation']
    },
    salaryRangeIndia: {
      fresherLPA: '₹3.6 - ₹7.0 LPA',
      midLPA: '₹9.0 - ₹18.0 LPA',
      seniorLPA: '₹20.0 - ₹38.0 LPA',
      notes: 'In UI/UX design, a polished Behance/Notion portfolio with detailed case studies matters far more than your college degree.'
    },
    educationGuidance: 'Open to any graduate! B.Des/M.Des, BCA, Fine Arts, Architecture, or engineering students with design portfolios.',
    roadmap: [
      { step: 1, title: 'Design Principles & Visual Hierarchy', duration: '3 Weeks', topics: ['Typography & scales', 'Color theory & 60-30-10 rule', 'Spacing grids (8pt system)', 'Gestalt psychology principles'] },
      { step: 2, title: 'Figma Mastery & Component Architecture', duration: '4 Weeks', topics: ['Auto-layout 5.0', 'Variants & component properties', 'Design tokens', 'Interactive micro-prototyping'] },
      { step: 3, title: 'UX Research & Information Architecture', duration: '4 Weeks', topics: ['User personas & empathy maps', 'Card sorting & site mapping', 'Competitor benchmarking', 'Usability testing sessions'] },
      { step: 4, title: 'Case Study Building & Developer Handoff', duration: '4 Weeks', topics: ['Structuring a design case study', 'Documenting component specs', 'Handoff annotations', 'Portfolio curation'] }
    ],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google', type: 'Paid', link: 'https://coursera.org' },
      { name: 'Interaction Design & Ergonomics', issuer: 'NPTEL / IIT Guwahati', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Figma Community Certifications & Masterclasses', issuer: 'Figma', type: 'Free', link: 'https://www.figma.com/community' }
    ],
    starterProjects: [
      { name: 'Vernacular Rural Healthcare Appointment App', description: 'Redesign of patient OPD booking optimized for elderly and first-time smartphone users in tier-3 towns.', difficulty: 'Beginner' },
      { name: 'Indian Rail Ticket Refund Tracking Experience', description: 'UX case study resolving cognitive friction in tracking cancelled train tickets and UPI refunds.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Junior UI/UX Designer', 'Associate Product Designer', 'Design Intern', 'Visual Interaction Designer'],
    interviewTips: [
      'Walk through your design choices step-by-step: what problem were you solving, why did you discard the first concept?',
      'Show mobile screen designs with realistic thumb zones and regional language text expansion.'
    ],
    learningResources: [
      { title: 'Laws of UX - Design Psychology Principles', provider: 'Jon Yablonski', type: 'Documentation', isFree: true, url: 'https://lawsofux.com' },
      { title: 'Figma Learn Official Tutorials', provider: 'Figma', type: 'Video Series', isFree: true, url: 'https://help.figma.com' },
      { title: 'Nielsen Norman Group UX Articles & Guidelines', provider: 'NNGroup', type: 'Documentation', isFree: true, url: 'https://www.nngroup.com' }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'Business & Marketing',
    tagline: 'Drive customer acquisition, organic search visibility, and paid campaign performance.',
    overview: 'Digital marketers help brands reach target consumers across search engines, social media, and performance ads. With millions of Direct-to-Consumer (D2C) brands and tech companies scaling in India, performance marketers are in continuous demand.',
    responsibilities: [
      'Plan and execute search engine optimization (SEO) audits and content strategies.',
      'Manage paid ad campaigns on Google Ads (Search/Shopping) and Meta Ads Manager.',
      'Track return on ad spend (ROAS), customer acquisition cost (CAC), and conversions in Google Analytics 4.',
      'Develop email marketing, retention drip campaigns, and social media engagement calendars.'
    ],
    requiredSkills: {
      core: ['SEO (Keyword Research, Technical, Backlinks)', 'Google Ads & Meta Ads Manager', 'Google Analytics 4 (GA4)', 'Content Copywriting'],
      goodToHave: ['Canva / Creative direction', 'Email automation (Mailchimp/Klaviyo)', 'Basic HTML for tracking tags'],
      soft: ['Analytical Mindset', 'Creative Experimentation', 'Persuasive Writing', 'Commercial Curiosity']
    },
    salaryRangeIndia: {
      fresherLPA: '₹3.2 - ₹6.0 LPA',
      midLPA: '₹8.0 - ₹15.0 LPA',
      seniorLPA: '₹18.0 - ₹32.0 LPA',
      notes: 'Candidates who can show real campaign numbers (e.g. 3.5x ROAS or 50k organic monthly impressions) negotiate higher compensation.'
    },
    educationGuidance: 'BBA, B.Com, Mass Communication/Journalism, BA, B.Tech, or any graduate passionate about online branding.',
    roadmap: [
      { step: 1, title: 'Organic Search Engine Optimization (SEO)', duration: '3 Weeks', topics: ['On-page optimization & title tags', 'Keyword intent mapping', 'Technical crawling & sitemaps', 'Backlink strategies'] },
      { step: 2, title: 'Analytics & Web Measurement', duration: '3 Weeks', topics: ['Google Analytics 4 setup', 'Conversion events & UTM parameters', 'Google Tag Manager basics', 'Looker Studio dashboards'] },
      { step: 3, title: 'Performance Paid Ads (Meta & Google)', duration: '4 Weeks', topics: ['Google Search ad auctions & Quality Score', 'Meta pixel & Lookalike audiences', 'Creative ad copy testing', 'ROAS calculation'] },
      { step: 4, title: 'Content & Retention Marketing', duration: '3 Weeks', topics: ['Email nurturing funnels', 'WhatsApp marketing workflows', 'Influencer outreach strategy', 'Brand tone guidelines'] }
    ],
    certifications: [
      { name: 'Google Ads Search & Measurement Certifications', issuer: 'Google Skillshop', type: 'Free', link: 'https://skillshop.withgoogle.com' },
      { name: 'HubSpot Inbound & Content Marketing Certification', issuer: 'HubSpot Academy', type: 'Free', link: 'https://academy.hubspot.com' },
      { name: 'Digital Marketing Fundamentals', issuer: 'NPTEL / IIT Roorkee', type: 'Government/NPTEL', link: 'https://nptel.ac.in' }
    ],
    starterProjects: [
      { name: 'Organic SEO Audit for an Indian Artisanal D2C Brand', description: 'Comprehensive 15-page SEO audit identifying keyword gaps, page speed fixes, and competitor backlink opportunities.', difficulty: 'Beginner' },
      { name: 'Multi-Channel Growth Campaign Mockup for an EdTech App', description: 'Complete funnel strategy including ad creatives, audience targeting parameters, budget allocation, and expected CAC.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Digital Marketing Executive', 'SEO Specialist Trainee', 'Performance Marketing Associate', 'Social Media Coordinator'],
    interviewTips: [
      'Understand key metrics thoroughly: CTR, CPC, CPA, ROAS, LTV, and churn rate.',
      'Explain how you would allocate an initial testing budget of ₹20,000 across channels for a new product.'
    ],
    learningResources: [
      { title: 'Google Skillshop Official Courses', provider: 'Google', type: 'Course', isFree: true, url: 'https://skillshop.withgoogle.com' },
      { title: 'Backlinko SEO Hub', provider: 'Backlinko', type: 'Documentation', isFree: true, url: 'https://backlinko.com/hub/seo' },
      { title: 'HubSpot Marketing Academy', provider: 'HubSpot', type: 'Course', isFree: true, url: 'https://academy.hubspot.com' }
    ]
  },
  {
    id: 'finance-banking',
    title: 'Financial Analysis & Banking Operations',
    category: 'Finance',
    tagline: 'Evaluate financial statements, build valuation models, and assess commercial credit risks.',
    overview: 'Financial Analysts help investment banks (JPMorgan, Goldman Sachs Bengaluru/Mumbai), NBFCs, Indian private banks (Axis, Kotak), and fintech startups assess corporate performance, evaluate credit risk, and manage investments.',
    responsibilities: [
      'Analyze balance sheets, profit & loss statements, and cash flows according to Ind AS / IFRS.',
      'Build 3-statement financial models and discounted cash flow (DCF) valuation sheets.',
      'Prepare credit appraisal memos (CAM) for SME and corporate commercial loans.',
      'Monitor market trends, interest rate movements, and RBI regulatory circulars.'
    ],
    requiredSkills: {
      core: ['Financial Modeling & Statement Analysis', 'Advanced Microsoft Excel (VBA/Macros)', 'Corporate Finance & Valuation', 'Accounting Principles (Ind AS)'],
      goodToHave: ['Power BI for Finance', 'Python for financial data', 'Bloomberg/Capital IQ basics'],
      soft: ['Attention to Numerical Detail', 'Commercial Discretion', 'Deadline Adherence', 'Executive Presentation']
    },
    salaryRangeIndia: {
      fresherLPA: '₹4.5 - ₹9.0 LPA',
      midLPA: '₹12.0 - ₹22.0 LPA',
      seniorLPA: '₹25.0 - ₹45.0+ LPA',
      notes: 'CA Inter, CFA Level 1 clearance, or an MBA in Finance opens doors directly to global capability centers (GCCs).'
    },
    educationGuidance: 'B.Com, BBA (Finance), B.Sc (Economics/Statistics), CA/CMA aspirants, or MBA Finance graduates.',
    roadmap: [
      { step: 1, title: 'Accounting Mastery & Financial Reporting', duration: '4 Weeks', topics: ['Three financial statements', 'Revenue recognition rules', 'Depreciation & Working capital', 'Ratio analysis (EBITDA, ROE, Debt/Equity)'] },
      { step: 2, title: 'Financial Modeling in Excel', duration: '5 Weeks', topics: ['Dynamic 3-statement integration', 'Debt scheduling & interest tax shields', 'Sensitivity & scenario tables', 'Capital budgeting (NPV, IRR)'] },
      { step: 3, title: 'Corporate Valuation & Equity Research', duration: '5 Weeks', topics: ['Discounted Cash Flow (DCF)', 'WACC computation', 'Trading & transaction comparable analysis', 'Writing an equity investment note'] },
      { step: 4, title: 'Indian Banking Regulations & Credit Analysis', duration: '3 Weeks', topics: ['RBI priority sector lending', 'CIBIL & credit bureau scoring', 'Working capital limits (Cash Credit/Overdraft)', 'NPA recovery mechanisms'] }
    ],
    certifications: [
      { name: 'CFA Level 1 Candidate / Investment Foundations', issuer: 'CFA Institute', type: 'Paid', link: 'https://www.cfainstitute.org' },
      { name: 'Financial Statement Analysis and Reporting', issuer: 'NPTEL / IIT Kharagpur', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'NISM Series XV: Research Analyst Certification', issuer: 'National Institute of Securities Markets (SEBI)', type: 'Government/NPTEL', link: 'https://www.nism.ac.in' }
    ],
    starterProjects: [
      { name: 'Valuation & Research Note on an NSE-Listed FMCG Major', description: 'Complete 3-statement DCF financial model and investment report for Tata Consumer or Britannia on NSE.', difficulty: 'Intermediate' },
      { name: 'SME Commercial Loan Credit Appraisal Memo', description: 'Credit risk assessment and working capital calculation for an Indian auto-ancillary manufacturing firm.', difficulty: 'Beginner' }
    ],
    entryLevelTitles: ['Credit Risk Analyst', 'Junior Financial Analyst', 'Management Trainee (Banking)', 'Equity Research Associate'],
    interviewTips: [
      'Master the bridge between Net Income and Cash Flow from Operations by heart.',
      'Explain how a ₹100 increase in depreciation impacts the 3 financial statements assuming a 25% tax rate.'
    ],
    learningResources: [
      { title: 'Corporate Finance Institute Free Library', provider: 'CFI', type: 'Documentation', isFree: true, url: 'https://corporatefinanceinstitute.com/resources/' },
      { title: 'Varsity by Zerodha - Fundamental & Technical Analysis', provider: 'Zerodha', type: 'Course', isFree: true, url: 'https://zerodha.com/varsity/' },
      { title: 'Aswath Damodaran Valuation Lectures', provider: 'NYU Stern / YouTube', type: 'Video Series', isFree: true, url: 'https://pages.stern.nyu.edu/~adamodar/' }
    ]
  },
  {
    id: 'human-resources',
    title: 'Human Resources & Talent Acquisition',
    category: 'Operations & Support',
    tagline: 'Manage talent pipelines, streamline onboarding, employee relations, and HR policies.',
    overview: 'HR professionals build and support an organizations greatest asset: its people. In Indias high-volume IT and services industry, recruiters, HR generalists, and talent operations specialists coordinate hiring across campus placements and lateral hiring.',
    responsibilities: [
      'Source, screen, and interview prospective candidates across job portals and campus drives.',
      'Coordinate end-to-end employee onboarding, background verification, and documentation.',
      'Administer employee benefits, leave records, and Indian statutory compliance (PF, ESI, Gratuity).',
      'Foster positive employee engagement, performance appraisals, and dispute resolution.'
    ],
    requiredSkills: {
      core: ['Talent Sourcing & Screening', 'Applicant Tracking Systems (ATS)', 'Indian Labor Laws & Statutory Compliance (PF, ESI)', 'Employee Engagement'],
      goodToHave: ['HR Analytics / Excel reporting', 'Employer Branding', 'Payroll processing basics'],
      soft: ['Interpersonal Diplomacy', 'Active Listening', 'Confidentiality & Ethics', 'Organizational Empathy']
    },
    salaryRangeIndia: {
      fresherLPA: '₹3.0 - ₹5.5 LPA',
      midLPA: '₹7.5 - ₹14.0 LPA',
      seniorLPA: '₹16.0 - ₹30.0 LPA',
      notes: 'Technical recruiters specialized in hiring niche AI and cloud engineering talent command significant premiums.'
    },
    educationGuidance: 'BBA, MBA in HR, MSW (Social Work), B.Com, Psychology graduates, or humanities graduates with strong organizational skills.',
    roadmap: [
      { step: 1, title: 'Talent Acquisition & Sourcing Fundamentals', duration: '3 Weeks', topics: ['Boolean search on LinkedIn & Naukri', 'Job description drafting', 'Resume screening heuristics', 'Conducting initial HR screening calls'] },
      { step: 2, title: 'Indian Labor Regulations & Payroll Compliance', duration: '4 Weeks', topics: ['Provident Fund (EPFO) & ESIC rules', 'Gratuity calculation & Payment of Wages Act', 'POSH Act guidelines and ICC committees', 'Drafting offer letters and NDAs'] },
      { step: 3, title: 'HR Systems & People Analytics', duration: '3 Weeks', topics: ['Working with ATS systems (Keka, Darwinbox, Zoho)', 'Attrition rate calculation', 'Time-to-hire & Cost-per-hire metrics', 'Performance appraisal cycles (OKRs vs KPIs)'] },
      { step: 4, title: 'Employee Relations & Culture Building', duration: '3 Weeks', topics: ['Exit interview protocols', 'Employee engagement initiatives', 'Conflict mediation', 'Workplace diversity & inclusion policies'] }
    ],
    certifications: [
      { name: 'Human Resource Development', issuer: 'NPTEL / IIT Kharagpur', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'SHRM Certified Professional Prep Modules', issuer: 'SHRM', type: 'Paid', link: 'https://www.shrm.org' },
      { name: 'LinkedIn Recruiter Certification', issuer: 'LinkedIn Learning', type: 'Paid', link: 'https://learning.linkedin.com' }
    ],
    starterProjects: [
      { name: 'Comprehensive Campus Recruitment Plan for a Tech Startup', description: 'Design candidate evaluation rubrics, interview stage SLAs, and offer acceptance onboarding checklists.', difficulty: 'Beginner' },
      { name: 'POSH Compliance Handbook & Training Kit for Indian SMEs', description: 'Document an employee handbook and Internal Complaints Committee flowchart compliant with Indian statutory requirements.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['HR Trainee', 'Talent Acquisition Specialist', 'HR Operations Associate', 'Campus Recruiter'],
    interviewTips: [
      'Be prepared to demonstrate how you handle sensitive conflicts between employees or negotiate salary expectations with candidates.',
      'Know the statutory formulas for EPF (12% employee + 12% employer contribution) and gratuity eligibility.'
    ],
    learningResources: [
      { title: 'SHRM HR Resources & Toolkits', provider: 'SHRM', type: 'Documentation', isFree: true, url: 'https://www.shrm.org' },
      { title: 'Ministry of Labour & Employment Portal, Government of India', provider: 'Gov of India', type: 'Documentation', isFree: true, url: 'https://labour.gov.in' }
    ]
  },
  {
    id: 'sales-business-development',
    title: 'Sales & Business Development (B2B & SaaS)',
    category: 'Business & Marketing',
    tagline: 'Generate qualified enterprise leads, build client relationships, and close revenue deals.',
    overview: 'Sales and Business Development Executives drive revenue for enterprise SaaS companies, logistics firms, edtech, and B2B platforms. Freshers with great communication skills and hunger for growth often rise fastest into leadership.',
    responsibilities: [
      'Identify and research high-potential business prospects across domestic and international markets.',
      'Conduct multi-touch cold outreach via email, LinkedIn, and phone to book demo meetings.',
      'Conduct product demonstrations and understand customer pain points and budget constraints.',
      'Manage sales pipeline stages in CRM tools like Salesforce, HubSpot, or Zoho.'
    ],
    requiredSkills: {
      core: ['Outbound Lead Generation & Prospecting', 'Cold Email & LinkedIn Outreach', 'CRM Management (HubSpot / Zoho / Salesforce)', 'Product Demonstrations'],
      goodToHave: ['Objection Handling Frameworks', 'Contract Negotiation', 'B2B SaaS metric awareness (ARR, ACV)'],
      soft: ['Resilience to Rejection', 'Active Listening & Rapport Building', 'Clear Verbal Articulation', 'Target Motivation']
    },
    salaryRangeIndia: {
      fresherLPA: '₹3.5 - ₹6.5 LPA (Fixed) + ₹2-4 LPA Variable Incentives',
      midLPA: '₹9.0 - ₹16.0 LPA + Uncapped Commissions',
      seniorLPA: '₹20.0 - ₹40.0+ LPA + Leadership Bonuses',
      notes: 'B2B SaaS business development offers some of the highest variable incentive payouts in early careers.'
    },
    educationGuidance: 'Open to all graduates! Engineering, commerce, humanities, or science graduates with articulate communication.',
    roadmap: [
      { step: 1, title: 'B2B Sales Fundamentals & Buyer Personas', duration: '3 Weeks', topics: ['Ideal Customer Profile (ICP) definition', 'Inbound vs Outbound sales models', 'Researching key decision makers', 'The B2B buying committee'] },
      { step: 2, title: 'Outbound Prospecting & Cold Outreach', duration: '3 Weeks', topics: ['Writing cold emails that get opened', 'LinkedIn social selling techniques', 'Cold calling frameworks', 'Automated sales cadence tools'] },
      { step: 3, title: 'Discovery Calls & Value-Based Selling', duration: '4 Weeks', topics: ['BANT & MEDDIC qualification frameworks', 'Asking open-ended discovery questions', 'Handling objections (Price, Competitor, Timing)', 'Delivering compelling software demos'] },
      { step: 4, title: 'Pipeline Management & Deal Closing', duration: '3 Weeks', topics: ['Managing stages in CRM', 'Sales forecasting', 'Creating proposals & pricing quotes', 'Follow-up discipline'] }
    ],
    certifications: [
      { name: 'HubSpot Inbound Sales & Frictionless Sales', issuer: 'HubSpot Academy', type: 'Free', link: 'https://academy.hubspot.com' },
      { name: 'Sales and Distribution Management', issuer: 'NPTEL / IIT Kharagpur', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Salesforce Certified Associate', issuer: 'Salesforce Trailhead', type: 'Free', link: 'https://trailhead.salesforce.com' }
    ],
    starterProjects: [
      { name: 'B2B Outbound Campaign Playbook for an HR-Tech SaaS', description: 'Create 5 personalized cold email templates, 3 LinkedIn connection sequences, and objection response scripts.', difficulty: 'Beginner' },
      { name: 'CRM Pipeline Architecture in HubSpot Free Tier', description: 'Configure lead stages, custom properties, and automated follow-up tasks for a simulated enterprise software product.', difficulty: 'Beginner' }
    ],
    entryLevelTitles: ['Business Development Representative (BDR)', 'Sales Development Representative (SDR)', 'Inside Sales Executive', 'Associate Account Manager'],
    interviewTips: [
      'Expect a live roleplay in the interview where the hiring manager asks you to sell them a pen or book a meeting for their software.',
      'Show eagerness to learn and discuss how you handle consecutive rejections.'
    ],
    learningResources: [
      { title: 'HubSpot Sales Academy Courses', provider: 'HubSpot', type: 'Course', isFree: true, url: 'https://academy.hubspot.com' },
      { title: 'Sales Hacker Articles & Webinars', provider: 'Sales Hacker', type: 'Documentation', isFree: true, url: 'https://www.saleshacker.com' }
    ]
  },
  {
    id: 'product-management',
    title: 'Associate Product Management (APM)',
    category: 'Business & Marketing',
    tagline: 'Define product vision, prioritize roadmap features, and guide engineering execution.',
    overview: 'Product Managers sit at the intersection of business, technology, and user experience. Associate Product Manager (APM) programs at Indian unicorns (Swiggy, Razorpay, Zomato, Zerodha) offer fast-track leadership opportunities for analytical freshers.',
    responsibilities: [
      'Write clear Product Requirement Documents (PRDs) with user stories and acceptance criteria.',
      'Analyze product engagement metrics, funnel conversion rates, and drop-off points.',
      'Coordinate sprint planning and feature prioritization with engineering and design teams.',
      'Conduct customer discovery interviews to validate new problem statements.'
    ],
    requiredSkills: {
      core: ['Product Requirement Documents (PRDs)', 'Feature Prioritization (RICE/MoSCoW)', 'Product Analytics (Mixpanel/Amplitude)', 'Agile & Scrum Sprints'],
      goodToHave: ['Wireframing basics', 'SQL for product data extraction', 'A/B Experimentation design'],
      soft: ['Influence without Authority', 'Structured Problem Breakdown', 'First-Principles Thinking', 'Customer Empathy']
    },
    salaryRangeIndia: {
      fresherLPA: '₹6.5 - ₹14.0 LPA',
      midLPA: '₹18.0 - ₹35.0 LPA',
      seniorLPA: '₹40.0 - ₹75.0+ LPA',
      notes: 'APM roles are competitive but offer among the steepest career and remuneration trajectories in Indian tech.'
    },
    educationGuidance: 'B.Tech/B.E., Dual Degree, MBA, or graduates with demonstrable side projects, student club leadership, or founder experience.',
    roadmap: [
      { step: 1, title: 'Product Thinking & Problem Discovery', duration: '4 Weeks', topics: ['Identifying core user pain vs symptoms', 'Customer interview techniques', 'Value proposition design', 'Competitor feature teardowns'] },
      { step: 2, title: 'Drafting PRDs & User Story Writing', duration: '4 Weeks', topics: ['Structuring comprehensive PRDs', 'Writing testable acceptance criteria', 'Edge cases and failure states', 'Collaborating with engineering leads'] },
      { step: 3, title: 'Product Analytics & Metrics', duration: '4 Weeks', topics: ['North Star metrics and guardrail KPIs', 'Funnel analysis and cohort retention', 'Designing A/B tests with statistical validity', 'SQL queries for product cohorts'] },
      { step: 4, title: 'Execution, Sprints & Go-To-Market', duration: '3 Weeks', topics: ['Agile Scrum ceremonies (Backlog grooming, retrospectives)', 'RICE scoring for prioritization', 'Feature launch checklists', 'Gathering user feedback post-launch'] }
    ],
    certifications: [
      { name: 'Product Management Fundamentals', issuer: 'NPTEL / IIT Roorkee', type: 'Government/NPTEL', link: 'https://nptel.ac.in' },
      { name: 'Google Project Management Certificate', issuer: 'Google', type: 'Paid', link: 'https://coursera.org' },
      { name: 'Aha! Product Management Professional', issuer: 'Aha!', type: 'Free', link: 'https://www.aha.io' }
    ],
    starterProjects: [
      { name: 'Complete Product Teardown & PRD for Swiggy Group Orders', description: 'Deep-dive user research teardown proposing a bill-split payment feature for campus hostels, including edge cases and wireframes.', difficulty: 'Intermediate' },
      { name: 'Redesigning UPI Auto-Pay Cancellation Flow', description: 'A detailed user experience PRD with success metrics for reducing failed mandate disputes in Indian fintech apps.', difficulty: 'Intermediate' }
    ],
    entryLevelTitles: ['Associate Product Manager (APM)', 'Product Analyst', 'Product Operations Specialist', 'Junior PM'],
    interviewTips: [
      'Practice product estimation questions (e.g., "Estimate the daily number of UPI transactions occurring in Bengaluru").',
      'Always follow a structured framework (CIRCLES or STAR) during product design case interviews.'
    ],
    learningResources: [
      { title: 'Lenny Rachitsky Product Newsletter & Archive', provider: 'Lennys Newsletter', type: 'Documentation', isFree: true, url: 'https://www.lennysnewsletter.com' },
      { title: 'Mind the Product Guides', provider: 'Mind the Product', type: 'Documentation', isFree: true, url: 'https://www.mindtheproduct.com' }
    ]
  }
];
