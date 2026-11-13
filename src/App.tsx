import { FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUp, Award, BookOpen, BriefcaseBusiness, Building2, CalendarDays, ChartNoAxesColumnIncreasing, Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, Cloud, Code2, Compass, FileText, Globe2, GraduationCap, LaptopMinimal, Layers3, Lightbulb, Link, Menu, Moon, Network, Play, Plus, Rocket, Search, Send, Sparkles, Star, Sun, Target, TrendingUp, UsersRound, Video, WandSparkles, X, type LucideIcon } from 'lucide-react'
import aiGuidanceWorkspace from './assets/ai-guidance-workspace.png'
import mentorsWorkspace from './assets/mentors-collaboration-workspace.png'
import mentorSilhouette from './assets/mentor-silhouette.png'

type Theme = 'light' | 'dark'
type NavItem = { label: string; target: string }

const navItems: NavItem[] = [
  { label: 'Home', target: 'home' }, { label: 'About', target: 'about' }, { label: 'Features', target: 'features' }, { label: 'Mentors', target: 'mentors' }, { label: 'Plans', target: 'plans' },
]

const mentorData = [
  {
    initials: 'HS', name: 'Harsh Sahu', tag: 'Co-Founder & Marketing Head', recognition: 'SIH Finalist',
    bio: 'Co-founding B.Tech Maker with a focus on marketing, outreach, student engagement and building a platform that understands the real needs of engineering students.',
    skills: ['Marketing & Outreach', 'Student Engagement', 'SIH Finalist'],
  },
  {
    initials: 'AK', name: 'Ajay Kumar Sharma', tag: 'Co-Founder & Developer', recognition: '2X ISRO Selected Intern (HSFC & VSSC) · 2X SIH Finalist (2024 & 2025)',
    bio: 'Building B.Tech Maker from the student perspective, combining technical development, practical engineering experience and a strong understanding of internship and hackathon opportunities.',
    skills: ['Product Development', 'Technical Development', 'ISRO Internship Experience', 'SIH Finalist'], mentor: true,
  },
]

const aiGuidanceSteps = [
  { title: 'Set Your Goal', description: 'Choose a learning and career direction.', Icon: Target, details: ['Select your engineering branch.', 'Choose your current semester.', 'Define a career objective.', 'Explore relevant resources.'] },
  { title: 'Analyze Your Skills', description: 'Reflect on strengths and areas to build.', Icon: ChartNoAxesColumnIncreasing, details: ['Map existing technical skills.', 'Review core foundations.', 'Identify areas to improve.', 'Compare skills with target roles.'] },
  { title: 'Get a Personalized Plan', description: 'Use resources to build your next steps.', Icon: Layers3, details: ['Choose available courses and certifications.', 'Use project-based learning resources.', 'Follow internship preparation guidance.', 'Create manageable learning milestones.'] },
  { title: 'Track Your Progress', description: 'Keep a practical record of progress.', Icon: TrendingUp, details: ['Record completed learning activities.', 'Track skills you are developing.', 'Review project milestones.', 'Revisit goals as they evolve.'] },
]

const aiGuidanceFeatures = [
  { id: 'certifications', title: 'Certifications', Icon: Award },
  { id: 'skills', title: 'Skill Development', Icon: Code2 },
  { id: 'internships', title: 'Internships & Jobs', Icon: BriefcaseBusiness },
  { id: 'resources', title: 'Learning Resources', Icon: BookOpen },
  { id: 'hackathons', title: 'Hackathons', Icon: LaptopMinimal },
  { id: 'mentorship', title: 'Mentorship', Icon: UsersRound },
]

function Logo({ onClick }: { onClick?: () => void }) { return <a className="logo" href="#home" onClick={onClick} aria-label="B.Tech Maker home"><span className="logo-mark">B</span><b>B.Tech Maker</b></a> }
function Button({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost'; className?: string }) { return <button className={`button button-${variant} ${className}`} {...props}>{children}</button> }
function Eyebrow({ children }: { children: React.ReactNode }) { return <span className="eyebrow">{children}</span> }
function Badge({ children }: { children: React.ReactNode }) { return <span className={`badge ${String(children).toLowerCase().replace(/\s/g, '-')}`}>{children}</span> }
function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: () => void }) { return <button className="theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={toggle}><span>{theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}</span></button> }
function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: React.ReactNode; copy: string; align?: 'left' | 'center' }) { return <div className={`section-heading ${align}`} data-reveal><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{copy}</p></div> }

