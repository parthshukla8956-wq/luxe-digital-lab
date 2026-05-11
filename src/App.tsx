import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  Headphones,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
  X,
  Zap,
} from 'lucide-react';
import './App.css';

/* ─── Types ─── */
interface Package {
  num: string;
  title: string;
  className?: string;
  price: string;
  time: string;
  featured?: boolean;
  features: string[];
}

interface WorkItem {
  title: string;
  niche: string;
  img: string;
  url: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

/* ─── Data ─── */
const PACKAGES: Package[] = [
  {
    num: '01',
    title: '5-Page Website in 5 Days',
    className: 'Starter Class',
    price: '$399',
    time: 'Fast launch package',
    featured: true,
    features: [
      'Homepage, About, Services, Contact + Google Maps',
      'Conversion-focused layout and mobile optimisation',
      'Contact form + WhatsApp CTA setup',
      'On-page SEO basics for local visibility',
      'Go-live delivery in 5 days',
    ],
  },
  {
    num: '02',
    title: 'Growth Website',
    className: 'Business Class',
    price: '$899',
    time: 'Lead generation package',
    features: [
      'Everything in the 5-page package',
      'Online booking widget integration',
      'Lead-capture funnel and CRM-ready forms',
      'Blog system + schema markup',
      '30 days of post-launch tweaks included',
    ],
  },
  {
    num: '03',
    title: 'Pro Full-Stack Build',
    className: 'First Class',
    price: '$1,499+',
    time: 'Custom build for scale',
    features: [
      'Custom full-stack architecture',
      'Payments, customer logins, and dashboards',
      'Custom integrations for your workflow',
      'Built for clinics, gyms, agencies, and law firms',
      'Tailored scope based on your business model',
    ],
  },
  {
    num: '04',
    title: 'Care + Local SEO',
    price: 'from $79/mo',
    time: 'Monthly growth support',
    features: [
      'Hosting, security, and backups',
      'Monthly content and text/image updates',
      'Google Business Profile optimisation',
      'Local SEO improvements and reporting',
      'Keeps your site fast, fresh, and ranked',
    ],
  },
  {
    num: '05',
    title: 'Branding & Identity',
    price: 'from $299',
    time: 'Visual trust package',
    features: [
      'Logo concept and polished lockups',
      'Brand colour and typography system',
      'Core brand kit for website + social profiles',
      'Cohesive identity that builds trust fast',
      'Designed to match your premium positioning',
    ],
  },
  {
    num: '06',
    title: 'Lead Generation Page',
    price: '$199',
    time: 'Add-on · 2 days',
    features: [
      'Single High-Conversion Page',
      'Lead Capture Form',
      'Built Around Your Offer',
      'Mobile Optimised',
      'Connected to Main Website',
    ],
  },
  {
    num: '07',
    title: 'Google Business Setup',
    price: '$99',
    time: 'Add-on · 1 day',
    features: [
      'Create or Claim Listing',
      'Keyword-Rich Description',
      'Photos, Services & Hours',
      'Linked to Your Website',
      'Category & Location Optimisation',
    ],
  },
];

const WORK_ITEMS: WorkItem[] = [
  {
    title: 'SheMed UK',
    niche: 'Healthcare / Weight Loss',
    img: '/work/work-shemed.jpg',
    url: 'https://shemed.netlify.app/',
  },
  {
    title: 'Huspy Spain',
    niche: 'Real Estate / Mortgage',
    img: '/work/work-huspy.jpg',
    url: 'https://huspyspain.netlify.app/',
  },
  {
    title: 'Bella Notte Ristorante',
    niche: 'Fine Dining Restaurant',
    img: '/work/work-bella.jpg',
    url: 'https://bella-notte-ristorante-c86626.netlify.app/',
  },
  {
    title: "Lovell's Soul Food",
    niche: 'Soul Food Restaurant',
    img: '/work/work-lovells.jpg',
    url: 'https://lovells.netlify.app/',
  },
];

const PORTFOLIO_FALLBACKS: Record<string, string> = {
  '/work/work-shemed.jpg': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  '/work/work-huspy.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
  '/work/work-bella.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
  '/work/work-lovells.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Free Website Audit',
    desc: "I record a personalised Loom video showing exactly what's costing you clients online — completely free.",
    icon: <MonitorSmartphone size={20} />,
  },
  {
    step: '02',
    title: 'I Build Your Site',
    desc: 'You get a live preview link within 5 days to review every page before anything goes live.',
    icon: <Briefcase size={20} />,
  },
  {
    step: '03',
    title: 'You Review & Approve',
    desc: "Revisions until you're 100% happy. Your satisfaction is the only deadline that matters.",
    icon: <ShieldCheck size={20} />,
  },
  {
    step: '04',
    title: 'Your Site Goes Live',
    desc: 'Deployed to Netlify, domain connected, submitted to Google. You start receiving enquiries from day one.',
    icon: <Zap size={20} />,
  },
];

