import React, { useState } from "react";
import { ActivePage } from "../types";
import { 
  Activity, Compass, Shield, Calendar, Users, Sparkles, Lock, Award, 
  HeartHandshake, ArrowRight, MapPin, CheckCircle2, Search, Send,
  Briefcase, MessageSquare, Baby, Heart, ShieldAlert, BookOpen, Clock, Phone, Globe,
  ChevronDown, ChevronRight
} from "lucide-react";

import legalSupportPanelImg from "../assets/images/legal_support_panel_1780313070257.png";
import emergencyFoodRationsImg from "../assets/images/emergency_food_rations_1780313086807.png";
import childrenSchoolPacksImg from "../assets/images/children_school_packs_1780313126433.png";

import childEnteringSchoolImg from "../assets/images/child_entering_school_1780313772317.png";
import protectiveGuardianshipImg from "../assets/images/protective_guardianship_1780313825998.png";
import nutrientDispatchImg from "../assets/images/nutrient_dispatch_1780313802216.png";

import schoolProgramsCommunicationImg from "../assets/images/school_programs_communication_1780314061954.png";
import volunteersPackingWarehouseImg from "../assets/images/volunteers_packing_warehouse_1780314082074.png";
import educationalLectureGroupImg from "../assets/images/educational_lecture_group_1780314098458.png";

import safeCribMaternityImg from "../assets/images/safe_crib_maternity_1780314250020.png";
import pediatricTestingImg from "../assets/images/pediatric_testing_1780314267929.png";
import babyFormulaDispatchImg from "../assets/images/baby_formula_dispatch_1780314289916.png";

import patientCounselingImg from "../assets/images/patient_counseling_1780315633395.png";
import labDiagnosticImg from "../assets/images/lab_diagnostic_1780315655562.png";

import medicalConsultingPanelImg from "../assets/images/medical_consulting_panel_1780316314332.png";
import humanitarianShelterUnitsImg from "../assets/images/humanitarian_shelter_units_1780316332759.png";
import waterFiltrationSystemsImg from "../assets/images/water_filtration_systems_1780316350560.png";
import warmFoodLogisticsImg from "../assets/images/warm_food_logistics_1780316366286.png";

interface ServicePagesProps {
  activePage: ActivePage;
  lang: string;
  openDonateModal: () => void;
  setActivePage: (page: ActivePage) => void;
}