function Hero({ goToEarly }: { goToEarly: () => void }) {
  const opportunities = [
    ['ISRO', 'Research internship information'], ['DRDO', 'Graduate internship information'], ['Microsoft', 'Internship opportunities'], ['Amazon', 'Internship opportunities'], ['More', 'Other MNC opportunities'],
  ]
  return <section id="home" className="hero section-shell"><div className="hero-copy" data-reveal><Eyebrow>For engineering students</Eyebrow><h1>Engineering, made <i>navigable.</i></h1><p>One guided journey from the notes you need today to the skills, opportunities and confidence you’ll need next.</p><div className="hero-actions"><Button onClick={goToEarly}>Join Early Access <ArrowRight size={18} /></Button><a className="button button-secondary" href="https://btechmakerinnernewasap.netlify.app/">See how it works <Play size={15} /></a></div><div className="hero-chips"><span><Check size={14} /> RGPV-ready</span><span><Check size={14} /> Free to start</span><span><Check size={14} /> Mobile-first</span></div></div><div className="hero-visual" data-reveal><div className="glow glow-one" /><div className="glow glow-two" /><div className="browser-card"><div className="browser-top"><span><i /><i /><i /></span><b>Academic workspace</b><small>• • •</small></div><div className="browser-body"><span className="mock-kicker">CURRENT SEMESTER</span><h3>Semester 5 · Database<br />Management Systems</h3><nav><b>Syllabus</b><span>Notes</span><span>PYQs</span><span>Videos</span></nav><div className="mock-content"><article><span><FileText size={17} /></span><div><b>Unit 3 learning set</b><small>6 organised resources</small></div><ChevronRight size={15} /></article><article><span><Video size={17} /></span><div><b>Normalization visual guide</b><small>18 min video lesson</small></div><ChevronRight size={15} /></article></div></div></div><div className="opportunity-float internship-float"><div className="opps-head"><span>INTERNSHIP OPPORTUNITIES</span><b>Explore <ArrowRight size={12} /></b></div>{opportunities.map(([organisation, detail]) => <article key={organisation}><span className="opportunity-logo">{organisation === 'More' ? <BriefcaseBusiness size={12} /> : organisation.slice(0, 1)}</span><div><b>{organisation}</b><small>{detail}</small></div></article>)}<small className="opportunity-note">Verify openings and eligibility on official websites.</small></div></div><Marquee /></section>
}

function Marquee() { const labels = ['RGPV', 'NPTEL', 'SWAYAM', 'AICTE', 'ISRO', 'Smart India Hackathon', 'AWS', 'IBM', 'Coursera']; return <div className="marquee-wrap" aria-label="Education ecosystem areas"><div className="marquee-track">{[...labels, ...labels].map((label, i) => <span key={`${label}-${i}`}>{label}<i>•</i></span>)}</div></div> }

type EcosystemCard = {
  id: string
  title: string
  description: string
  summary: string
  label: string
  points: string[]
  Icon: LucideIcon
}

const aboutEcosystemCards: EcosystemCard[] = [
  { id: 'study', title: 'Study Materials', description: 'Notes · Syllabus · PYQs · Video Lectures', summary: 'Keep every semester resource in one reliable study space.', label: 'Academic foundation', points: ['University-wise notes', 'Previous year papers', 'Semester-wise syllabus', 'Video lectures'], Icon: Layers3 },
  { id: 'video', title: 'LOR & Resume', description: 'Government internship applications', summary: 'Access internship-specific Letter of Recommendation templates, resume formats and application guidance.', label: 'Application toolkit', points: ['ISRO LOR & Resume', 'DRDO LOR & Resume', 'Ministry of Education (MoE)', 'Indian Army', 'Other government internships', 'More government organizations'], Icon: FileText },
  { id: 'skills', title: 'Skill Development', description: 'Courses · Certifications', summary: 'Turn your learning goals into practical, recognised skills.', label: 'Build your edge', points: ['Industry certifications', 'AI and technology courses', 'NPTEL and SWAYAM', 'Professional skills'], Icon: Code2 },
  { id: 'internships', title: 'Internships & Jobs', description: 'Industry opportunities', summary: 'Prepare for credible openings with clearer next steps.', label: 'Career momentum', points: ['Government internships', 'MNC opportunities', 'Job listings', 'Application guidance'], Icon: GraduationCap },
  { id: 'hackathons', title: 'Hackathons', description: 'Compete · Build · Grow', summary: 'Build with peers, test ideas, and show what you can do.', label: 'Make ideas real', points: ['National hackathons', 'IIT and NIT events', 'Innovation challenges', 'Coding competitions'], Icon: Award },
  { id: 'mentorship', title: 'Mentorship', description: 'Learn from seniors', summary: 'Get practical perspective from students who know the path.', label: 'Guidance that stays', points: ['Senior guidance', 'Exam strategies', 'Peer learning', 'Career guidance'], Icon: UsersRound },
]

