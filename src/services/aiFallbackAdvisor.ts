// Built-in Domain Knowledge Engine for YouthPath AI Assistant
// Provides intelligent career counseling tailored for Indian students & freshers
// whenever external AI keys are unavailable, rate-limited, or encountering network issues.

export const aiFallbackAdvisor = {
  getAssistantResponse(message: string): string {
    const q = message.toLowerCase().trim();

    // 1. Bengaluru / Hyderabad / Pune / Tech Hubs & IT Freshers
    if (q.includes('bengaluru') || q.includes('bangalore') || q.includes('hyderabad') || q.includes('pune') || (q.includes('skills') && q.includes('it'))) {
      return `### In-Demand Skills for IT Freshers in Indian Tech Hubs (Bengaluru, Hyderabad, Pune)

For 2025–2026 early-career recruitment across IT services and product startups:

1. **Core Development Stacks:**
   - **Frontend:** JavaScript (ES6+), TypeScript, React.js or Next.js, Tailwind CSS.
   - **Backend:** Node.js / Express, Python (FastAPI/Django), or Java Spring Boot.
   - **Databases:** PostgreSQL, MySQL, and basic MongoDB familiarity.

2. **Cloud & Developer Workflows:**
   - Git & GitHub (branching, pull requests, conventional commits).
   - Docker container basics and deploying on AWS, Vercel, or Render.
   - RESTful API design and Postman testing.

3. **Compensation Benchmarks in India:**
   - **IT Services / Mass Recruiters:** ₹3.6 – ₹4.5 LPA
   - **Product Startups & Mid-Tier Tech:** ₹6.0 – ₹10.5 LPA
   - **Tier-1 Tech Firms / GCCs:** ₹12.0 – ₹18.0+ LPA

💡 **Action Tip:** Build 2 end-to-end full-stack projects deployed with live URLs on GitHub before applying to campus or off-campus drives.`;
    }

    // 2. Resume / ATS Formatting
    if (q.includes('resume') || q.includes('cv') || q.includes('ats') || q.includes('summary')) {
      return `### How to Build an ATS-Compliant Fresher Resume

Applicant Tracking Systems (ATS) scan for clean layouts, standard headings, and direct keyword matches from job descriptions.

**1. Structure & Layout Rules:**
- **One Page Only:** Keep fresh graduate resumes strictly to a single page.
- **Single-Column Format:** Avoid tables, multi-column sidebars, photos, or complex graphics that confuse ATS parsers.
- **Standard Headings:** Use *Contact Information*, *Education*, *Technical Skills*, *Projects*, *Work Experience / Internships*, and *Certifications*.

**2. Bullet Point Formula (Google XYZ):**
Instead of writing *"Responsible for developing frontend pages"*, write:
> *"Engineered 12 responsive web pages in React and Tailwind CSS, reducing page load time by 24% and supporting 500+ active campus users."*

**3. Essential Sections for Freshers:**
- **GitHub & Portfolio Links:** Ensure every project listed has an active, working repository link.
- **CGPA:** Include if 7.5 or above; otherwise highlight relevant coursework and hackathon achievements.

💡 **Try YouthPath Resume Studio:** You can build and export ATS-compliant resumes directly from our **Resume Builder** tab!`;
    }

    // 3. Interview Preparation & STAR Method
    if (q.includes('star') || q.includes('interview') || q.includes('hr round') || q.includes('behavioral')) {
      return `### Master the STAR Method for HR & Behavioral Interviews

The STAR framework is the standard technique evaluated by Indian HR teams and hiring managers:

- **S – Situation:** Set the context in 1–2 sentences. *(e.g., "During our final semester capstone project, our team had 4 weeks to deliver a logistics tracking portal...")*
- **T – Task:** State your specific responsibility. *(e.g., "I was responsible for designing the database schema and integrating third-party authentication...")*
- **A – Action:** Explain the concrete steps *you* took, highlighting tools and decision-making. *(e.g., "I benchmarked PostgreSQL against MongoDB, configured index optimizations, and wrote unit tests for auth flows...")*
- **R – Result:** Quantify the outcome. *(e.g., "We delivered the project 3 days ahead of deadline and achieved 99.2% test coverage.")*

**Top Questions to Prepare:**
1. *"Tell me about yourself"* (Focus on education, technical passion, top project, and future focus).
2. *"Describe a time you faced a technical roadblock."*
3. *"Why do you want to join our company?"*

💡 **Practice Right Now:** Head to our **Mock Interviews** tab to simulate realistic technical and HR rounds with instant turn-by-turn evaluations!`;
    }

    // 4. Salary Ranges / CTC / LPA in India
    if (q.includes('salary') || q.includes('lpa') || q.includes('ctc') || q.includes('package') || q.includes('stipend')) {
      return `### Realistic Fresher Salary Benchmarks in India (2025–2026)

Based on verified hiring data across Tier-1, Tier-2, and remote tech positions:

| Career Track | Fresher CTC Range | Top Hiring Locations |
|---|---|---|
| **Full Stack Developer** | ₹4.5 – ₹8.5 LPA | Bengaluru, Pune, Hyderabad, Remote |
| **Data Analyst** | ₹4.0 – ₹7.5 LPA | Bengaluru, Gurugram, Mumbai, Chennai |
| **Cloud & DevOps Engineer** | ₹5.0 – ₹9.5 LPA | Hyderabad, Bengaluru, Pune |
| **Cybersecurity Analyst L1** | ₹4.2 – ₹7.8 LPA | Chennai, Bengaluru, Delhi NCR |
| **UI/UX Designer** | ₹3.8 – ₹6.5 LPA | Bengaluru, Mumbai, Remote |
| **Financial Analyst Trainee** | ₹4.0 – ₹7.2 LPA | Mumbai, Gurugram, Pune |
| **Associate B2B Sales** | ₹3.5 – ₹6.0 LPA + Incentives | All Metros |

*Internship Stipends in India:* Typically range from **₹15,000 to ₹45,000 / month** for engineering & product interns.`;
    }

    // 5. Data Analyst / Data Science
    if (q.includes('data analyst') || q.includes('data science') || q.includes('python') || q.includes('sql') || q.includes('power bi')) {
      return `### Roadmap to Become a Junior Data Analyst in India

**Core Technical Stack:**
1. **SQL (Highest Priority):** Joins, Window Functions (\`ROW_NUMBER\`, \`RANK\`), Group By, Subqueries, CTEs.
2. **Excel & Google Sheets:** Pivot Tables, VLOOKUP/XLOOKUP, INDEX-MATCH, Conditional Formatting.
3. **Data Visualization:** Power BI or Tableau (Dashboards, KPI cards, DAX measures).
4. **Python for Analytics:** Pandas, NumPy, Matplotlib, Seaborn.

**Portfolio Project Ideas:**
- *India E-Commerce Sales & Delivery Performance Dashboard* using Power BI and PostgreSQL.
- *IPL / Cricket Analytics Exploratory Data Analysis* in Jupyter Notebook.

💡 **Free Learning Path:** Check out Kaggle Micro-courses and NPTEL "Data Mining" on SWAYAM in our **Skill Hub** tab!`;
    }

    // 6. Free Courses & Certifications (NPTEL, SWAYAM, etc.)
    if (q.includes('course') || q.includes('certification') || q.includes('nptel') || q.includes('swayam') || q.includes('free') || q.includes('learn')) {
      return `### High-Credibility Free Learning Platforms for Indian Students

1. **NPTEL / SWAYAM (Govt of India):**
   - High academic value; recognized by AICTE and university boards for credit transfer.
   - Courses taught by IIT and IISc professors (Data Structures, Cloud Computing, DBMS).

2. **Harvard CS50x (edX):**
   - World-class foundational computer science covering C, Python, SQL, and web technologies. 100% free course materials.

3. **FreeCodeCamp:**
   - Interactive hands-on certifications in Responsive Web Design, JavaScript, and Front End Libraries.

4. **Kaggle & AWS Skill Builder:**
   - Real-world datasets, free cloud digital training, and verified completion badges.

💡 **Track Your Progress:** All these courses are curated with direct links in our **Skill Hub** tab, where you can check off topics as you finish them!`;
    }

    // 7. General Guidance & Fallback
    return `### Hello! I am your YouthPath AI Career Advisor.

I am here to help you navigate your transition from college to a high-growth career in India.

**Here are some topics you can ask me about:**
- **Career Roadmaps:** *"How do I transition into Cloud & DevOps as a fresher?"*
- **Market Salaries:** *"What is the fresher salary for Full Stack Developers in Bengaluru?"*
- **Resume Guidance:** *"How do I describe college projects using the Google XYZ formula?"*
- **Interview Rounds:** *"How should I answer 'What are your strengths and weaknesses' in HR interviews?"*
- **Job Hunting in India:** *"Where can I find verified graduate trainee openings across Tier-2 cities?"*

Feel free to ask any specific question about roles, skills, or hiring practices!`;
  },

  getCareerRecommendations(education?: string, interests?: string, skills?: string) {
    const isTech = !interests || interests.toLowerCase().includes('web') || interests.toLowerCase().includes('code') || interests.toLowerCase().includes('tech') || interests.toLowerCase().includes('software');
    const isData = interests?.toLowerCase().includes('data') || skills?.toLowerCase().includes('sql') || skills?.toLowerCase().includes('python');

    if (isData) {
      return [
        {
          title: 'Associate Data Analyst',
          category: 'Data & AI',
          matchScore: 94,
          whyFit: 'Your background matches high industry demand for data analytics, business intelligence, and SQL problem solving in India.',
          matchingSkills: ['SQL', 'Python', 'Analytical Thinking'],
          skillsToDevelop: ['Power BI / Tableau', 'Advanced SQL Window Functions', 'Pandas & Seaborn'],
          fresherSalaryIndia: '₹4.5 - ₹7.5 LPA',
          starterStep: 'Complete SQL murder mystery or build an interactive Power BI sales dashboard.',
          suggestedProject: 'Indian Retail E-commerce Sales Performance Dashboard with automated KPI alerts.'
        },
        {
          title: 'Junior Full Stack Developer',
          category: 'Tech',
          matchScore: 88,
          whyFit: 'Solid opportunities across Indian startups and MNC tech captives looking for versatile web engineering talent.',
          matchingSkills: ['JavaScript', 'Problem Solving', 'Web Basics'],
          skillsToDevelop: ['React.js', 'Node.js', 'PostgreSQL', 'Docker'],
          fresherSalaryIndia: '₹4.5 - ₹8.5 LPA',
          starterStep: 'Build and deploy a full-stack CRUD application on Vercel or Render.',
          suggestedProject: 'Campus Placement & Internship Tracking Portal with authentication.'
        },
        {
          title: 'Junior Cloud & DevOps Trainee',
          category: 'Tech',
          matchScore: 82,
          whyFit: 'Rapidly expanding domain across Global Capability Centers (GCCs) in Bengaluru and Hyderabad.',
          matchingSkills: ['Linux', 'Networking', 'Python'],
          skillsToDevelop: ['AWS Cloud Practitioner', 'Docker', 'CI/CD with GitHub Actions'],
          fresherSalaryIndia: '₹5.0 - ₹9.0 LPA',
          starterStep: 'Deploy a containerized web app using Docker and GitHub Actions.',
          suggestedProject: 'Automated CI/CD Pipeline deploying a containerized microservice to AWS.'
        }
      ];
    }

    if (isTech) {
      return [
        {
          title: 'Junior Full Stack Developer',
          category: 'Tech',
          matchScore: 96,
          whyFit: 'High volume of fresher campus and off-campus recruitment across Bengaluru, Pune, and Hyderabad.',
          matchingSkills: ['JavaScript', 'HTML/CSS', 'Problem Solving'],
          skillsToDevelop: ['React.js', 'Node.js/Express', 'PostgreSQL', 'Git & GitHub'],
          fresherSalaryIndia: '₹4.5 - ₹8.5 LPA',
          starterStep: 'Build a production-ready portfolio project and host the repository on GitHub with clean documentation.',
          suggestedProject: 'Collaborative Study Group & Resource Hub with real-time comments.'
        },
        {
          title: 'Associate Cloud & DevOps Engineer',
          category: 'Tech',
          matchScore: 89,
          whyFit: 'Strong entry-level hiring across cloud infrastructure and IT services firms with fast salary progression.',
          matchingSkills: ['Linux', 'Basic Scripting'],
          skillsToDevelop: ['AWS Certified Cloud Practitioner', 'Docker', 'Kubernetes Fundamentals', 'CI/CD'],
          fresherSalaryIndia: '₹5.0 - ₹9.0 LPA',
          starterStep: 'Set up an AWS free-tier account and host a static site using S3 and CloudFront.',
          suggestedProject: 'Multi-environment deployment pipeline with GitHub Actions.'
        },
        {
          title: 'Associate Data Analyst',
          category: 'Data & AI',
          matchScore: 85,
          whyFit: 'Ideal for graduates with logical problem-solving skills looking to work closely with business metrics.',
          matchingSkills: ['SQL', 'Logic & Aptitude'],
          skillsToDevelop: ['Advanced SQL', 'Power BI', 'Python (Pandas)', 'Excel Modeling'],
          fresherSalaryIndia: '₹4.2 - ₹7.2 LPA',
          starterStep: 'Practice SQL queries on LeetCode Database problems and Kaggle datasets.',
          suggestedProject: 'Customer Churn Analysis Dashboard for an Indian Fintech platform.'
        }
      ];
    }

    return [
      {
        title: 'Associate Business Development Executive (B2B)',
        category: 'Business & Marketing',
        matchScore: 92,
        whyFit: 'Dynamic growth path in Indian SaaS and B2B startups with attractive performance-linked incentive bonuses.',
        matchingSkills: ['Communication', 'Relationship Building'],
        skillsToDevelop: ['HubSpot / Salesforce CRM', 'Cold Outreach & LinkedIn InMail', 'B2B Sales Pipeline Management'],
        fresherSalaryIndia: '₹3.8 - ₹6.5 LPA + Incentives',
        starterStep: 'Study modern SaaS sales qualification frameworks (BANT and MEDDIC).',
        suggestedProject: 'Lead Generation Campaign & Cold Outreach Strategy Document for an Indian HRTech startup.'
      },
      {
        title: 'Junior UI/UX Designer',
        category: 'Design & Creative',
        matchScore: 87,
        whyFit: 'High demand for mobile-first product designers across consumer tech and fintech applications in India.',
        matchingSkills: ['Visual Taste', 'Empathy', 'Creative Thinking'],
        skillsToDevelop: ['Figma Auto-layout & Design Systems', 'User Research', 'Interactive Prototyping'],
        fresherSalaryIndia: '₹3.8 - ₹6.8 LPA',
        starterStep: 'Redesign a frustrating mobile checkout flow and publish a case study on Behance.',
        suggestedProject: 'Fintech Micro-Savings Mobile App Design Case Study with interactive Figma prototype.'
      },
      {
        title: 'Financial Analyst Trainee',
        category: 'Finance',
        matchScore: 84,
        whyFit: 'Prestigious entry-level corporate finance roles in Mumbai, Pune, and Gurugram banking centers.',
        matchingSkills: ['Excel', 'Mathematics', 'Attention to Detail'],
        skillsToDevelop: ['Financial Statement Analysis', 'DCF Valuation Modeling', 'Zerodha Varsity Modules'],
        fresherSalaryIndia: '₹4.0 - ₹7.2 LPA',
        starterStep: 'Complete Zerodha Varsity modules on Fundamental Analysis.',
        suggestedProject: 'Quarterly Earnings & Balance Sheet Analysis of an NSE Nifty 50 Enterprise.'
      }
    ];
  },

  improveResume(type: string, content: string, targetRole: string) {
    if (type === 'summary') {
      return {
        improved: `Proactive and detail-oriented graduate pursuing a career in ${targetRole || 'technology'}, equipped with strong foundations in problem solving, modern developer tools, and collaborative team delivery. Proven track record of delivering end-to-end projects with clean architecture and demonstrated commitment to continuous technical growth.`,
        keyStrengthsHighlighted: ['Technical Foundations', 'Problem-Solving Mindset', 'Team Collaboration'],
        atsKeywordsAdded: ['Continuous Integration', 'Full Lifecycle Delivery', 'Modern Architecture', 'Agile Mindset']
      };
    }
    return {
      improvedBullets: [
        `Architected and deployed responsive full-stack features, resulting in improved user workflow efficiency and zero critical bugs during evaluation.`,
        `Integrated RESTful APIs and optimized state management, achieving a 22% improvement in client-side rendering times.`,
        `Collaborated with peers using Git branching workflows, peer code reviews, and automated testing to ensure high code quality.`
      ],
      feedback: 'Elevated using Google XYZ format with strong active verbs and measurable outcomes.'
    };
  }
};
