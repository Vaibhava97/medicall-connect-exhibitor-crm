window.MEDICALL_DATA = (() => {
  const brand = {
    orange: "#E8450A",
    red: "#CC2200",
    yellow: "#F5C518",
    green: "#2E7D32",
  };

  const categories = [
    { name: "ICU & Critical Care", group: "Critical & Emergency", icon: "activity", color: brand.orange, bg: "#FFE7D6", subs: ["Patient monitoring", "Respiratory support", "Drug delivery", "ICU furniture"] },
    { name: "Operation Theatre", group: "Critical & Emergency", icon: "stethoscope", color: brand.red, bg: "#FFE0DC", subs: ["Anaesthesia & monitoring", "Surgical equipment", "OT lighting", "Sterilisation"] },
    { name: "Emergency & Trauma", group: "Critical & Emergency", icon: "siren", color: brand.red, bg: "#FFE0DC", subs: ["Resuscitation", "Airway management", "Trauma & immobilisation", "Emergency furniture"] },
    { name: "Radiology & Imaging", group: "Diagnostics & Imaging", icon: "scan", color: brand.yellow, bg: "#FFF6CF", subs: ["X-ray & fluoroscopy", "Advanced imaging", "Ultrasound", "Workstation & accessories"] },
    { name: "Diagnostics & Laboratory", group: "Diagnostics & Imaging", icon: "microscope", color: brand.green, bg: "#DCEFD9", subs: ["Haematology & biochemistry", "Immunoassay & molecular", "Point-of-care & rapid testing", "Lab IT"] },
    { name: "Maternity & Obstetrics", group: "Specialty Care", icon: "baby", color: brand.yellow, bg: "#FFF6CF", subs: ["Monitoring & diagnostics", "Delivery suite", "NICU monitoring", "NICU therapy"] },
    { name: "Cardiology", group: "Critical & Emergency", icon: "heart", color: brand.red, bg: "#FFE0DC", subs: ["Diagnostics & imaging", "Ambulatory monitoring", "Interventional"] },
    { name: "Orthopaedics", group: "Specialty Care", icon: "bone", color: brand.orange, bg: "#FFE7D6", subs: ["Power tools", "Implants & prosthetics", "Mobility aids"] },
    { name: "Neurology", group: "Diagnostics & Imaging", icon: "brain", color: brand.yellow, bg: "#FFF6CF", subs: ["Diagnostics", "Neurosurgery support"] },
    { name: "Urology & Gynaecology", group: "Specialty Care", icon: "pill", color: brand.green, bg: "#DCEFD9", subs: ["Urology equipment", "Gynaecology equipment", "Consumables"] },
    { name: "Gastroenterology & Endoscopy", group: "Specialty Care", icon: "scope", color: brand.orange, bg: "#FFE7D6", subs: ["Endoscopes", "Support equipment", "GI diagnostics"] },
    { name: "Ophthalmology, ENT & Dental", group: "Diagnostics & Imaging", icon: "eye", color: brand.yellow, bg: "#FFF6CF", subs: ["Ophthalmology", "ENT diagnostics", "Dental treatment"] },
    { name: "Ward & Nursing", group: "Infrastructure & Support", icon: "bed", color: brand.green, bg: "#DCEFD9", subs: ["Patient furniture", "Nursing station", "Ward monitoring"] },
    { name: "Surgical Instruments", group: "Infrastructure & Support", icon: "tool", color: brand.red, bg: "#FFE0DC", subs: ["General surgery", "Laparoscopic", "Sutures & wound closure"] },
    { name: "Hospital Furniture & Fittings", group: "Infrastructure & Support", icon: "chair", color: brand.orange, bg: "#FFE7D6", subs: ["Patient beds", "Trolleys & carts", "Clinical workstations"] },
    { name: "Consumables & Disposables", group: "Infrastructure & Support", icon: "box", color: brand.green, bg: "#DCEFD9", subs: ["IV & injection", "Respiratory disposables", "Lab consumables"] },
    { name: "Hospital Infrastructure", group: "Infrastructure & Support", icon: "building", color: brand.orange, bg: "#FFE7D6", subs: ["Medical gas", "Power & electrical", "HVAC & safety"] },
    { name: "Hospital IT & Software", group: "Infrastructure & Support", icon: "monitor", color: brand.green, bg: "#DCEFD9", subs: ["Clinical systems", "Analytics & connectivity"] },
    { name: "Other Departments", group: "Infrastructure & Support", icon: "grid", color: brand.orange, bg: "#FFE7D6", subs: ["Dermatology", "Physiotherapy", "Dialysis", "Blood Bank"] },
  ];

  const expoEditions = [
    { name: "Chennai 2026", date: "Mar 13-15, 2026", venue: "Chennai Trade Centre", exhibitors: "800+", upcoming: true },
    { name: "Delhi 2025", date: "Oct 14-16, 2025", venue: "IEML Greater Noida", exhibitors: "400+", upcoming: false },
    { name: "Chennai 2024", date: "Mar 8-10, 2024", venue: "Chennai Trade Centre", exhibitors: "700+", upcoming: false },
    { name: "Hyderabad 2024", date: "Jan 19-21, 2024", venue: "HICC Hyderabad", exhibitors: "350+", upcoming: false },
    { name: "Delhi 2023", date: "Oct 6-8, 2023", venue: "Pragati Maidan Delhi", exhibitors: "400+", upcoming: false },
    { name: "Kolkata 2023", date: "Jul 21-23, 2023", venue: "Milan Mela Kolkata", exhibitors: "300+", upcoming: false },
  ];

  const vendors = [
    { id: "mindray", name: "Mindray", type: "International Manufacturer", location: "Pan India", editions: ["Chennai 2026", "Delhi 2025", "Chennai 2024", "Hyderabad 2024"], since: 2017, rating: 4.8, hall: "Hall 1", stall: "A-12", states: ["Pan India"], employees: "1000+", turnover: "Rs. 500 Cr+", summary: "Global medical device company focused on monitoring, diagnostics, and imaging for hospitals across major markets." },
    { id: "siemens", name: "Siemens Healthineers", type: "International Manufacturer", location: "Pan India", editions: ["Chennai 2026", "Delhi 2025", "Chennai 2024"], since: 2015, rating: 4.9, hall: "Hall 1", stall: "A-24", states: ["Pan India"], employees: "5000+", turnover: "Rs. 1000 Cr+", summary: "Advanced imaging, laboratory diagnostics, and therapy systems with long-running enterprise support." },
    { id: "philips", name: "Philips Healthcare", type: "International Manufacturer", location: "Pan India", editions: ["Chennai 2026", "Delhi 2025", "Chennai 2024", "Delhi 2023"], since: 2016, rating: 4.7, hall: "Hall 2", stall: "B-08", states: ["Pan India"], employees: "5000+", turnover: "Rs. 1000 Cr+", summary: "Health technology provider across diagnostic imaging, patient monitoring, and connected care." },
    { id: "bpl", name: "BPL Medical", type: "Local Manufacturer", location: "Bangalore", editions: ["Chennai 2026", "Delhi 2025", "Chennai 2024"], since: 2018, rating: 4.5, hall: "Hall 2", stall: "B-19", states: ["Karnataka", "Tamil Nadu", "Kerala", "Telangana", "Andhra Pradesh", "Maharashtra"], employees: "500-1000", turnover: "Rs. 250 Cr+", summary: "Indian medical electronics manufacturer with deep experience in monitors, defibrillators, ECG, and maternal care." },
    { id: "ge", name: "GE Healthcare", type: "International Manufacturer", location: "Pan India", editions: ["Delhi 2025", "Chennai 2024", "Delhi 2023"], since: 2015, rating: 4.8, hall: "Hall 3", stall: "C-05", states: ["Pan India"], employees: "5000+", turnover: "Rs. 1000 Cr+", summary: "Integrated medical technology, analytics, and precision health solutions for hospitals and diagnostics centers." },
    { id: "mednob", name: "Mednob", type: "Local Manufacturer", location: "Chennai", editions: ["Chennai 2026", "Chennai 2024", "Hyderabad 2024"], since: 2019, rating: 4.3, hall: "Hall 3", stall: "C-22", states: ["Tamil Nadu", "Karnataka", "Kerala", "Telangana", "Andhra Pradesh"], employees: "100-500", turnover: "Rs. 50 Cr+", summary: "Chennai manufacturer of cost-effective hospital equipment for small and mid-sized hospitals." },
    { id: "sudar", name: "Sudar Medicals", type: "Local Manufacturer", location: "Chennai", editions: ["Chennai 2026", "Chennai 2024"], since: 2020, rating: 4.2, hall: "Hall 4", stall: "D-11", states: ["Tamil Nadu", "Kerala"], employees: "50-100", turnover: "Rs. 25 Cr+", summary: "Family-run manufacturer of hospital furniture, OT equipment, and consumables for South India." },
  ];

  const productSeeds = [
    ["p1", "Multiparameter Monitor", "mindray", "ICU & Critical Care", "Patient monitoring", "Chennai 2026", "New", "International"],
    ["p2", "Invasive Ventilator", "philips", "ICU & Critical Care", "Respiratory support", "Chennai 2026", "", "International"],
    ["p3", "Syringe Pump", "bpl", "ICU & Critical Care", "Drug delivery", "Chennai 2026", "Made in India", "Indian"],
    ["p4", "Anaesthesia Workstation", "ge", "Operation Theatre", "Anaesthesia & monitoring", "Delhi 2025", "", "International"],
    ["p5", "Laparoscopic Tower", "siemens", "Operation Theatre", "Surgical equipment", "Chennai 2026", "Popular", "International"],
    ["p6", "LED OT Lights", "sudar", "Operation Theatre", "OT lighting", "Chennai 2024", "Made in India", "Indian"],
    ["p7", "AED", "bpl", "Emergency & Trauma", "Resuscitation", "Chennai 2026", "Made in India", "Indian"],
    ["p8", "Video Laryngoscope", "mednob", "Emergency & Trauma", "Airway management", "Hyderabad 2024", "", "Indian"],
    ["p9", "Digital X-ray", "siemens", "Radiology & Imaging", "X-ray & fluoroscopy", "Chennai 2026", "New", "International"],
    ["p10", "MRI", "ge", "Radiology & Imaging", "Advanced imaging", "Delhi 2025", "", "International"],
    ["p11", "Ultrasound Machine", "philips", "Radiology & Imaging", "Ultrasound", "Chennai 2024", "Popular", "International"],
    ["p12", "Haematology Analyser", "mindray", "Diagnostics & Laboratory", "Haematology & biochemistry", "Chennai 2026", "", "International"],
    ["p13", "PCR Diagnostics System", "siemens", "Diagnostics & Laboratory", "Immunoassay & molecular", "Delhi 2025", "", "International"],
    ["p14", "Point-of-Care Analyser", "bpl", "Diagnostics & Laboratory", "Point-of-care & rapid testing", "Chennai 2026", "Made in India", "Indian"],
    ["p15", "CTG Machine", "mednob", "Maternity & Obstetrics", "Monitoring & diagnostics", "Chennai 2026", "Made in India", "Indian"],
    ["p16", "Infant Incubator", "sudar", "Maternity & Obstetrics", "NICU therapy", "Chennai 2024", "", "Indian"],
    ["p17", "12-lead ECG", "bpl", "Cardiology", "Diagnostics & imaging", "Chennai 2026", "Made in India", "Indian"],
    ["p18", "Holter Monitor", "philips", "Cardiology", "Ambulatory monitoring", "Delhi 2025", "", "International"],
    ["p19", "Orthopaedic Power Drill", "mednob", "Orthopaedics", "Power tools", "Hyderabad 2024", "", "Indian"],
    ["p20", "EEG Machine", "ge", "Neurology", "Diagnostics", "Delhi 2025", "", "International"],
    ["p21", "Endoscopy Tower", "mindray", "Gastroenterology & Endoscopy", "Endoscopes", "Chennai 2026", "New", "International"],
    ["p22", "Electric ICU Bed", "sudar", "Hospital Furniture & Fittings", "Patient beds", "Chennai 2026", "Made in India", "Indian"],
    ["p23", "PACS Software", "siemens", "Hospital IT & Software", "Clinical systems", "Chennai 2024", "", "International"],
    ["p24", "Sterilisation Pouches", "sudar", "Consumables & Disposables", "Lab consumables", "Chennai 2026", "", "Indian"],
  ];

  const products = productSeeds.map((seed, index) => {
    const [id, name, vendorId, category, subCategory, expo, badge, origin] = seed;
    const vendor = vendors.find((item) => item.id === vendorId);
    return {
      id,
      name,
      vendorId,
      vendor: vendor.name,
      category,
      subCategory,
      expo,
      badge,
      origin,
      rating: Number((vendor.rating - (index % 3) * 0.08).toFixed(1)),
      priceRange: index % 4 === 0 ? "Quote on request" : index % 3 === 0 ? "Rs. 5L - 20L" : "Rs. 75K - 6L",
      hall: vendor.hall,
      stall: vendor.stall,
      states: vendor.states,
      features: [
        "Medicall verified exhibitor",
        "Installation and training support",
        index % 2 === 0 ? "AMC options available" : "Demo available at stall",
      ],
      specs: [
        ["Category", subCategory],
        ["Origin", origin],
        ["Expo", expo],
        ["Service", vendor.states.includes("Pan India") ? "Pan India" : vendor.states.slice(0, 3).join(", ")],
      ],
      certifications: index % 2 === 0 ? ["ISO", "CE"] : ["ISO", "BIS"],
    };
  });

  const articles = [
    { id: "1", title: "How to shortlist medical equipment before visiting an expo", category: "Buyer Guide", excerpt: "A practical framework for comparing exhibitors, feature depth, service coverage, and post-show follow-up.", author: "Medicall Editorial Team", date: "October 8, 2025", readTime: "6 min read" },
    { id: "2", title: "Questions hospitals should ask before booking a demo", category: "Procurement", excerpt: "Use these questions to understand installation timelines, service response, training, and AMC commitments.", author: "Priya Iyer", date: "September 22, 2025", readTime: "5 min read" },
    { id: "3", title: "Why Indian manufacturers are gaining ground", category: "Industry Trends", excerpt: "Cost advantages, improving standards, and local service networks are changing buying behavior.", author: "Medicall Research", date: "August 20, 2025", readTime: "5 min read" },
    { id: "4", title: "Finding a reliable ECG exhibitor in Andhra Pradesh", category: "Buyer Stories", excerpt: "One hospital owner's story of moving from word of mouth to verified exhibitor comparison.", author: "Dr. Ravi Kumar", date: "August 28, 2025", readTime: "6 min read" },
  ];

  const reviews = [
    { vendorId: "mindray", name: "Dr. Anita Rao", org: "City Diagnostics Pune", rating: 5, title: "Solid build, exceeded expectations", text: "The interface was easy for our clinical team to learn, and the installation team was prepared." },
    { vendorId: "bpl", name: "Dr. Suresh Menon", org: "Apollo Hospitals Chennai", rating: 4, title: "Great value for the price", text: "Transparent AMC terms and a practical feature set made the buying decision easier." },
    { vendorId: "sudar", name: "Ms. Priya Sharma", org: "Fortis Healthcare Delhi", rating: 4, title: "Professional follow-up", text: "The exhibitor handled the inquiry professionally from expo visit to quotation." },
    { vendorId: "siemens", name: "Dr. Neha Gupta", org: "Manipal Hospital Bangalore", rating: 5, title: "Reliable enterprise support", text: "Their local team clearly explained service response and implementation needs." },
  ];

  const states = ["Pan India", "Andhra Pradesh", "Delhi NCR", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
  const vendorTypes = ["Local Dealer/Distributor", "Local Manufacturer", "International Manufacturer"];
  const locations = ["Pan India", "Chennai", "Bangalore", "Delhi", "Hyderabad", "Mumbai", "Kolkata", "Pune", "Coimbatore"];
  const halls = ["Hall 1", "Hall 2", "Hall 3", "Hall 4"];
  const indianBrands = ["BPL Medical", "Trivitron Healthcare", "Sudar Medicals", "Mednob", "Allengers", "Opto Circuits"];
  const internationalBrands = ["Philips", "Siemens Healthineers", "GE Healthcare", "Mindray", "Draeger", "Stryker", "Medtronic", "Fujifilm", "Canon Medical", "Olympus"];

  return {
    brand,
    categories,
    expoEditions,
    vendors,
    products,
    articles,
    reviews,
    states,
    vendorTypes,
    locations,
    halls,
    indianBrands,
    internationalBrands,
  };
})();