function About() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const toggleTouchCard = (id: string) => {
    if (window.matchMedia('(hover: none)').matches) setFlippedCard(current => current === id ? null : id)
  }
  const activateCard = (id: string) => {
    if (window.matchMedia('(hover: hover)').matches) {
      setFlippedCard(null)
      setActiveCardId(id)
    }
  }
  const resetCard = (id: string) => setActiveCardId(current => current === id ? null : current)

  return <section id="about" className="section about-arc-section">
    <div className="section-shell about-arc-shell">
      <header className="about-arc-heading" data-reveal>
        <span className="about-arc-kicker"><i />WHAT IS B.TECH MAKER<i /></span>
        <h2>Everything you search for, <em>in one place.</em></h2>
      </header>
      <div className="about-arc-visual" data-reveal>
        <svg className="arc-connectors" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
          <path className="arc-path path-study" d="M138 330 C205 396 351 405 534 471" />
          <path className="arc-path path-video" d="M296 281 C339 374 430 411 552 473" />
          <path className="arc-path path-skills" d="M474 243 C481 350 529 420 570 478" />
          <path className="arc-path path-internships" d="M726 243 C719 350 671 420 630 478" />
          <path className="arc-path path-hackathons" d="M904 281 C861 374 770 411 648 473" />
          <path className="arc-path path-mentorship" d="M1062 330 C995 396 849 405 666 471" />
        </svg>
        <div className="arc-hub" aria-label="B.Tech Maker learning ecosystem">
          <svg className="arc-hub-orbits" viewBox="0 0 540 160" aria-hidden="true">
            <ellipse cx="270" cy="80" rx="128" ry="30" />
            <ellipse cx="270" cy="80" rx="168" ry="40" />
            <ellipse cx="270" cy="80" rx="208" ry="50" />
            <ellipse cx="270" cy="80" rx="248" ry="60" />
          </svg>
          <span className="arc-hub-platform" />
          <div className="arc-hub-core"><span className="arc-hub-mark">B</span><b>B.Tech Maker</b></div>
        </div>
        {aboutEcosystemCards.map(card => {
          const Icon = card.Icon
          const isActive = activeCardId === card.id
          const isFlipped = isActive || flippedCard === card.id
          return <div key={card.id} className={`arc-card arc-card-${card.id} ${isActive ? 'is-active' : ''}`} onPointerEnter={() => activateCard(card.id)} onPointerLeave={() => resetCard(card.id)}>
            <button type="button" className={`arc-card-button ${isFlipped ? 'is-flipped' : ''}`} onClick={() => toggleTouchCard(card.id)} onFocus={() => activateCard(card.id)} onBlur={() => resetCard(card.id)} aria-label={`${card.title}: show learning details`} aria-pressed={isFlipped}>
              <span className="arc-card-inner">
                <span className="arc-card-face arc-card-front"><span className="arc-icon-shell"><Icon size={38} strokeWidth={1.7} /></span><strong>{card.title}</strong><small>{card.description}</small><em className="arc-card-dots"><i /><i /><i /><i /><i /></em><span className="arc-card-lines"><i /><i /><i /></span></span>
                <span className="arc-card-face arc-card-back"><span className="arc-back-heading"><Icon size={18} strokeWidth={1.9} /><span><strong>{card.title}</strong><small>{card.label}</small></span></span><span className="arc-back-divider" /><p className="arc-back-copy">{card.summary}</p><span className="arc-back-points">{card.points.map(point => <span key={point}><Check size={12} strokeWidth={2.6} />{point}</span>)}</span><span className="arc-back-label">{card.label}</span></span>
              </span>
            </button>
          </div>
        })}
      </div>
      <p className="about-arc-description">B.Tech Maker brings academics, skills, opportunities, and guidance together into one connected journey for engineering students.</p>
    </div>
  </section>
}

type FeaturePillar = {
  id: 'academic' | 'skills' | 'opportunities'
  number: string
  title: string
  description: string
  Icon: LucideIcon
  toast: string
}

const featurePillars: FeaturePillar[] = [
  { id: 'academic', number: '01', title: 'Academic Workspace', description: 'Syllabus • Notes • PYQs • Revision', Icon: GraduationCap, toast: 'Academic Workspace preview opened.' },
  { id: 'skills', number: '02', title: 'Skill Pathway', description: 'Projects • Practice • Build • Showcase', Icon: Code2, toast: 'Skill Pathway preview opened.' },
  { id: 'opportunities', number: '03', title: 'Opportunity Radar', description: 'Internships • Hackathons • Mentorships', Icon: CalendarDays, toast: 'Opportunity Radar preview opened.' },
]