const STATS: StatItem[] = [
  { value: '50+', label: 'Projects Delivered', icon: <Briefcase size={22} /> },
  { value: '5 Days', label: 'Avg. Delivery', icon: <Clock size={22} /> },
  { value: '100%', label: 'Client Satisfaction', icon: <Star size={22} /> },
  { value: '24/7', label: 'Support Available', icon: <Headphones size={22} /> },
];

const INDUSTRIES = [
  'Dentists & Clinics',
  'Chiropractors',
  'Real Estate Agents',
  'Gyms & Personal Trainers',
  'Salons & Barbershops',
  'Immigration Lawyers',
  'Restaurants & Cafes',
];

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'Services', target: 'services' },
  { label: 'Portfolio', target: 'work' },
  { label: 'Pricing', target: 'services' },
  { label: 'Results', target: 'results' },
  { label: 'Contact', target: 'contact' },
];

const CONTACT = {
  email: 'parthshukla8956@gmail.com',
  phone: '+91 8090260220',
  whatsappNumber: '918090260220',
  whatsappUrl:
    'https://wa.me/918090260220?text=' +
    encodeURIComponent('Hi Parth, I want a high-converting website for my business.'),
};

/* ─── Animation helpers ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── WhatsApp Float ─── */
function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 20, height: 20 }}>
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .14 5.34.14 11.92c0 2.1.55 4.16 1.6 5.96L0 24l6.31-1.65a11.92 11.92 0 0 0 5.74 1.46h.01c6.56 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.46-8.41ZM12.06 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.46 4.45-9.91 9.92-9.91 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.9 7.02c0 5.46-4.45 9.91-9.92 9.91Zm5.43-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.05 9.05 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

/* ─── Lead Qualification Chatbot ─── */
type ChatStep =
  | 'greeting'
  | 'has_website'
  | 'pain_point'
  | 'goal'
  | 'budget'
  | 'timeline'
  | 'name'
  | 'email'
  | 'recommendation'
  | 'done';

interface LeadData {
  industry: string;
  hasWebsite: string;
  painPoint: string;
  goal: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
}

const STEP_QUESTIONS: Record<ChatStep, string> = {
  greeting:
    "Hi! I'm the Luxe Concierge — I help business owners find the perfect website package. Let's get you sorted in under 2 minutes.\n\nWhat industry is your business in? (e.g. Dental Clinic, Gym, Restaurant, Law Firm)",
  has_website: 'Do you currently have a website?',
  pain_point: "What's your biggest frustration with your current online presence?",
  goal: 'What do you want your new website to achieve?',
  budget: "What's your approximate budget for this project?",
  timeline: 'How soon do you need this live?',
  name: "Great! What's your name?",
  email: "And your email so Parth can send your personalised recommendation?",
  recommendation: '',
  done: '',
};

