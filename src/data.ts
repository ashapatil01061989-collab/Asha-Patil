export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  duration: string;
  fee: string;
  icon: string;
}

export interface FacilityItem {
  title: string;
  desc: string;
  icon: string;
}

export interface ReviewItem {
  name: string;
  date: string;
  rating: number;
  review: string;
  photoSeed: string;
}

export interface BlogItem {
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BeforeAfterItem {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  desc: string;
}

export interface SpecialtyData {
  id: string;
  specialtyName: string;
  clinicName: string;
  tagline: string;
  doctorName: string;
  qualifications: string;
  regNumber: string;
  experience: string;
  languages: string[];
  avatar: string;
  clinicPhoto: string;
  timing: {
    weekdays: string;
    saturday: string;
    sunday: string;
    averageWait: string;
  };
  fee: string;
  email?: string;
  emergencyContact: string;
  googleRating: string;
  totalReviews: string;
  philosophy: string;
  mission: string;
  bio: string;
  conditionsTreated: string[];
  preventiveCare: string[];
  achievements: string[];
  memberships: string[];
  certifications: string[];
  timeline: Milestone[];
  services: ServiceItem[];
  facilities: FacilityItem[];
  reviews: ReviewItem[];
  blog: BlogItem[];
  faqs: FAQItem[];
  beforeAfter: BeforeAfterItem[];
}

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: "general",
    specialtyName: "General Physician",
    clinicName: "Vance Integrative Health",
    tagline: "Empowering Your Wellness, Preserving Your Future",
    doctorName: "Dr. Alan Vance, MD",
    qualifications: "MD in Internal Medicine (Johns Hopkins University), Board Certified Physician",
    regNumber: "MC-908273-A",
    experience: "16+ Years",
    languages: ["English", "Spanish", "German"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "08:30 AM - 05:30 PM",
      saturday: "09:00 AM - 01:00 PM",
      sunday: "Closed (Emergency On-Call)",
      averageWait: "12 mins"
    },
    fee: "$75",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "4.9",
    totalReviews: "482",
    philosophy: "I believe in treating the whole person, not just the physical symptoms. Preventive health, personalized nutrition, and open listening are the core pillars of my clinical care.",
    mission: "To provide accessible, evidence-based healthcare that educates and equips individuals to live their healthiest, most vibrant lives.",
    bio: "Dr. Alan Vance is a highly respected internist with over 16 years of clinical experience. After graduating at the top of his class at Johns Hopkins, he served as Chief Resident. Dr. Vance specializes in chronic disease management, metabolic health, and proactive lifestyle counseling. He leads a dedicated clinic designed around patient comfort, modern digital charts, and zero waiting-room stress.",
    conditionsTreated: [
      "Hypertension & Cardiovascular Risks",
      "Type 2 Diabetes & Insulin Resistance",
      "Thyroid Disorders & Metabolic Health",
      "Respiratory Conditions & Seasonal Allergies",
      "Digestive Health & IBS Management",
      "Fatigue & Micronutrient Deficiencies"
    ],
    preventiveCare: [
      "Annual Executive Health Screenings",
      "Comprehensive Metabolic Panels",
      "Custom Immunization & Vaccination Schedules",
      "Evidence-based Weight Management & Diet Planning"
    ],
    achievements: [
      "Outstanding Physician of the Year (Metropolitan Health Association, 2023)",
      "Published Author of 12 peer-reviewed articles on insulin resistance and cardiovascular care",
      "Pioneered a clinic-wide Digital Patient Portal reducing diagnostic turnaround times by 40%"
    ],
    memberships: [
      "Fellow of the American College of Physicians (FACP)",
      "Active Member of the American Medical Association (AMA)",
      "Board Member, Association of Preventive Medicine"
    ],
    certifications: [
      "ABIM Board Certification in Internal Medicine",
      "Advanced Cardiovascular Life Support (ACLS)",
      "Certificate in Metabolic Medicine & Clinical Nutrition"
    ],
    timeline: [
      { year: "2010", title: "Internal Medicine Residency", description: "Completed chief residency at Johns Hopkins Hospital." },
      { year: "2014", title: "Preventive Care Initiative", description: "Launched a regional wellness clinic for metabolic disease prevention." },
      { year: "2018", title: "CareElite Clinic Foundation", description: "Opened Vance Integrative Health, introducing digital-first primary care." },
      { year: "2024", title: "Advanced Diagnostics Wing", description: "Equipped the facility with state-of-the-art non-invasive ultrasound and metabolic suites." }
    ],
    services: [
      { title: "Comprehensive Wellness Consult", desc: "A detailed physical, metabolic marker analysis, and lifestyle audit to build your custom wellness roadmap.", duration: "45 mins", fee: "$120", icon: "Activity" },
      { title: "Chronic Disease Management", desc: "Expert ongoing supervision, medication optimization, and lifestyle support for Diabetes, Hypertension, or Thyroid conditions. Dr. Vance actively works with you to naturally taper dosages where safely possible.", duration: "30 mins", fee: "$85", icon: "Heart" },
      { title: "Acute Illness Treatment", desc: "Fast-tracked diagnosis and medical relief for high-grade fever, chest infections, abdominal pain, or acute flares.", duration: "20 mins", fee: "$70", icon: "ShieldAlert" },
      { title: "Pre-Travel Medical Clearance", desc: "Destination-specific vaccinations, prophylactic prescriptions, and absolute fitness-to-travel evaluations.", duration: "15 mins", fee: "$50", icon: "Plane" },
      { title: "Executive Metabolic Profile", desc: "Advanced laboratory panel checking lipids, thyroid hormones, insulin, and key vitamins combined with an MD consultation.", duration: "40 mins", fee: "$160", icon: "LineChart" },
      { title: "Elderly Care & Geriatric Audit", desc: "Comprehensive review of polypharmacy, mobility assessment, and systemic health optimization for elderly family members.", duration: "45 mins", fee: "$95", icon: "Users" },
      { title: "Vaccination & Immunization", desc: "Providing all essential adult booster vaccines, flu shots, and seasonal immunizations in a clean, painless procedure.", duration: "10 mins", fee: "$40", icon: "Syringe" },
      { title: "Telehealth Follow-up Support", desc: "Secure video reviews of blood labs, recovery progress, or routine prescription adjustments from the comfort of your home.", duration: "15 mins", fee: "$50", icon: "Video" }
    ],
    facilities: [
      { title: "Ultra-Fast Booking", desc: "Secure slot reservation through our visual web panel within 60 seconds.", icon: "CalendarCheck" },
      { title: "Zero Paperwork Integration", desc: "Fully secure digital check-ins and cloud prescriptions delivered straight to your smartphone.", icon: "ClipboardCopy" },
      { title: "Advanced Diagnostic Suites", desc: "On-site non-invasive ultrasound, ECG, and immediate micro-lab tests.", icon: "Gauge" },
      { title: "HEPA-Filtered Clinic Design", desc: "Continuous clean airflow sterilization to keep you safe from viral infections.", icon: "Wind" },
      { title: "Premium Waiting Lounge", desc: "Complimentary organic tea, noise-canceling headsets, and reading nooks.", icon: "Coffee" },
      { title: "Disability Accessible", desc: "Ground level, automatic double-doors, and custom wheelchair ramps.", icon: "Accessibility" }
    ],
    reviews: [
      { name: "Eleanor Sterling", date: "June 14, 2026", rating: 5, review: "Dr. Vance is the first doctor who truly listened to my chronic fatigue issues. Rather than just writing a prescription, he did a deep metabolic review. Within two months, I feel like a completely new person!", photoSeed: "eleanor" },
      { name: "John David", date: "May 28, 2026", rating: 5, review: "The clinic environment is amazing, super clean, and no waiting time. I walked in at 2:00 PM for my appointment and was seen at exactly 2:01 PM. Absolute professionalism.", photoSeed: "john" },
      { name: "Sofia Ramirez", date: "May 03, 2026", rating: 5, review: "I highly recommend Vance Integrative Health. Dr. Vance explained my blood report parameters step by step, using language I could actually understand. Excellent counselor.", photoSeed: "sofia" },
      { name: "Marcus Brody", date: "April 18, 2026", rating: 5, review: "Best primary care doctor in town. Responsive portal, easy medication refills, and very thorough checkups.", photoSeed: "marcus" },
      { name: "Aria Thorne", date: "March 29, 2026", rating: 5, review: "Clean clinic, great receptionist, and Dr. Vance is incredibly kind. He helped me manage my hypertension and we've successfully reduced my pill dosage.", photoSeed: "aria" },
      { name: "David Kim", date: "March 11, 2026", rating: 5, review: "Extremely modern clinic. Everything is digital, and the appointment booking on this website worked perfectly. Dr. Vance was friendly and highly professional.", photoSeed: "david" },
      { name: "Patricia Lopez", date: "February 22, 2026", rating: 5, review: "Very gentle and reassuring approach. He treated my father's chest infection with utmost care and checked on him via follow-up chat.", photoSeed: "patricia" },
      { name: "Robert Fletcher", date: "January 15, 2026", rating: 5, review: "Incredibly knowledgeable and structured. He addresses the root cause of metabolic disorders instead of masking symptoms.", photoSeed: "robert" }
    ],
    blog: [
      { title: "Understanding Insulin Resistance: The Silent Energy Drain", category: "Metabolic Health", date: "July 02, 2026", summary: "Learn how subtle changes in blood sugar processing affect your daily focus, cravings, and weight, and how to reverse it naturally.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80" },
      { title: "The Ultimate Guide to Annual Executive Screenings", category: "Preventive Care", date: "June 25, 2026", summary: "Why standard blood checks are not enough. We break down the advanced biomarkers every individual over 35 should actively track.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" },
      { title: "Hypertension: 5 Science-Backed Non-Drug Interventions", category: "Cardio Health", date: "June 10, 2026", summary: "Explore how targeted breathing rhythms, specific magnesium formulations, and potassium-to-sodium balances lower blood pressure safely.", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=400&q=80" },
      { title: "Demystifying Gut Health: Beyond Probiotic Capsules", category: "Digestive Health", date: "May 28, 2026", summary: "A medical review of dietary fiber variety, stomach acid triggers, and stress-related vagus nerve signaling on the microbiome.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80" },
      { title: "The Science of Chronic Stress and Cortisol Reset", category: "Mental Well-being", date: "May 12, 2026", summary: "How elevated stress hormones exhaust the adrenal system, trigger systemic inflammation, and actionable steps to find cellular balance.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" },
      { title: "Optimizing Your Vitamin D3 and K2 Intake", category: "Nutritional Therapy", date: "April 29, 2026", summary: "Why calcium supplements can be hazardous without vitamins D3 and K2 directing mineral absorption directly to the skeletal matrix.", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How do I book an appointment?", a: "You can book directly using our website's booking form, choosing your preferred date and time, or by clicking the WhatsApp or Phone buttons for immediate assistance." },
      { q: "Do you accept walk-in patients?", a: "To maintain our strict policy of zero waiting-room crowd, we prioritize scheduled bookings. However, for emergencies and acute conditions, walk-ins are triage-evaluated upon arrival." },
      { q: "What should I bring for my first consultation?", a: "Please bring any recent blood panel reports (within the last 6 months), current medicine prescriptions, and a list of any known medical allergies." },
      { q: "Can I manage medication refills online?", a: "Yes, registered patients can request prescription renewals directly via the digital clinic WhatsApp portal, or through a quick follow-up telehealth call." },
      { q: "Is there nearby parking available?", a: "Yes, there is free visitor parking directly in front of the clinic entrance, with full ramp access for wheelchair-bound patients." },
      { q: "Which payment methods are accepted?", a: "We accept all credit/debit cards, Apple Pay, Google Pay, tap-to-pay, and secure digital banking transfers." },
      { q: "Do you offer home visits or emergency calls?", a: "Dr. Vance is on-call for existing critical care patients, and emergency phone consults are routed through our dedicated crisis line on weekends." },
      { q: "How long is the average consultation?", a: "New patient diagnostic consultations last between 30 to 45 minutes to ensure Dr. Vance has ample time to review your full clinical background." }
    ],
    beforeAfter: [
      {
        title: "Metabolic Health Progress Tracker",
        beforeLabel: "Month 0 (Pre-Treatment)",
        afterLabel: "Month 3 (Active Wellness)",
        beforeImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        afterImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        desc: "Interactive lifestyle interventions showing a 1.2% drop in HbA1c (blood glucose levels) combined with improved muscular endurance and restful sleep cycles."
      }
    ]
  },
  {
    id: "dental",
    specialtyName: "Dentist",
    clinicName: "Jenkins Dental Artistry",
    tagline: "Where Science Meets Art to Sculpt Your Perfect Smile",
    doctorName: "Dr. Sarah Jenkins, DDS",
    qualifications: "Doctor of Dental Surgery (Columbia University), Fellow of the Academy of General Dentistry",
    regNumber: "DE-382910-K",
    experience: "12+ Years",
    languages: ["English", "French"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "09:00 AM - 06:00 PM",
      saturday: "09:00 AM - 03:00 PM",
      sunday: "Closed",
      averageWait: "8 mins"
    },
    fee: "$90",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "4.9",
    totalReviews: "612",
    philosophy: "Every smile is a canvas. I utilize micro-invasive technology and ultra-precise materials to restore and maintain your natural dental structure painlessly.",
    mission: "To eliminate dental fear by offering a warm, luxurious dental environment equipped with laser technologies and conscious sedation options.",
    bio: "Dr. Sarah Jenkins is a pioneer in digital smile design and micro-dentistry. She completed her clinical residency in cosmetic dentistry at Columbia University and is dedicated to preserving natural tooth structure. She utilizes microscopic diagnostics and dental lasers to provide a pain-free, comfortable patient journey.",
    conditionsTreated: [
      "Dental Caries & Deep Cavities",
      "Misaligned Teeth & Malocclusions",
      "Periodontal Gum Inflammation",
      "Impacted Wisdom Teeth Pain",
      "Severe Tooth Stains & Discoloration",
      "Teeth Grinding (Bruxism) & TMJ Pain"
    ],
    preventiveCare: [
      "Guided Biofilm Therapy (Ultrasonic Cleaning)",
      "Proactive Fluoride Remineralization",
      "Oral Cancer Screenings with Velscope",
      "Night Guards for Dental Occlusion Protection"
    ],
    achievements: [
      "Top Cosmetic Dentist Award (National Dental Board, 2024)",
      "Featured clinician on Advanced Smile Makeovers webinar series",
      "Successfully delivered 2,000+ custom ceramic veneers with 100% aesthetic match"
    ],
    memberships: [
      "American Academy of Cosmetic Dentistry (AACD)",
      "American Dental Association (ADA)",
      "Academy of General Dentistry (AGD)"
    ],
    certifications: [
      "Conscious Sedation and Nitrous Oxide Safety",
      "Digital Smile Design Master Class Certified",
      "Advanced Laser Dentistry Fellowship"
    ],
    timeline: [
      { year: "2014", title: "DDS Degree at Columbia", description: "Graduated with highest honors in Clinical Operative Dentistry." },
      { year: "2017", title: "Micro-Dentistry Center", description: "Established regional specialized root canal laser suite." },
      { year: "2020", title: "Jenkins Dental Launch", description: "Inaugurated a boutique dental spa focused on stress-free cosmetic dental designs." },
      { year: "2025", title: "AI Guided Restorations", description: "Integrated 3D intraoral scanner and automated ceramic crown mill." }
    ],
    services: [
      { title: "Premium Laser Teeth Whitening", desc: "Advanced laser whitening removing years of deep coffee, wine, and age stains safely and without post-op sensitivity.", duration: "45 mins", fee: "$250", icon: "Sparkles" },
      { title: "Invisalign® Clear Aligners", desc: "Virtually invisible orthodontic therapy using high-accuracy 3D visual setups to straighten teeth comfortably.", duration: "30 mins", fee: "$150", icon: "Grid" },
      { title: "Pain-Free Root Canal (Endodontics)", desc: "Microscope-assisted, laser-sterilized therapy designed to save your natural tooth in a single, relaxed session.", duration: "60 mins", fee: "$380", icon: "Flame" },
      { title: "Digital Smile Designing & Veneers", desc: "Crafting beautiful, natural-looking porcelain veneers customized to your facial features and skin tone.", duration: "60 mins", fee: "$450", icon: "Image" },
      { title: "Advanced Guided Biofilm Cleaning", desc: "State-of-the-art warm water ultrasonic therapy targeting bacteria plaque comfortably without scrapers.", duration: "30 mins", fee: "$110", icon: "Droplet" },
      { title: "Metal-Free Zirconia Crowns", desc: "Indestructible, biologically compatible tooth-colored crowns milled precisely to restore structurally damaged teeth.", duration: "45 mins", fee: "$400", icon: "Crown" },
      { title: "Pediatric Gentle Dental Intro", desc: "A soft, non-intimidating introduction to oral care for children with colorful visuals and mini-gifts.", duration: "20 mins", fee: "$80", icon: "Smile" },
      { title: "Emergency Pain Relief Consultation", desc: "Immediate diagnostic X-rays and same-day dental intervention for toothaches, chipped teeth, or abscesses.", duration: "30 mins", fee: "$95", icon: "Heart" }
    ],
    facilities: [
      { title: "Intraoral 3D Camera Scans", desc: "Skip the messy choking putty molds with ultra-high accuracy optical laser scans.", icon: "Camera" },
      { title: "Noise-Canceling Dental VR", desc: "Stream your favorite Netflix show via premium VR glasses while we work on your smile.", icon: "Tv" },
      { title: "Painless Dental Lasers", desc: "Precise gum therapy and cavity prep without noisy drills and painful vibrating shots.", icon: "Zap" },
      { title: "Ultra-Low Radiation X-Rays", desc: "High definition digital X-rays reducing radiation exposure by up to 90%.", icon: "Shield" },
      { title: "Aromatherapy Clinical Spa", desc: "Diffused lavender oils and calm instrumental tracks to dissolve dental anxieties.", icon: "CheckCircle" },
      { title: "Autoclave Sterilization Class B", desc: "Hospital-grade, triple-vacuum pressure steam sterilization for absolute safety.", icon: "Cpu" }
    ],
    reviews: [
      { name: "Samantha Cole", date: "June 29, 2026", rating: 5, review: "I had a terrible fear of dentists from childhood. Dr. Jenkins and her team treated me like royalty. The VR glasses completely distracted me, and the shot was totally painless!", photoSeed: "samantha" },
      { name: "George Vance", date: "June 11, 2026", rating: 5, review: "Fantastic dental clinic. My dental crown was completed using 3D scanning, fits perfectly, and looks identical to my real teeth. Worth every penny.", photoSeed: "george" },
      { name: "Lily Chang", date: "May 25, 2026", rating: 5, review: "Highly recommended for teeth whitening. No pain or sensitivity afterward, and my teeth are three shades brighter. Dr. Jenkins is incredibly detailed.", photoSeed: "lily" },
      { name: "Richard Stark", date: "May 09, 2026", rating: 5, review: "Clean clinic, great staff, and modern tools. The Guided Biofilm cleaning was actually warm and comfortable. No scraping!", photoSeed: "richard" },
      { name: "Emily Watson", date: "April 20, 2026", rating: 5, review: "Absolutely brilliant clinic. Dr. Sarah designed my front veneers and they look completely natural. I cannot stop smiling!", photoSeed: "emily" },
      { name: "Oliver Queen", date: "April 02, 2026", rating: 5, review: "Amazing service. Extremely precise work. Dr. Jenkins takes her time to explain the procedure and makes you feel very safe.", photoSeed: "oliver" },
      { name: "Jessica Drew", date: "March 15, 2026", rating: 5, review: "I took my 5-year-old child here. The pediatric intro was wonderful. He actually had fun and was not scared at all.", photoSeed: "jessica" },
      { name: "Arthur Dent", date: "February 24, 2026", rating: 5, review: "Fast root canal, done in under an hour. Zero discomfort during or after the procedure. Highly technical doctor.", photoSeed: "arthur" }
    ],
    blog: [
      { title: "The Painless Root Canal: Myth vs. Modern Laser Reality", category: "Dental Tech", date: "June 28, 2026", summary: "How computerized motors and laser sterilizations have transformed the most feared dental procedure into a comfortable therapy.", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=400&q=80" },
      { title: "Why Traditional Putty Impressions are History", category: "Cosmetic Dentistry", date: "June 15, 2026", summary: "Explore how 3D intraoral laser scanning captures 100,000 data points per second to create dental restorations that fit flawlessly.", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=400&q=80" },
      { title: "Gum Disease: The Hidden Heart Disease Connection", category: "Oral Systemic Link", date: "May 30, 2026", summary: "Scientific evidence reveals how chronic gum bacteria enter the bloodstream, triggering arterial inflammation and plaque buildup.", image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=400&q=80" },
      { title: "Invisalign vs. Traditional Braces: A Doctor's Honest Review", category: "Orthodontics", date: "May 14, 2026", summary: "Compare structural movement speed, physical comfort, food restrictions, and long-term compliance of clear dental aligners.", image: "https://images.unsplash.com/photo-1513412583855-8d64eb419476?auto=format&fit=crop&w=400&q=80" },
      { title: "What Triggers Sudden Tooth Sensitivity and How to Stop It", category: "Dental Care Tips", date: "April 25, 2026", summary: "From micro-cracks and acidic diets to gum recession, learn why cold drinks pinch your nerves and the best clinical remedies.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80" },
      { title: "Designing Your Dream Smile: The Veneers Process Explained", category: "Smile Design", date: "April 08, 2026", summary: "Step-by-step review of facial ratio mockups, conservative tooth prep, material selection, and bonding procedures.", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How do I book a dental appointment?", a: "Simply fill out our quick online appointment booking form, select your desired service (e.g. cleaning, consultation, veneers), choose your date, and submit. We will verify and lock your slot!" },
      { q: "Is teeth whitening safe for enamel?", a: "Yes, our clinic uses FDA-approved, medical-grade gel activated by cold laser light, which gently dissolves deep stains without etching or harming your protective enamel layer." },
      { q: "What should I do in case of a knocked-out tooth?", a: "Handle the tooth only by its crown, rinse gently under clean water without scrubbing, place it in a glass of cold milk or back in the socket, and call our emergency line immediately. Fast intervention is critical to saving the tooth." },
      { q: "How often should I get dental cleanings?", a: "We recommend a professional Guided Biofilm cleaning and oral screening every 6 months to prevent hard tartar buildup and check for early signs of gum inflammation." },
      { q: "Does the Invisalign clear aligner system hurt?", a: "You will feel a mild pressure for the first 2-3 days of wearing a new tray, which indicates your teeth are actively moving. This is far gentler and more comfortable than wire adjustments." },
      { q: "Are metal-free restorations durable?", a: "Absolutely! We use high-grade Zirconia and E.Max ceramics which are significantly tougher than traditional metal-backed crowns, look highly realistic, and do not create dark metal lines near your gums." },
      { q: "Do you offer sleep dentistry for anxious patients?", a: "Yes, we provide conscious sedation options, including calming nitrous oxide (laughing gas) and pediatric-safe relaxing environments so you can receive treatments entirely anxiety-free." },
      { q: "What is your dental consulting fee?", a: "The diagnostic consultation, which includes high-resolution digital intraoral imaging and a customized treatment map, is a demo fee of $90." }
    ],
    beforeAfter: [
      {
        title: "Chipped Tooth Restoration",
        beforeLabel: "Before Treatment",
        afterLabel: "After Bonding",
        beforeImage: "https://picsum.photos/seed/chipped/400/300",
        afterImage: "https://picsum.photos/seed/bonded/400/300",
        desc: "Precision cosmetic composite bonding showing instant restoration of a fractured front incisor, perfectly matching natural translucency."
      },
      {
        title: "Stain Removal & Whitening",
        beforeLabel: "Deep Stains",
        afterLabel: "Laser Restored",
        beforeImage: "https://picsum.photos/seed/stained/400/300",
        afterImage: "https://picsum.photos/seed/whitened/400/300",
        desc: "Laser-activated cold light teeth whitening therapy removing complex extrinsic coffee and tobacco discoloration."
      }
    ]
  },
  {
    id: "pediatric",
    specialtyName: "Pediatrician",
    clinicName: "Little Sprouts Child Clinic",
    tagline: "Nurturing Healthy Growth with Soft Hands & Caring Hearts",
    doctorName: "Dr. Marcus Todd, MD",
    qualifications: "MD in Pediatrics (Harvard Medical School), Board Certified Pediatrician",
    regNumber: "PE-872911-B",
    experience: "14+ Years",
    languages: ["English", "Spanish"],
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1502740479796-61198222914d?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "09:00 AM - 05:00 PM",
      saturday: "10:00 AM - 02:00 PM",
      sunday: "Closed",
      averageWait: "10 mins"
    },
    fee: "$80",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "4.9",
    totalReviews: "542",
    philosophy: "Children are not just miniature adults. They require a distinct psychological approach, a playful and warm atmosphere, and gentle physical handling to build lifetime trust in medicine.",
    mission: "To deliver expert, compassionate child healthcare that partners with parents to safeguard their child's developmental, nutritional, and emotional growth.",
    bio: "Dr. Marcus Todd is a renowned pediatrician specializing in infant development, clinical nutrition, and preventive pediatric medicine. A graduate of Harvard Medical School, Dr. Marcus completed his residency at Boston Children's Hospital. He is famous for his gentle, warm demeanor and his interactive pediatric clinic designed like a colorful play center.",
    conditionsTreated: [
      "Frequent Seasonal Cough & Bronchiolitis",
      "Infant Colic, Reflux & Dietary Allergies",
      "Childhood Asthma & Allergic Rhinitis",
      "Developmental Milestones & Speech Delay",
      "Eczema & Childhood Skin Rashes",
      "Pediatric Infections & Unexplained Fevers"
    ],
    preventiveCare: [
      "Comprehensive Immunization & Vaccines",
      "Developmental & Cognitive Progress Reviews",
      "Newborn Care & Lactation Support",
      "Childhood Obesity & Nutritional Audit"
    ],
    achievements: [
      "Pediatrician of Choice Award (Parenting Circle Foundation, 2025)",
      "Co-created 'Healthy Sprouts' school immunization safety standards",
      "Pioneered a child-safe 'Comfort Triage' system resulting in zero medical-appointment tears"
    ],
    memberships: [
      "Fellow of the American Academy of Pediatrics (FAAP)",
      "Active Member, Pediatric Society for Clinical Nutrition",
      "Advisory Panelist, Child Growth & Safety League"
    ],
    certifications: [
      "Board Certified by the American Board of Pediatrics",
      "Pediatric Advanced Life Support (PALS)",
      "Certified Lactation Counselor (CLC)"
    ],
    timeline: [
      { year: "2012", title: "Harvard Residency", description: "Completed Chief Residency in Pediatric Medicine." },
      { year: "2016", title: "Child Health Initiative", description: "Launched regional nutritional guidelines program." },
      { year: "2019", title: "Little Sprouts Inauguration", description: "Built a fully child-friendly, interactive primary care center." },
      { year: "2024", title: "Smart Allergy Suite", description: "Implemented non-invasive skin prick micro-allergy assays." }
    ],
    services: [
      { title: "Comprehensive Growth & Milestone Audit", desc: "Evaluating fine motor skills, cognitive reflexes, linguistic markers, and physical growth curves tailored to WHO guidelines.", duration: "35 mins", fee: "$100", icon: "TrendingUp" },
      { title: "Gentle Childhood Immunization", desc: "Administering standard pediatric shots using specialized visual distractions and cooling skin patches to ensure pain-free vaccinations.", duration: "15 mins", fee: "$45", icon: "Shield" },
      { title: "Pediatric Asthma & Allergy Management", desc: "Expert non-invasive lung screening and custom medication schedules to keep active children running freely.", duration: "30 mins", fee: "$85", icon: "Wind" },
      { title: "Newborn Lactation & Feeding Consult", desc: "Hands-on mother-baby assistance for latching, nursing cycles, weight tracking, and gentle burping techniques.", duration: "40 mins", fee: "$90", icon: "Award" },
      { title: "Acute Childhood Fever & Infection Care", desc: "Rapid diagnostics and child-appropriate relief for high fever, stomach bugs, ear infections, or throat pain.", duration: "25 mins", fee: "$75", icon: "Activity" },
      { title: "Child Behavioral & ADHD Screening", desc: "Objective, compassionate analysis of focus metrics, sensory sensitivities, and developmental milestones in partnership with parents.", duration: "45 mins", fee: "$120", icon: "Brain" },
      { title: "Infant Colic & Gastrointestinal Review", desc: "Gentle abdominal palpation and diet assessments to resolve bloating, severe reflux, or food intolerances.", duration: "30 mins", fee: "$80", icon: "Frown" },
      { title: "School/Sports Fitness Clearance", desc: "Thorough musculoskeletal and cardiovascular audit ensuring your child is fully safe to participate in physical activities.", duration: "20 mins", fee: "$50", icon: "Sparkles" }
    ],
    facilities: [
      { title: "Colorful Play Waiting Area", desc: "Brimming with safe wooden toys, colorful books, and magnetic drawing boards.", icon: "Smile" },
      { title: "Child-Height Examination Tables", desc: "Shaped like friendly teddy bears and safari trucks to remove clinical fear.", icon: "Sparkles" },
      { title: "Pain-Distraction Tech", desc: "Innovative cold-generating Buzzy® bees and micro-capsule needles.", icon: "Zap" },
      { title: "Feeding & Nursing Sanctuary", desc: "A quiet, soundproof, dimly lit space with luxury nursing recliners.", icon: "Heart" },
      { title: "In-Clinic Pharmacy & Booster Stock", desc: "Full inventory of child-friendly fruit-flavored liquid therapeutics.", icon: "ShieldCheck" },
      { title: "Sanitized Play Zones", desc: "Continuous UV-C safety air scrubbers and toy sanitization cycles.", icon: "CheckCircle" }
    ],
    reviews: [
      { name: "Jessica Harrison", date: "June 25, 2026", rating: 5, review: "Dr. Marcus is absolute magic! My 3-year-old usually screams at the sight of a white coat, but Dr. Marcus played a quick puppet game and gave her a gentle vaccine without a single tear.", photoSeed: "jessica_h" },
      { name: "Robert Cooper", date: "May 30, 2026", rating: 5, review: "The play area is fantastic, clean, and safe. Dr. Todd helped us map our son's growth and helped resolve his severe chronic reflux issues. Invaluable doctor.", photoSeed: "robert_c" },
      { name: "Maria Gonzales", date: "May 12, 2026", rating: 5, review: "Incredibly patient doctor. He took 40 minutes to answer all my newborn care questions and gave us highly reassuring, practical tips.", photoSeed: "maria" },
      { name: "Daniel Craig", date: "April 29, 2026", rating: 5, review: "Super professional. Excellent scheduling. We walked straight into the teddy-bear room. No germs, no crowd. Perfect child clinic.", photoSeed: "daniel" },
      { name: "Isla Mercer", date: "March 18, 2026", rating: 5, review: "Our pediatric consultant for the last 4 years. Dr. Marcus is always reachable on WhatsApp in emergencies. This is priceless for parents.", photoSeed: "isla" },
      { name: "Thomas Sterling", date: "March 02, 2026", rating: 5, review: "Expert clinician. Successfully managed our daughter's asthma. Highly modern and cheerful atmosphere.", photoSeed: "thomas" },
      { name: "Chloe Bennett", date: "February 14, 2026", rating: 5, review: "He treats children with such extreme respect and sweetness. My kids actually look forward to visiting Little Sprouts!", photoSeed: "chloe" },
      { name: "Liam Vance", date: "January 08, 2026", rating: 5, review: "Clean clinic, highly organized, and Dr. Marcus is extremely knowledgeable on modern nutritional guidelines.", photoSeed: "liam" }
    ],
    blog: [
      { title: "Demystifying Newborn Colic: Causes, Triggers & Comfort Tips", category: "Infant Care", date: "July 01, 2026", summary: "A step-by-step clinical guide to soothing gas pain, reading feeding cues, and managing infant dietary sensitivities.", image: "https://images.unsplash.com/photo-1519689680058-324335c77ebf?auto=format&fit=crop&w=400&q=80" },
      { title: "The Modern Pediatric Vaccination Schedule Explained", category: "Immunization", date: "June 14, 2026", summary: "Why booster timing matters. We answer parent questions about immune development, vaccine spacing, and side-effect comfort.", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80" },
      { title: "Cognitive Developmental Milestones: Years 1 to 3", category: "Growth & Dev", date: "June 03, 2026", summary: "How to identify fine motor progress, speech indicators, and cognitive milestones, and simple home games to foster growth.", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" },
      { title: "Managing Childhood Asthma and Reactive Airway Flareups", category: "Respiratory Health", date: "May 20, 2026", summary: "Understanding seasonal pollen triggers, dust mites, dry cold air, and the correct pediatric usage of spacer chambers.", image: "https://images.unsplash.com/photo-1471286174243-e8a18fea110e?auto=format&fit=crop&w=400&q=80" },
      { title: "Screen Time & Pediatric Brain Development: Finding Balance", category: "Behavioral Health", date: "May 08, 2026", summary: "Clinical studies map the impact of blue light and rapid animations on toddler attention spans, and smart digital boundaries.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
      { title: "A Pediatrician's Guide to Solving Picky Eating Patterns", category: "Nutrition & Diet", date: "April 22, 2026", summary: "How sensory sensitivity, independence battles, and portion size expectations affect childhood eating behaviors and practical fixes.", image: "https://images.unsplash.com/photo-1511688868353-3a366627853d?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How can I book a pediatric slot?", a: "Parents can book directly online using our responsive form, select their child's service, and choose a preferred slot. We will confirm with you instantly." },
      { q: "How do you make vaccination painless for children?", a: "We use a combination of local cooling vapor sprays, Buzzy® mechanical vibrating vibration bees to block pain signals, pediatric sweet oral drops, and engaging toy puppets to distract." },
      { q: "Can we contact Dr. Marcus in an emergency?", a: "Yes, registered parents have access to our direct 24/7 emergency WhatsApp routing for urgent pediatric queries or sudden high-grade fevers." },
      { q: "Do you separate sick children from well children?", a: "Absolutely. Our clinic layout is physically separated into a 'Well Child & Vaccination Zone' and a 'Sick Treatment Zone' with separate sanitized play pods to prevent cross-contamination." },
      { q: "What should I bring for my baby's first newborn check?", a: "Please bring the hospital discharge summary packet, birth records, feed/sleep tracking logs, and a soft blanket." },
      { q: "Do you accept card and digital wallet payments?", a: "Yes, we accept all debit/credit cards, tap payments, Google Pay, Apple Pay, and digital banking receipts." },
      { q: "How long is the average childhood consultation?", a: "Consultations are budgeted at 30 minutes so Dr. Marcus can talk directly with the child, check growth metrics, and thoroughly answer all parenting concerns without rush." },
      { q: "Is there stroller and wheelchair access?", a: "Yes, we have full ground-floor entry, extra-wide automated doors, and stroller parking zones inside the reception lobby." }
    ],
    beforeAfter: [
      {
        title: "Infant Developmental Progress Tracker",
        beforeLabel: "Week 1 (Newborn)",
        afterLabel: "Week 12 (Responsive Core)",
        beforeImage: "https://picsum.photos/seed/baby1/400/300",
        afterImage: "https://picsum.photos/seed/baby2/400/300",
        desc: "Interactive clinical growth curves charting height-weight percentile gains, visual head-tracking metrics, and early smiling reflexes."
      }
    ]
  },
  {
    id: "dermatology",
    specialtyName: "Skin Specialist",
    clinicName: "Dupont Dermatological & Aesthetic Center",
    tagline: "Unveiling Radiant Health & Timeless Skin Confidence",
    doctorName: "Dr. Clara Dupont, MD, FAAD",
    qualifications: "MD in Dermatology (Stanford University), Board Certified Dermatologist & Aesthetic Specialist",
    regNumber: "DE-492011-C",
    experience: "13+ Years",
    languages: ["English", "Spanish", "French"],
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "09:30 AM - 06:30 PM",
      saturday: "10:00 AM - 04:00 PM",
      sunday: "Closed",
      averageWait: "10 mins"
    },
    fee: "$95",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "4.9",
    totalReviews: "598",
    philosophy: "Your skin is an elegant reflection of your internal systemic biology. I merge medical dermatology with aesthetic science to restore clinical cellular health and custom cosmetic vibrancy.",
    mission: "To deliver elite-level dermatological care utilizing advanced laser technology and scientifically backed clinical formulas to build lifelong skin health.",
    bio: "Dr. Clara Dupont is a highly recognized dermatologist specializing in medical acne therapies, laser resurfacing, and natural facial aesthetics. A graduate of Stanford Medical School, Dr. Dupont holds multiple patents in skin barrier repair formulation. Her practice blends hospital-grade clinical precision with a serene, luxury medical spa ambiance.",
    conditionsTreated: [
      "Severe Cystic Acne & Conglobata",
      "Stubborn Acne Scarring & Pigmentation",
      "Psoriasis & Chronic Plaque Flares",
      "Atopic Dermatitis & Eczema",
      "Atypical Moles & Skin Lesions",
      "Melasma & Solar Pigmented Patches"
    ],
    preventiveCare: [
      "Full-Body Mole Mapping & Melanoma Screenings",
      "Skin Barrier Strength & Sebum Profiling",
      "Custom Active Skincare Routine Formulation",
      "Environmental & Pollutant Defense Audits"
    ],
    achievements: [
      "Aesthetic Dermatologist of the Year (Global Skin Guild, 2024)",
      "Pioneered the 'Triple-Wave' scar revision protocol reducing deep scars by up to 80%",
      "Developer of the patented CareElite Skin Barrier Repair botanical compound"
    ],
    memberships: [
      "Fellow of the American Academy of Dermatology (FAAD)",
      "American Society for Dermatologic Surgery (ASDS)",
      "Society for Pediatric Dermatology"
    ],
    certifications: [
      "Board Certified by the American Board of Dermatology",
      "Advanced Laser Aesthetics & Micro-Current Laser License",
      "Advanced Cosmetic Injectable & Sculptra Fellowship"
    ],
    timeline: [
      { year: "2013", title: "Dermatology at Stanford", description: "Completed chief residency in dermatology and skin physiology." },
      { year: "2016", title: "Laser Research Fellowship", description: "Specialized in picosecond and fractional carbon dioxide laser technologies." },
      { year: "2020", title: "Dupont Skin Center", description: "Opened an elite medical dermatology and state-of-the-art clinical laser center." },
      { year: "2025", title: "Digital Mole-Mapping Wing", description: "Integrated AI-assisted dermatoscopic mapping to track dynamic mole changes." }
    ],
    services: [
      { title: "Advanced Acne Laser Clearance", desc: "Targeting sebaceous hyper-activity and bacterial acne colonies painlessly with targeted light-wave therapies.", duration: "30 mins", fee: "$180", icon: "Sparkles" },
      { title: "Fractional CO2 Laser Resurfacing", desc: "Gold-standard collagen induction to drastically minimize deep acne craters, fine wrinkles, and solar pigmentation.", duration: "45 mins", fee: "$290", icon: "Zap" },
      { title: "Full-Body Medical Skin Check", desc: "Detailed micro-dermatoscopic mapping of all moles, suspicious freckles, and lesions to actively prevent skin cancer.", duration: "30 mins", fee: "$110", icon: "Shield" },
      { title: "Custom Acne Scar Revision", desc: "A tailored combo of subcision, micro-needling RF, and epidermal lasers to restore a smooth skin surface.", duration: "50 mins", fee: "$220", icon: "Grid" },
      { title: "Medical-Grade Hydrafacial & Peels", desc: "Deep clinical pore extraction and custom alpha-hydroxy acid infusions to resurface dull, congested, or dry skin.", duration: "45 mins", fee: "$130", icon: "Droplet" },
      { title: "Natural Liquid Lift (Injectables)", desc: "Conservative, highly elegant cheek/jaw restoration and wrinkle smoothing to make you look rested and naturally vibrant.", duration: "40 mins", fee: "$350", icon: "Layers" },
      { title: "Chronic Eczema & Psoriasis Audit", desc: "Analyzing gut triggers, immunological markers, and custom topical protocols to find immediate relief from itchy flares.", duration: "30 mins", fee: "$95", icon: "Activity" },
      { title: "Hair Thinning & Scalp Treatment", desc: "Clinical micro-channeling nutrient therapies and medical growth stimulants to reverse follicular miniaturization.", duration: "45 mins", fee: "$160", icon: "TrendingUp" }
    ],
    facilities: [
      { title: "High-Definition Dermatoscopy", desc: "Optical micro-magnification of skin layers to identify cellular patterns before they reach the surface.", icon: "Eye" },
      { title: "FDA-Approved Laser Suite", desc: "Housing state-of-the-art dual-wavelength laser arrays safe for all skin types.", icon: "Zap" },
      { title: "Zero-Bacteria Treatment Rooms", desc: "Equipped with specialized hospital-grade medical clean air positive pressure flow.", icon: "ShieldAlert" },
      { title: "Skincare Formulation Bar", desc: "Where we mix custom clinical moisturizers and serums tailored to your skin's exact sebum profile.", icon: "Droplet" },
      { title: "Calming Recovery Lounge", desc: "Soothing cold rosewater mist, cooling cooling jade rollers, and cellular light therapy masks post-procedure.", icon: "Smile" },
      { title: "Fully ADA-Accessible Entrance", desc: "Wide doorways, wheelchair-friendly medical exam chairs, and flat level entry.", icon: "Accessibility" }
    ],
    reviews: [
      { name: "Victoria Thorne", date: "June 22, 2026", rating: 5, review: "Dr. Dupont is a goddess of skin! After years of trying expensive cosmetic creams, her custom acne protocol cleared my face in 6 weeks. The laser treatments are painless and work wonders.", photoSeed: "victoria" },
      { name: "Michael Chang", date: "June 10, 2026", rating: 5, review: "Highly professional skin mapping session. She found an atypical mole that was removed safely. She literally saved me from potential melanoma. Thank you so much!", photoSeed: "michael" },
      { name: "Elena Rostova", date: "May 29, 2026", rating: 5, review: "Beautiful clinic, great staff, and Dr. Clara is incredibly knowledgeable. She designed a simple, active skincare routine that saved my dry, red skin barrier.", photoSeed: "elena" },
      { name: "Chris Evans", date: "May 14, 2026", rating: 5, review: "I had deep acne scarring on my cheeks. The combination of subcision and fractional laser done by Dr. Clara has restored my skin smoothness by 80%. Exceptional skill.", photoSeed: "chris" },
      { name: "Ava Montgomery", date: "April 22, 2026", rating: 5, review: "Amazing medical Hydrafacial! Extremely clean facilities, wonderful relaxing recovery room. Highly recommended clinic.", photoSeed: "ava" },
      { name: "Julian Alcaraz", date: "April 05, 2026", rating: 5, review: "Very gentle clinic. Friendly reception. Dr. Dupont took the time to answer all questions about my scalp eczema.", photoSeed: "julian" },
      { name: "Sophia Martinez", date: "March 18, 2026", rating: 5, review: "The cosmetic injectables look incredibly natural! No stiff face, just look fresh and 5 years younger. She is a true artist.", photoSeed: "sophia_m" },
      { name: "Liam O'Connor", date: "February 25, 2026", rating: 5, review: "Clean clinic, digital charts, seamless booking, and high technology equipment. Best skin doctor in the region.", photoSeed: "liam_oc" }
    ],
    blog: [
      { title: "Acne Scars: Subcision vs. CO2 Laser Resurfacing", category: "Skin Science", date: "July 01, 2026", summary: "An expert clinical guide outlining which treatment is actually effective for icepick, boxcar, and rolling scars.", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80" },
      { title: "The Science of Skin Barrier Repair: Key Active Ingredients", category: "Skincare Science", date: "June 20, 2026", summary: "How ceramides, cholesterol, fatty acids, and niacinamide lock hydration into your lipid bilayer and prevent chronic irritation.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80" },
      { title: "Mole Mapping: Why Digital Skin Surveillance Saves Lives", category: "Preventive Care", date: "June 08, 2026", summary: "Understand the ABCDEs of melanoma and how high definition optical tracking identifies tiny cellular changes early.", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80" },
      { title: "Melasma & Pigmentation: The Hormonal and UV Dual Trigger", category: "Pigment Disorders", date: "May 25, 2026", summary: "Why heat and hormonal spikes trigger dark facial patches and the most advanced botanical and medical peeling interventions.", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80" },
      { title: "Adult Acne: Why Teen Treatments are Destroying Your Skin", category: "Skin Care Tips", date: "May 11, 2026", summary: "Why aggressive benzoyl peroxides strip aging skin and how micro-dosage retinols restore clear pores without extreme dryness.", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80" },
      { title: "The Truth About Liquid Lifts & Natural Facial Balancing", category: "Cosmetic Art", date: "April 29, 2026", summary: "How skeletal support and soft-tissue filler layering restore a rested, youthful appearance without creating puffiness.", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How can I book a dermatology consultation?", a: "Simply use our elegant online booking form, choose either Medical Dermatology or Aesthetic Skin, select your slot, and secure your time instantly." },
      { q: "Are laser skin procedures painful?", a: "Most patients describe laser treatments as a quick rubber-band pinch. We apply premium, medical-grade topical anesthetic cream for 30 minutes beforehand to ensure utmost comfort." },
      { q: "What should I expect after a Fractional CO2 Laser session?", a: "You will experience mild redness and swelling resembling a sunburn for 3-5 days. We provide a post-procedure barrier cream kit and detailed guidelines for optimal healing." },
      { q: "What is your clinic's medical registration number?", a: "Our clinic operates under Board Certified Registration No. DE-492011-C, meeting all safety, sterilization, and medical guidelines." },
      { q: "Do you perform cosmetic treatments on active acne?", a: "For active cystic acne, we first focus on calming inflammation using salicylic peels, oral therapeutics, or blue-light lasers before doing deep scar resurfacings." },
      { q: "Which payment options are accepted?", a: "We accept all credit/debit cards, Google Pay, Apple Pay, tap payments, and certified digital bank transfers." },
      { q: "How long is a detailed full-body mole screening?", a: "The screening lasts approximately 30 minutes, during which Dr. Dupont checks every mole with a high-definition dermatofinder and maps anomalies." },
      { q: "Is parking available at the clinic?", a: "Yes, we provide complimentary visitor parking spaces directly adjacent to our building lobby, fully accessible with elevator links." }
    ],
    beforeAfter: [
      {
        title: "Acne Scar Resurfacing",
        beforeLabel: "Deep Rolling Scars",
        afterLabel: "Post 3 Laser Cycles",
        beforeImage: "https://picsum.photos/seed/scarred/400/300",
        afterImage: "https://picsum.photos/seed/resurfaced/400/300",
        desc: "Significant smoothing of deep cheek acne scarring utilizing fractional CO2 laser coupled with micro-needling radiofrequency."
      },
      {
        title: "Pigmentation & Sun Damage",
        beforeLabel: "Extensive Melasma",
        afterLabel: "After Active Peels",
        beforeImage: "https://picsum.photos/seed/melasma/400/300",
        afterImage: "https://picsum.photos/seed/clear_skin/400/300",
        desc: "Elimination of stubborn dermal melasma and solar spots using custom TCA peels and home barrier restoration creams."
      }
    ]
  },
  {
    id: "orthopedic",
    specialtyName: "Orthopedic Specialist",
    clinicName: "Sterling Bone & Joint Center",
    tagline: "Restoring Pain-Free Mobility, Reclaiming Active Lives",
    doctorName: "Dr. Liam Sterling, MS",
    qualifications: "MS in Orthopedic Surgery (Oxford University), Fellowship in Joint Reconstruction (Mayo Clinic)",
    regNumber: "OR-192831-D",
    experience: "15+ Years",
    languages: ["English", "Spanish"],
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "09:00 AM - 05:30 PM",
      saturday: "09:00 AM - 01:00 PM",
      sunday: "Closed",
      averageWait: "15 mins"
    },
    fee: "$100",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "4.9",
    totalReviews: "495",
    philosophy: "Surgery is always the absolute last resort. I focus on structural bio-mechanics, minimally invasive joint preservation, and advanced regenerative therapies to restore your painless movement.",
    mission: "To deliver world-class joint, bone, and spine healthcare utilizing modern arthroscopic technology and comprehensive muscular rehabilitation pathways.",
    bio: "Dr. Liam Sterling is a leading orthopedic surgeon with 15+ years of experience in joint reconstruction and sports medicine. Educated at Oxford University and specialized at the Mayo Clinic, Dr. Sterling has treated national athletes and senior citizens alike. His clinic is equipped with advanced portable ultrasound for bedside diagnostics and state-of-the-art non-surgical joint recovery suites.",
    conditionsTreated: [
      "Osteoarthritis & Severe Joint Wear",
      "ACL, Meniscus & Ligamentous Tears",
      "Chronic Lumbar Disc Bulges & Sciatica",
      "Rotator Cuff Injury & Frozen Shoulder",
      "Osteoporosis & Bone Density Loss",
      "Carpal Tunnel & Repetitive Strain Injuries"
    ],
    preventiveCare: [
      "Skeletal Bio-Mechanical Alignment Evaluation",
      "Bone Mineral Density & Dexa Panel Audit",
      "Sports Injury Prevention & Muscle Balancing",
      "Anti-inflammatory Joint Nutritional Protocols"
    ],
    achievements: [
      "Surgical Excellence Award (International Joint Congress, 2024)",
      "Pioneered a non-surgical 'Joint-Sustain' therapeutic regimen saving 300+ patients from knee surgery",
      "Consulting orthopedist for regional elite track and soccer academies"
    ],
    memberships: [
      "Fellow of the Royal College of Surgeons (FRCS Orth)",
      "American Academy of Orthopaedic Surgeons (AAOS)",
      "International Society of Arthroscopy & Orthopedics"
    ],
    certifications: [
      "Board Certified in Orthopedic Surgery & Trauma",
      "Mayo Clinic Advanced Joint Arthroplasty Fellowship",
      "Interventional Ultrasound Joint Injection Certificate"
    ],
    timeline: [
      { year: "2011", title: "Orthopedic Residency", description: "Completed trauma and surgical residency at Oxford University Hospitals." },
      { year: "2014", title: "Mayo Reconstruction Fellowship", description: "Specialized in robotic-assisted joint replacement surgery." },
      { year: "2018", title: "Sterling Joint Center", description: "Inaugurated an elite clinic focusing on non-surgical joint repair and preservation." },
      { year: "2024", title: "Regenerative Suite Expansion", description: "Integrated high-density platelet-rich plasma and musculoskeletal shockwave systems." }
    ],
    services: [
      { title: "Joint Preservation Consultation", desc: "A meticulous bio-mechanical review, gait analysis, and diagnostic ultrasound to save knee/hip joints without surgery.", duration: "40 mins", fee: "$130", icon: "Activity" },
      { title: "Regenerative PRP Injections", desc: "Harvesting concentrated blood growth factors to accelerate healing in worn cartilage, tennis elbow, or heel spurs.", duration: "30 mins", fee: "$250", icon: "Syringe" },
      { title: "Sports Ligament Assessment", desc: "Advanced physical diagnostic tests and ultrasound scans for ACL, meniscus, and ankle instability to plan custom recovery.", duration: "30 mins", fee: "$110", icon: "Shield" },
      { title: "Sciatica & Chronic Back Support", desc: "Mapping core muscular imbalances, nerve compression patterns, and non-surgical decompression options.", duration: "35 mins", fee: "$95", icon: "Grid" },
      { title: "Minimally Invasive Arthroscopy", desc: "Keyhole orthopedic surgery diagnostic consultations to review repair options for torn ligaments and labrums.", duration: "40 mins", fee: "$150", icon: "Sparkles" },
      { title: "Osteoporosis Management", desc: "Comprehensive Dexa scan reviews, calcium absorption mapping, and proactive bone density boosting plans.", duration: "20 mins", fee: "$85", icon: "TrendingUp" },
      { title: "Post-Fracture Skeletal Audit", desc: "Ensuring flawless bone healing, joint mobilization, and complete strength recovery post-injury.", duration: "25 mins", fee: "$80", icon: "ShieldCheck" },
      { title: "Tele-Rehab Consultation", desc: "Online muscular movement, flexibility audits, and guided home physiotherapy adjustments for existing patients.", duration: "20 mins", fee: "$60", icon: "Video" }
    ],
    facilities: [
      { title: "Bedside Musculoskeletal Ultrasound", desc: "Real-time, high-contrast muscle and joint scanning right in the exam chair. No waiting.", icon: "Gauge" },
      { title: "Extracorporeal Shockwave Therapy", desc: "Non-invasive acoustic wave therapy to dissolve calcium spurs and chronic tendon pain.", icon: "Zap" },
      { title: "Gait & Alignment Lab", desc: "Pressure-sensitive floor plates and high-speed video tracking to map your walking balance.", icon: "TrendingUp" },
      { title: "PRP Sterile Centrifuge Wing", desc: "On-site Class 100 sterile laboratory to extract maximum potency growth factors.", icon: "ShieldCheck" },
      { title: "Cryotherapy Pain Management", desc: "Specialized cold-air recovery devices to rapidly shut down inflammation and swelling.", icon: "Droplet" },
      { title: "Wheelchair Accessible Layout", desc: "Extra-wide ramps, automated wide doors, and height-adjustable digital examination tables.", icon: "Accessibility" }
    ],
    reviews: [
      { name: "Henry McCarty", date: "June 20, 2026", rating: 5, review: "Dr. Sterling is a savior! My knee osteoarthritis was so bad I could barely walk down the stairs. After his 3-step PRP therapy and alignment corrections, I am back to hiking! Zero surgery needed.", photoSeed: "henry" },
      { name: "Diana Prince", date: "May 28, 2026", rating: 5, review: "I tore my meniscus during tennis. Dr. Sterling diagnosed it immediately with his portable scan, explained the mechanics beautifully, and guided me back to play. Stellar doctor.", photoSeed: "diana" },
      { name: "Arthur Curry", date: "May 15, 2026", rating: 5, review: "Clean clinic, highly organized, and no wait times. Dr. Sterling spent ample time explaining my lumbar spine issues. The posture correction tips were gold.", photoSeed: "arthur_c" },
      { name: "Barry Allen", date: "April 29, 2026", rating: 5, review: "Incredibly fast diagnostics. The shockwave therapy completely cured my chronic plantars fasciitis in 4 sessions. Amazing technological clinic.", photoSeed: "barry" },
      { name: "Bruce Wayne", date: "April 11, 2026", rating: 5, review: "A world-class sports orthopedist. Meticulous check, highly logical approach, and respects the patient's goal for active recovery.", photoSeed: "bruce" },
      { name: "Selina Kyle", date: "March 20, 2026", rating: 5, review: "Extremely clean, modern clinic with a helpful receptionist. Dr. Sterling is highly professional and warm.", photoSeed: "selina" },
      { name: "Victor Stone", date: "March 02, 2026", rating: 5, review: "The wheelchair access here is flawless. Dr. Sterling treated my father's hip joint pain with immense patience and excellent results.", photoSeed: "victor" },
      { name: "Hal Jordan", date: "February 12, 2026", rating: 5, review: "Top medical center. Mapped my shoulders rotator cuff tear and avoided surgery using targeted alignment exercises. Strongly recommend.", photoSeed: "hal" }
    ],
    blog: [
      { title: "Saving Your Knees: The Modern Joint Preservation Revolution", category: "Joint Health", date: "July 02, 2026", summary: "How targeted bio-lubrications, micro-alignment, and PRP therapy are enabling patients to successfully bypass traditional knee replacement surgery.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
      { title: "Platelet-Rich Plasma (PRP): What the Clinical Data Actually Says", category: "Regenerative Med", date: "June 24, 2026", summary: "An objective medical review of cartilage repair rates, tendon healing, and how platelet concentration affects orthopedic recovery.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80" },
      { title: "Sciatica: Why Your Back is Not the Only Culprit", category: "Spine Care", date: "June 12, 2026", summary: "Explore how tight deep gluteal muscles, pelvic rotation, and core imbalances mimic spinal disc herniation, and how to fix it.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" },
      { title: "The 3 Critical Mistakes Made in Rotator Cuff Recovery", category: "Sports Medicine", date: "May 28, 2026", summary: "Why aggressive early stretching worsens micro-tears, and the correct kinetic chain exercises to rebuild painless shoulder strength.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" },
      { title: "Osteoporosis Prevention: Beyond Simple Calcium Tablets", category: "Bone Density", date: "May 10, 2026", summary: "The science of load-bearing resistance training, specific bone-matrix minerals, and the synergistic role of D3, K2, and boron.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80" },
      { title: "The Ergonomics Checklist for Spine and Neck Health", category: "Preventive Care", date: "April 26, 2026", summary: "How remote-work chair angles, screen heights, and elbow alignments relieve chronic spinal disc compression and muscle fatigue.", image: "https://images.unsplash.com/photo-1491570341517-1039f7310940?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How do I book an orthopedic slot?", a: "Simply use our online appointment widget. Pick 'Orthopedic Consult', select your preferred time, and submit. We will verify your slot immediately." },
      { q: "Does PRP therapy count as surgery?", a: "No, Platelet-Rich Plasma therapy is a safe, completely non-surgical, outpatient procedure performed under real-time ultrasound guidance in under 30 minutes." },
      { q: "What should I bring for joint pain assessment?", a: "Please bring any previous X-rays, MRI scans, or bone density (DEXA) reports, and wear loose, comfortable clothing so we can perform mobility checks." },
      { q: "Are orthopedic treatments painful?", a: "Diagnostic palpations are gentle. For therapeutic joint injections, we utilize micro-needles and real-time ultrasound to make the placement quick and highly comfortable." },
      { q: "What is your medical registration number?", a: "Our clinic is certified under National Medical License No. OR-192831-D, meeting strict safety and orthopedic compliance codes." },
      { q: "Can I walk-in for bone fractures?", a: "For suspected minor fractures or sprains, we offer rapid same-day triage slots. For severe compound fractures, please go directly to the nearest emergency trauma center." },
      { q: "Is there stroller and wheelchair assistance?", a: "Yes, we are a fully ground-floor medical clinic with wide automatic doors, ADA washrooms, and dedicated parking." },
      { q: "Do you accept digital wallet payments?", a: "Yes, we accept all debit/credit cards, tap devices, Apple Pay, Google Pay, and online transfers." }
    ],
    beforeAfter: [
      {
        title: "Knee Joint Alignment Progress",
        beforeLabel: "Pre-PRP & Decompression",
        afterLabel: "Post 3 Months Therapy",
        beforeImage: "https://picsum.photos/seed/knee1/400/300",
        afterImage: "https://picsum.photos/seed/knee2/400/300",
        desc: "Significant visual gait alignment improvement, reduction of mechanical friction, and complete restoration of a regular pain-free stride."
      }
    ]
  },
  {
    id: "cardiology",
    specialtyName: "Cardiologist",
    clinicName: "Vanguard Cardiovascular Clinic",
    tagline: "Securing Every Heartbeat, Safeguarding Your Future",
    doctorName: "Dr. Evelyn Shaw, FACC",
    qualifications: "MD in Cardiology (Harvard Medical School), Fellow of the American College of Cardiology",
    regNumber: "CA-928172-E",
    experience: "18+ Years",
    languages: ["English", "Spanish", "Hindi"],
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=80",
    clinicPhoto: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    timing: {
      weekdays: "08:30 AM - 05:00 PM",
      saturday: "09:00 AM - 12:30 PM",
      sunday: "Closed",
      averageWait: "10 mins"
    },
    fee: "$120",
    email: "diveshpatil0000@gmail.com",
    emergencyContact: "+91 91587 80962",
    googleRating: "5.0",
    totalReviews: "418",
    philosophy: "The heart is the ultimate motor of human life. I believe in advanced early lipidology, non-invasive imaging, and meticulous cardiovascular stress reduction to actively block coronary diseases before they emerge.",
    mission: "To provide state-of-the-art, evidence-based cardiology care that combines molecular diagnostics with empathetic clinical consultations.",
    bio: "Dr. Evelyn Shaw is an award-winning cardiologist with 18+ years of dedicated experience. A Harvard medical alumna, Dr. Shaw completed her advanced fellowship at the Cleveland Clinic. She specializes in cardiovascular lipidology, preventive cardiology, and non-invasive cardiac imaging. She designed her clinic to offer bedside ECGs, high-contrast echocardiograms, and stress testing with absolutely zero hospital stress.",
    conditionsTreated: [
      "Coronary Artery Plaque & Atherosclerosis",
      "Hypertension & Arterial Stiffness",
      "Dyslipidemia & Complex Cholesterol Management",
      "Heart Palpitations & Arrhythmia",
      "Chronic Heart Failure Stability",
      "Mitral Valve & Heart Murmurs"
    ],
    preventiveCare: [
      "Advanced Cardio-Metabolic Biomarker Audits",
      "Carotid Intima-Media Thickness (CIMT) Screening",
      "Bedside 2D Speckle Echocardiography",
      "Personalized Cardio-Aerobic Exercise Prescription"
    ],
    achievements: [
      "Distinguished Cardiologist of the Year (American Heart Guild, 2024)",
      "Pioneered a regional screening program detecting silent plaque in 1,200+ individuals",
      "Recognized clinical expert on ApoB lipid profiling and arterial health"
    ],
    memberships: [
      "Fellow of the American College of Cardiology (FACC)",
      "Active Board Member, European Society of Cardiology",
      "Member, American Heart Association (AHA)"
    ],
    certifications: [
      "Board Certified in Cardiovascular Medicine",
      "Advanced Echocardiography & Cardiac CT Fellowship",
      "Certified Cardiac Device Specialist (CCDS)"
    ],
    timeline: [
      { year: "2008", title: "Harvard Medical Fellowship", description: "Completed advanced clinical fellowship in cardiovascular diseases." },
      { year: "2012", title: "ApoB Screening Initiative", description: "Established advanced lipid research guidelines for early prevention." },
      { year: "2017", title: "Vanguard Heart Center", description: "Opened an elite diagnostic heart clinic featuring non-invasive ultrasound suites." },
      { year: "2024", title: "AI Ultrasound Integration", description: "Equipped diagnostic suites with automated AI strain echocardiography." }
    ],
    services: [
      { title: "Advanced Preventive Cardiology Audit", desc: "A deep dive checkup reviewing blood pressure patterns, advanced ApoB lipid panels, lifestyle markers, and genetic heart risks.", duration: "45 mins", fee: "$160", icon: "Activity" },
      { title: "High-Definition Echocardiography", desc: "State-of-the-art 2D Doppler ultrasound of the beating heart to assess chamber sizes, valve health, and pumping efficiency.", duration: "30 mins", fee: "$220", icon: "Heart" },
      { title: "Hypertension Control & Arterial Check", desc: "Determining arterial compliance and customizing non-drug and medical therapies to lower blood pressure safely.", duration: "30 mins", fee: "$110", icon: "Activity" },
      { title: "Arrhythmia & Palpitations Assessment", desc: "Thorough bedside ECG testing and multi-day Holter monitor setups to record and resolve abnormal heart rhythm patterns.", duration: "35 mins", fee: "$130", icon: "Zap" },
      { title: "Cardio-Metabolic Risk Clearance", desc: "Comprehensive physical checkup, insulin resistance tests, and respiratory checks before starting intense workout programs.", duration: "30 mins", fee: "$120", icon: "Shield" },
      { title: "ApoB & Advanced Lipid Consulting", desc: "Bypassing outdated LDL metrics to analyze ApoB, Lp(a), and LDL particle counts to build an absolute defense against plaque.", duration: "25 mins", fee: "$95", icon: "TrendingUp" },
      { title: "Heart Failure Stability Care", desc: "Consistent clinical adjustments, fluid tracking, and medical optimization to ensure strong cardiac mechanics and high quality of life.", duration: "40 mins", fee: "$140", icon: "ShieldCheck" },
      { title: "Tele-Cardio Remote Follow-up", desc: "Secure online reviews of home blood pressure logs, blood panels, or cardiac monitor data from your laptop.", duration: "20 mins", fee: "$70", icon: "Video" }
    ],
    facilities: [
      { title: "AI-Assisted Doppler Eco Suite", desc: "Meticulous heart imaging with instant automated ejection fraction calculations.", icon: "Gauge" },
      { title: "Bedside 12-Lead Digital ECG", desc: "Immediate cardiac electrical tracing with cloud integration for fast reviews.", icon: "Activity" },
      { title: "High-Resolution Carotid Scan", desc: "Ultrasound verification of carotid arteries to actively screen for early silent plaque.", icon: "Eye" },
      { title: "Calming Soundproofed Rooms", desc: "Designed with low lighting and sound dampening to guarantee accurate resting blood pressure values.", icon: "Shield" },
      { title: "Digital Holter Tracking Lab", desc: "Lightweight, water-resistant continuous cardiac tracking patches for home diagnostics.", icon: "Cpu" },
      { title: "Ground-Level Accessibility", desc: "Completely wheelchair friendly with emergency medical support systems in place.", icon: "Accessibility" }
    ],
    reviews: [
      { name: "Julian Alcaraz", date: "June 25, 2026", rating: 5, review: "Dr. Shaw is an absolute genius in preventive heart care. She didn't just check my LDL; she ran an advanced ApoB and plaque scan, revealing early risks we've now fully reversed. I feel incredibly safe.", photoSeed: "julian_a" },
      { name: "Sarah Vance", date: "June 03, 2026", rating: 5, review: "The most thorough cardiac screening I've ever had. No hospital panic, clean facility, and Dr. Shaw explained the echocardiogram screen in real time. Absolute class.", photoSeed: "sarah" },
      { name: "Robert Fletcher", date: "May 18, 2026", rating: 5, review: "Dr. Shaw has managed my chronic hypertension beautifully. Her custom exercise plan and medical adjustments have brought my pressure back to 115/75 safely.", photoSeed: "robert_f" },
      { name: "Evelyn Ross", date: "April 29, 2026", rating: 5, review: "Outstanding doctor. Very warm, calm, and highly scientific approach. The appointment booking on the site was super fast.", photoSeed: "evelyn" },
      { name: "Thomas Sterling", date: "April 11, 2026", rating: 5, review: "A world-class cardiologist. No rush, very patient, and highly expert in complex lipid profiles. Highly recommended clinic.", photoSeed: "thomas_s" },
      { name: "Clara Dupont", date: "March 22, 2026", rating: 5, review: "Extremely clean, modern diagnostic rooms, and very professional staff. Dr. Shaw is a wonderful clinician.", photoSeed: "clara_d" },
      { name: "David Kim", date: "March 05, 2026", rating: 5, review: "I took my father for a post-stent check. Dr. Shaw checked his metrics with extreme patience, adjusted medicines, and reassured us.", photoSeed: "david_k" },
      { name: "Patricia Lopez", date: "February 15, 2026", rating: 5, review: "Beautiful clinic design. Bedside ultrasound was quick and Dr. Shaw explained everything step-by-step. Excellent experience.", photoSeed: "patricia_l" }
    ],
    blog: [
      { title: "ApoB vs. LDL: Why Your Traditional Cholesterol Test is Lying", category: "Lipidology", date: "July 01, 2026", summary: "Explore why standard LDL cholesterol can overlook critical cardiovascular plaque risks, and why ApoB particles are the superior marker.", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=400&q=80" },
      { title: "The Silent Plaque: How to Detect Atherosclerosis Early", category: "Preventive Care", date: "June 18, 2026", summary: "A medical review of CIMT carotid scans and Coronary Calcium scoring to identify soft arterial buildup before any symptoms appear.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" },
      { title: "Hypertension: The Truth About Arterial Elasticity and Diet", category: "Hypertension", date: "June 05, 2026", summary: "Learn how dynamic nitric oxide signaling, high sodium balances, and arterial calcification control your blood pressure levels.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" },
      { title: "Heart Palpitations: When are they Benign vs. Critical?", category: "Arrhythmia", date: "May 22, 2026", summary: "How caffeine, stress, thyroid spikes, and true micro-arrhythmias alter your pulse rhythm, and when to seek medical help.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80" },
      { title: "The Scientific Guide to Cardio Aerobic Heart Training", category: "Cardio Health", date: "May 09, 2026", summary: "Why 'Zone 2' low-intensity endurance training is highly beneficial for mitochondrial health, blood pressure, and vascular elasticity.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" },
      { title: "Stress and Cardiomyopathy: The Neuro-Cardiac Connection", category: "Vascular Health", date: "April 24, 2026", summary: "How sympathetic nervous system overload alters heart muscle dynamics and actionable techniques to achieve vascular balance.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80" }
    ],
    faqs: [
      { q: "How do I book a cardiology slot?", a: "Simply use our secure online form to choose your cardiac service and reserve your preferred appointment timing. We will lock it instantly." },
      { q: "What should I wear for a heart checkup?", a: "Please wear loose, comfortable clothing and easy-to-remove shoes so we can quickly place chest leads for ECG or perform echocardiogram scans." },
      { q: "What is your clinic's medical registration number?", a: "Our medical center is fully certified under License No. CA-928172-E, meeting all national and clinical safety criteria." },
      { q: "Do you offer emergency cardiac treatments?", a: "We offer immediate diagnostic evaluation and preventative stabilization. For acute chest pain, suspected heart attacks, or sudden shortness of breath, please dial emergency services (911) immediately." },
      { q: "What is an ApoB lipid test?", a: "ApoB measures the exact number of plaque-carrying particles in your blood. It is highly accurate and far superior to traditional cholesterol measurements for predicting heart health." },
      { q: "Are diagnostic scans like echocardiograms painful?", a: "No, an echocardiogram is completely non-invasive and painless. It is simply a specialized ultrasound of your chest using warm gel." },
      { q: "Do you accept card payments?", a: "Yes, we accept all debit/credit cards, tap-to-pay, Apple Pay, Google Pay, and online digital banking receipts." },
      { q: "Where is the clinic located?", a: "Our boutique cardiology clinic is located in a ground-level professional medical plaza, featuring free dedicated visitor parking and ramp accessibility." }
    ],
    beforeAfter: [
      {
        title: "Arterial Plaque Prevention Trend",
        beforeLabel: "Baseline (High ApoB)",
        afterLabel: "Post 6 Months (Stabilized)",
        beforeImage: "https://picsum.photos/seed/heart1/400/300",
        afterImage: "https://picsum.photos/seed/heart2/400/300",
        desc: "Interactive lipid profiling charting a 35% reduction in atherogenic ApoB particles combined with arterial elasticity recovery."
      }
    ]
  }
];