const Features = memo(function Features({ notify }: { notify: (m: string) => void }) {
  const [activeFeatureId, setActiveFeatureId] = useState<FeaturePillar['id'] | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<FeaturePillar['id'] | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: .16 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const selectFeature = (pillar: FeaturePillar) => {
    setActiveFeatureId(pillar.id)
    notify(pillar.toast)
  }
  const activeNodeId = hoveredNodeId ?? activeFeatureId

  return <section ref={sectionRef} id="features" className={`section feature-rebuild ${isVisible ? 'features-visible' : ''}`}>
    <div className="section-shell features-layout">
      <div className="features-copy">
        <div className="features-heading">
          <Eyebrow>THE B.TECH MAKER SYSTEM</Eyebrow>
          <h2>Three Pillars of<br />Your <i>B.Tech</i> Journey.</h2>
          <p>Learn, Build, and Grow with a complete, semester-wise system.</p>
        </div>
        <div className="pillar-list" aria-label="B.Tech Maker features">
          {featurePillars.map(pillar => {
            const Icon = pillar.Icon
            const isActive = activeFeatureId === pillar.id
            return <button type="button" key={pillar.id} className={`pillar-item ${isActive ? 'is-active' : ''}`} onClick={() => selectFeature(pillar)}>
              <span className="pillar-index">{pillar.number}</span>
              <span className="pillar-icon"><Icon size={20} strokeWidth={1.8} /></span>
              <span className="pillar-text"><b>{pillar.title}</b><small>{pillar.description}</small></span>
              <ArrowRight className="pillar-arrow" size={17} aria-hidden="true" />
            </button>
          })}
        </div>
        <Button type="button" className="features-cta" onClick={() => window.location.assign('https://btechmakerinnernewasap.netlify.app/')}>Explore All Features <ArrowRight size={18} /></Button>
      </div>

      <div className={`ecosystem ${activeNodeId ? `ecosystem-${activeNodeId}` : ''}`} aria-label="B.Tech Maker feature ecosystem">
        <svg className="ecosystem-orbits" viewBox="0 0 640 620" aria-hidden="true">
          <defs><marker id="ecosystem-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
          <circle className="orbit-guide" cx="320" cy="326" r="270" />
          <path className="orbit-path path-academic" d="M 380 135 C 514 170, 585 299, 535 390" markerEnd="url(#ecosystem-arrow)" />
          <path className="orbit-path path-skills" d="M 452 485 C 401 550, 239 550, 188 485" markerEnd="url(#ecosystem-arrow)" />
          <path className="orbit-path path-opportunities" d="M 105 390 C 55 299, 126 170, 260 135" markerEnd="url(#ecosystem-arrow)" />
        </svg>
        <div className="ecosystem-hub" aria-label="B.Tech Maker"><span className="hub-mark">B</span><strong>B.Tech<br />Maker</strong><small>your system</small></div>
        <div className="ecosystem-orbit">
          {featurePillars.map(pillar => {
            const Icon = pillar.Icon
            const isActive = activeNodeId === pillar.id
            return <button type="button" key={pillar.id} className={`ecosystem-node node-${pillar.id} ${isActive ? 'is-active' : ''}`} onClick={() => selectFeature(pillar)} onMouseEnter={() => setHoveredNodeId(pillar.id)} onMouseLeave={() => setHoveredNodeId(null)} onFocus={() => setHoveredNodeId(pillar.id)} onBlur={() => setHoveredNodeId(null)} aria-label={`Explore ${pillar.title}`}>
              <span className="node-content"><Icon size={31} strokeWidth={1.55} aria-hidden="true" /><span className="node-label">{pillar.title}</span></span>
            </button>
          })}
        </div>
        <span className="ecosystem-caption" aria-hidden="true">One connected student journey</span>
      </div>
    </div>
  </section>
})

function AIGuidance() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  // Orbit layout order: top-center, upper-left, upper-right, mid-left, mid-right, bottom-center
  const orbitSlots = ['top-center', 'upper-left', 'upper-right', 'mid-left', 'mid-right', 'bottom-center']
  const orbitFeatures = [
    aiGuidanceFeatures[1], // Skill Development  → top-center
    aiGuidanceFeatures[0], // Certifications     → upper-left
    aiGuidanceFeatures[2], // Internships & Jobs → upper-right
    aiGuidanceFeatures[3], // Learning Resources → mid-left
    aiGuidanceFeatures[5], // Mentorship         → mid-right
    aiGuidanceFeatures[4], // Hackathons         → bottom-center
  ]

  return <section className="section ai-guidance-section" aria-labelledby="ai-guidance-title">
    <div className="section-shell ai-guidance-layout">
      <div className="ai-guidance-copy" data-reveal>
        <span className="ai-guidance-badge"><Compass size={16} /> Student Career Guidance</span>
        <h2 id="ai-guidance-title"><span>Personalized Guidance</span><span>for Your <em>B.Tech Journey</em></span></h2>
        <p>Practical resources, structured learning, internship guidance and career support to help you make better decisions throughout your B.Tech journey.</p>
        <div className="ai-guidance-actions" aria-label="Personalized guidance actions">
          {aiGuidanceSteps.map(({ title, description, Icon, details }, index) => {
            const isExpanded = expandedStep === index
            return <div className={`ai-guidance-step ${isExpanded ? 'is-expanded' : ''}`} key={title}>
              <button type="button" className={`ai-guidance-action ${isExpanded ? 'is-active' : ''}`} onClick={() => setExpandedStep(current => current === index ? null : index)} aria-expanded={isExpanded} aria-controls={`guidance-detail-${index}`}>
                <span className="ai-action-icon"><Icon size={25} strokeWidth={2.25} /></span>
                <span className="ai-action-copy"><small>{String(index + 1).padStart(2, '0')}</small><strong>{title}</strong><span>{description}</span></span>
                <ChevronDown className="ai-action-arrow" size={20} strokeWidth={2.1} />
              </button>
              <div className="ai-step-details" id={`guidance-detail-${index}`} aria-hidden={!isExpanded}>
                <div className="ai-step-details-inner"><div className="ai-step-detail-list">
                  {details.map(detail => <span key={detail}><Check size={13} strokeWidth={2.4} />{detail}</span>)}
                </div></div>
              </div>
            </div>
          })}
        </div>
      </div>

      {/* RIGHT SIDE: orbit composition */}
      <div className="ai-orbit-stage" aria-label="B.Tech Maker guidance features">
        {/* Elliptical dotted orbit ring */}
        <svg className="ai-orbit-ring" viewBox="0 0 800 700" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <ellipse cx="400" cy="350" rx="335" ry="292" className="ai-orbit-ellipse-glow" />
          <ellipse cx="400" cy="350" rx="335" ry="292" className="ai-orbit-ellipse" />
          <circle cx="400" cy="58"  r="6" className="ai-orbit-node" />
          <circle cx="130" cy="201" r="6" className="ai-orbit-node" />
          <circle cx="670" cy="201" r="6" className="ai-orbit-node" />
          <circle cx="66"  cy="400" r="4" className="ai-orbit-node ai-orbit-node--sm" />
          <circle cx="734" cy="400" r="4" className="ai-orbit-node ai-orbit-node--sm" />
          <circle cx="400" cy="642" r="6" className="ai-orbit-node" />
        </svg>

        {/* Central desk image */}
        <div className="ai-orbit-image-wrap">
          <div className="ai-orbit-image-glow" />
          <div className="ai-orbit-image">
            <img src={aiGuidanceWorkspace} alt="A premium B.Tech Maker workspace with a laptop, books, plant, notebook and coffee mug" loading="lazy" />
            <span className="ai-laptop-brand"><i>B</i><b>B.Tech Maker</b></span>
          </div>
        </div>

        {/* Six floating feature cards */}
        {orbitFeatures.map(({ id, title, Icon }, i) => (
          <article key={id} className={`ai-float-card ai-float-card--${orbitSlots[i]}`} aria-label={title}>
            <span className="ai-float-icon"><Icon size={28} strokeWidth={1.9} /></span>
            <strong>{title}</strong>
          </article>
        ))}
      </div>
    </div>
  </section>
}