const QUICK_REPLIES: Partial<Record<ChatStep, string[]>> = {
  has_website: ['Yes, but it needs work', 'Yes, but it’s outdated', 'No website yet', 'Just a social media page'],
  pain_point: ['Not getting enough leads', 'Looks unprofessional', 'Not mobile-friendly', 'Hard to update', 'No online bookings'],
  goal: ['More leads & enquiries', 'Online bookings', 'Build credibility', 'Sell products online', 'All of the above'],
  budget: ['Under $400', '$400 – $900', '$900 – $1,500', '$1,500+', 'Not sure yet'],
  timeline: ['ASAP (within 1 week)', 'Within 2 weeks', 'Within 1 month', 'Just exploring for now'],
};

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function scoreLead(data: LeadData): { score: number; temperature: 'hot' | 'warm' | 'cold'; emoji: string } {
  let score = 0;
  if (data.budget.includes('1,500')) score += 40;
  else if (data.budget.includes('900')) score += 30;
  else if (data.budget.includes('400')) score += 20;
  else if (data.budget.includes('Under')) score += 10;

  if (data.timeline.includes('ASAP')) score += 30;
  else if (data.timeline.includes('2 weeks')) score += 25;
  else if (data.timeline.includes('1 month')) score += 15;
  else score += 5;

  if (data.goal.includes('All') || data.goal.includes('leads')) score += 20;
  else if (data.goal.includes('bookings') || data.goal.includes('Sell')) score += 15;
  else score += 10;

  if (data.hasWebsite.includes('No')) score += 10;

  if (score >= 75) return { score, temperature: 'hot', emoji: '🔥' };
  if (score >= 45) return { score, temperature: 'warm', emoji: '\u26A1' };
  return { score, temperature: 'cold', emoji: '\uD83D\uDCA1' };
}

function getRecommendation(data: LeadData): string {
  const recs: string[] = [];
  if (data.budget.includes('Under') || data.budget.includes('400')) {
    recs.push('✨ **5-Page Website in 5 Days ($399)** — perfect fast-launch option.');
  } else if (data.budget.includes('900') || data.budget.includes('1,500')) {
    recs.push('✨ **Growth Website ($899)** — lead generation + booking integration.');
  } else if (data.budget.includes('1,500+')) {
    recs.push('✨ **Pro Full-Stack Build ($1,499+)** — custom architecture for scale.');
  }
  if (data.goal.includes('credibility') || data.goal.includes('All')) {
    recs.push('\uD83C\uDFA8 **Branding & Identity (from $299)** — builds instant trust.');
  }
  if (data.timeline.includes('ASAP') || data.timeline.includes('2 weeks')) {
    recs.push('\u23F0 Rush delivery available — Parth can prioritise your build.');
  }
  return recs.join('\n\n') || '✨ Based on your answers, Parth will recommend the best package for you.';
}

