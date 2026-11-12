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
  { initials: 'HS', name: 'Harsh Sahu', tag: 'Mentor · Team member', bio: 'Bringing a practical, peer-level perspective to learning, building projects and career preparation.', skills: ['Peer guidance', 'Projects', 'Career exploration'] },
  { initials: 'AK', name: 'Ajay Kumar Sharma', tag: 'Founder · Project presenter', bio: 'Building B.Tech Maker from the student perspective, with a focus on clearer engineering journeys.', skills: ['Product vision', 'Student research', 'Project building'] },
]

const aiGuidanceSteps = [
  { title: 'Set Your Goal', description: 'Choose your learning and career path.', Icon: Target, details: ['Select your engineering branch.', 'Choose your current semester.', 'Define your career objective.', 'Select your target role.'] },
  { title: 'Analyze Your Skills', description: 'Find strengths and areas to improve.', Icon: ChartNoAxesColumnIncreasing, details: ['Identify existing technical skills.', 'Discover missing core foundations.', 'Understand your improvement areas.', 'Identify skills required for your target career.'] },
  { title: 'Get a Personalized Plan', description: 'Courses, projects, internships & more.', Icon: Layers3, details: ['Recommended courses and certifications.', 'Project-based learning suggestions.', 'Internship preparation roadmap.', 'Weekly learning milestones.'] },
  { title: 'Track Your Progress', description: 'Stay on track and reach your goal.', Icon: TrendingUp, details: ['Monitor completed learning activities.', 'Track skill development.', 'Review project milestones.', 'Measure progress towards career goals.'] },
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
  return <section id="home" className="hero section-shell"><div className="hero-copy" data-reveal><Eyebrow>For engineering students in India</Eyebrow><h1>Engineering, made <i>navigable.</i></h1><p>One guided journey from the notes you need today to the skills, opportunities and confidence you’ll need next.</p><div className="hero-actions"><Button onClick={goToEarly}>Join Early Access <ArrowRight size={18} /></Button><a className="button button-secondary" href="https://btechmakerinnernewasap.netlify.app/">See how it works <Play size={15} /></a></div><div className="hero-chips"><span><Check size={14} /> RGPV-ready</span><span><Check size={14} /> Free to start</span><span><Check size={14} /> Mobile-first</span></div></div><div className="hero-visual" data-reveal><div className="glow glow-one" /><div className="glow glow-two" /><div className="browser-card"><div className="browser-top"><span><i /><i /><i /></span><b>Academic workspace</b><small>• • •</small></div><div className="browser-body"><span className="mock-kicker">CURRENT SEMESTER</span><h3>Semester 5 · Database<br />Management Systems</h3><nav><b>Syllabus</b><span>Notes</span><span>PYQs</span><span>Videos</span></nav><div className="mock-content"><article><span><FileText size={17} /></span><div><b>Unit 3 learning set</b><small>6 organised resources</small></div><ChevronRight size={15} /></article><article><span><Video size={17} /></span><div><b>Normalization visual guide</b><small>18 min video lesson</small></div><ChevronRight size={15} /></article></div></div></div><div className="roadmap-float"><div><span className="float-icon"><Target size={16} /></span><small>CAREER ROADMAP</small></div><b>Full-stack foundations</b><div className="ring-row"><span className="progress-ring"><i>42%</i></span><small>2 of 5 milestones<br />in motion</small></div></div><div className="opportunity-float"><div className="opps-head"><span>OPPORTUNITIES FOR YOU</span><b>See all <ArrowRight size={12} /></b></div>{[['NPTEL · Database Systems', 'Free · 12 weeks', 'Open'], ['Research project guide', 'Preparation path', 'New'], ['Innovation sprint', 'Deadline · 18 Nov', 'Soon']].map(([title, meta, label]) => <article key={title}><span><Sparkles size={13} /></span><div><b>{title}</b><small>{meta}</small></div><em>{label}</em></article>)}</div></div><Marquee /></section>
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
  { id: 'study', title: 'Study Materials', description: 'Notes · PYQs · Syllabus', summary: 'Keep every semester resource in one reliable study space.', label: 'Academic foundation', points: ['University-wise notes', 'Previous year papers', 'Semester-wise syllabus', 'Important questions'], Icon: Layers3 },
  { id: 'video', title: 'Video Lectures', description: 'Subject-wise learning', summary: 'Understand difficult topics at your pace, one concept at a time.', label: 'Learn visually', points: ['Subject-wise lectures', 'Topic explanations', 'Concept-based learning', 'Exam preparation'], Icon: Play },
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
          <span className="arc-hub-orbit orbit-one" /><span className="arc-hub-orbit orbit-two" /><span className="arc-hub-platform" />
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

  return <section className="section ai-guidance-section" aria-labelledby="ai-guidance-title">
    <div className="section-shell ai-guidance-layout">
      <div className="ai-guidance-copy" data-reveal>
        <span className="ai-guidance-badge"><Sparkles size={16} fill="currentColor" /> AI Guidance</span>
        <h2 id="ai-guidance-title"><span>Personalized Guidance</span><span>for Your <em>B.Tech Journey</em></span></h2>
        <p>AI-powered support to help you learn, build skills, explore opportunities and plan your career.</p>
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
      <div className="ai-workspace" aria-label="B.Tech Maker guidance workspace">
        <div className="ai-feature-stage">
          <svg className="ai-feature-connection" viewBox="0 0 600 230" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 100 54 C 170 15, 230 15, 300 54 C 370 15, 430 15, 500 54 C 550 94, 550 148, 500 188 C 430 224, 370 224, 300 188 C 230 224, 170 224, 100 188 C 50 148, 50 94, 100 54" />
            {[['100', '54'], ['300', '54'], ['500', '54'], ['100', '188'], ['300', '188'], ['500', '188']].map(([cx, cy]) => <circle cx={cx} cy={cy} r="4.5" key={`${cx}-${cy}`} />)}
          </svg>
          <div className="ai-feature-grid">
            {aiGuidanceFeatures.map(({ id, title, Icon }) => <article className="ai-feature-card" key={id}>
              <span className="ai-feature-icon"><Icon size={30} strokeWidth={2.15} /></span><strong>{title}</strong>
            </article>)}
          </div>
        </div>
        <div className="ai-desk-frame">
          <img src={aiGuidanceWorkspace} alt="A premium B.Tech Maker workspace with a laptop, books, plant, notebook and coffee mug" />
          <span className="ai-laptop-brand"><i>B</i><b>B.Tech Maker</b></span>
        </div>
      </div>
    </div>
  </section>
}