export const ServicePages: React.FC<ServicePagesProps> = ({ activePage, lang, openDonateModal, setActivePage }) => {
  // Seminar Booking Form State
  const [seminarForm, setSeminarForm] = useState({
    institution: "",
    contactPerson: "",
    email: "",
    phone: "",
    estimatedAudience: "50-100",
    topic: "Oncology Care Operations",
    preferredDate: "",
    specialRequests: ""
  });
  const [seminarSubmitted, setSeminarSubmitted] = useState(false);

  // Health Ambassadors directory search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // Careers Form State
  const [careerForm, setCareerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "Senior Surgical Oncologist",
    coverLetter: "",
    cvUploaded: false,
    cvFileName: ""
  });
  const [careerFormSubmitted, setCareerFormSubmitted] = useState(false);
  const [activeCareersCategory, setActiveCareersCategory] = useState("All");
  const [careersQuery, setCareersQuery] = useState("");

  const careerPositions = [
    { id: "FAZ-CAR-099", title: "Senior Surgical Oncologist", category: "Medical", region: "Yemen Mobile Care Unit", status: "Active Intake", stipend: "Fully Funded Endowment Coverage", spec: "Perform high-complexity ocular/oncological surgeries in regional field caravans." },
    { id: "FAZ-CAR-331", title: "Direct Triage Fleet Coordinator", category: "Logistics", region: "Southeast Asia Logistics Hub", status: "Active Intake", stipend: "Full Accommodation + Stipend", spec: "Manage coordinates for our rapid 24h shelter and water drill caravans across major paths." },
    { id: "FAZ-CAR-552", title: "Consular Liaison & Translator", category: "Operations", region: "Consular Advisory Wing", status: "Active Intake", stipend: "Sovereign Endowment Coverage", spec: "Facilitate multilingual legal translations and safe-haven coordination for foreign citizens." },
    { id: "FAZ-CAR-129", title: "Mother-Child Sanctuary Caseworker", category: "Medical", region: "Postpartum Welfare Wings", status: "Continuous Intake", stipend: "Full Accommodation + Stipend", spec: "Supervise baby formula dispatch lockers, clinical midwives coordination, and youth protection tasks." }
  ];

  const filteredCareers = careerPositions.filter(pos => {
    const matchesSearch = pos.title.toLowerCase().includes(careersQuery.toLowerCase()) || 
                          pos.region.toLowerCase().includes(careersQuery.toLowerCase());
    const matchesCat = activeCareersCategory === "All" || pos.category === activeCareersCategory;
    return matchesSearch && matchesCat;
  });

  // Contact / Liaison Form State
  const [contactForm, setContactForm] = useState({
    institutionName: "",
    officialEmail: "",
    focusArea: "Sovereign Partnership Proposal",
    proposalDetails: "",
    urgentCrisis: "Routine Administrative Inquiry"
  });
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  // FAQ State
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("All");
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const toggleFaqIndex = (idx: number) => {
    setFaqOpenIndices(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const detailedFaqs = [
    { category: "Financials & Audits", question: "How does the charity guarantee a Zero-Leakage sovereign model?", answer: "All system administrative costs, logistics fuel, and corporate staff salaries are 100% covered by the private endowment accounts of the Prince Fazza family. Every dollar contributed by public supporters goes directly into clinical medicines, building safe water drills, or purchasing newborn nursing materials." },
    { category: "Financials & Audits", question: "Is the Prince Fazza Charity Foundation fully certified and tax-exempt?", answer: "Yes, we are a registered IRS 501(c)(3) tax-exempt humanitarian organization. All supportive funds directly receive active official receipts and verified clearance certificates automatically generated upon transaction execution." },
    { category: "Sponsorship & Children", question: "How does the Children Came Home program prevent mistaken identities?", answer: "We collaborate with native consular panels and utilize double-blind legal files alongside secure, accredited clinical DNA verification structures before any child is permanently returned, ensuring maximum safety and absolute protective guardianship." },
    { category: "Sponsorship & Children", question: "Can a donor visit the child or community they are sponsoring?", answer: "Indeed! Through our official Visit and Care Initiative, verified supporters can arrange travel protocols, review on-site water construction parameters, and directly distribute educational materials to beneficiary communities alongside our rapid-response teams." },
    { category: "Clinical Operations", question: "How long are doctors deployed in the Health Ambassador Database?", answer: "Accredited surgical clinicians and specialist physicians are dispatched for rotations lasting from 2 to 12 weeks, depending on active clinic demands inside caravan sectors." },
    { category: "Clinical Operations", question: "Where are the primary safehouses and halfway houses located?", answer: "Our secure residential zones are situated in post-conflict borders and transit corridors of major developing territories. Their locations are protected by double-blind privacy coordinates for patient safety." }
  ];

  const filteredFaqs = detailedFaqs.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                          item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCat = faqCategory === "All" || item.category === faqCategory;
    return matchesSearch && matchesCat;
  });

  // Ambassador Sample Directory
  const healthAmbassadors = [
    { name: "Dr. Rashid Al Suwaidi", specialty: "Oncology", region: "Middle East", facility: "Royal Oncology Core", status: "Active Dispatch", code: "FAZ-MD-8821" },
    { name: "Dr. Elena Peterson", specialty: "Pediatrics & Oncology", region: "Eastern Europe", facility: "St. Jude Coordinated Center", status: "Active Dispatch", code: "FAZ-MD-3094" },
    { name: "Prof. Kenneth Lindqvist", specialty: "Immunology", region: "Northern Europe", facility: "Helsinki Immunology Hub", status: "On standby", code: "FAZ-MD-1149" },
    { name: "Dr. Sarah Lin", specialty: "Oncology", region: "Southeast Asia", facility: "Royal Grace Hospital", status: "Active Dispatch", code: "FAZ-MD-7556" },
    { name: "Dr. Gabriel Evans", specialty: "Emergency Triage", region: "Central Asia", facility: "Triage Mobile Unit 4", status: "Active Dispatch", code: "FAZ-MD-9011" },
    { name: "Dr. Sarah Jenkins", specialty: "Pediatrics & Family Care", region: "Central America", facility: "Fazza Hope Caravan", status: "On standby", code: "FAZ-MD-4560" },
  ];

  const filteredAmbassadors = healthAmbassadors.filter(amb => {
    const matchesSearch = amb.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          amb.facility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || amb.specialty.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleSeminarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seminarForm.institution || !seminarForm.contactPerson || !seminarForm.email) {
      alert("Please fill in the required fields (Institution, Contact Name, Email).");
      return;
    }
    setSeminarSubmitted(true);
  };

  // Dedicated data for galleries inside pages
  const pageGalleries: Record<string, { img: string; desc: string }[]> = {
    "hiv-support": [
      { img: patientCounselingImg, desc: "Patient counseling session at our regional wing." },
      { img: labDiagnosticImg, desc: "State-of-the-art laboratory diagnostic system." },
      { img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600", desc: "Essential immunity-boosting nutritional packages." }
    ],
    "halfway-house": [
      { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600", desc: "Fully furnished safe micro-apartments." },
      { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600", desc: "Interactive computer lab for technical training." },
      { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600", desc: "Transition coordinator lecturing on interview skills." }
    ],
    "vulnerable-foreigners": [
      { img: legalSupportPanelImg, desc: "Multi-lingual legal support panel at consular services." },
      { img: emergencyFoodRationsImg, desc: "Emergency food rations dispatch in urban shelter hubs." },
      { img: childrenSchoolPacksImg, desc: "Children of relocated foreign citizens receiving school packs." }
    ],
    "seminar-request": [
      { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600", desc: "Interactive medical workshop at an accredited college." },
      { img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600", desc: "Seminar addressing modern palliative care methods." },
      { img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600", desc: "Community leaders exchanging resources and files." }
    ],
    "health-ambassadors": [
      { img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600", desc: "Certified mobile clinicians discussing coordination map." },
      { img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600", desc: "Specialist health liaison performing direct physical review." },
      { img: medicalConsultingPanelImg, desc: "Consulting panel reviewing active regional diagnostic maps." }
    ],
    "children-home": [
      { img: childEnteringSchoolImg, desc: "Reunited child entering safe educational module." },
      { img: protectiveGuardianshipImg, desc: "Caseworkers executing protective guardianship checks." },
      { img: nutrientDispatchImg, desc: "Nutrient dispatch specifically formatted for displaced youth." }
    ],
    "shelter-placement": [
      { img: humanitarianShelterUnitsImg, desc: "Completed shelter units with full climate protection." },
      { img: waterFiltrationSystemsImg, desc: "On-site sanitary water filtration systems." },
      { img: warmFoodLogisticsImg, desc: "Daily warm food logistics inside shelter dining wings." }
    ],
    "medical-care": [
      { img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600", desc: "Advanced operating room financed by royal endowments." },
      { img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=600", desc: "Oncology scanning division performing screening." },
      { img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600", desc: "Hospital recovery wing accommodating regional patients." }
    ],
    "mother-child": [
      { img: safeCribMaternityImg, desc: "Safe crib sanctuary inside postpartum wing." },
      { img: pediatricTestingImg, desc: "Pediatric testing and nutritional allocations." },
      { img: babyFormulaDispatchImg, desc: "Mated infant formula and baby nutrients dispatch lockers." }
    ],
    "visit-care": [
      { img: schoolProgramsCommunicationImg, desc: "Registered visitors communicating with school programs." },
      { img: volunteersPackingWarehouseImg, desc: "Volunteers packing care systems in local warehouses." },
      { img: educationalLectureGroupImg, desc: "On-site group providing interactive educational lectures." }
    ],
    "careers": [
      { img: "https://images.unsplash.com/photo-1610015694295-cd6a32d16eb5?w=800&q=80", desc: "Staff training inside our central logistics conference wing." },
      { img: "https://images.unsplash.com/photo-1516087796934-2e917d5940d9?w=800&q=80", desc: "Coordinating clinical cargo routes digitally." },
      { img: "https://images.unsplash.com/photo-1520697920397-22f28122d4f2?w=800&q=80", desc: "Medical ambassadors briefing prior to active mountain caravan dispatch." }
    ],
    "contact": [
      { img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=600", desc: "Secured administrative liaison station answering direct lines." },
      { img: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600", desc: "Sovereign communications control room operations documentation." },
      { img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600", desc: "Official diplomatic delegation panel meeting at our regional desk." }
    ],
    "faq": [
      { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600", desc: "Providing active education manuals and guidelines to remote villages." },
      { img: "https://images.unsplash.com/photo-1513258496099-48168024addd?q=80&w=600", desc: "Continuous double-entry financial audit logs verified by third parties." },
      { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600", desc: "Students answering certified sponsorship questionnaires." }
    ]
  };

  const currentGallery = pageGalleries[activePage] || [];

  return (
    <div className="relative z-20 bg-[#FAF9F6] pb-24 text-[#111111] font-sans selection:bg-[#F4511E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* ==========================================
            LAYOUT BLOCK 1: HIV SUPPORT PAGE
            ========================================== */}
        {activePage === "hiv-support" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Activity className="w-6 h-6 animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// CERTIFIED HIV INITIATIVE PROTOCOL</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Clinical Immunological Lifelines</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  The Prince Fazza Charity Foundation implements deep-field diagnostic mechanisms designed to combat immunological illnesses. Our programs provide zero-barrier medical treatments, diagnostic tests, safe-haven consultations, and consistent delivery of vital immunotherapies.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-black text-base uppercase text-slate-900">Immediate Clinical Safeguards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Double-Blind Privacy Locks</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Patient records are certified with end-to-end anonymity coordinates, ensuring dignity.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Custom Immunity Nutrition</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Providing protein-dense superfoods designed to restore physical homeostasis.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-black text-base uppercase text-slate-900">Real Human Storytelling</h3>
                  <div className="p-6 bg-[#F4511E]/5 rounded-3xl border border-[#F4511E]/10">
                    <p className="italic text-xs text-slate-700 leading-relaxed font-medium">
                      "When I was diagnosed in a remote sector, option barriers were absolute. The Fazza Caravan provided immediate diagnostics and regular medicine. My viral coordinates reached undetectable indicators last month, and I am back working on our family farm with pure hope."
                    </p>
                    <span className="block mt-3 text-[10px] font-mono font-black text-[#F4511E] uppercase tracking-wider">— Almaz G., Coordinated Care Recipient</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-6 text-center">
                <span className="text-[#F4511E] text-2xl font-black block">14,500+</span>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-extrabold block">Impact Meter Metrics</span>
                <p className="text-xs text-slate-500 font-medium">Patients active inside outpatient medical wings, supported entirely by private endowments.</p>
                <button 
                  onClick={openDonateModal}
                  className="w-full bg-[#F4511E] text-white py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_6px_20px_rgba(244,81,30,0.3)] hover:scale-102 transition duration-300"
                >
                  Fund Medicine Now
                </button>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[32px] space-y-4 shadow-sm">
                <h4 className="font-black text-xs uppercase text-[#F4511E] tracking-widest">// CRISIS OUTREACH COORDINATES</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                  For immediate regional clinical transfers or medical logistics assistance, connect with our liaison teams directly on WhatsApp or our administrative channels for verified swift assistance.
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono pt-2">
                  <Phone className="w-4 h-4 text-[#F4511E]" />
                  <span>+1 (227) 266-4466</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 2: HALFWAY HOUSE PAGE
            ========================================== */}
        {activePage === "halfway-house" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// TRANSITIONAL SAFEHOUSETEMPLATE</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Transition residences for safe integration</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Fazza Safehouse communities provide vital support structures for citizens transitioning through critical life hardships. We offer warm accommodation, certified mental health diagnostics, and rigorous vocational workshops to prepare individuals for lasting workforce reintegration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                  <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-slate-900 text-lg font-black block">140+</span>
                    <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#F4511E] font-bold block">Annual Graduates</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-slate-900 text-lg font-black block">3 Integrated</span>
                    <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#F4511E] font-bold block">Vocational Labs</span>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-slate-900 text-lg font-black block">100% Free</span>
                    <span className="text-[9.5px] uppercase font-mono tracking-widest text-[#F4511E] font-bold block">Housing Systems</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="font-black text-base uppercase text-slate-900">Integrated Skill Pathways</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Residents receive certified training in technical areas such as welding, digital logistics dispatch, agricultural field operations, and healthcare administration. We coordinate directly with local industrial firms to guarantee stable jobs upon graduation.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-4">
                <h4 className="font-black text-xs uppercase text-slate-900 tracking-tight">Active Safehouse Features</h4>
                <ul className="space-y-3.5 text-xs text-slate-500 font-semibold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>On-site counselor caseworkers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Job placement support networks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Daily nutritional hot meal service</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <button 
                    onClick={openDonateModal}
                    className="w-full bg-[#111111] hover:bg-[#F4511E] text-white py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition duration-300 shadow-md"
                  >
                    Sponsor House Unit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 3: VULNERABLE FOREIGNERS AID
            ========================================== */}
        {activePage === "vulnerable-foreigners" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Shield className="w-6 h-6" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// VULNERABLE CITIZENS DEFENSE CODES</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Essential aid for vulnerable foreign citizens</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Our humanitarian mission guarantees equal care and security for foreign citizens who find themselves vulnerable inside regional borders. We provide translation teams, legal advisors, emergency safe accommodation, and direct nutrition access.
                </p>

                <div className="p-6 bg-[#FAFAFA] rounded-2xl space-y-3 border border-slate-100">
                  <h3 className="font-black text-xs uppercase text-slate-900 flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-[#F4511E]" />
                    <span>Emergency Air Support Protocol</span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    In situations of extreme regional crisis, we arrange coordinated consular liaison services and secure emergency travel support to transport vulnerable families back to their native jurisdictions under sovereign safety procedures.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-[#F4511E] block">// CONSULAR LIAISON UNIT</span>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">Direct Support Services</h3>
                <p className="text-xs text-slate-500 font-medium">
                  We maintain active direct lines of secure contact with multiple international foreign ministries to fast-track safety coordinates.
                </p>
                <div className="pt-2">
                  <a 
                    href="mailto:theroyalpalace6@gmail.com" 
                    className="block text-center w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest transition duration-300"
                  >
                    Send Consular Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 4: SEMINAR REQUEST BOOKING
            ========================================== */}
        {activePage === "seminar-request" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Calendar className="w-6 h-6" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// SYSTEM DEMAND WORKSHOP BOOKING</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Educational Seminar Request Portal</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  We schedule and fund custom community outreach workshops covering preventative oncology, oncology survivor mental health, surgical triage procedures, and regional nutrition strategies. Book a session for academic, civic, or healthcare groups.
                </p>

                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h3 className="font-black text-sm uppercase text-slate-950">Workshop Curriculums Available</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-500 font-semibold">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#F4511E] shrink-0" />
                      <span>Oncology Patient Diagnostics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#F4511E] shrink-0" />
                      <span>Triage Mobile Logistics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#F4511E] shrink-0" />
                      <span>Sovereign Zero-Leakage Audit Models</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#F4511E] shrink-0" />
                      <span>Maternal Safehouse Best Practices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-lg space-y-6">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider text-center">Interactive Request Scheduler</h3>
                
                {seminarSubmitted ? (
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 text-center rounded-2xl space-y-4 animate-scale-up">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-black text-slate-900 text-xs uppercase">Booking Transmitted Successfully</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
                      Your seminar request coordinates are compiled. Our outreach directors will verify administrative parameters and align dates within 48 hours.
                    </p>
                    <button 
                      onClick={() => setSeminarSubmitted(false)}
                      className="text-xs text-[#F4511E] font-black uppercase hover:underline"
                    >
                      Modify Parameters
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSeminarSubmit} className="space-y-4 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Institution / Community *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Royal Medical College"
                        value={seminarForm.institution}
                        onChange={(e) => setSeminarForm({...seminarForm, institution: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Contact Person *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Dr. Arthur Hayes"
                          value={seminarForm.contactPerson}
                          onChange={(e) => setSeminarForm({...seminarForm, contactPerson: e.target.value})}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Liaison Email *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. arthur@univ.edu"
                          value={seminarForm.email}
                          onChange={(e) => setSeminarForm({...seminarForm, email: e.target.value})}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Workshop Theme Target</label>
                      <select 
                        value={seminarForm.topic}
                        onChange={(e) => setSeminarForm({...seminarForm, topic: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-bold"
                      >
                        <option value="Oncology Care Operations">Oncology Care Operations & Management</option>
                        <option value="Triage Mobile Logistics">Triage Mobile Logistics Infrastructure</option>
                        <option value="Sovereign Compliance Model">Sovereign Compliance Model & Financial audits</option>
                        <option value="Community Nutrition Pathways">Community Nutrition Pathways & Diagnostics</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#F4511E] text-white py-3.5 rounded-full font-black uppercase tracking-widest shadow-md hover:scale-101 transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 5: HEALTH AMBASSADOR DATABASE
            ========================================== */}
        {activePage === "health-ambassadors" && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#F4511E]">
                    <Users className="w-5 h-5" />
                    <span className="font-mono text-xs font-black uppercase tracking-widest">// GLOBAL CLINICAL DIRECTORY LEDGER</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Health Ambassador Registry</h2>
                  <p className="text-xs text-slate-500 font-medium max-w-xl">
                    Verify our list of active, accredited clinical physicians, pediatric field medics, and oncology specialists registered to provide direct support.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {["All", "Oncology", "Pediatrics", "Emergency Triage", "Immunology"].map(spec => (
                    <button 
                      key={spec}
                      onClick={() => setSelectedSpecialty(spec)}
                      className={`px-4 py-2 rounded-full font-bold border transition duration-300 ${selectedSpecialty === spec ? "bg-[#F4511E] text-white border-[#F4511E]" : "bg-slate-50 border-slate-100 text-slate-600 hover:border-[#F4511E]"}`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative pt-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter ambassadors by name region or specialized facility..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAFAFA] border-2 border-slate-100 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-[#F4511E] font-medium text-xs text-[#111111]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {filteredAmbassadors.map((amb, i) => (
                  <div key={i} className="bg-slate-50/50 hover:bg-white border border-slate-100 p-6 rounded-2xl transition duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-black text-[#F4511E] bg-[#F4511E]/5 px-2 py-0.5 rounded-full">{amb.code}</span>
                        <span className="flex items-center space-x-1 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{amb.status}</span>
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{amb.name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{amb.specialty}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium space-y-1">
                        <p><strong className="text-slate-700">Hub:</strong> {amb.facility}</p>
                        <p><strong className="text-slate-700">Jurisdiction:</strong> {amb.region}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                      <a href={`mailto:theroyalpalace6@gmail.com?subject=Liaison Request: ${amb.code}`} className="text-xs font-black uppercase text-[#F4511E] tracking-wider hover:underline inline-flex items-center space-x-1">
                        <span>Initiate Dispatch Connection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 6: CHILDREN CAME HOME
            ========================================== */}
        {activePage === "children-home" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// DISPLACED YOUTH SAFE HAVEN CODES</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Children Came Home Program</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Our specialized youth protection caseworkers locate families of displaced youth. Through certified identity validation guidelines and warm psychological transitional housing, we restore children back with their authentic loved ones.
                </p>

                <div className="timeline-block border-l-2 border-[#F4511E]/20 pl-6 space-y-8">
                  <div className="relative space-y-2">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#F4511E] border-4 border-white" />
                    <span className="text-[10px] font-mono font-black text-[#F4511E]">PHASE 01: LOCATION DISCOVERY</span>
                    <h4 className="font-bold text-xs text-slate-900 uppercase">Interactive Casework Outreach</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Specialized field agents monitor municipal border registries and shelters to identify and document displaced minors.</p>
                  </div>
                  <div className="relative space-y-2">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#F4511E] border-4 border-white" />
                    <span className="text-[10px] font-mono font-black text-[#F4511E]">PHASE 02: CLINICAL SANCTUARY</span>
                    <h4 className="font-bold text-xs text-slate-900 uppercase">Transition Placement Block</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Children are accommodated in maternal-supervised wings, receiving top-tier pediatrics monitoring and stress relief.</p>
                  </div>
                  <div className="relative space-y-2">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#F4511E] border-4 border-white" />
                    <span className="text-[10px] font-mono font-black text-[#F4511E]">PHASE 03: VERIFIED REUNIFICATION</span>
                    <h4 className="font-bold text-xs text-slate-900 uppercase">Certified Identity Alignment</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Consular advisors process legal files and direct DNA protocols to guarantee authentic family reunifications.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#111111] text-white p-8 rounded-[32px] space-y-4 shadow-xl">
                <span className="text-[10px] font-mono uppercase text-[#F4511E] tracking-widest block font-black">// INITIATIVE COMPLIANCE METRIC</span>
                <span className="text-4xl font-black block text-white leading-none">9 Children</span>
                <span className="text-xs uppercase font-mono text-zinc-400 block font-bold">Successfully Reunited Q1</span>
                <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                  Every transition process is logged under direct IRS 501(c)(3) double-entry records ensuring maximum humanitarian accountability.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={openDonateModal}
                    className="w-full bg-[#F4511E] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition hover:scale-101"
                  >
                    Fund A Child Transition
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 7: SHELTER AND PLACEMENT
            ========================================== */}
        {activePage === "shelter-placement" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Lock className="w-5 h-5" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// SECURE HOUSING SYSTEMS</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Emergency safe sanctuary blocks</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  We deploy temporary and semi-permanent shelter structures inside active crisis regions. Equipped with clean solar aquifers, consistent heating, direct medical surveillance, and nutritious dry-ration lockers, our shelters restore safety when communities go dark.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-lg bg-[#F4511E]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#F4511E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Rapid Climate Control</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Shelters are engineered with advanced materials protecting families from harsh cold or desert heat waves.</p>
                    </div>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-lg bg-[#F4511E]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#F4511E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">On-Site Clinic Wings</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Directly annexed to mobile med caravans to guarantee immediate support for pregnant mothers and toddlers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-4 text-center">
                <span className="text-[9px] font-mono uppercase text-[#F4511E] tracking-widest block font-extrabold">// HOUSING JURISDICTIONS LOCK</span>
                <span className="text-3xl font-black text-slate-950 block leading-none">1,200 beds</span>
                <p className="text-xs text-slate-500 font-medium">Active secure capacity deployed across major global developmental transit locations.</p>
                <div className="pt-2">
                  <button 
                    onClick={openDonateModal}
                    className="w-full bg-[#111111] hover:bg-[#F4511E] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest transition duration-300"
                  >
                    Fund Shelter Deploys
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 8: HOSPITALS AND MEDICAL CARE
            ========================================== */}
        {activePage === "medical-care" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Award className="w-5 h-5 text-[#F4511E]" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// SOVEREIGN CLINICAL OUTREACH GRANTS</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Advanced clinical care & oncology care</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  We fund complex surgeries, preventative oncology screenings, and deep diagnostics at partner hospitals globally. Restoring visual coordinates for blind regional citizens, operating tumor treatments, and equipping intensive units is funded fully through our direct royal endpoints.
                </p>

                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <span className="text-2xl font-black text-slate-950">90,000+</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Ophthalmic Restorations</p>
                  </div>
                  <div className="space-y-1 font-sans">
                    <span className="text-2xl font-black text-slate-950">460+</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Oncology Screenings</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-black text-[#F4511E]">Zero</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">System Administration cost</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[32px] space-y-4 shadow-lg text-left">
                <span className="text-[#F4511E] text-xs font-mono font-black uppercase tracking-wider block">// SYSTEM ASSURANCE STATUS</span>
                <h3 className="font-black text-sm uppercase text-white tracking-tight">Direct Oncology Grants</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                  We guarantee direct surgical fees payments to regional medical partners with 100% billing integrity audits.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={openDonateModal}
                    className="w-full bg-[#F4511E] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition duration-300 hover:scale-[1.01]"
                  >
                    Sponsor Live Surgery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 9: MOTHER AND CHILD SHELTER
            ========================================== */}
        {activePage === "mother-child" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <HeartHandshake className="w-6 h-6 text-[#F4511E]" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// MATERNAL CARE SECURE PLACEMENTS</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Mother and baby protection centers</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  We provide specialized postpartum mother-child sanctuary wings in remote crisis coordinates. Our mother and child shelters deliver constant access to clinical midwives, sanitized baby nursing materials, pediatric vaccines, and customized maternal nutrition packets.
                </p>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="font-black text-xs uppercase text-slate-900 tracking-wider">Maternity Protection Spec Units</h4>
                  <div className="space-y-3.5 text-xs text-slate-500 font-semibold leading-relaxed">
                    <p className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 inline mr-2 shrink-0" />
                      <span>Certified postpartum housing setups for up to 12 months</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 inline mr-2 shrink-0" />
                      <span>Regular formula nutrients dispatch lockers for nursing mothers</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// NURSING STATIONS SUPPORT</span>
                <h4 className="font-sans font-black text-slate-950 uppercase text-sm tracking-tight">Support Baby Safe Havens</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Provide highly sanitized diaper units, healthy clinical infant formula containers, and diagnostic vaccine schedules.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={openDonateModal}
                    className="w-full bg-[#F4511E] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition duration-300"
                  >
                    Donate Infant Packs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 10: VISIT AND CARE PROGRAM
            ========================================== */}
        {activePage === "visit-care" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Compass className="w-5 h-5 animate-spin-slow text-[#F4511E]" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// VOLUNTARY COMPLIANCE PROGRAMS</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Visit and Care program</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Join structural teams tracking remote developments on site. Our Visit and Care coordinates offer verified supporters direct field access to witness clinical restores, support technical water system drills, or coordinate child learning packs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl space-y-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Interactive Field Briefing</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Registered participants receive complete regional security matrices and safety protocols compiled in real-time by coordinators.</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl space-y-2">
                    <span className="text-xs font-black text-[#F4511E] uppercase">Direct Solidarity Impact</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Hand-deliver educational items, ophthalmic medicines, and localized nutrition directly to families in transit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-lg space-y-5 text-center">
                <span className="text-[10px] font-mono uppercase text-[#F4511E] tracking-widest block font-black">// INVOLVEMENT PROTOCOLS</span>
                <h3 className="font-sans font-black text-slate-950 text-sm uppercase tracking-tight">Register For Dispatch</h3>
                <p className="text-xs text-slate-500 font-medium">Verify your regional transport coordinates and align with upcoming humanitarian flight routes.</p>
                <button 
                  onClick={() => setActivePage("volunteer")}
                  className="w-full bg-[#111111] hover:bg-[#F4511E] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest transition duration-300"
                >
                  Join Volunteer Registry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 11: PARTNERSHIP AND CAREERS OPENINGS
            ========================================== */}
        {activePage === "careers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8 animate-fade-in">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <Briefcase className="w-5 h-5 text-[#F4511E]" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// SECURED HUMAN RESOURCE PIPELINE</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Partnership & Career Openings</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Join our logistics and medical caravan operations in active global sectors. We recruit, dispatch, and fully fund field technicians, pediatric specialists, and consular liaison officers to maintain zero-delay humanitarian aid loops.
                </p>

                {/* Filterable Career list */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-sans font-black text-xs uppercase text-slate-900">Current Field Openings ({filteredCareers.length})</h3>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "Medical", "Logistics", "Operations"].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCareersCategory(cat)}
                          className={`px-3 py-1 text-[10px] uppercase font-mono font-black border rounded-full transition duration-300 ${activeCareersCategory === cat ? "bg-[#F4511E] text-white border-[#F4511E]" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-[#F4511E]"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter positions by title, specialty, or region..."
                      value={careersQuery}
                      onChange={(e) => setCareersQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-4 text-xs font-medium outline-none focus:border-[#F4511E]"
                    />
                  </div>

                  <div className="space-y-3.5">
                    {filteredCareers.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-6">No matching openings found for defined filters. Try expanding category.</p>
                    ) : (
                      filteredCareers.map((pos) => (
                        <div key={pos.id} className="p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-slate-200 transition rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-[9px] font-mono font-black text-[#F4511E] bg-[#F4511E]/5 px-2 py-0.5 rounded-full">{pos.id}</span>
                              <span className="text-[9px] font-mono text-emerald-600 font-extrabold">{pos.status}</span>
                            </div>
                            <h4 className="font-extrabold text-xs text-slate-950">{pos.title}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{pos.region} • {pos.stipend}</p>
                            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium pt-1 max-w-xl">{pos.spec}</p>
                          </div>
                          
                          <button
                            onClick={() => setCareerForm({ ...careerForm, position: pos.title })}
                            className="bg-[#111111] hover:bg-[#F4511E] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition shrink-0"
                          >
                            Apply zone
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-lg space-y-5">
                <h3 className="font-sans font-black text-slate-900 text-xs uppercase tracking-widest text-center">// TRANSMIT APPLICATION</h3>
                
                {careerFormSubmitted ? (
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 text-center rounded-2xl space-y-4 animate-scale-up">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-black text-slate-900 text-xs uppercase">Application Transmitted</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
                      Your credentials for '{careerForm.position}' have been successfully logged. Our Human Resources Liaison officers will contact you at your email inside 48 hours.
                    </p>
                    <button 
                      onClick={() => setCareerFormSubmitted(false)}
                      className="text-xs text-[#F4511E] font-black uppercase hover:underline"
                    >
                      New Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setCareerFormSubmitted(true); }} className="space-y-4 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Full Identity Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Dr. Arthur Pendelton"
                        value={careerForm.fullName}
                        onChange={(e) => setCareerForm({...careerForm, fullName: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2 px-3 outline-none focus:border-[#F4511E] font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Personal Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. arthur@univ.edu"
                        value={careerForm.email}
                        onChange={(e) => setCareerForm({...careerForm, email: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2 px-3 outline-none focus:border-[#F4511E] font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Target Position</label>
                      <select 
                        value={careerForm.position}
                        onChange={(e) => setCareerForm({...careerForm, position: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-bold"
                      >
                        {careerPositions.map(pos => (
                          <option key={pos.id} value={pos.title}>{pos.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">CV Upload Zone</label>
                      <div 
                        onClick={() => setCareerForm({...careerForm, cvUploaded: true, cvFileName: "CV_Verified_2026.pdf"})}
                        className="border-2 border-dashed border-slate-200 hover:border-[#F4511E] rounded-xl p-4 text-center cursor-pointer transition bg-slate-50/50"
                      >
                        {careerForm.cvUploaded ? (
                          <div className="text-emerald-600 flex items-center justify-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-bold text-[10px] break-all">{careerForm.cvFileName}</span>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-400">
                            <Sparkles className="w-5 h-5 mx-auto text-[#F4511E]/40" />
                            <p className="font-bold text-[9px] uppercase tracking-wider">Drag & drop or Click to simulated upload</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-full font-black uppercase tracking-widest text-xs transition shadow-md"
                    >
                      Transmit CV Coordinates
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 12: CONTACT LIAISON PORTAL
            ========================================== */}
        {activePage === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8 animate-fade-in">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// DIRECT COMMUNICATIONS LIAISON DESK</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Direct Liaison Portal</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Connect with the main administration office of H.H Prince Fazza Charity Foundation. Use this dedicated gateway for formal sovereign partnerships, financial endowment audits request, or emergency caravan support coordination.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {/* WhatsApp hotline card */}
                  <a 
                    href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation, thank you for your humanitarian work and support for humanity. I would like to make an inquiry and learn more about your programs.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 rounded-2xl space-y-2 text-left transition duration-300 group"
                  >
                    <div className="flex items-center space-x-2.5 text-emerald-600 font-bold text-xs uppercase font-mono">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12.031 2a9.967 9.967 0 0 0-9.969 9.969c0 1.944.556 3.766 1.516 5.313L2 22l4.897-1.288a9.907 9.907 0 0 0 5.134 1.419h.005a9.969 9.969 0 0 0 9.969-9.97c0-2.662-1.037-5.164-2.922-7.049A9.904 9.904 0 0 0 12.031 2zm5.82 14.24c-.24.675-1.18 1.242-1.635 1.282-.415.035-.95.045-1.525-.14a9.7 9.7 0 0 1-3.645-2.26 10.669 10.669 0 0 1-2.52-3.155A5.672 5.672 0 0 1 7.5 9.385c.015-1.115.59-1.69 1.06-2.15.175-.17.39-.215.535-.21h.39c.125 0 .285-.01.445.37.17.405.58 1.42.63 1.525.05.105.08.23.01.37s-.105.23-.21.35c-.105.125-.22.28-.315.375-.105.105-.215.22-.095.425a8.3 8.3 0 0 0 1.52 1.885c.67.6 1.23.99 1.84 1.295.2.1.375.05.515-.1.175-.185.76-.875.965-1.175.2-.3.41-.25.685-.15.275.1.1.84 1.76.92.155.03.31.06.46.06.395 0 .61-.19.705-.33.28-.415.42-.92.18-1.595z" />
                      </svg>
                      <span>Direct WhatsApp Hotline</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal font-semibold">Immediate access to administrative coordinators on status verification, sponsorships, and clinical dispatches.</p>
                    <span className="block pt-2 text-xs text-slate-900 font-mono font-black group-hover:text-emerald-600 transition">+1 (227) 266-4466</span>
                  </a>

                  {/* Administrative Email card */}
                  <a 
                    href="mailto:theroyalpalace6@gmail.com"
                    className="p-5 bg-slate-50 hover:bg-[#F4511E]/5 border border-slate-200/40 hover:border-[#F4511E]/10 rounded-2xl space-y-2 text-left transition duration-300 group"
                  >
                    <div className="flex items-center space-x-2.5 text-[#F4511E] font-bold text-xs uppercase font-mono">
                      <Send className="w-4 h-4" />
                      <span>Administrative Desk</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal font-semibold">For formal proposals, academic lectures requests, news briefings, and sovereign financial audits requests.</p>
                    <span className="block pt-2 text-xs text-slate-900 font-mono font-black group-hover:text-[#F4511E] transition break-all underline">theroyalpalace6@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-lg space-y-5">
                <span className="text-[9.5px] font-mono text-[#F4511E] uppercase tracking-widest font-black block text-center">// TRANSMIT SECURED BRIEF</span>
                <h3 className="font-sans font-black text-slate-900 text-xs uppercase tracking-tight text-center">Secure Communication Gate</h3>
                
                {contactFormSubmitted ? (
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 text-center rounded-2xl space-y-4 animate-scale-up">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-black text-slate-900 text-xs uppercase">Message Transmitted</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
                      Your coordination details have been successfully locked and passed to the Director of Liaison Desk. A response will be issued within exactly 1 business day.
                    </p>
                    <button 
                      onClick={() => setContactFormSubmitted(false)}
                      className="text-xs text-[#F4511E] font-black uppercase hover:underline"
                    >
                      New Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactFormSubmitted(true); }} className="space-y-4 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Institution / Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Health Ministry of Yemen"
                        value={contactForm.institutionName}
                        onChange={(e) => setContactForm({...contactForm, institutionName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 outline-none focus:border-[#F4511E] font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Official Email Coordinates *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. liaison@ministry.gov"
                        value={contactForm.officialEmail}
                        onChange={(e) => setContactForm({...contactForm, officialEmail: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 outline-none focus:border-[#F4511E] font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Inquiry Focus</label>
                      <select 
                        value={contactForm.focusArea}
                        onChange={(e) => setContactForm({...contactForm, focusArea: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-3.5 outline-none focus:border-[#F4511E] font-bold"
                      >
                        <option value="Sovereign Partnership Proposal">Sovereign Partnership Proposal</option>
                        <option value="Audit & Verification request">Request Endowment Audit Documents</option>
                        <option value="Regional Clinic Caravans Support">Regional Clinic Caravans Support</option>
                        <option value="General Support Issue">General Support Issue</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-500 font-extrabold uppercase text-[10px]">Briefing Message / Proposals Details *</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Please supply details of your inquiry or targeted partnership support metrics..."
                        value={contactForm.proposalDetails}
                        onChange={(e) => setContactForm({...contactForm, proposalDetails: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 outline-none focus:border-[#F4511E] font-medium resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-full font-black uppercase tracking-widest text-xs transition shadow-md"
                    >
                      Transmit Secured Brief
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            LAYOUT BLOCK 13: FREQUENTLY ASKED QUESTIONS FAQ
            ========================================== */}
        {activePage === "faq" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8 animate-fade-in">
              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-sm space-y-6">
                <div className="flex items-center space-x-3 text-[#F4511E]">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase tracking-widest">// SECURED HUMANITARIAN KNOWLEDGE BASE</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">Interactive FAQ center</h2>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Verify our sovereign double-entry audited financial framework, Children Came Home DNA protocols, secure clinical placement dispatches, and free medical surgery guidelines.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "Financials & Audits", "Sponsorship & Children", "Clinical Operations"].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setFaqCategory(cat)}
                          className={`px-3.5 py-1 text-[10px] uppercase font-mono font-black border rounded-full transition duration-300 ${faqCategory === cat ? "bg-[#F4511E] text-white border-[#F4511E]" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-[#F4511E]"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search questions or keyword answers..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-9 pr-4 text-xs font-medium outline-none focus:border-[#F4511E]"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredFaqs.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-6">No matching FAQs found for defined filters. Try expanding category.</p>
                    ) : (
                      filteredFaqs.map((item, idx) => {
                        const isOpen = faqOpenIndices[idx] || false;
                        return (
                          <div key={idx} className="bg-slate-50/50 hover:bg-white border hover:border-slate-300 transition-all rounded-2xl overflow-hidden shadow-sm">
                            <button
                              onClick={() => toggleFaqIndex(idx)}
                              className="w-full text-left p-5 font-extrabold text-[12px] md:text-sm text-slate-900 flex justify-between items-center outline-none focus:outline-none"
                            >
                              <span>{item.question}</span>
                              <ChevronDown className={`w-4 h-4 text-[#F4511E] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 pt-1 text-[11px] md:text-xs text-slate-500 leading-relaxed font-semibold border-t border-slate-100/50 bg-white">
                                <p>{item.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 text-white p-8 rounded-[32px] space-y-4 shadow-xl">
                <span className="text-[10px] font-mono text-[#F4511E] uppercase tracking-widest font-black block">// UNRESOLVED INQUIRIES</span>
                <h3 className="font-sans font-black text-sm uppercase text-white tracking-tight">Still seeking answers?</h3>
                <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                  Connect with our dedicated liaison advisors via direct email or coordinate live dispatches parameters on WhatsApp for quick, highly secure verification clearances.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActivePage("contact")}
                    className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest transition"
                  >
                    Open Sec Liaison Gate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
