import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  limit,
  setDoc,
  getDoc
} from "firebase/firestore";
import { 
  auth, 
  db, 
  handleFirestoreError, 
  OperationType 
} from "../firebase";
import { 
  Shield, 
  Lock, 
  LayoutDashboard, 
  Coins, 
  Landmark, 
  Mail, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  X, 
  LogOut, 
  ChevronRight, 
  Circle,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CipherAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CipherAdminPanel({ isOpen, onClose }: CipherAdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  // Authentication Fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);
  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 120);
    }
  }, [showForm]);

  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
      setAuthError(null);
      setAccessGranted(false);
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  // Active Menu: "dashboard" | "donations" | "newsletter" | "volunteers"
  const [activeTab, setActiveTab] = useState<"dashboard" | "donations" | "newsletter" | "volunteers">("dashboard");

  // Real-time Collections Data
  const [donations, setDonations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  // Notification / Unread Tracking (tracking last seen timestamps or flags)
  const [lastViewTimestamp, setLastViewTimestamp] = useState<Record<string, number>>({
    donations: Date.now(),
    newsletter: Date.now(),
    volunteers: Date.now()
  });

  const [unreadCounts, setUnreadCounts] = useState({
    donations: 0,
    newsletter: 0,
    volunteers: 0
  });

  // Track Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        try {
          // Check if admin email matches or if a document exists in `admins` collection
          const isBootstrappedAdmin = currentUser.email === "contact.cga.usa@gmail.com";
          
          const adminEmailDocRef = doc(db, "admins", "contact.cga.usa@gmail.com");
          let adminEmailDocSnap = await getDoc(adminEmailDocRef);
          
          let hasAccess = false;
          let role = "";
          let active = false;

          if (adminEmailDocSnap.exists()) {
            role = adminEmailDocSnap.data()?.role;
            active = adminEmailDocSnap.data()?.active;
            if (role === "admin" && active === true) {
              hasAccess = true;
            }
          } else if (isBootstrappedAdmin) {
            role = "admin";
            active = true;
            await setDoc(adminEmailDocRef, {
              userId: currentUser.uid,
              email: currentUser.email,
              role: "admin",
              active: true,
              createdAt: new Date().toISOString()
            });
            hasAccess = true;
          }

          if (hasAccess && isBootstrappedAdmin) {
            setIsAdmin(true);
            setAuthError(null);
          } else {
            setIsAdmin(false);
            setAuthError("Access Denied");
            await signOut(auth);
          }
        } catch (error) {
          console.error("Verification error:", error);
          setIsAdmin(false);
          setAuthError("Access Denied");
          await signOut(auth);
        } finally {
          setLoading(false);
        }
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Set up real-time queries once authenticated as admin
  useEffect(() => {
    if (!isAdmin || !user) return;

    const pathDonations = "donations";
    const qDonations = query(collection(db, pathDonations), orderBy("timestamp", "desc"));
    const unsubDonations = onSnapshot(qDonations, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setDonations(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, pathDonations);
    });

    const pathTickets = "donationTickets";
    const qTickets = query(collection(db, pathTickets), orderBy("timestamp", "desc"));
    const unsubTickets = onSnapshot(qTickets, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTickets(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, pathTickets);
    });

    const pathSubscribers = "newsletterSubscribers";
    const qSubscribers = query(collection(db, pathSubscribers), orderBy("timestamp", "desc"));
    const unsubSubscribers = onSnapshot(qSubscribers, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setSubscribers(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, pathSubscribers);
    });

    const pathVolunteers = "volunteers";
    const qVolunteers = query(collection(db, pathVolunteers), orderBy("timestamp", "desc"));
    const unsubVolunteers = onSnapshot(qVolunteers, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setVolunteers(list);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, pathVolunteers);
    });

    return () => {
      unsubDonations();
      unsubTickets();
      unsubSubscribers();
      unsubVolunteers();
    };
  }, [isAdmin, user]);

  // Handle live notification badge counters
  useEffect(() => {
    if (!isAdmin) return;
    
    // Count objects that are newer than respective tab's view timestamp or have unread flag
    const newDonations = donations.filter(d => {
      const ts = new Date(d.timestamp).getTime();
      return ts > lastViewTimestamp.donations;
    }).length;

    const newSubscribers = subscribers.filter(s => {
      const ts = new Date(s.timestamp).getTime();
      return ts > lastViewTimestamp.newsletter;
    }).length;

    const newVolunteers = volunteers.filter(v => {
      const ts = new Date(v.timestamp).getTime();
      return ts > lastViewTimestamp.volunteers;
    }).length;

    setUnreadCounts({
      donations: newDonations,
      newsletter: newSubscribers,
      volunteers: newVolunteers
    });
  }, [donations, subscribers, volunteers, lastViewTimestamp, isAdmin]);

  const markTabAsRead = (tab: "donations" | "newsletter" | "volunteers") => {
    setLastViewTimestamp(prev => ({
      ...prev,
      [tab]: Date.now()
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setAuthError(null);
    setAccessGranted(false);
    try {
      let loggedInUser: User | null = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        loggedInUser = userCredential.user;
      } catch (error: any) {
        // Auto register bootstrapped admin on first login attempt if user not found
        if (email === "contact.cga.usa@gmail.com" && (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential" || error.code === "auth/wrong-password")) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            loggedInUser = userCredential.user;
          } catch (createErr) {
            console.error("Bootstrap signup failed:", createErr);
          }
        }
      }

      if (loggedInUser) {
        const isBootstrappedAdmin = loggedInUser.email === "contact.cga.usa@gmail.com";
        const adminEmailDocRef = doc(db, "admins", "contact.cga.usa@gmail.com");
        let adminEmailDocSnap = await getDoc(adminEmailDocRef);

        if (!adminEmailDocSnap.exists() && isBootstrappedAdmin) {
          await setDoc(adminEmailDocRef, {
            userId: loggedInUser.uid,
            email: "contact.cga.usa@gmail.com",
            role: "admin",
            active: true,
            createdAt: new Date().toISOString()
          });
          adminEmailDocSnap = await getDoc(adminEmailDocRef);
        }

        const role = adminEmailDocSnap.data()?.role;
        const active = adminEmailDocSnap.data()?.active;

        if (isBootstrappedAdmin && role === "admin" && active === true) {
          setAccessGranted(true);
          setAuthError(null);
        } else {
          setAuthError("Access Denied");
          await signOut(auth);
        }
      } else {
        setAuthError("Access Denied");
      }
    } catch (error: any) {
      console.error("Sign in failed:", error);
      setAuthError("Access Denied");
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: "Approved" | "Declined") => {
    try {
      const ticketRef = doc(db, "donationTickets", ticketId);
      await updateDoc(ticketRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `donationTickets/${ticketId}`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (accessGranted) {
      setIsAdmin(true);
      setAccessGranted(false);
    } else if (email.length > 0 || password.length > 0) {
      handleSignIn(e as any);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Compute stats metrics
  const totalDonationsSourcedValue = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalTicketsPending = tickets.filter(t => t.status === "Pending").length;

  if (!user || !isAdmin) {
    const hasTyped = email.length > 0 || password.length > 0;

    return (
      <div className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 select-none overflow-hidden font-sans transition-all duration-300">
        <div className="w-full max-w-xs bg-[#0E1524] border border-[#1A2640] rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-6 relative flex flex-col items-center justify-between min-h-[220px] transition-all duration-300">
          
          {/* Close (X) in top-left */}
          <div className="absolute top-4 left-4 z-[9999999]">
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-[#1E2E4C] text-slate-400 hover:text-white transition duration-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rotating Loader/Spinner in top-right corner (Hidden Area) */}
          <div className="absolute top-4 right-4 z-[9999999]">
            <div 
              onClick={() => setShowForm(true)}
              className="w-3.5 h-3.5 border border-slate-500/20 border-t-[#F4511E] rounded-full animate-spin cursor-pointer"
            />
          </div>

          {/* Center Area holding content */}
          <div className="flex-1 flex flex-col items-center justify-center w-full py-8 relative min-h-[140px] space-y-4">
            {/* Top Line (Email Trigger) */}
            <div 
              onClick={() => {
                setShowForm(true);
                setTimeout(() => {
                  emailInputRef.current?.focus();
                }, 50);
              }}
              className="w-16 h-[1px] bg-[#1F2E4D]/80 hover:bg-[#F4511E]/40 transition-all duration-300 cursor-pointer z-20"
            />

            {/* "Coming Soon" always centered and visible */}
            <div className="py-1 z-20">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                onClick={() => setShowForm(true)}
                className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-300 select-none cursor-pointer text-center"
              >
                Coming Soon
              </motion.div>
            </div>

            {/* Bottom Line (Password Trigger) */}
            <div 
              onClick={() => {
                setShowForm(true);
                setTimeout(() => {
                  passwordInputRef.current?.focus();
                }, 50);
              }}
              className="w-16 h-[1px] bg-[#1F2E4D]/80 hover:bg-[#F4511E]/40 transition-all duration-300 cursor-pointer z-20"
            />

            {/* Invisible Inputs overlaid relative to the central area */}
            {showForm && (
              <form onSubmit={handleSignIn} className="absolute inset-0 w-full h-full flex flex-col opacity-0 z-10 pointer-events-none">
                <input 
                  ref={emailInputRef}
                  type="email" 
                  required
                  value={email}
                  disabled={signingIn}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-1/2 bg-transparent text-transparent caret-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none select-text pointer-events-auto"
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                />
                <input 
                  ref={passwordInputRef}
                  type="password" 
                  required
                  value={password}
                  disabled={signingIn}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-1/2 bg-transparent text-transparent caret-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none select-text pointer-events-auto"
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                />
                <input type="submit" className="hidden" />
              </form>
            )}

            {authError && (
              <div className="absolute bottom-1 text-red-500 font-bold text-[10px] uppercase tracking-widest text-center animate-shake z-20">
                Access Denied
              </div>
            )}

            {accessGranted && (
              <div className="absolute bottom-1 text-emerald-400 font-bold text-[10px] uppercase tracking-widest text-center animate-pulse z-20">
                Access Granted
              </div>
            )}
          </div>

          {/* Action Button at the Bottom */}
          <button 
            type="button" 
            onClick={handleButtonClick}
            disabled={signingIn}
            className={`w-full py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition duration-300 shadow-md cursor-pointer text-center ${
              accessGranted || hasTyped 
                ? "bg-[#F4511E] hover:bg-[#D84315] text-white" 
                : "bg-[#162137]/80 hover:bg-[#1E2E4C] border border-[#24375A]/40 text-slate-200"
            }`}
          >
            {accessGranted ? "Continue" : signingIn ? "Checking..." : hasTyped ? "Continue" : "Back"}
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[999999] bg-[#090D16] text-[#E4EDF8] flex items-center justify-center p-0 md:p-6 select-none overflow-hidden font-sans">
      <div className="w-full h-full md:max-w-6xl md:max-h-[85vh] bg-[#0E1524] md:border border-[#1A2640] md:rounded-[32px] overflow-hidden flex flex-col md:flex-row relative shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
        
        {/* Background ambient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#F4511E]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Header bar / Close Trigger for mobile */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#162137] hover:bg-[#1E2E4C] border border-[#24375A] text-slate-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
            {/* LEFT NAVIGATION COLUMN */}
            <div className="w-full md:w-64 bg-[#0B101E] border-b md:border-b-0 md:border-r border-[#15213A] p-6 flex flex-col justify-between relative z-10">
              <div className="space-y-8">
                {/* Brand Header */}
                <div className="flex items-center space-x-3 pb-4 border-b border-[#141F35]">
                  <div className="w-10 h-10 rounded-xl bg-[#131D31] border border-[#1F2F4E] flex items-center justify-center text-[#F4511E]">
                    <Shield className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-sm font-black tracking-widest uppercase text-white font-sans">CIPHER</h1>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#F4511E] font-mono">SECURE PANEL</span>
                  </div>
                </div>

                {/* Main Navigation tabs */}
                <nav className="space-y-2">
                  <button
                    onClick={() => { setActiveTab("dashboard"); }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition duration-200 group cursor-pointer ${activeTab === "dashboard" ? "bg-[#18243C] text-white border border-[#213559]" : "text-slate-400 hover:text-white hover:bg-[#11192A]"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <LayoutDashboard className="w-4 h-4 text-[#F4511E]" />
                      <span>Dashboard</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab("donations"); markTabAsRead("donations"); }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition duration-200 group cursor-pointer ${activeTab === "donations" ? "bg-[#18243C] text-white border border-[#213559]" : "text-slate-400 hover:text-white hover:bg-[#11192A]"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Coins className="w-4 h-4 text-emerald-500" />
                      <span>Donations</span>
                    </div>
                    {unreadCounts.donations > 0 && (
                      <span className="bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                        {unreadCounts.donations}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setActiveTab("newsletter"); markTabAsRead("newsletter"); }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition duration-200 group cursor-pointer ${activeTab === "newsletter" ? "bg-[#18243C] text-white border border-[#213559]" : "text-slate-400 hover:text-white hover:bg-[#11192A]"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span>Newsletter</span>
                    </div>
                    {unreadCounts.newsletter > 0 && (
                      <span className="bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                        {unreadCounts.newsletter}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setActiveTab("volunteers"); markTabAsRead("volunteers"); }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition duration-200 group cursor-pointer ${activeTab === "volunteers" ? "bg-[#18243C] text-white border border-[#213559]" : "text-slate-400 hover:text-white hover:bg-[#11192A]"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Volunteers</span>
                    </div>
                    {unreadCounts.volunteers > 0 && (
                      <span className="bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                        {unreadCounts.volunteers}
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              {/* Connected User Profile */}
              <div className="pt-6 border-t border-[#141F35] space-y-3.5 mt-8 md:mt-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#18243C] border border-[#233559] flex items-center justify-center text-[#F4511E] font-black uppercase tracking-wider text-xs font-mono">
                    {user.email?.slice(0, 2) || "AD"}
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-black text-white truncate">{user.email}</span>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Role: Cryptographic Admin</span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full py-2 px-3 rounded-xl bg-red-950/20 border border-red-500/15 text-red-400 font-bold text-[10px] uppercase tracking-wider hover:bg-red-505 hover:border-red-500 transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out Session</span>
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT STAGE AREA */}
            <div className="flex-grow p-6 md:p-8 overflow-y-auto relative z-10">
              
              {/* PAGE 1: DASHBOARD VIEW COGNITIVE PANEL */}
              {activeTab === "dashboard" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Cognitive Overview</h2>
                    <p className="text-xs text-slate-400">Live, secure cryptographic tracking feed for charity actions and compliance.</p>
                  </div>

                  {/* GRID STAT CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-[#121B2F] border border-[#1F2E4F]/60 p-5 rounded-[24px] space-y-3 relative overflow-hidden group hover:border-[#F4511E] transition duration-300">
                      <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-[#F4511E]/5 rounded-full blur-xl group-hover:bg-[#F4511E]/10 transition duration-300" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Donations Logged</span>
                        <div className="p-2 rounded-xl bg-[#1A2640] border border-[#26385C] text-emerald-500">
                          <Coins className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="block text-2xl font-black text-white tracking-tight font-mono">${totalDonationsSourcedValue.toLocaleString()}</span>
                        <span className="block text-[10px] text-slate-500 font-medium mt-1">From {donations.length} total direct transactions</span>
                      </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-[#121B2F] border border-[#1F2E4F]/60 p-5 rounded-[24px] space-y-3 relative overflow-hidden group hover:border-amber-500 transition duration-300">
                      <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition duration-300" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Subscribers</span>
                        <div className="p-2 rounded-xl bg-[#1A2640] border border-[#26385C] text-amber-500">
                          <Mail className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="block text-2xl font-black text-white tracking-tight font-mono">{subscribers.length}</span>
                        <span className="block text-[10px] text-slate-500 font-medium mt-1">Subscribed unique coordinates</span>
                      </div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-[#121B2F] border border-[#1F2E4F]/60 p-5 rounded-[24px] space-y-3 relative overflow-hidden group hover:border-blue-500 transition duration-300">
                      <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition duration-300" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Volunteers</span>
                        <div className="p-2 rounded-xl bg-[#1A2640] border border-[#26385C] text-blue-500">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <span className="block text-2xl font-black text-white tracking-tight font-mono">{volunteers.length}</span>
                        <span className="block text-[10px] text-slate-500 font-medium mt-1">Approved specialized field crew</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Live pending tickets track */}
                    <div className="bg-[#0F1626] border border-[#1A2640] p-6 rounded-[24px] space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#F4511E]" />
                          <span>Offline Tickets Queue ({totalTicketsPending} Pending)</span>
                        </h3>
                        <span className="text-[10px] font-mono text-slate-500 font-medium">REAL-TIME</span>
                      </div>

                      <div className="space-y-3.5 max-h-[35vh] overflow-y-auto pr-1">
                        {tickets.length === 0 ? (
                          <div className="text-center py-10 text-slate-500 text-xs font-medium">No tickets loaded currently.</div>
                        ) : (
                          tickets.slice(0, 5).map((ticket, i) => (
                            <div key={ticket.id || i} className="p-4 bg-[#141F35] border border-[#1E2E4C] rounded-2xl flex items-center justify-between">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono bg-slate-900 border border-white/5 py-0.5 px-2 rounded font-bold text-white uppercase tracking-wider">{ticket.ticketId}</span>
                                <span className="block text-xs font-black text-white mt-1.5">{ticket.fullName}</span>
                                <span className="block text-[10px] text-zinc-400">{ticket.paymentMethod === 'bank' ? 'Bank Transfer' : 'Crypto Wallet'} • ${Number(ticket.amount).toLocaleString()}</span>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                {ticket.status === 'Pending' ? (
                                  <div className="flex space-x-2">
                                    <button 
                                      onClick={() => handleUpdateTicketStatus(ticket.id, "Approved")}
                                      className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-505 text-white rounded font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                                    >
                                      Approve
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateTicketStatus(ticket.id, "Declined")}
                                      className="py-1 px-2.5 bg-red-650 hover:bg-red-505 text-white rounded font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                                    >
                                      Decline
                                    </button>
                                  </div>
                                ) : (
                                  <span className={`text-[9px] font-black uppercase font-mono tracking-wider px-2 py-0.5 rounded ${ticket.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/15' : 'bg-red-950 text-red-400 border border-red-500/15'}`}>
                                    {ticket.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Recent Activity Log Stream */}
                    <div className="bg-[#0F1626] border border-[#1A2640] p-6 rounded-[24px] space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Activity Log stream</span>
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center space-x-1 animate-pulse">
                          <Circle className="w-1.5 h-1.5 fill-emerald-500 mr-1" />
                          <span>Live</span>
                        </span>
                      </div>

                      <div className="space-y-3.5 max-h-[35vh] overflow-y-auto pr-1 text-xs">
                        {donations.length === 0 && volunteers.length === 0 && subscribers.length === 0 ? (
                          <div className="text-center py-10 text-slate-500 text-xs font-medium">No logistical activities compiled.</div>
                        ) : (
                          // Combine and sort activities dynamically
                          [
                            ...donations.map(d => ({ type: 'donation', text: `Donation of $${Number(d.amount).toLocaleString()} from ${d.fullName}`, date: d.timestamp }),),
                            ...volunteers.map(v => ({ type: 'volunteer', text: `Volunteer application sent by ${v.fullName}`, date: v.timestamp })),
                            ...subscribers.map(s => ({ type: 'newsletter', text: `New Coordinate Mailbox subscribed: ${s.email}`, date: s.timestamp }))
                          ]
                          .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 6)
                          .map((activity, i) => (
                            <div key={i} className="flex space-x-3 items-start border-b border-[#141F35] pb-3.5">
                              <span className="font-bold text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-white/5 whitespace-nowrap mt-0.5 text-zinc-400">
                                {activity.type}
                              </span>
                              <div className="flex-grow">
                                <p className="text-slate-300 font-semibold">{activity.text}</p>
                                <span className="block text-[9px] text-slate-500 mt-0.5 font-mono">{new Date(activity.date).toLocaleString()}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 2: DONATIONS DETAIL LOGS */}
              {activeTab === "donations" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-emerald-500" />
                      <span>Donations Log Registry</span>
                    </h2>
                    <p className="text-xs text-slate-400">Direct trace documents and ticket protocols for humanitarian resource contributions.</p>
                  </div>

                  <div className="bg-[#0F1626] border border-[#1A2640] rounded-[24px] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs text-slate-300">
                        <thead>
                          <tr className="bg-[#0A101E] text-slate-400 border-b border-[#15213A] uppercase font-bold text-[9px] tracking-wider font-mono">
                            <th className="p-4 px-6">Donor Details</th>
                            <th className="p-4">Contact Detail</th>
                            <th className="p-4 text-emerald-500">Amount</th>
                            <th className="p-4">Route</th>
                            <th className="p-4">Prayer Requests / Intentions</th>
                            <th className="p-4 text-right">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#15213A]">
                          {donations.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-10 text-center text-slate-500 font-medium">No direct donations registered.</td>
                            </tr>
                          ) : (
                            donations.map((d, index) => (
                              <tr key={d.id || index} className="hover:bg-[#11192C]/50 transition duration-150">
                                <td className="p-4 px-6">
                                  <strong className="block text-white font-black">{d.fullName}</strong>
                                </td>
                                <td className="p-4 space-y-0.5">
                                  <span className="block font-mono text-[10px] text-zinc-400 font-bold">{d.email}</span>
                                  <span className="block font-mono text-[9px] text-[#2E4166]">{d.phoneNumber || 'N/A'}</span>
                                </td>
                                <td className="p-4">
                                  <span className="font-mono font-black text-emerald-400">${Number(d.amount).toLocaleString()}</span>
                                </td>
                                <td className="p-4 uppercase text-[9px] font-mono">
                                  <span className={`px-2 py-0.5 border rounded font-black tracking-wider ${d.selectedPaymentMethod === 'bank' ? 'text-amber-400 border-amber-500/20 bg-amber-950/20' : 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20'}`}>
                                    {d.selectedPaymentMethod}
                                  </span>
                                </td>
                                <td className="p-4 max-w-xs space-y-1 font-sans">
                                  {d.prayerRequest && (
                                    <p className="line-clamp-2 italic text-zinc-400 text-[11px]">
                                      <span className="font-bold text-[9px] uppercase text-[#F4511E] not-italic block">Request:</span>
                                      &ldquo;{d.prayerRequest}&rdquo;
                                    </p>
                                  )}
                                  {d.prayerForCharity && (
                                    <p className="line-clamp-2 italic text-emerald-400 text-[11px]">
                                      <span className="font-bold text-[9px] uppercase text-[#22C55E] not-italic block">Blessing:</span>
                                      &ldquo;{d.prayerForCharity}&rdquo;
                                    </p>
                                  )}
                                  {!d.prayerRequest && !d.prayerForCharity && (
                                    <span className="text-zinc-500 italic">None provided</span>
                                  )}
                                </td>
                                <td className="p-4 text-right font-mono text-[9px] text-zinc-400 tracking-tight">
                                  {new Date(d.timestamp).toLocaleString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 3: NEWSLETTER MAILBOX REGISTRY */}
              {activeTab === "newsletter" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-amber-500" />
                      <span>Newsletter Subscription List</span>
                    </h2>
                    <p className="text-xs text-slate-400">Captured administrative coordinates for bulletins and emergency notices.</p>
                  </div>

                  <div className="bg-[#0F1626] border border-[#1A2640] rounded-[24px] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs text-slate-300">
                        <thead>
                          <tr className="bg-[#0A101E] text-slate-400 border-b border-[#15213A] uppercase font-bold text-[9px] tracking-wider font-mono">
                            <th className="p-4 px-6">Coordinate Mailbox Address</th>
                            <th className="p-4 text-right">Date Joined</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#15213A]">
                          {subscribers.length === 0 ? (
                            <tr>
                              <td colSpan={2} className="p-10 text-center text-slate-500 font-medium">No newsletters coordinates registered.</td>
                            </tr>
                          ) : (
                            subscribers.map((sub, index) => (
                              <tr key={sub.id || index} className="hover:bg-[#11192C]/50 transition duration-150">
                                <td className="p-4 px-6 font-mono text-xs font-black text-white">
                                  {sub.email}
                                </td>
                                <td className="p-4 text-right font-mono text-[9px] text-zinc-400">
                                  {new Date(sub.timestamp).toLocaleString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4: VOLUNTEERS APPLICATIONS */}
              {activeTab === "volunteers" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Volunteer Specialized Application Registry</span>
                    </h2>
                    <p className="text-xs text-slate-400">Field coordinators and clinical personnel profiles registered in the database.</p>
                  </div>

                  <div className="bg-[#0F1626] border border-[#1A2640] rounded-[24px] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs text-slate-300">
                        <thead>
                          <tr className="bg-[#0A101E] text-slate-400 border-b border-[#15213A] uppercase font-bold text-[9px] tracking-wider font-mono">
                            <th className="p-4 px-6">Applicant Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone Number</th>
                            <th className="p-4">Assigned Information / Attributes Queue</th>
                            <th className="p-4 text-right">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#15213A]">
                          {volunteers.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-10 text-center text-slate-500 font-medium font-bold">No volunteer applications logged.</td>
                            </tr>
                          ) : (
                            volunteers.map((v, index) => (
                              <tr key={v.id || index} className="hover:bg-[#11192C]/50 transition duration-150">
                                <td className="p-4 px-6">
                                  <strong className="block text-white font-black">{v.fullName}</strong>
                                </td>
                                <td className="p-4 font-mono text-zinc-400 font-bold">{v.email || 'N/A'}</td>
                                <td className="p-4 font-mono text-[#2E4166]">{v.phoneNumber || 'N/A'}</td>
                                <td className="p-4 max-w-sm text-xs font-semibold leading-relaxed text-zinc-300/85">
                                  {v.submittedInfo}
                                </td>
                                <td className="p-4 text-right font-mono text-[9px] text-zinc-400">
                                  {new Date(v.timestamp).toLocaleString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
      </div>
    </div>
  );
}