function Mentors({ notify }: { notify: (m: string) => void }) {
  const mentorFeatures = [
    { title: 'Practical Learning', copy: 'From real projects.', Icon: GraduationCap },
    { title: 'Project Guidance', copy: 'Build, iterate and grow.', Icon: Code2 },
    { title: 'Career Direction', copy: 'Internships, placements & more.', Icon: BriefcaseBusiness },
    { title: 'Student First', copy: 'Guidance from peers who get it.', Icon: UsersRound },
  ]

  return <section id="mentors" className="section mentor-cinematic-section">
    <div className="section-shell mentor-cinematic-shell">
      <header className="mentor-cinematic-hero" data-reveal>
        <img src={mentorsWorkspace} alt="Anonymous engineering students collaborating around a whiteboard and workspace." />
        <div className="mentor-hero-copy">
          <span className="mentor-hero-badge"><UsersRound size={16} /> Meet Your Mentors</span>
          <h2>Learn from people<br />who’ve walked the path.</h2>
          <p>Get practical guidance, project insights and career direction from mentors who are building, learning and growing with you.</p>
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
            <p>{mentor.bio}</p>
            <div className="mentor-profile-tags">{mentor.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            <Button variant="secondary" className="mentor-request" onClick={() => notify('Mentor sessions are coming soon—thanks for your interest.')}>Request Guidance <ArrowRight size={16} /></Button>
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

function Plans({ openPartner }: { openPartner: () => void }) { const [yearly, setYearly] = useState(false); const [compare, setCompare] = useState(false); const price = (num: number) => yearly ? Math.round(num * 10) : num; const plans = [['Free', 0, 'A clear start', ['Resource discovery', 'Selected PYQs', 'Program guidance', 'Basic listings', 'Mobile access']], ['Plus', 99, 'Build momentum', ['Personal recommendations', 'Deadline reminders', 'Saved resources', 'Expanded PYQs', 'Progress planning']], ['Pro', 199, 'Go deeper', ['Everything in Plus', 'AI career guidance', 'Skill gap analysis', 'Resume feedback', 'Interview preparation']]]; return <section id="plans" className="section section-alt"><div className="section-shell"><div className="plans-heading"><SectionHeading eyebrow="PLANS" title={<>Start free. Grow when <i>you’re ready.</i></>} copy="Illustrative pilot pricing. The final model will be tested and adjusted with real students." /><div className="billing"><button className={!yearly ? 'active' : ''} onClick={() => setYearly(false)}>Monthly</button><button className={yearly ? 'active' : ''} onClick={() => setYearly(true)}>Yearly <span>Save more</span></button></div></div><div className="plan-grid">{plans.map(([name, monthly, tagline, points]) => <article className={`plan-card ${name === 'Pro' ? 'pro' : ''}`} key={name as string}>{name === 'Pro' && <span className="popular">Most popular</span>}<Eyebrow>{name as string}</Eyebrow><h3>{monthly === 0 ? '₹0' : `₹${price(monthly as number)}`}<small>{monthly === 0 ? '' : yearly ? ' / year' : ' / month'}</small></h3><p>{tagline as string}</p><Button variant={name === 'Pro' ? 'primary' : 'secondary'}>Join waitlist <ArrowRight size={14} /></Button><ul>{(points as string[]).map(point => <li key={point}><Check size={14} /> {point}</li>)}</ul></article>)}</div><div className="institutional"><span className="institution-icon"><Building2 size={20} /></span><div><Eyebrow>INSTITUTIONAL</Eyebrow><h3>For colleges and universities: custom pricing.</h3><p>Proposed dashboards, placement preparation and student development tools for entire cohorts.</p></div><Button onClick={openPartner}>Talk to us <ArrowRight size={15} /></Button></div><p className="pricing-note"><CircleHelp size={14} /> Illustrative pricing for pilot testing.</p><div className="compare-trigger"><button onClick={() => setCompare(!compare)}>{compare ? 'Hide' : 'Compare'} plans <ChevronDown size={15} /></button></div>{compare && <div className="compare-table">{[['Resource discovery', 'Included', 'Included', 'Included'], ['Deadline reminders', '—', 'Included', 'Included'], ['AI career guidance', '—', '—', 'Included'], ['Institution tools', '—', '—', 'Custom']].map(([label, free, plus, pro]) => <div key={label}><b>{label}</b><span>{free}</span><span>{plus}</span><span>{pro}</span></div>)}</div>}</div></section> }

function FinalCTA({ join }: { join: (email: string) => void }) { const [email, setEmail] = useState(''); const [sent, setSent] = useState(false); const submit = (event: FormEvent) => { event.preventDefault(); if (email.includes('@')) { setSent(true); join(email) } }; return <section className="section final-section"><div className="section-shell final-panel"><div data-reveal><Eyebrow>EARLY ACCESS</Eyebrow><h2>Your engineering journey, <i>organized.</i></h2><p>Follow the build and help shape a better starting point for engineering students.</p>{sent ? <div className="early-success"><CheckCircle2 size={22} /><div><b>You’re on the list.</b><small>This prototype has not sent your details anywhere.</small></div></div> : <form onSubmit={submit}><label className="sr-only" htmlFor="email">Email address</label><input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com" required /><Button type="submit">Join Early Access <ArrowRight size={16} /></Button></form>}<small className="tagline">Democratizing engineering education. Empowering future innovators.</small></div><div className="cta-sculpture" aria-hidden="true"><i /><span /><b>B</b></div></div></section> }

function FoundingTeam() {
  return <section className="founding-section" aria-labelledby="founding-title">
    <div className="section-shell founding-inner">
      <div><Eyebrow>FOUNDING TEAM</Eyebrow><h2 id="founding-title">Built from the student perspective.</h2><p>Two builders shaping a clearer starting point for engineering students.</p></div>
      <div className="founding-people"><article><span>AK</span><div><b>Ajay Kumar Sharma</b><small>Founder / Project Presenter</small></div></article><article><span>HS</span><div><b>Harsh Sahu</b><small>Team member / Mentor</small></div></article></div>
    </div>
  </section>
}

function Footer({ theme, toggle }: { theme: Theme; toggle: () => void }) { return <footer><div className="footer-inner section-shell"><div><Logo /><p>One guided journey through academics, skills, opportunities and career development.</p></div><div className="footer-links">{[['Product', 'Features', 'Plans'], ['Company', 'About', 'Mentors'], ['Legal', 'Privacy (planned)', 'Terms (planned)']].map(([heading, ...items]) => <div key={heading}><b>{heading}</b>{items.map(item => <a href="#home" key={item}>{item}</a>)}</div>)}</div><div className="footer-social"><span>Connect</span><div><a href="#home" aria-label="Professional social placeholder"><Network size={17} /></a><a href="#home" aria-label="Code community placeholder"><Code2 size={17} /></a><a href="#home" aria-label="Website placeholder"><Globe2 size={17} /></a><ThemeToggle theme={theme} toggle={toggle} /></div></div></div><div className="footer-disclaimer section-shell">B.Tech Maker is an educational guidance platform. We do not issue certificates, approve internships or guarantee placements.</div></footer> }

function PartnerModal({ close, notify }: { close: () => void; notify: (m: string) => void }) { const [error, setError] = useState(''); const [success, setSuccess] = useState(false); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); if (!String(data.get('name')).trim() || !String(data.get('institution')).trim() || !String(data.get('email')).includes('@')) { setError('Please complete your name, institution and a valid email.'); return } setSuccess(true); notify('Thanks—your partner interest is captured only in this front-end demo.') }; return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="partner-title"><div className="modal"><button className="close" onClick={close} aria-label="Close"><X size={19} /></button>{success ? <div className="modal-success"><CheckCircle2 size={36} /><h2>Interest received.</h2><p>This is a front-end success state. No contact data has been transmitted.</p><Button onClick={close}>Close</Button></div> : <><Eyebrow>INSTITUTIONAL ENQUIRY</Eyebrow><h2 id="partner-title">Talk to B.Tech Maker.</h2><p>Tell us about the student journey you want to strengthen.</p><form onSubmit={submit}><label>Name<input name="name" placeholder="Your name" /></label><label>Institution<input name="institution" placeholder="College or organisation" /></label><label>Email<input name="email" type="email" placeholder="you@institution.edu" /></label><label>Message<textarea name="message" placeholder="What would you like to explore?" /></label>{error && <small className="form-error">{error}</small>}<Button type="submit">Send interest <ArrowRight size={15} /></Button></form></>}</div></div> }

function App() {
  const [theme, setTheme] = useState<Theme>(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState('')
  const [showBack, setShowBack] = useState(false)
  const [active, setActive] = useState('home')

  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }, [])
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light')
  const toEarly = () => document.querySelector('#email')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

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
    <header className="nav site-nav"><div className="nav-inner"><div className="nav-brand"><Logo /><span className="nav-context"><i /> Student-first</span></div><nav aria-label="Primary navigation">{navItems.map(item => <button onClick={() => go(item.target)} className={active === item.target ? 'active' : ''} key={item.target}>{item.label}</button>)}</nav><div className="nav-actions"><span className="nav-access"><Sparkles size={13} /> Early access</span><ThemeToggle theme={theme} toggle={toggleTheme} /><Button onClick={toEarly}>Join Early Access <ArrowRight size={15} /></Button></div><div className="mobile-actions"><ThemeToggle theme={theme} toggle={toggleTheme} /><button onClick={() => setMenu(true)} aria-label="Open navigation" aria-expanded={menu} aria-controls="mobile-navigation"><Menu size={22} /></button></div></div></header>
    {menu && <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation"><div><Logo onClick={() => setMenu(false)} /><button onClick={() => setMenu(false)} aria-label="Close navigation"><X size={23} /></button></div><nav aria-label="Mobile navigation">{navItems.map((item, index) => <button style={{ animationDelay: (index * 55) + 'ms' }} onClick={() => go(item.target)} key={item.target}>{item.label}<ArrowRight size={19} /></button>)}</nav><Button onClick={() => { setMenu(false); toEarly() }}>Join Early Access <ArrowRight size={16} /></Button></div>}
    <main><Hero goToEarly={toEarly} /><About /><Features notify={notify} /><AIGuidance /><Mentors notify={notify} /><Plans openPartner={() => setModal(true)} /><FinalCTA join={() => notify('You’re on the early-access list—prototype only.')} /><FoundingTeam /></main>
    <Footer theme={theme} toggle={toggleTheme} />
    {showBack && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={18} /></button>}
    <div className={'sticky-cta ' + (showBack ? 'show' : '')}><span>Build your direction.</span><Button onClick={toEarly}>Join early access</Button></div>
    {modal && <PartnerModal close={() => setModal(false)} notify={notify} />}
    {toast && <div className="toast" role="status"><CheckCircle2 size={17} /> {toast}</div>}
  </div>
}

export default App