function Mentors({ notify }: { notify: (m: string) => void }) {
  const mentorFeatures = [
    { title: 'Practical Learning', copy: 'From real projects.', Icon: GraduationCap },
    { title: 'Project Guidance', copy: 'Build, iterate and grow.', Icon: Code2 },
    { title: 'Career Direction', copy: 'Internships, resources & preparation.', Icon: BriefcaseBusiness },
    { title: 'Student Perspective', copy: 'Built around real engineering journeys.', Icon: UsersRound },
  ]

  return <section id="mentors" className="section mentor-cinematic-section">
    <div className="section-shell mentor-cinematic-shell">
      <header className="mentor-cinematic-hero" data-reveal>
        <img src={mentorsWorkspace} alt="Anonymous engineering students collaborating around a whiteboard and workspace." loading="lazy" />
        <div className="mentor-hero-copy">
          <span className="mentor-hero-badge"><UsersRound size={16} /> The people behind B.Tech Maker</span>
          <h2>Built by students<br />who know the journey.</h2>
          <p>Practical perspective from the founding team, with student guidance available from Ajay Kumar Sharma.</p>
        </div>
      </header>

      <div className="mentor-profile-grid" data-reveal>
        {mentorData.map((mentor, index) => <article className="mentor-profile-card" key={mentor.name}>
          <div className="mentor-profile-photo">
            <img className={index === 1 ? 'is-mirrored' : ''} src={mentorSilhouette} alt="" aria-hidden="true" />
          </div>
          <div className="mentor-profile-content">
            <span className="mentor-profile-role">{mentor.tag}</span>
            <h3>{mentor.name}</h3>
            <span className="mentor-recognition">{mentor.recognition}</span>
            <p>{mentor.bio}</p>
            <div className="mentor-profile-tags">{mentor.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            {mentor.mentor && <Button variant="secondary" className="mentor-request" onClick={() => notify('Student guidance requests will be opened with early access.')}>Request Guidance <ArrowRight size={16} /></Button>}
          </div>
        </article>)}
      </div>

      <div className="mentor-value-strip" data-reveal aria-label="What mentors can help with">
        {mentorFeatures.map(({ title, copy, Icon }) => <article key={title}>
          <span className="mentor-value-icon"><Icon size={23} strokeWidth={1.7} /></span>
          <div><strong>{title}</strong><small>{copy}</small></div>
        </article>)}
      </div>
    </div>
  </section>
}

function Plans({ goToRegistration }: { goToRegistration: () => void }) {
  const plans = [
    { name: 'Free', price: '₹0', tagline: 'A clear start for every engineering student.', points: ['Access to notes for one subject', 'Selected Previous Year Questions (PYQs)', 'Available subject solutions and learning resources', 'Limited IIT internship opportunity links', 'Basic ISRO and DRDO LOR templates', 'Access to one SIH finalist PPT', 'Access to 10 curated MNC internship opportunities'], cta: 'Get Started Free' },
    { name: 'Premium', price: '₹99', tagline: 'Everything you need for your engineering journey.', points: ['Full access to the B.Tech Maker portal', 'Complete study materials and resources', 'All available subject notes and PYQs', 'Government internship resources', 'Customized ISRO LOR templates', 'Customized DRDO LOR templates', 'ISRO and DRDO resume formats', 'Complete available hackathon resources', 'Access to all available MNC internship resources', 'One mentorship session per month'], cta: 'Get Premium Access' },
  ]
  return <section id="plans" className="section section-alt"><div className="section-shell"><div className="plans-heading"><SectionHeading eyebrow="PLANS" title={<>Start free. Upgrade when <i>you’re ready.</i></>} copy="Two simple ways to access B.Tech Maker resources. ₹99 is displayed as a price only; billing terms will be confirmed before payment is introduced." /></div><div className="plan-grid two-plan-grid">{plans.map(plan => <article className={`plan-card ${plan.name === 'Premium' ? 'pro' : ''}`} key={plan.name}>{plan.name === 'Premium' && <span className="popular">Most complete access</span>}<Eyebrow>{plan.name}</Eyebrow><h3>{plan.price}</h3><p>{plan.tagline}</p><Button variant={plan.name === 'Premium' ? 'primary' : 'secondary'} onClick={goToRegistration}>{plan.cta} <ArrowRight size={14} /></Button><ul>{plan.points.map(point => <li key={point}><Check size={14} /> {point}</li>)}</ul></article>)}</div><p className="pricing-note"><CircleHelp size={14} /> Payment is not collected on this page. Premium access requests are registered for follow-up.</p></div></section>
}

function BrandShowcase() {
  return (
    <div className="brand-showcase" aria-hidden="true">
      {/* Ambient glow layer */}
      <div className="bs-glow" />
      {/* Subtle floating particles */}
      <div className="bs-particles">
        <span className="bs-p bs-p1" />
        <span className="bs-p bs-p2" />
        <span className="bs-p bs-p3" />
        <span className="bs-p bs-p4" />
      </div>
      {/* Main brand tile */}
      <div className="bs-tile">
        {/* Inner reflection strip */}
        <div className="bs-tile-shine" />
        {/* Logo mark */}
        <div className="bs-logo-wrap">
          <div className="bs-logo-mark">B</div>
        </div>
        {/* Brand name */}
        <div className="bs-brand-name">B.Tech Maker</div>
        {/* Thin divider */}
        <div className="bs-tile-divider" />
        {/* Tagline inside tile */}
        <div className="bs-tile-tagline">Engineering, made navigable.</div>
      </div>
      {/* Typography block below tile */}
      <div className="bs-text-block">
        <span className="bs-eyebrow">BUILT FOR ENGINEERING STUDENTS</span>
        <p className="bs-headline">One Platform. Every Opportunity.</p>
        <p className="bs-subline">A Better Engineering Journey.</p>
      </div>
    </div>
  )
}


type RegistrationFields = {
  name: string
  course: string
  branch: string
  contactNumber: string
  email: string
  suggestion: string
}

function FinalCTA({ notify }: { notify: (message: string) => void }) {
  const emptyFields: RegistrationFields = { name: '', course: '', branch: '', contactNumber: '', email: '', suggestion: '' }
  const [fields, setFields] = useState<RegistrationFields>(emptyFields)
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)
  const MAX_SUGGESTION = 1000

  const update = (field: keyof RegistrationFields, value: string) => {
    setFields(current => ({ ...current, [field]: value }))
    if (field === 'suggestion') setCharCount(value.length)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const phone = fields.contactNumber.replace(/[\s\-]/g, '')
    if (!fields.name.trim()) { setState('error'); setError('Full name is required.'); return }
    if (!fields.course.trim()) { setState('error'); setError('Course is required.'); return }
    if (!fields.branch.trim()) { setState('error'); setError('Branch is required.'); return }
    if (!/^[6-9]\d{9}$/.test(phone)) { setState('error'); setError('Enter a valid 10-digit Indian mobile number.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) { setState('error'); setError('Enter a valid email address.'); return }
    if (fields.suggestion.length > MAX_SUGGESTION) { setState('error'); setError(`Suggestion must be ${MAX_SUGGESTION} characters or fewer.`); return }
    const stored = sessionStorage.getItem('btech-maker-registration-emails') ?? ''
    if (stored.split(',').includes(fields.email.trim().toLowerCase())) { setState('error'); setError('This email has already been registered in this session.'); return }
    setState('sending'); setError('')
    try {
      const payload = { ...fields, contactNumber: phone }
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

      let success = false

      if (!isLocalDev) {
        // ── Production: use the Netlify Function ──────────────────
        const response = await fetch('/.netlify/functions/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const result = await response.json().catch(() => ({ ok: false, message: 'Server error. Please try again.' }))
        if (!response.ok || !result.ok) throw new Error(result.message ?? 'Submission failed.')
        success = true
      } else {
        // ── Local dev: fall back to Netlify Forms (POST to /) ──────
        // This only works on the deployed Netlify site, not localhost.
        // On localhost this will show a helpful message instead of a
        // cryptic error. Deploy to Netlify to test real submissions.
        const body = new URLSearchParams({
          'form-name': 'btech-maker-registration',
          ...payload,
        }).toString()
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        })
        if (response.ok) {
          success = true
        } else {
          throw new Error(
            'You are running on localhost. Deploy to Netlify to test live registration, or use \u0022netlify dev\u0022 locally.'
          )
        }
      }

      if (success) {
        sessionStorage.setItem(
          'btech-maker-registration-emails',
          [stored, fields.email.trim().toLowerCase()].filter(Boolean).join(','),
        )
        setState('success')
        notify('Registration received! Thank you for joining B.Tech Maker.')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'We could not save your registration. Please try again.'
      setState('error')
      setError(message)
    }
  }

  return (
    <section id="registration" className="section final-section">
      <div className="section-shell final-panel">
        <div data-reveal>
          <Eyebrow>JOIN EARLY ACCESS</Eyebrow>
          <h2>Your engineering journey, <i>organized.</i></h2>
          <p>Register your details to receive B.Tech Maker early-access and resource updates.</p>
          {state === 'success' ? (
            <div className="early-success registration-success" role="status">
              <CheckCircle2 size={28} className="success-icon" />
              <div>
                <b>Thank you for joining B.Tech Maker!</b>
                <small>Your registration has been received successfully. Your suggestions will help us make B.Tech Maker better for engineering students.</small>
              </div>
            </div>
          ) : (
            <form id="registration-form" name="btech-maker-registration" onSubmit={submit} noValidate>
              <div className="registration-grid">
                <label>Full Name<input id="registration-name" value={fields.name} onChange={e => update('name', e.target.value)} name="name" autoComplete="name" placeholder="Your full name" required /></label>
                <label>Course<input value={fields.course} onChange={e => update('course', e.target.value)} name="course" placeholder="e.g. B.Tech" required /></label>
                <label>Branch<input value={fields.branch} onChange={e => update('branch', e.target.value)} name="branch" placeholder="e.g. Computer Science" required /></label>
                <label>Contact Number<input value={fields.contactNumber} onChange={e => update('contactNumber', e.target.value)} name="contactNumber" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" required /></label>
                <label className="registration-email">Email Address<input value={fields.email} onChange={e => update('email', e.target.value)} name="email" type="email" autoComplete="email" placeholder="you@email.com" required /></label>
                <label className="registration-suggestion">
                  <span className="suggestion-label-row">
                    What more would you like us to add to B.Tech Maker?
                    <span className="suggestion-optional">Optional</span>
                  </span>
                  <textarea
                    value={fields.suggestion}
                    onChange={e => update('suggestion', e.target.value)}
                    name="suggestion"
                    placeholder="Share your ideas, suggestions, features you would love to see, or resources that would make your engineering journey easier..."
                    maxLength={MAX_SUGGESTION}
                    rows={4}
                  />
                  <span className={`char-counter ${charCount > MAX_SUGGESTION * 0.9 ? 'char-counter--warn' : ''}`}>
                    {charCount} / {MAX_SUGGESTION}
                  </span>
                </label>
              </div>
              {state === 'error' && <small className="form-error" role="alert">{error}</small>}
              <Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Saving registration...' : <><span>Join Early Access</span><ArrowRight size={16} /></>}</Button>
            </form>
          )}
          <small className="tagline">Democratizing engineering education. Empowering future innovators.</small>
        </div>
        <BrandShowcase />
      </div>
    </section>
  )
}

function FoundingTeam() {
  return <section className="founding-section" aria-labelledby="founding-title">
    <div className="section-shell founding-inner">
      <div><Eyebrow>FOUNDING TEAM</Eyebrow><h2 id="founding-title">Built from the student perspective.</h2><p>Two builders shaping a clearer starting point for engineering students.</p></div>
      <div className="founding-people"><article><span>AK</span><div><b>Ajay Kumar Sharma</b><small>Co-Founder & Developer</small><p>Product Development · Technical Architecture · Platform Development</p><em>2X ISRO Selected Intern (HSFC & VSSC) · 2X SIH Finalist (2024 & 2025)</em></div></article><article><span>HS</span><div><b>Harsh Sahu</b><small>Co-Founder & Marketing Head</small><p>Marketing & Outreach · Student Engagement · Brand Development</p><em>SIH Finalist</em></div></article></div>
    </div>
  </section>
}

function Footer({ theme, toggle, openLegal }: { theme: Theme; toggle: () => void; openLegal: (page: 'privacy' | 'terms') => void }) {
  return <footer><div className="footer-inner section-shell"><div><Logo /><p>One guided journey through academics, skills, opportunities and career development.</p></div><div className="footer-links"><div><b>Product</b><a href="#features">Features</a><a href="#plans">Plans</a></div><div><b>Company</b><a href="#about">About</a><a href="#mentors">Mentors</a></div><div><b>Legal</b><button type="button" onClick={() => openLegal('privacy')}>Privacy Policy</button><button type="button" onClick={() => openLegal('terms')}>Terms & Conditions</button></div></div><div className="footer-social"><span>Connect</span><div><a href="#home" aria-label="B.Tech Maker home"><Globe2 size={17} /></a><ThemeToggle theme={theme} toggle={toggle} /></div></div></div><div className="footer-disclaimer section-shell"><strong>Independent platform disclaimer</strong><p>B.Tech Maker is an independent educational guidance and resource platform designed to support engineering students with academic materials, internship information, application guidance, resumes, LOR templates, hackathon resources and career development.</p><p>B.Tech Maker is not affiliated with, endorsed by, or officially associated with ISRO, DRDO, the Ministry of Education, the Indian Army, IITs, Microsoft, Amazon or any other government organization, institution or company unless explicitly stated.</p><p>We do not guarantee selection in internships, government programs, hackathons or any other opportunity. Students must verify eligibility and availability on official websites.</p></div></footer>
}

function LegalModal({ page, close }: { page: 'privacy' | 'terms'; close: () => void }) {
  const isPrivacy = page === 'privacy'
  return <div className="modal-backdrop legal-backdrop" role="dialog" aria-modal="true" aria-labelledby="legal-title"><article className="modal legal-modal"><button className="close" onClick={close} aria-label="Close"><X size={19} /></button><Eyebrow>LEGAL</Eyebrow><h2 id="legal-title">{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h2>{isPrivacy ? <div className="legal-copy"><p>When you submit the early-access form, B.Tech Maker collects your name, course, branch, contact number and email address to manage your registration and communicate relevant platform updates.</p><p>Registration records are collected through the website’s Netlify Forms service and are accessible only to authorised B.Tech Maker administrators. We do not sell personal information. Contact information is retained only as long as needed for these purposes or to meet legal requirements.</p><p>You may request access, correction or deletion of your registration details by contacting B.Tech Maker through the official channels published with the service.</p></div> : <div className="legal-copy"><p>B.Tech Maker is an independent educational guidance and resource platform. It provides academic materials, internship information, application guidance, resumes, LOR templates, hackathon resources and career-development resources for learning and preparation.</p><p>B.Tech Maker is not affiliated with, endorsed by, or officially associated with ISRO, DRDO, the Ministry of Education, the Indian Army, IITs, Microsoft, Amazon, or any other government organization, institution or company unless explicitly stated.</p><p>We do not guarantee selection in ISRO, DRDO, Indian Army, IIT internships, MNC internships, government programs, hackathons or any other opportunity. LOR and resume templates do not guarantee selection. Internship availability and eligibility may change, so students must verify all information through official websites. Hackathon PPTs and resources are intended for learning and preparation.</p></div>}</article></div>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem('btech-maker-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [menu, setMenu] = useState(false)
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | null>(null)
  const [toast, setToast] = useState('')
  const [showBack, setShowBack] = useState(false)
  const [active, setActive] = useState('home')

  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }, [])
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light')
  const toEarly = () => document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('btech-maker-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f7f3eb')
  }, [theme])

  useEffect(() => {
    if (!menu) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menu])

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    revealNodes.forEach(node => node.classList.add('visible'))

    let navObserver: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      }), { rootMargin: '-35% 0px -55% 0px' })
      navItems.forEach(item => {
        const node = document.getElementById(item.target)
        if (node) navObserver?.observe(node)
      })
    }
    return () => navObserver?.disconnect()
  }, [])

  useEffect(() => {
    const check = () => setShowBack(window.scrollY > 600)
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  const go = (target: string) => { setMenu(false); document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="site">
    <div className="progress" />
    <header className="nav site-nav"><div className="nav-inner"><div className="nav-brand"><Logo /></div><nav aria-label="Primary navigation">{navItems.map(item => <button onClick={() => go(item.target)} className={active === item.target ? 'active' : ''} key={item.target}>{item.label}</button>)}</nav><div className="nav-actions"><ThemeToggle theme={theme} toggle={toggleTheme} /><Button onClick={toEarly}>Join Early Access <ArrowRight size={15} /></Button></div><div className="mobile-actions"><ThemeToggle theme={theme} toggle={toggleTheme} /><button onClick={() => setMenu(true)} aria-label="Open navigation" aria-expanded={menu} aria-controls="mobile-navigation"><Menu size={22} /></button></div></div></header>
    {menu && <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation"><div><Logo onClick={() => setMenu(false)} /><button onClick={() => setMenu(false)} aria-label="Close navigation"><X size={23} /></button></div><nav aria-label="Mobile navigation">{navItems.map((item, index) => <button style={{ animationDelay: (index * 55) + 'ms' }} onClick={() => go(item.target)} key={item.target}>{item.label}<ArrowRight size={19} /></button>)}</nav><Button onClick={() => { setMenu(false); toEarly() }}>Join Early Access <ArrowRight size={16} /></Button></div>}
    <main><Hero goToEarly={toEarly} /><About /><Features notify={notify} /><AIGuidance /><Mentors notify={notify} /><Plans goToRegistration={toEarly} /><FinalCTA notify={notify} /><FoundingTeam /></main>
    <Footer theme={theme} toggle={toggleTheme} openLegal={setLegalPage} />
    {showBack && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={18} /></button>}
    <div className={'sticky-cta ' + (showBack ? 'show' : '')}><span>Build your direction.</span><Button onClick={toEarly}>Join early access</Button></div>
    {legalPage && <LegalModal page={legalPage} close={() => setLegalPage(null)} />}
    {toast && <div className="toast" role="status"><CheckCircle2 size={17} /> {toast}</div>}
  </div>
}

export default App