function formatMessage(text: string): React.ReactNode {
  return text.split('\n').map((line, li) => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
      }
      parts.push(<strong key={key++} className="text-[#E8D8B5]">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
    }
    return (
      <span key={li}>
        {parts.length > 0 ? parts : line}
        {li < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

function LeadChatWidget() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string; variant?: string }[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [finished, setFinished] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const leadRef = useRef<Partial<LeadData>>({});
  const stepRef = useRef<ChatStep>('greeting');
  const hasBootstrapped = useRef(false);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [history, typing]);

  const addBotMessage = (content: string, variant?: string) => {
    setHistory((h) => [...h, { role: 'assistant', content, variant }]);
  };

  const addUserMessage = (content: string) => {
    setHistory((h) => [...h, { role: 'user', content }]);
  };

  const typeThenSay = async (content: string, variant?: string, delay = 900) => {
    setTyping(true);
    await new Promise((r) => setTimeout(r, delay));
    setTyping(false);
    addBotMessage(content, variant);
  };

  const sendLeadToEmail = async (data: LeadData, score: number, temp: string): Promise<boolean> => {
    const formData = new FormData();
    formData.append('access_key', '49a182e5-c387-419a-baae-ad29292c1cdc');
    formData.append('subject', `🔥 [${temp.toUpperCase()} LEAD] Luxe Concierge – ${data.name} – ${data.industry}`);
    formData.append('from_name', 'Luxe Concierge Bot');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append(
      'message',
      `🔥 LEAD QUALIFICATION REPORT\n\nName: ${data.name}\nEmail: ${data.email}\nIndustry: ${data.industry}\nHas Website: ${data.hasWebsite}\nPain Point: ${data.painPoint}\nGoal: ${data.goal}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nLead Score: ${score}/100\nTemperature: ${temp.toUpperCase()}\n\nRecommended: ${getRecommendation(data).replace(/\*\*/g, '')}`
    );

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        if (result.success) return true;
      } catch {
        /* retry */
      }
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
    return false;
  };

  const advanceStep = async (userText: string) => {
    const currentStep = stepRef.current;
    const lead = leadRef.current;

    const nextSteps: Record<ChatStep, ChatStep> = {
      greeting: 'has_website',
      has_website: 'pain_point',
      pain_point: 'goal',
      goal: 'budget',
      budget: 'timeline',
      timeline: 'name',
      name: 'email',
      email: 'recommendation',
      recommendation: 'done',
      done: 'done',
    };

    if (currentStep === 'email' && !isValidEmail(userText)) {
      setEmailError(true);
      await typeThenSay("That doesn't look like a valid email. Please enter a correct one so Parth can reach you.", 'cold', 600);
      return;
    }
    setEmailError(false);

    switch (currentStep) {
      case 'greeting':
        lead.industry = userText;
        break;
      case 'has_website':
        lead.hasWebsite = userText;
        break;
      case 'pain_point':
        lead.painPoint = userText;
        break;
      case 'goal':
        lead.goal = userText;
        break;
      case 'budget':
        lead.budget = userText;
        break;
      case 'timeline':
        lead.timeline = userText;
        break;
      case 'name':
        lead.name = userText;
        break;
      case 'email':
        lead.email = userText;
        break;
    }

    const next = nextSteps[currentStep];
    setStep(next);
    stepRef.current = next;

    if (next === 'recommendation') {
      const fullLead = lead as LeadData;
      const { score, temperature, emoji } = scoreLead(fullLead);

      await typeThenSay(
        `Thanks ${fullLead.name}! Here's what I recommend based on your answers:\n\n${getRecommendation(fullLead)}\n\n${emoji} I've rated this a **${temperature.toUpperCase()} lead** (${score}/100). Parth will reach out within a few hours with a personalised plan.`,
        temperature,
        1200
      );

      const emailSent = await sendLeadToEmail(fullLead, score, temperature);

      if (emailSent) {
        await typeThenSay(
          "✅ Your details have been sent to Parth successfully. He'll review your answers and contact you shortly.",
          undefined,
          800
        );
      } else {
        await typeThenSay(
          `⚠️ I couldn't email your details automatically. Please reach out directly:\n\nWhatsApp: ${CONTACT.phone}\nEmail: ${CONTACT.email}`,
          'cold',
          800
        );
      }
      setFinished(true);
    } else if (next === 'done') {
      await typeThenSay(
        `Need to talk sooner? WhatsApp Parth directly: ${CONTACT.phone}\n\nOr email: ${CONTACT.email}`,
        undefined,
        600
      );
    } else {
      await typeThenSay(STEP_QUESTIONS[next], undefined, 700);
    }
  };

  const bootstrap = async () => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;
    setTyping(true);
    await new Promise((r) => setTimeout(r, 800));
    setTyping(false);
    addBotMessage(STEP_QUESTIONS.greeting);
  };

  useEffect(() => {
    if (open && !hasBootstrapped.current) {
      bootstrap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || finished) return;
    setInput('');
    addUserMessage(text);
    await advanceStep(text);
  };

  const handleQuickReply = async (reply: string) => {
    if (finished) return;
    addUserMessage(reply);
    await advanceStep(reply);
  };

  const handleRestart = () => {
    setHistory([]);
    setStep('greeting');
    stepRef.current = 'greeting';
    leadRef.current = {};
    setFinished(false);
    setEmailError(false);
    setInput('');
    hasBootstrapped.current = false;
    setTimeout(() => bootstrap(), 50);
  };

  const currentQuickReplies = QUICK_REPLIES[step] || [];

  return (
    <section className="lead-chat-widget">
      <button className="lead-chat-toggle" onClick={() => setOpen(!open)} aria-label="Open Luxe Concierge">
        <span className="pulse-dot" aria-hidden="true" />
        <span>✨ Luxe Concierge</span>
      </button>
      {!open ? null : (
        <div className="luxe-chat-panel">
          <header>
            <div className="title">
              <span className="avatar">L</span>
              <div>
                <div>Luxe Concierge</div>
                <span className="sub">Lead qualification bot · Replies instantly</span>
              </div>
            </div>
            <button className="lead-chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>
          <div className="chat-messages" role="log" aria-live="polite">
            {history.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}${m.variant ? ' ' + m.variant : ''}`}>
                {formatMessage(m.content)}
              </div>
            ))}
            {typing && (
              <div className="chat-msg assistant" id="luxe-typing">
                <span className="typing-dots">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            {currentQuickReplies.length > 0 && !typing && !finished && (
              <div className="quick-replies">
                {currentQuickReplies.map((reply) => (
                  <button key={reply} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
                    {reply}
                  </button>
                ))}
              </div>
            )}
            {finished && (
              <div className="quick-replies" style={{ justifySelf: 'stretch', marginTop: '0.5rem' }}>
                <button
                  className="quick-reply-btn"
                  style={{ width: '100%', textAlign: 'center', background: 'rgba(184,146,74,0.2)', color: '#E8D8B5', borderColor: 'rgba(184,146,74,0.4)' }}
                  onClick={handleRestart}
                >
                  🔄 Start New Conversation
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="lead-chat-form" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                finished
                  ? 'Chat ended — click restart above'
                  : emailError
                    ? 'Enter a valid email address...'
                    : 'Type your answer...'
              }
              aria-label="Your message"
              required
              disabled={finished}
              style={emailError ? { borderColor: '#ff4757' } : undefined}
            />
            <button type="submit" disabled={finished}>
              <Send size={14} />
            </button>
          </form>
          <div className="lead-chat-footer">🔒 Secure · Parth replies via Email + WhatsApp</div>
        </div>
      )}
    </section>
  );
}

/* ─── Mobile CTA ─── */
function MobileCTA() {
  return (
    <nav className="luxe-mobile-cta" aria-label="Quick contact">
      <a className="wa" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
        💬 WhatsApp
      </a>
      <a
        className="bot"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          const toggle = document.querySelector('.lead-chat-toggle') as HTMLButtonElement | null;
          toggle?.click();
        }}
      >
        ✨ Luxe Concierge
      </a>
    </nav>
  );
}

/* ─── Main App ─── */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formLoading, setFormLoading] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroHeight, setHeroHeight] = useState('100vh');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => setHeroHeight(`${window.innerHeight}px`);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus('idle');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '49a182e5-c387-419a-baae-ad29292c1cdc');
    formData.append('subject', 'New Free Website Audit Request - Luxe Digital Lab');
    formData.append('from_name', 'Luxe Digital Lab Website');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    } finally {
      setFormLoading(false);
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#111111] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="text-xl font-semibold tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="font-extrabold text-[#111111]">LUXE</span>
            <span className="font-light text-[#6E6B64]"> DIGITAL LAB</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((m) => (
              <button
                key={m.label}
                onClick={() => scrollTo(m.target)}
                className="text-[#6E6B64] hover:text-[#B8924A] transition-colors duration-300 font-medium"
              >
                {m.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="bg-[#B8924A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#a07f3f] transition-all duration-300 hover:shadow-lg hover:shadow-[#B8924A]/25"
            >
              Book Strategy Call
            </button>
          </div>

          <button
            className="md:hidden text-[#111111] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-nav mt-2 mx-6 rounded-2xl p-5 flex flex-col gap-3">
            {NAV_LINKS.map((m) => (
              <button
                key={m.label}
                onClick={() => scrollTo(m.target)}
                className="text-left text-[#6E6B64] hover:text-[#B8924A] py-2 text-sm font-medium transition-colors"
              >
                {m.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="bg-[#B8924A] text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2"
            >
              Book Strategy Call
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: heroHeight,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: '#202A36',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(32,42,54,0.92) 0%, rgba(32,42,54,0.5) 50%, rgba(32,42,54,0.3) 100%)',
            zIndex: 1,
          }}
        />
        <div className="mt-auto relative z-10 px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B8924A]/40 bg-[#B8924A]/10 text-[#E8D8B5] text-xs font-bold tracking-[0.15em] uppercase mb-6">
                Premium Digital Growth
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight mb-6"
            >
              <span className="block">Luxury Websites.</span>
              <span className="block ml-4 md:ml-12 text-[#E8D8B5]">Elite Results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-white/70 mb-8 max-w-xl leading-relaxed"
            >
              We craft high-converting websites and premium lead systems for ambitious brands who expect more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="bg-white text-[#111111] px-8 py-3.5 rounded-full font-semibold hover:bg-[#F8F7F3] transition-all duration-300 text-sm"
              >
                Get Free Audit
              </button>
              <button
                onClick={() => scrollTo('work')}
                className="border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-sm"
              >
                View Portfolio
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-5"
            >
              {['Fast Delivery', 'Premium Design', 'Mobile Optimized', 'Lead Focused'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={14} className="text-[#B8924A]" />
                  <span className="text-sm text-white/70 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
          <ChevronDown size={20} className="text-white animate-bounce" />
        </div>
      </section>

      <main>
        {/* Industries */}
        <section className="py-16 md:py-20 bg-[#EFECE5]">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <p className="text-center text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-8 font-semibold">
                Industries We Serve
              </p>
            </FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((industry, i) => (
                <FadeIn key={industry} delay={i * 60}>
                  <span className="px-5 py-2.5 rounded-full border border-[#E5DED3] bg-white text-[#6E6B64] text-sm font-medium hover:border-[#B8924A] hover:text-[#B8924A] transition-all duration-300 cursor-default">
                    {industry}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="work" className="py-24 md:py-32 bg-[#F8F7F3]">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">Portfolio</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
                  Selected Work
                </h2>
                <p className="text-[#6E6B64] mt-3 max-w-xl">
                  Enterprise-quality websites delivered with speed and accountability.
                </p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {WORK_ITEMS.map((item, i) => (
                <FadeIn key={item.title} delay={i * 100}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${item.title} live website`}
                    className="group relative block rounded-3xl overflow-hidden aspect-[16/10] border border-[#E5DED3]"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const fallback = PORTFOLIO_FALLBACKS[e.currentTarget.getAttribute('src') || ''];
                        if (fallback) e.currentTarget.src = fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202A36]/90 via-[#202A36]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-2 text-[#B8924A] text-xs font-semibold tracking-wider uppercase mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <ExternalLink size={12} />
                        View Live Site
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.niche}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Stats / Results */}
        <section id="results" className="py-24 md:py-32 bg-[#202A36]">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">Results</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white" style={{ letterSpacing: '-0.03em' }}>
                  Why Choose Luxe Digital Lab
                </h2>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 100}>
                  <div className="text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-[#B8924A]/10 flex items-center justify-center mx-auto mb-5 text-[#B8924A]">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Services / Pricing */}
        <section id="services" className="py-24 md:py-32 bg-[#EFECE5]">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">Services</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
                  Investment Plans
                </h2>
                <p className="text-[#6E6B64] mt-3 max-w-xl mx-auto">
                  No guesswork. Know exactly what you're getting and what you're paying.
                </p>
              </div>
            </FadeIn>

            {/* Main Tiers */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {PACKAGES.slice(0, 3).map((pkg, idx) => (
                <FadeIn key={pkg.num} delay={idx * 100}>
                  <div
                    className={`luxe-card relative h-full flex flex-col p-8 ${
                      pkg.featured ? 'luxe-card-featured' : ''
                    }`}
                  >
                    {pkg.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#B8924A] text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#B8924A]/25">
                          <Star size={12} fill="currentColor" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-xs font-bold tracking-[0.2em] text-[#B8924A] uppercase mb-3">
                      {pkg.className}
                    </div>
                    <div className="text-xs font-mono text-[#6E6B64] mb-2">{pkg.num}</div>
                    <h3 className="text-xl font-semibold text-[#111111] mb-2">{pkg.title}</h3>
                    <div className="text-4xl font-bold text-[#B8924A] mb-1">{pkg.price}</div>
                    <div className="text-sm text-[#6E6B64] mb-6 pb-6 border-b border-[#E5DED3]">{pkg.time}</div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#6E6B64]">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#B8924A]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => scrollTo('contact')}
                      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        pkg.featured
                          ? 'bg-[#B8924A] text-white hover:bg-[#a07f3f] hover:shadow-lg hover:shadow-[#B8924A]/25'
                          : 'bg-[#F8F7F3] text-[#111111] border border-[#E5DED3] hover:border-[#B8924A] hover:text-[#B8924A]'
                      }`}
                    >
                      Select Package
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Add-ons */}
            <FadeIn>
              <p className="text-center text-sm text-[#6E6B64] mb-6 font-medium">Additional Services</p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PACKAGES.slice(3).map((pkg, idx) => (
                <FadeIn key={pkg.num} delay={(idx + 3) * 80}>
                  <div className="luxe-card h-full flex flex-col p-6">
                    <div className="text-xs font-mono text-[#6E6B64] mb-2">{pkg.num}</div>
                    <h3 className="text-lg font-semibold text-[#111111] mb-1">{pkg.title}</h3>
                    <div className="text-2xl font-bold text-[#B8924A] mb-1">{pkg.price}</div>
                    <div className="text-xs text-[#6E6B64] mb-4">{pkg.time}</div>
                    <ul className="space-y-2 flex-1 mb-5">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#6E6B64]">
                          <Check size={12} className="mt-0.5 shrink-0 text-[#B8924A]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => scrollTo('contact')}
                      className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#F8F7F3] text-[#111111] border border-[#E5DED3] hover:border-[#B8924A] hover:text-[#B8924A] transition-all duration-300"
                    >
                      Add to Build
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">How It Works</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
                  Simple Process.
                </h2>
                <p className="text-[#6E6B64] mt-3 max-w-xl mx-auto">
                  Streamlined to respect your time — from first contact to live site.
                </p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-[#E5DED3]" />
              {PROCESS_STEPS.map((step, i) => (
                <FadeIn key={step.step} delay={i * 100}>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-[#E5DED3] bg-white flex items-center justify-center mb-6 shadow-sm">
                      <div className="text-[#B8924A]">{step.icon}</div>
                    </div>
                    <div className="text-xs font-bold mb-2 tracking-widest text-[#B8924A]">STEP {step.step}</div>
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#6E6B64] leading-relaxed">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-[#F8F7F3]">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="text-center mb-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">Testimonials</p>
                <h2 className="text-3xl md:text-5xl font-semibold text-[#111111]" style={{ letterSpacing: '-0.03em' }}>
                  What Clients Say.
                </h2>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Dr. Sarah Mitchell',
                  role: 'Clinic Owner, London',
                  text: "Parth built our clinic website in under a week. We've seen a 40% increase in appointment bookings since launch. Incredible ROI.",
                },
                {
                  name: 'Marcus Johnson',
                  role: 'Gym Owner, Texas',
                  text: "The lead generation page alone paid for itself in the first month. Parth understands what local businesses actually need.",
                },
                {
                  name: 'Aisha Patel',
                  role: 'Restaurant Owner, Dubai',
                  text: 'Professional, fast, and genuinely cares about results. Our new site has completely transformed how customers find us.',
                },
              ].map((t, i) => (
                <FadeIn key={t.name} delay={i * 100}>
                  <div className="luxe-card p-8 h-full flex flex-col">
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className="text-[#B8924A]" fill="#B8924A" />
                      ))}
                    </div>
                    <p className="text-[#6E6B64] text-sm leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="text-[#111111] font-semibold text-sm">{t.name}</div>
                      <div className="text-[#6E6B64] text-xs">{t.role}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">About</p>
                  <h2
                    className="text-3xl md:text-5xl font-semibold text-[#111111] mb-6"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    The Partner Your Business Deserves.
                  </h2>
                  <p className="text-[#6E6B64] mb-5 leading-relaxed">
                    Hi, I&apos;m <strong className="text-[#111111] font-semibold">Parth Shukla</strong>. I run LUXE
                    DIGITAL LAB as a one-man studio focused on one thing: building websites that actually make you money.
                  </p>
                  <p className="text-[#6E6B64] mb-5 leading-relaxed">
                    I don&apos;t do cookie-cutter templates. Every site is designed from scratch around your business
                    goals, your audience, and your brand. The result? A website that looks like a million bucks and
                    converts like one too.
                  </p>
                  <div className="flex flex-wrap gap-8 mt-8">
                    <div>
                      <div className="text-3xl font-bold text-[#B8924A] mb-1">50+</div>
                      <div className="text-sm text-[#6E6B64]">Websites Delivered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#B8924A] mb-1">5 Days</div>
                      <div className="text-sm text-[#6E6B64]">Average Delivery</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#B8924A] mb-1">100%</div>
                      <div className="text-sm text-[#6E6B64]">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden border border-[#E5DED3]">
                    <img
                      src="/images/parth-about.jpg"
                      alt="Parth Shukla"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face';
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white border border-[#E5DED3] rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-[#B8924A]" fill="#B8924A" />
                      <span className="text-sm font-semibold text-[#111111]">5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 bg-[#EFECE5]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B8924A] mb-3 font-semibold">Contact</p>
                  <h2
                    className="text-3xl md:text-5xl font-semibold text-[#111111] mb-6"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    Ready for a Website That Converts?
                  </h2>
                  <p className="text-[#6E6B64] mb-8 leading-relaxed">
                    Let&apos;s build your premium online presence. I&apos;ll record a personalised video review of your
                    current website and show you exactly what&apos;s costing you clients.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#B8924A]/10 flex items-center justify-center shrink-0 text-[#B8924A]">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[#111111] font-semibold text-sm mb-1">Email</div>
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="text-[#6E6B64] text-sm hover:text-[#B8924A] transition-colors"
                        >
                          {CONTACT.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#B8924A]/10 flex items-center justify-center shrink-0 text-[#B8924A]">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[#111111] font-semibold text-sm mb-1">Phone</div>
                        <a
                          href="tel:+918090260220"
                          className="text-[#6E6B64] text-sm hover:text-[#B8924A] transition-colors"
                        >
                          {CONTACT.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#B8924A]/10 flex items-center justify-center shrink-0 text-[#B8924A]">
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <div className="text-[#111111] font-semibold text-sm mb-1">WhatsApp</div>
                        <a
                          href={CONTACT.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6E6B64] text-sm hover:text-[#B8924A] transition-colors"
                        >
                          {CONTACT.phone} (Click to message)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <form onSubmit={handleFormSubmit} className="luxe-card p-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-[#6E6B64] mb-2 font-medium">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="luxe-input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6B64] mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="luxe-input"
                        placeholder="you@business.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6B64] mb-2 font-medium">Business Type</label>
                      <input
                        type="text"
                        name="business_type"
                        required
                        className="luxe-input"
                        placeholder="e.g. Dental Clinic, Gym, Restaurant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6E6B64] mb-2 font-medium">Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        className="luxe-input resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-[#B8924A] text-white hover:bg-[#a07f3f] hover:shadow-lg hover:shadow-[#B8924A]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formLoading ? 'Sending...' : 'Request Free Audit'}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  {formStatus === 'success' && (
                    <div className="luxe-form-success mt-4">
                      ✅ Message sent! Parth will get back to you within 24 hours.
                    </div>
                  )}
                  {formStatus === 'error' && (
                    <div className="luxe-form-success error mt-4">
                      ❌ Something went wrong. Please email directly at {CONTACT.email}
                    </div>
                  )}
                </form>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-[#202A36]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.03em' }}>
                <span className="font-extrabold text-white">LUXE</span>
                <span className="font-light text-white/60"> DIGITAL LAB</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Premium websites and lead systems for ambitious brands who expect more.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.target)}
                    className="block text-white/40 text-sm hover:text-[#B8924A] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <div className="space-y-2">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-white/40 text-sm hover:text-[#B8924A] transition-colors"
                >
                  {CONTACT.email}
                </a>
                <a
                  href="tel:+918090260220"
                  className="block text-white/40 text-sm hover:text-[#B8924A] transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1faa53] transition-colors"
              >
                💬 WhatsApp Us Today
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Luxe Digital Lab. All rights reserved.
            </p>
            <p className="text-white/30 text-sm">Built with precision by Parth Shukla.</p>
          </div>
        </div>
      </footer>

      {/* Floating widgets */}
      <WhatsAppFloat />
      <LeadChatWidget />
      <MobileCTA />
    </div>
  );
}

export default App;
