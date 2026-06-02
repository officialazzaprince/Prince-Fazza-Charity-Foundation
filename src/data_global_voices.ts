export interface GlobalVoiceMessage {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  region: "Asia" | "Europe" | "North America" | "South America" | "Oceania" | "Middle East";
  topic: 
    | "School Renovation"
    | "Education Support"
    | "Child Welfare"
    | "Healthcare Programs"
    | "Emergency Relief"
    | "Housing Support"
    | "Women's Empowerment"
    | "Youth Development"
    | "Community Transformation"
    | "Humanitarian Assistance";
  message: string;
  timestamp: string;
  createdAt?: number;
}

export const GLOBAL_VOICES_MESSAGES: GlobalVoiceMessage[] = [
  // ==========================================
  // ASIA (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "asia-edu-1",
    name: "Priya Sharma",
    city: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    region: "Asia",
    topic: "Education Support",
    message: "Thank you from the bottom of our hearts. The digital classroom program changed our local school completely. My children now have beautiful books and tablets, and they go to class with so much pride.",
    timestamp: "2 days ago"
  },
  {
    id: "asia-edu-2",
    name: "Minh Nguyen",
    city: "Da Nang",
    country: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    topic: "Education Support",
    message: "This changed our lives. Our family could never afford standard learning kits, but the foundation made sure every single child had them. We are forever grateful.",
    timestamp: "1 week ago"
  },
  // Topic: Healthcare Programs
  {
    id: "asia-health-1",
    name: "Kenji Tanaka",
    city: "Okinawa",
    country: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    topic: "Healthcare Programs",
    message: "God bless Prince Fazza. Through the mobile health clinic, my elderly grandmother finally got her diabetes checked and received proper oncology consultation. We are forever grateful for this medicine.",
    timestamp: "3 weeks ago"
  },
  {
    id: "asia-health-2",
    name: "Somchai Prasert",
    city: "Chiang Mai",
    country: "Thailand",
    flag: "🇹🇭",
    region: "Asia",
    topic: "Healthcare Programs",
    message: "Thank you from the bottom of our hearts. The medical camp came directly to our mountain path. They treated my niece's chest infection and gave her clean, proper syrup. Truly a blessing.",
    timestamp: "2 months ago"
  },
  // Topic: Child Welfare
  {
    id: "asia-child-1",
    name: "Maria Santos",
    city: "Iloilo",
    country: "Philippines",
    flag: "🇵🇭",
    region: "Asia",
    topic: "Child Welfare",
    message: "We are forever grateful. The children's sanctuary here provides nutritious daily meals and safe play space. My little sister is thriving and smiles every afternoon now. ❤️",
    timestamp: "6 months ago"
  },
  {
    id: "asia-child-2",
    name: "Min-ji Park",
    city: "Busan",
    country: "South Korea",
    flag: "🇰🇷",
    region: "Asia",
    topic: "Child Welfare",
    message: "This changed our lives. The neighborhood nursery and security space created by the foundation is a beautiful place of support for working mothers. God bless your team.",
    timestamp: "1 year ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "asia-human-1",
    name: "Tariqul Islam",
    city: "Sylhet",
    country: "Bangladesh",
    flag: "🇧🇩",
    region: "Asia",
    topic: "Humanitarian Assistance",
    message: "Thank you from the bottom of our hearts. During the bitter cold wave, heavy winter packages and thermal hot food containers reached our remote camp. You remembered us when we felt lost.",
    timestamp: "3 days ago"
  },
  {
    id: "asia-human-2",
    name: "Dinesh Perera",
    city: "Kandy",
    country: "Sri Lanka",
    flag: "🇱🇰",
    region: "Asia",
    topic: "Humanitarian Assistance",
    message: "God bless Prince Fazza and his vision. The food kits and clean family dynamic kits brought warm relief and restored human dignity in our struggling village. Thank you deeply. 🙏",
    timestamp: "3 years ago"
  },
  // Topic: Community Transformation
  {
    id: "asia-comm-1",
    name: "Putu Wijaya",
    city: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    region: "Asia",
    topic: "Community Transformation",
    message: "This changed our lives. Having clean water flowing directly from the solar filtration pump means our small kids are safe from stomach fevers. It has saved lives here.",
    timestamp: "5 years ago"
  },
  {
    id: "asia-comm-2",
    name: "Iris Tan",
    city: "Penang",
    country: "Malaysia",
    flag: "🇲🇾",
    region: "Asia",
    topic: "Community Transformation",
    message: "Thank you from the bottom of our hearts. The vocational training and agricultural gardens transformed our idle river lot into high-yield vegetable crops. It is magical.",
    timestamp: "4 months ago"
  },
  // Topic: School Renovation
  {
    id: "asia-school-1",
    name: "Wei Zhang",
    city: "Sichuan",
    country: "China",
    flag: "🇨🇳",
    region: "Asia",
    topic: "School Renovation",
    message: "God bless Prince Fazza. Our mountain school's leaking roof and cracked windows were completely rebuilt. Now our kids study in warm, beautiful, secure rooms. It is safe.",
    timestamp: "11 months ago"
  },
  {
    id: "asia-school-2",
    name: "Saki Sato",
    city: "Sendai",
    country: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    topic: "School Renovation",
    message: "This changed our lives. The refurbished study centers and science equipment are simply fantastic. Our school can now prepare youth for regional universities. Thank you deeply.",
    timestamp: "9 months ago"
  },
  // Topic: Youth Development
  {
    id: "asia-youth-1",
    name: "Aarav Patel",
    city: "Gujarat",
    country: "India",
    flag: "🇮🇳",
    region: "Asia",
    topic: "Youth Development",
    message: "Thank you from the bottom of our hearts. The digital design hub training gave me coding and layout skills. I secured a stable software job and can fully support my family now. 🌟",
    timestamp: "3 weeks ago"
  },
  {
    id: "asia-youth-2",
    name: "Ji-Won Kim",
    city: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    region: "Asia",
    topic: "Youth Development",
    message: "We are forever grateful. The tech mentoring scholarship and project workspace inspired me to focus on social technology instead of bad street paths. You saved our dreams.",
    timestamp: "6 days ago"
  },
  // Topic: Women's Empowerment
  {
    id: "asia-women-1",
    name: "Linh Tran",
    city: "Hue",
    country: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    topic: "Women's Empowerment",
    message: "This changed our lives. The cooperative sewing workshop and business bookkeeping guides helped us start our own textile line. We are financially independent now.",
    timestamp: "5 months ago"
  },
  {
    id: "asia-women-2",
    name: "Maya Shrestha",
    city: "Pokhara",
    country: "Nepal",
    flag: "🇳🇵",
    region: "Asia",
    topic: "Women's Empowerment",
    message: "Thank you from the bottom of our hearts. The small livestock seed loans enabled twenty single mothers in our high valley to purchase goats and pay their childrens' fees. 😊",
    timestamp: "10 months ago"
  },
  // Topic: Emergency Relief
  {
    id: "asia-emer-1",
    name: "Jun-jun de la Cruz",
    city: "Manila",
    country: "Philippines",
    flag: "🇵🇭",
    region: "Asia",
    topic: "Emergency Relief",
    message: "God bless Prince Fazza. When the tropical typhoon washed away our wooden houses, the foundation's clean water and rescue rations reached us immediately. True heroes.",
    timestamp: "12 days ago"
  },
  {
    id: "asia-emer-2",
    name: "Wayan Suarta",
    city: "Lombok",
    country: "Indonesia",
    flag: "🇮🇩",
    region: "Asia",
    topic: "Emergency Relief",
    message: "Thank you from the bottom of our hearts. The primary aid kits, dry wool blankets, and heavy flashlights arrived within hours of the high tremor. You didn't leave us alone.",
    timestamp: "2 years ago"
  },
  // Topic: Housing Support
  {
    id: "asia-house-1",
    name: "Rajesh Kumar",
    city: "Bihar",
    country: "India",
    flag: "🇮🇳",
    region: "Asia",
    topic: "Housing Support",
    message: "Our soil house was swept away in the monsoon flood. With the rebuilding grant, we constructed a strong, elevated brick home. This has changed our future entirely. 💙",
    timestamp: "5 months ago"
  },
  {
    id: "asia-house-2",
    name: "Li Na",
    city: "Yunnan",
    country: "China",
    flag: "🇨🇳",
    region: "Asia",
    topic: "Housing Support",
    message: "We are forever grateful. The foundation helped us reinforce our seismic proof roof and walls. Now our family sleeps in complete safety, even during winter storms.",
    timestamp: "7 months ago"
  },

  // ==========================================
  // EUROPE (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "euro-edu-1",
    name: "Lukas Becker",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    topic: "Education Support",
    message: "Thank you from the bottom of our hearts. The immigrant youth support center received excellent tablets and textbooks. This gives children a beautiful path to integrate. 🌟",
    timestamp: "2 months ago"
  },
  {
    id: "euro-edu-2",
    name: "Emily Johnson",
    city: "Manchester",
    country: "UK",
    flag: "🇬🇧",
    region: "Europe",
    topic: "Education Support",
    message: "This changed our lives. The local study bursaries helped my teenage nephew focus on his exams instead of taking late shifts. We are forever grateful.",
    timestamp: "4 months ago"
  },
  // Topic: Healthcare Programs
  {
    id: "euro-health-1",
    name: "Chloé Dubois",
    city: "Lyon",
    country: "France",
    flag: "🇫🇷",
    region: "Europe",
    topic: "Healthcare Programs",
    message: "God bless Prince Fazza and everyone involved. The specialized clinical pediatric oncology equipment donated to our ward has given our sweet children a real chance at recovery.",
    timestamp: "14 months ago"
  },
  {
    id: "euro-health-2",
    name: "Alejandro Garcia",
    city: "Seville",
    country: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    topic: "Healthcare Programs",
    message: "We are forever grateful. The medical diagnostic vans traveled deep to our remote farming communities, providing cardiac checks when regional staff was overwhelmed. Exceptional care.",
    timestamp: "1 year ago"
  },
  // Topic: Child Welfare
  {
    id: "euro-child-1",
    name: "Giosuè Rossi",
    city: "Florence",
    country: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    topic: "Child Welfare",
    message: "Thank you from the bottom of our hearts. The child therapy and clinical rehabilitation hub has been an absolute miracle for my twin boys. Our days are full of hope now. ❤️",
    timestamp: "3 years ago"
  },
  {
    id: "euro-child-2",
    name: "Kacper Kowalski",
    city: "Krakow",
    country: "Poland",
    flag: "🇵🇱",
    region: "Europe",
    topic: "Child Welfare",
    message: "This changed our lives. The counseling shelter and warm after-school spaces keep our kids safe and feeling loved in high-stress streets. We are deeply thankful.",
    timestamp: "12 months ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "euro-human-1",
    name: "Olena Shevchenko",
    city: "Lviv",
    country: "Ukraine",
    flag: "🇺🇦",
    region: "Europe",
    topic: "Humanitarian Assistance",
    message: "God bless Prince Fazza. In the freezing cold when our utility power grids blacked out completely, the heavy transport loaded with generators and heavy blankets saved our elder ward.",
    timestamp: "16 months ago"
  },
  {
    id: "euro-human-2",
    name: "Eleni Papadopoulou",
    city: "Thessaloniki",
    country: "Greece",
    flag: "🇬🇷",
    region: "Europe",
    topic: "Humanitarian Assistance",
    message: "We are forever grateful. The regional food centers and emergency warm clothing drives restored comfort and human dignity to hundreds of families facing economic hardship.",
    timestamp: "1 year ago"
  },
  // Topic: Community Transformation
  {
    id: "euro-comm-1",
    name: "Conor O'Brien",
    city: "Galway",
    country: "Ireland",
    flag: "🇮🇪",
    region: "Europe",
    topic: "Community Transformation",
    message: "This changed our lives. The senior community greenhouse and nature project became a beautiful hub of true friendship and wellness for our isolated elderly neighbors. Lovely work.",
    timestamp: "11 months ago"
  },
  {
    id: "euro-comm-2",
    name: "Johan Nilson",
    city: "Uppsala",
    country: "Sweden",
    flag: "🇸🇪",
    region: "Europe",
    topic: "Community Transformation",
    message: "Thank you from the bottom of our hearts. Your funding for local integration programs has enabled over forty newcomer families to make local friends and build roots here.",
    timestamp: "9 months ago"
  },
  // Topic: School Renovation
  {
    id: "euro-school-1",
    name: "Sophie de Jong",
    city: "Utrecht",
    country: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    topic: "School Renovation",
    message: "God bless Prince Fazza. The older regional nursery was beautifully renovated with energy-efficient heat and lovely modern play decks. Our little ones' smiles are priceless. 🙏",
    timestamp: "15 months ago"
  },
  {
    id: "euro-school-2",
    name: "Sarah Williams",
    city: "Cardiff",
    country: "UK",
    flag: "🇬🇧",
    region: "Europe",
    topic: "School Renovation",
    message: "We are forever grateful. Reconstructing the old primary building and adding clean classrooms brought fresh hope and positive energy to our entire neighborhood.",
    timestamp: "8 months ago"
  },
  // Topic: Youth Development
  {
    id: "euro-youth-1",
    name: "Sofia Ruiz",
    city: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    topic: "Youth Development",
    message: "This changed our lives. The creative design mentorship program was my turning point. I gained graphic skills and self-belief. I'm officially starting my agency job tomorrow!",
    timestamp: "1 month ago"
  },
  {
    id: "euro-youth-2",
    name: "Marco Moretti",
    city: "Naples",
    country: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    topic: "Youth Development",
    message: "Thank you from the bottom of our hearts. The culinary workshop sponsorships helped many local lads from tough environments find professional paths inside world-class kitchens.",
    timestamp: "5 months ago"
  },
  // Topic: Women's Empowerment
  {
    id: "euro-women-1",
    name: "Hanna Schmidt",
    city: "Berlin",
    country: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    topic: "Women's Empowerment",
    message: "We are forever grateful. The safety housing resources and trade career training gave me the strength to escape domestic despair and secure a stable, beautiful job. ❤️",
    timestamp: "7 months ago"
  },
  {
    id: "euro-women-2",
    name: "Clara Davis",
    city: "Birmingham",
    country: "UK",
    flag: "🇬🇧",
    region: "Europe",
    topic: "Women's Empowerment",
    message: "God bless Prince Fazza. The local mother network grant let us launch a mutual child-care project, liberating over thirty single moms to attend regular professional shifts.",
    timestamp: "6 weeks ago"
  },
  // Topic: Emergency Relief
  {
    id: "euro-emer-1",
    name: "Janusz Nowak",
    city: "Wroclaw",
    country: "Poland",
    flag: "🇵🇱",
    region: "Europe",
    topic: "Emergency Relief",
    message: "When the river flooded our ground-level flats, the dry dehumidifiers and nutrition packs saved our sanity. Thank you from the bottom of our hearts.",
    timestamp: "10 days ago"
  },
  {
    id: "euro-emer-2",
    name: "Andrei Popescu",
    city: "Sighisoara",
    country: "Romania",
    flag: "🇷🇴",
    region: "Europe",
    topic: "Emergency Relief",
    message: "We are forever grateful to the Prince Fazza Charity Foundation. Your prompt volunteer networks came with direct clothing and building tools during the land slips.",
    timestamp: "18 months ago"
  },
  // Topic: Housing Support
  {
    id: "euro-house-1",
    name: "James Wilson",
    city: "Leeds",
    country: "UK",
    flag: "🇬🇧",
    region: "Europe",
    topic: "Housing Support",
    message: "This changed our lives. The warm transitional shelter program took us off the freezing streets and gave us our dignity. We are settled in our own small flat now. 😊",
    timestamp: "2 months ago"
  },
  {
    id: "euro-house-2",
    name: "Andreas Papas",
    city: "Athens",
    country: "Greece",
    flag: "🇬🇷",
    region: "Europe",
    topic: "Housing Support",
    message: "God bless Prince Fazza. With your restoration subsidy, we fully repaired our earthquake-cracked masonry. We are finally cooking in safety.",
    timestamp: "11 months ago"
  },

  // ==========================================
  // NORTH AMERICA (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "na-edu-1",
    name: "Sarah Jenkins",
    city: "Detroit",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Education Support",
    message: "Thank you from the bottom of our hearts. The inner-city literacy drive and reading grant covers all college preparation materials. This changed my entire future path.",
    timestamp: "2 months ago"
  },
  {
    id: "na-edu-2",
    name: "Jean-Pierre Roy",
    city: "Quebec City",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    topic: "Education Support",
    message: "God bless Prince Fazza. The children in our remote northern schools finally received modern educational tools and electronic maps. The glow of excitement is lovely.",
    timestamp: "5 months ago"
  },
  // Topic: Healthcare Programs
  {
    id: "na-health-1",
    name: "Michael Miller",
    city: "Chicago",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Healthcare Programs",
    message: "We are forever grateful. The downtown medical trailer visits us regularly, providing free cardiac checks and the dental treatments we had no way of paying for. God bless you.",
    timestamp: "1 month ago"
  },
  {
    id: "na-health-2",
    name: "Linda Thompson",
    city: "Atlanta",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Healthcare Programs",
    message: "This changed our lives. My little girl received high-quality modern corrective orthopedic support through this program. She is running with her playmates now. ❤️",
    timestamp: "3 months ago"
  },
  // Topic: Child Welfare
  {
    id: "na-child-1",
    name: "Mateo Rodriguez",
    city: "Oaxaca",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "Child Welfare",
    message: "God bless Prince Fazza and everyone involved in this program. The local pediatric checkups and school healthy lunch drives made my little boy healthy and strong.",
    timestamp: "11 months ago"
  },
  {
    id: "na-child-2",
    name: "Sophia Tremblay",
    city: "Montreal",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    topic: "Child Welfare",
    message: "We are forever grateful. The children's sanctuary is a safe, cozy space of warmth. Our youngsters are guided with love.",
    timestamp: "1 month ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "na-human-1",
    name: "Joseph Miller",
    city: "Seattle",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Humanitarian Assistance",
    message: "Thank you from the bottom of our hearts. The winter survival operations provided hot broth, thick dry coats, and temporary shelter during the sub-zero blizzards. Absolute lifesavers. 🙏",
    timestamp: "2 months ago"
  },
  {
    id: "na-human-2",
    name: "Maria Gomez",
    city: "Juarez",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "Humanitarian Assistance",
    message: "This changed our lives. When the local plant suddenly closed, your family nutrition plan entered our neighborhood. You kept our children fed. We will always remember. ❤️",
    timestamp: "6 months ago"
  },
  // Topic: Community Transformation
  {
    id: "na-comm-1",
    name: "Emily McDonald",
    city: "Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    topic: "Community Transformation",
    message: "God bless Prince Fazza. Turning the empty concrete lot into a high-soil community fresh garden has brought clean vegetables directly to struggling elderly homes. Exceptional.",
    timestamp: "4 months ago"
  },
  {
    id: "na-comm-2",
    name: "Carlos Sanchez",
    city: "Veracruz",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "Community Transformation",
    message: "We are forever grateful. The foundation helped us construct a solar fresh water sanitizing unit. The local fevers has disappeared. Our village is healthy and thriving.",
    timestamp: "2 months ago"
  },
  // Topic: School Renovation
  {
    id: "na-school-1",
    name: "Juan Perez",
    city: "Puebla",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "School Renovation",
    message: "This changed our lives. Our simple village school was nearly collapsing. Today, the classrooms are solid, colorful, and warm. Thank you to Prince Fazza from all our hearts.",
    timestamp: "8 months ago"
  },
  {
    id: "na-school-2",
    name: "Robert Davies",
    city: "Cleveland",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "School Renovation",
    message: "Thank you from the bottom of our hearts. Our gym and playground were completely rebuilt. Our school kids now have a healthy place to play and learn. Bless you.",
    timestamp: "10 months ago"
  },
  // Topic: Youth Development
  {
    id: "na-youth-1",
    name: "Marcus Green",
    city: "Philadelphia",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Youth Development",
    message: "God bless Prince Fazza. The design and coding camp took me off the streets and kept me focused. Today, I'm heading into college as an IT freshman. Truly grateful. 🌟",
    timestamp: "2 weeks ago"
  },
  {
    id: "na-youth-2",
    name: "David Brown",
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    topic: "Youth Development",
    message: "We are forever grateful. The youth entrepreneur grant sponsored my digital restoration project. I am now working full-time and supporting my grandmother.",
    timestamp: "5 months ago"
  },
  // Topic: Women's Empowerment
  {
    id: "na-women-1",
    name: "Isabella Hernandez",
    city: "Guadalajara",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "Women's Empowerment",
    message: "This changed our lives. The embroidery workshop let over twenty native mothers sell directly to international folk catalogs. No middlemen, only stable family income.",
    timestamp: "8 months ago"
  },
  {
    id: "na-women-2",
    name: "Nancy Carter",
    city: "Oakland",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Women's Empowerment",
    message: "Thank you from the bottom of our hearts. The vocational solar training certified me as a technician. I can finally support my little girls with confidence and independence. 🙏",
    timestamp: "3 weeks ago"
  },
  // Topic: Emergency Relief
  {
    id: "na-emer-1",
    name: "David Martinez",
    city: "New Orleans",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Emergency Relief",
    message: "God bless Prince Fazza. When the heavy hurricane stripped our roofing, your regional response team arrived with heavy plastic tarps and dry meals immediately.",
    timestamp: "1 year ago"
  },
  {
    id: "na-emer-2",
    name: "Alexander Gauthier",
    city: "Halifax",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    topic: "Emergency Relief",
    message: "We are forever grateful. Your winter storm logistics team cleared our rural tracks and delivered insulin supplies to my disabled mom. True heroes of service.",
    timestamp: "11 months ago"
  },
  // Topic: Housing Support
  {
    id: "na-house-1",
    name: "John Davis",
    city: "Baltimore",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    topic: "Housing Support",
    message: "This changed our lives. After struggles with housing for over a year, this security deposit grant helped us settle down safely. We can finally plan for the future. 😊",
    timestamp: "2 months ago"
  },
  {
    id: "na-house-2",
    name: "Diego Torres",
    city: "Tijuana",
    country: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    topic: "Housing Support",
    message: "Thank you from the bottom of our hearts. The foundation laid solid seismic stone foundations and dry brick walls for our family cottage. We are cozy and dry.",
    timestamp: "7 months ago"
  },

  // ==========================================
  // SOUTH AMERICA (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "sa-edu-1",
    name: "Camila Silva",
    city: "São Paulo",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Education Support",
    message: "We are forever grateful. The kids in our community now have durable leather backpacks and real textbooks. They walk to school holding their heads high. ❤️",
    timestamp: "1 year ago"
  },
  {
    id: "sa-edu-2",
    name: "Benjamin Rojas",
    city: "Rosario",
    country: "Argentina",
    flag: "🇦🇷",
    region: "South America",
    topic: "Education Support",
    message: "Thank you from the bottom of our hearts. The computers and digital materials let our local students prepare for the college tests. We have real hope today.",
    timestamp: "5 months ago"
  },
  // Topic: Healthcare Programs
  {
    id: "sa-health-1",
    name: "Natalia Restrepo",
    city: "Medellin",
    country: "Colombia",
    flag: "🇨🇴",
    region: "South America",
    topic: "Healthcare Programs",
    message: "God bless Prince Fazza. The medical clinic cured my child's long asthma issues. We could never afford to pay for specialized doctors in the city. Thank you!",
    timestamp: "10 months ago"
  },
  {
    id: "sa-health-2",
    name: "Lucas Santana",
    city: "Rio de Janeiro",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Healthcare Programs",
    message: "This changed our lives. The pediatric vans make regular trips directly to our hillside trails. Our infants are fully double vaccines now. Exceptional work.",
    timestamp: "4 months ago"
  },
  // Topic: Child Welfare
  {
    id: "sa-child-1",
    name: "Santiago Quispe",
    city: "Cusco",
    country: "Peru",
    flag: "🇵🇪",
    region: "South America",
    topic: "Child Welfare",
    message: "We are forever grateful. The morning high-protein meal drives and safety child guidelines are a great blessing. Our youth have secure spaces and food.",
    timestamp: "11 months ago"
  },
  {
    id: "sa-child-2",
    name: "Gabriela Santos",
    city: "Salvador",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Child Welfare",
    message: "Thank you from the bottom of our hearts. The local child support house is a pure haven of peace and education. It has brought relief and hope to struggling mothers. 🙏",
    timestamp: "8 months ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "sa-human-1",
    name: "Carlos Mendez",
    city: "Caracas",
    country: "Venezuela",
    flag: "🇻🇪",
    region: "South America",
    topic: "Humanitarian Assistance",
    message: "God bless Prince Fazza. The infant formula, milk boxes, and local healthcare packs reached us during our hardest year. We feel genuinely remembered.",
    timestamp: "6 months ago"
  },
  {
    id: "sa-human-2",
    name: "Juan Cruz",
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    region: "South America",
    topic: "Humanitarian Assistance",
    message: "This changed our lives. Your neighborhood food pantries and mobile clinics supported us during unexpected layoffs. True humanitarian warmth and compassion.",
    timestamp: "8 months ago"
  },
  // Topic: Community Transformation
  {
    id: "sa-comm-1",
    name: "Maria Chimbo",
    city: "Quito",
    country: "Ecuador",
    flag: "🇪🇨",
    region: "South America",
    topic: "Community Transformation",
    message: "Thank you from the bottom of our hearts. The solar high-altitude crop greenhouses yielded fresh nutritious food even during freezing wind events. Amazing blessing.",
    timestamp: "8 months ago"
  },
  {
    id: "sa-comm-2",
    name: "Antonio Lima",
    city: "Fortaleza",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Community Transformation",
    message: "We are forever grateful. The solar water pumping system brought green back to our dry family plots. It feels like a beautiful miracle in the soil.",
    timestamp: "2 months ago"
  },
  // Topic: School Renovation
  {
    id: "sa-school-1",
    name: "Isabella Gomez",
    city: "Cali",
    country: "Colombia",
    flag: "🇨🇴",
    region: "South America",
    topic: "School Renovation",
    message: "God bless Prince Fazza. Reconstructing our simple rural school back to safe standards brought fifty eager kids back to class. The buildings are secure and beautiful.",
    timestamp: "10 months ago"
  },
  {
    id: "sa-school-2",
    name: "Maria Fernandez",
    city: "Arequipa",
    country: "Peru",
    flag: "🇵🇪",
    region: "South America",
    topic: "School Renovation",
    message: "This changed our lives. The crumbling school bathrooms and leaking ceiling were fully made new. Our children study in hygienic, beautiful comfort now.",
    timestamp: "9 months ago"
  },
  // Topic: Youth Development
  {
    id: "sa-youth-1",
    name: "Thiago Silva",
    city: "Belo Horizonte",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Youth Development",
    message: "We are forever grateful. The trade carpentry sessions gave me real skills and my own tools. I can finally secure shifts and support my two little brothers.",
    timestamp: "6 days ago"
  },
  {
    id: "sa-youth-2",
    name: "Felipe Moreno",
    city: "Santiago",
    country: "Chile",
    flag: "🇨🇱",
    region: "South America",
    topic: "Youth Development",
    message: "Thank you from the bottom of our hearts. The digital arts and sports mentorship program kept me focused on positive futures. Today, I'm starting an apprenticeship. 🌟",
    timestamp: "1 month ago"
  },
  // Topic: Women's Empowerment
  {
    id: "sa-women-1",
    name: "Juana Huaman",
    city: "La Paz",
    country: "Bolivia",
    flag: "🇧🇴",
    region: "South America",
    topic: "Women's Empowerment",
    message: "God bless Prince Fazza and his beautiful soul. The knitting cooperative funding empowered thirty Andean women to trade directly. Our dignity and wages are secured.",
    timestamp: "5 months ago"
  },
  {
    id: "sa-women-2",
    name: "Sofia Lopez",
    city: "Cordoba",
    country: "Argentina",
    flag: "🇦🇷",
    region: "South America",
    topic: "Women's Empowerment",
    message: "This changed our lives. The female farming seed network let us expand our dairy bakery. We feel incredibly proud and independent now. 😊",
    timestamp: "2 months ago"
  },
  // Topic: Emergency Relief
  {
    id: "sa-emer-1",
    name: "Manuel Torres",
    city: "Cartagena",
    country: "Colombia",
    flag: "🇨🇴",
    region: "South America",
    topic: "Emergency Relief",
    message: "Thank you from the bottom of our hearts. When the wet mudslides pushed down our fences, your prompt team set up safe cots and medical trailers immediately. Pure kindness.",
    timestamp: "15 days ago"
  },
  {
    id: "sa-emer-2",
    name: "Ricardo Diaz",
    city: "Valparaiso",
    country: "Chile",
    flag: "🇨🇱",
    region: "South America",
    topic: "Emergency Relief",
    message: "We are forever grateful. When the dry forest fires burnt our homes, the foundation's swift relief packages brought blankets and essential diagnostic support in hours.",
    timestamp: "1 year ago"
  },
  // Topic: Housing Support
  {
    id: "sa-house-1",
    name: "Luis Lopez",
    city: "Lima",
    country: "Peru",
    flag: "🇵🇪",
    region: "South America",
    topic: "Housing Support",
    message: "God bless Prince Fazza. The dry modern modular houses let us survive the cold winter rains without our floors turning to thick mud. It is a true blessing.",
    timestamp: "11 months ago"
  },
  {
    id: "sa-house-2",
    name: "Felipe Barbosa",
    city: "Recife",
    country: "Brazil",
    flag: "🇧🇷",
    region: "South America",
    topic: "Housing Support",
    message: "This changed our lives. Reconstructing our flood-weakened walls with sturdy bricks and dry pipe drainage means our kids sleep safely and dry. We are forever thankful. ❤️",
    timestamp: "8 months ago"
  },

  // ==========================================
  // OCEANIA (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "oce-edu-1",
    name: "Liam Smith",
    city: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    topic: "Education Support",
    message: "Thank you from the bottom of our hearts. The indigenous youth learning grant helped my daughter focus fully on her studies. She wants to become a doctor now.",
    timestamp: "2 years ago"
  },
  {
    id: "oce-edu-2",
    name: "Sereana Waqanivalu",
    city: "Suva",
    country: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    topic: "Education Support",
    message: "This changed our lives. The proper school supplies, satchels, and warm solar lamps let twenty village kids do their spelling even after the power goes. Beautiful support. 🌟",
    timestamp: "4 months ago"
  },
  // Topic: Healthcare Programs
  {
    id: "oce-health-1",
    name: "Alson Vula",
    city: "Port Vila",
    country: "Vanuatu",
    flag: "🇻🇺",
    region: "Oceania",
    topic: "Healthcare Programs",
    message: "God bless Prince Fazza. The medical boat arrived with healthy vaccines and baby care directly to our small shore. My precious daughter is safe and thriving.",
    timestamp: "5 months ago"
  },
  {
    id: "oce-health-2",
    name: "Sina Sani",
    city: "Apia",
    country: "Samoa",
    flag: "🇼🇸",
    region: "Oceania",
    topic: "Healthcare Programs",
    message: "We are forever grateful. The local pediatric checks and family dental clinic was the only care our children have had in years. Thank you from the bottom of our hearts.",
    timestamp: "3 months ago"
  },
  // Topic: Child Welfare
  {
    id: "oce-child-1",
    name: "Mereoni Ravuvu",
    city: "Nadi",
    country: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    topic: "Child Welfare",
    message: "Thank you from the bottom of our hearts. The clean nutritional lunch program at school has brought so much bright life and focus back to our classrooms. Our kids are happy. ❤️",
    timestamp: "6 months ago"
  },
  {
    id: "oce-child-2",
    name: "Peter Keke",
    city: "Honiara",
    country: "Solomon Islands",
    flag: "🇸🇧",
    region: "Oceania",
    topic: "Child Welfare",
    message: "This changed our lives. Rebuilding the local play fields and children's sanctuary kept our little ones safe from the incoming coastal swells. God bless Prince Fazza charity! 🙏",
    timestamp: "9 months ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "oce-human-1",
    name: "John Kaupa",
    city: "Port Moresby",
    country: "Papua New Guinea",
    flag: "🇵🇬",
    region: "Oceania",
    topic: "Humanitarian Assistance",
    message: "We are forever grateful. The clean food kits and water purification units reached our highlands during the severe seasonal drought. You saved so many lives here.",
    timestamp: "2 months ago"
  },
  {
    id: "oce-human-2",
    name: "Tevita Finau",
    city: "Nuku'alofa",
    country: "Tonga",
    flag: "🇹🇴",
    region: "Oceania",
    topic: "Humanitarian Assistance",
    message: "Thank you from the bottom of our hearts. The fresh family hygiene bags and medical help cards restored our health and hope. We feel truly valued as humans.",
    timestamp: "1 year ago"
  },
  // Topic: Community Transformation
  {
    id: "oce-comm-1",
    name: "Siteri Tawake",
    city: "Labasa",
    country: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    topic: "Community Transformation",
    message: "God bless Prince Fazza. Getting the clean water solar systems set up means our mothers no longer trek miles carrying heavy metal buckets. It is a beautiful relief.",
    timestamp: "4 months ago"
  },
  {
    id: "oce-comm-2",
    name: "Losa To'o",
    city: "Savai'i",
    country: "Samoa",
    flag: "🇼🇸",
    region: "Oceania",
    topic: "Community Transformation",
    message: "This changed our lives. The organic garden training and crop compost equipment let us recover farming self-reliance on our rocky island shores. Truly magnificent.",
    timestamp: "3 months ago"
  },
  // Topic: School Renovation
  {
    id: "oce-school-1",
    name: "Kalmer Silas",
    city: "Santo",
    country: "Vanuatu",
    flag: "🇻🇺",
    region: "Oceania",
    topic: "School Renovation",
    message: "We are forever grateful. When the tropical cyclone tore down our old school fences and roof, Prince Fazza's builders erected a beautiful storm-safe block. Thank you!",
    timestamp: "10 months ago"
  },
  {
    id: "oce-school-2",
    name: "Grace Mae",
    city: "Gizo",
    country: "Solomon Islands",
    flag: "🇸🇧",
    region: "Oceania",
    topic: "School Renovation",
    message: "Thank you from the bottom of our hearts. Our simple classroom now has clear glass windows, lovely wooden desks, and light. Learning is beautiful again. 😊",
    timestamp: "7 months ago"
  },
  // Topic: Youth Development
  {
    id: "oce-youth-1",
    name: "Aroha Te Wiata",
    city: "Rotorua",
    country: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    topic: "Youth Development",
    message: "This changed our lives. Providing our Maori youth with vocational technology mentoring has been a powerful, deeply respectful legacy. They are inspired to lead.",
    timestamp: "10 months ago"
  },
  {
    id: "oce-youth-2",
    name: "Jone Vakatawa",
    city: "Lautoka",
    country: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    topic: "Youth Development",
    message: "God bless Prince Fazza. The trade engine workshop gave twenty young beach lads carpentry and spark skills. We are certified mechanics now. Unbelievable feeling.",
    timestamp: "1 month ago"
  },
  // Topic: Women's Empowerment
  {
    id: "oce-women-1",
    name: "Helen Yalo",
    city: "Goroka",
    country: "Papua New Guinea",
    flag: "🇵🇬",
    region: "Oceania",
    topic: "Women's Empowerment",
    message: "Thank you from the bottom of our hearts. Providing processing machinery saved sixty Highland mothers from crushing manual labor and doubled our coffee trade wages.",
    timestamp: "3 months ago"
  },
  {
    id: "oce-women-2",
    name: "Mele Koloa",
    city: "Vava'u",
    country: "Tonga",
    flag: "🇹🇴",
    region: "Oceania",
    topic: "Women's Empowerment",
    message: "We are forever grateful. The craft micro-loans let our women weavers buy natural dyes and materials. Our heritage looms are alive, and we can feed our villages.",
    timestamp: "6 months ago"
  },
  // Topic: Emergency Relief
  {
    id: "oce-emer-1",
    name: "Paula Bale",
    city: "Rakiraki",
    country: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    topic: "Emergency Relief",
    message: "God bless Prince Fazza. When high coastal storm surges filled our kitchens, your response boats arrived within hours loaded with emergency warm dry blankets and rations.",
    timestamp: "3 months ago"
  },
  {
    id: "oce-emer-2",
    name: "Marie Tari",
    city: "Pentecost",
    country: "Vanuatu",
    flag: "🇻🇺",
    region: "Oceania",
    topic: "Emergency Relief",
    message: "This changed our lives. Setting up the secure ocean rescue shelter with water tanks kept seventy families completely safe when the storm struck. We are alive today. 🙏",
    timestamp: "11 months ago"
  },
  // Topic: Housing Support
  {
    id: "oce-house-1",
    name: "David Kula",
    city: "Madang",
    country: "Papua New Guinea",
    flag: "🇵🇬",
    region: "Oceania",
    topic: "Housing Support",
    message: "We are forever grateful. Your elevated wood post home building program gave our family a solid room above the coastal soil. We finally sleep in dryness.",
    timestamp: "4 months ago"
  },
  {
    id: "oce-house-2",
    name: "Thomas Lalo",
    city: "Malaita",
    country: "Solomon Islands",
    flag: "🇸🇧",
    region: "Oceania",
    topic: "Housing Support",
    message: "Thank you from the bottom of our hearts. The dry metal sheets and solid foundation columns let us convert our decaying grass shack into a real typhoon-resilient house.",
    timestamp: "5 months ago"
  },

  // ==========================================
  // MIDDLE EAST (20 comments)
  // ==========================================
  // Topic: Education Support
  {
    id: "me-edu-1",
    name: "Fatma Al-Mansoori",
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    topic: "Education Support",
    message: "Alhamdulillah, may Allah bless Prince Fazza and everyone involved in this program. The student laptops and coding workshops gave our children future skills. We are deeply grateful.",
    timestamp: "2 weeks ago"
  },
  {
    id: "me-edu-2",
    name: "Layla Mahmoud",
    city: "Cairo",
    country: "Egypt",
    flag: "🇪🇬",
    region: "Middle East",
    topic: "Education Support",
    message: "We are deeply grateful for the study support. My eldest son completed his final engineering term with beautiful results. May Allah reward this wonderful kindness.",
    timestamp: "7 months ago"
  },
  // Topic: Healthcare Programs
  {
    id: "me-health-1",
    name: "Mustafa Yilmaz",
    city: "Izmir",
    country: "Turkey",
    flag: "🇹🇷",
    region: "Middle East",
    topic: "Healthcare Programs",
    message: "Alhamdulillah, the mobile clinics and specialized machinery reached our regional clinic. My little nephew got his treatment safely. May Allah reward this beautiful kindness.",
    timestamp: "8 months ago"
  },
  {
    id: "me-health-2",
    name: "Yasmine Benjelloun",
    city: "Marrakech",
    country: "Morocco",
    flag: "🇲🇦",
    region: "Middle East",
    topic: "Healthcare Programs",
    message: "We are deeply grateful for this service. The pediatric caravans visited our deep mountain tracks, giving free checkups and medicines to our children. May Allah reward you. ❤️",
    timestamp: "8 months ago"
  },
  // Topic: Child Welfare
  {
    id: "me-child-1",
    name: "Faisal Al-Otaibi",
    city: "Riyadh",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    topic: "Child Welfare",
    message: "May Allah bless Prince Fazza and his noble teams. The child nurseries are built with absolute respect and provide perfect meals and tutoring to orphans. Truly heartwarming.",
    timestamp: "9 months ago"
  },
  {
    id: "me-child-2",
    name: "Layla Haddad",
    city: "Amman",
    country: "Jordan",
    flag: "🇯🇴",
    region: "Middle East",
    topic: "Child Welfare",
    message: "Alhamdulillah, the new digital children's garden is a true blessing. Our sweet kids are protected from street heat and guided with so much love. We are deeply grateful.",
    timestamp: "7 months ago"
  },
  // Topic: Humanitarian Assistance
  {
    id: "me-human-1",
    name: "Hamad Al-Thani",
    city: "Doha",
    country: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    topic: "Humanitarian Assistance",
    message: "Alhamdulillah, this borderless effort reminds us that service to humans is indeed our highest calling. May Allah reward this pristine and transparent work.",
    timestamp: "6 months ago"
  },
  {
    id: "me-human-2",
    name: "Amina Soliman",
    city: "Giza",
    country: "Egypt",
    flag: "🇪🇬",
    region: "Middle East",
    topic: "Humanitarian Assistance",
    message: "We are deeply grateful. The hot meals, flour bags, and warm items supported eighty widower homes in our town. May Allah bless Prince Fazza and everyone involved. 🤲",
    timestamp: "5 months ago"
  },
  // Topic: Community Transformation
  {
    id: "me-comm-1",
    name: "Salim Al-Saeedi",
    city: "Muscat",
    country: "Oman",
    flag: "🇴🇲",
    region: "Middle East",
    topic: "Community Transformation",
    message: "Alhamdulillah, drilling the solar-powered mountain well brought pure, fresh water directly to our dry homes. It has changed our life. May Allah reward this. 🙏",
    timestamp: "1 year ago"
  },
  {
    id: "me-comm-2",
    name: "Sarah Al-Ghamdi",
    city: "Jeddah",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    topic: "Community Transformation",
    message: "We are deeply grateful. Helping our dry villages restore organic date farms and setting up packaging devices restored stable wages here. God bless you.",
    timestamp: "2 months ago"
  },
  // Topic: School Renovation
  {
    id: "me-school-1",
    name: "Youssef Alaoui",
    city: "Marrakech",
    country: "Morocco",
    flag: "🇲🇦",
    region: "Middle East",
    topic: "School Renovation",
    message: "Alhamdulillah, our aging desert school now has modern solar energy grids and solid insulated roofs. May Allah bless Prince Fazza for protecting our students.",
    timestamp: "2 weeks ago"
  },
  {
    id: "me-school-2",
    name: "Ahmet Celik",
    city: "Adana",
    country: "Turkey",
    flag: "🇹🇷",
    region: "Middle East",
    topic: "School Renovation",
    message: "We are deeply grateful. The reconstructed community preschool is gorgeous and warm. Our kids study in perfect safety and comfort now. Masha'Allah.",
    timestamp: "8 months ago"
  },
  // Topic: Youth Development
  {
    id: "me-youth-1",
    name: "Rami Khoury",
    city: "Beirut",
    country: "Lebanon",
    flag: "🇱🇧",
    region: "Middle East",
    topic: "Youth Development",
    message: "Alhamdulillah, the digital media training scholarship gave me advanced tech tools. I just landed my first digital assistant job. This changed my life completely.",
    timestamp: "1 week ago"
  },
  {
    id: "me-youth-2",
    name: "Karim Abdel-Latif",
    city: "Alexandria",
    country: "Egypt",
    flag: "🇪🇬",
    region: "Middle East",
    topic: "Youth Development",
    message: "We are deeply grateful. The local machinery trade and welding course gave twenty teenagers a real professional career path. May Allah bless you.",
    timestamp: "3 weeks ago"
  },
  // Topic: Women's Empowerment
  {
    id: "me-women-1",
    name: "Amira Al-Masri",
    city: "Zarqa",
    country: "Jordan",
    flag: "🇯🇴",
    region: "Middle East",
    topic: "Women's Empowerment",
    message: "Alhamdulillah, the olive pressing and soap micro-grants let thirty single mothers start their own retail brand. We are fully self-sufficient now.",
    timestamp: "8 months ago"
  },
  {
    id: "me-women-2",
    name: "Maryam Al-Maktoum",
    city: "Abu Dhabi",
    country: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    topic: "Women's Empowerment",
    message: "May Allah bless Prince Fazza and his beautiful humanitarian outlook. Supporting native craft centers offers women sustainable, independent wages of honor. ❤️",
    timestamp: "1 week ago"
  },
  // Topic: Emergency Relief
  {
    id: "me-emer-1",
    name: "Elif Demir",
    city: "Hatay",
    country: "Turkey",
    flag: "🇹🇷",
    region: "Middle East",
    topic: "Emergency Relief",
    message: "When the terrible tremor cracked our apartments, your soup kitchen vans and winter heat camps set up in hours. Alhamdulillah, you saved us and kept us warm.",
    timestamp: "8 months ago"
  },
  {
    id: "me-emer-2",
    name: "Tariq Al-Fayez",
    city: "Aqaba",
    country: "Jordan",
    flag: "🇯🇴",
    region: "Middle East",
    topic: "Emergency Relief",
    message: "We are deeply grateful. During the sudden flash waters, Prince Fazza's response boats came with pure drinking rations and dry items. May Allah reward this kind soul.",
    timestamp: "7 months ago"
  },
  // Topic: Housing Support
  {
    id: "me-house-1",
    name: "Hassan El-Sayed",
    city: "Luxor",
    country: "Egypt",
    flag: "🇪🇬",
    region: "Middle East",
    topic: "Housing Support",
    message: "Alhamdulillah, my leaking clay roof was fully replaced with standard concrete and safe pipes. My children sleep safely now. May Allah bless Prince Fazza.",
    timestamp: "2 months ago"
  },
  {
    id: "me-house-2",
    name: "Fatima Zahra",
    city: "Fez",
    country: "Morocco",
    flag: "🇲🇦",
    region: "Middle East",
    topic: "Housing Support",
    message: "We are deeply grateful for this reconstruction. Rebuilding our old, crumbling stone house gave our family complete protection from high winter winds. Masha'Allah. 🤲",
    timestamp: "1 year ago"
  }
];

export function parseRelativeTimeToMs(ts: string): number {
  const numberPart = parseInt(ts, 10) || 1;
  const now = Date.now();
  const lower = ts.toLowerCase();
  
  if (lower.includes("second")) return now - numberPart * 1000;
  if (lower.includes("minute")) return now - numberPart * 60 * 1000;
  if (lower.includes("hour")) return now - numberPart * 60 * 60 * 1000;
  if (lower.includes("day")) return now - numberPart * 24 * 60 * 60 * 1000;
  if (lower.includes("week")) return now - numberPart * 7 * 24 * 60 * 60 * 1000;
  if (lower.includes("month")) return now - numberPart * 30 * 24 * 60 * 60 * 1000;
  if (lower.includes("year")) return now - numberPart * 365 * 24 * 60 * 60 * 1000;
  
  return now - 10000;
}

export function getRelativeTimeString(createdAt: number): string {
  const diff = Date.now() - createdAt;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 0) return "Just now";
  if (seconds === 0) return "Just now";
  if (seconds === 1) return "1 second ago";
  if (seconds < 60) return `${seconds} seconds ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  if (weeks < 4) return `${weeks} weeks ago`;
  
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  
  const years = Math.floor(days / 365);
  if (years === 1) return "1 year ago";
  return `${years} years ago`;
}

let cachedLegacyVoices: GlobalVoiceMessage[] | null = null;

export function getCombinedGlobalVoices(): GlobalVoiceMessage[] {
  if (!cachedLegacyVoices) {
    cachedLegacyVoices = GLOBAL_VOICES_MESSAGES.map(msg => ({
      ...msg,
      createdAt: msg.createdAt || parseRelativeTimeToMs(msg.timestamp)
    }));
  }

  if (typeof window === "undefined") return cachedLegacyVoices;
  const stored = localStorage.getItem("user_global_voices");
  if (!stored) return cachedLegacyVoices;

  try {
    const userVoices = JSON.parse(stored) as GlobalVoiceMessage[];
    return [...userVoices, ...cachedLegacyVoices];
  } catch (e) {
    return cachedLegacyVoices;
  }
}

export function saveUserGlobalVoice(voice: Omit<GlobalVoiceMessage, "timestamp"> & { createdAt: number }) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("user_global_voices");
  let userVoices: GlobalVoiceMessage[] = [];
  if (stored) {
    try {
      userVoices = JSON.parse(stored);
    } catch (e) {
      userVoices = [];
    }
  }

  const completeVoice: GlobalVoiceMessage = {
    ...voice,
    timestamp: getRelativeTimeString(voice.createdAt)
  };

  userVoices.unshift(completeVoice);
  localStorage.setItem("user_global_voices", JSON.stringify(userVoices));
}

export interface CountryPalette {
  cardBg: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  accentStrip: string;
}

const PALETTES: Record<string, CountryPalette> = {
  "United States": {
    cardBg: "bg-blue-50/35 hover:bg-blue-50/70",
    borderColor: "border-blue-100/50",
    badgeBg: "bg-blue-100/30",
    badgeText: "text-blue-700 font-bold",
    accentStrip: "from-blue-600 via-[#F4511E] to-blue-600"
  },
  "United Kingdom": {
    cardBg: "bg-indigo-50/35 hover:bg-indigo-50/70",
    borderColor: "border-indigo-100/50",
    badgeBg: "bg-indigo-100/30",
    badgeText: "text-indigo-700 font-bold",
    accentStrip: "from-blue-700 via-[#F4511E] to-blue-700"
  },
  "Switzerland": {
    cardBg: "bg-rose-50/35 hover:bg-rose-50/70",
    borderColor: "border-red-100/40",
    badgeBg: "bg-red-50",
    badgeText: "text-red-600 font-bold",
    accentStrip: "from-red-600 via-white to-red-600"
  },
  "Sweden": {
    cardBg: "bg-cyan-50/30 hover:bg-cyan-50/65",
    borderColor: "border-cyan-100/40",
    badgeBg: "bg-amber-100/40",
    badgeText: "text-blue-700 font-bold",
    accentStrip: "from-blue-600 via-amber-400 to-blue-600"
  },
  "Pakistan": {
    cardBg: "bg-emerald-50/35 hover:bg-emerald-50/70",
    borderColor: "border-emerald-100/40",
    badgeBg: "bg-emerald-100/35",
    badgeText: "text-emerald-700 font-bold",
    accentStrip: "from-emerald-600 via-white to-emerald-600"
  },
  "Paraguay": {
    cardBg: "bg-green-50/35 hover:bg-green-50/70",
    borderColor: "border-green-100/45",
    badgeBg: "bg-green-100/35",
    badgeText: "text-green-700 font-bold",
    accentStrip: "from-green-600 via-white to-green-600"
  }
};

const DEFAULT_PALETTE: CountryPalette = {
  cardBg: "bg-white hover:bg-slate-50/50",
  borderColor: "border-slate-150/40",
  badgeBg: "bg-slate-50/80",
  badgeText: "text-[#F4511E] font-bold",
  accentStrip: "from-[#F4511E]/40 via-transparent to-[#F4511E]/30"
};

export function getCountryPalette(country: string): CountryPalette {
  if (!country) return DEFAULT_PALETTE;
  const match = PALETTES[country];
  if (match) return match;

  // Dynamically hash-generate visually pleasant flag color accents for other countries
  const hash = country.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (hash % 3 === 0) {
    return {
      cardBg: "bg-emerald-50/20 hover:bg-emerald-50/50",
      borderColor: "border-emerald-100/30",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-600 font-bold",
      accentStrip: "from-emerald-500 via-emerald-100 to-zinc-50"
    };
  }
  if (hash % 3 === 1) {
    return {
      cardBg: "bg-blue-50/20 hover:bg-blue-50/50",
      borderColor: "border-blue-100/30",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-600 font-bold",
      accentStrip: "from-blue-500 via-blue-100 to-zinc-50"
    };
  }
  return {
    cardBg: "bg-[#FFF8F6] hover:bg-[#FFF3F0]",
    borderColor: "border-[#FFECE7]",
    badgeBg: "bg-[#FFF0EC]",
    badgeText: "text-[#F4511E] font-bold",
    accentStrip: "from-[#F4511E]/30 via-[#F4511E]/10 to-transparent"
  };
}
