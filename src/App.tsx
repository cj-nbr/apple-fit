/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Bell, 
  Move, 
  Heart, 
  Zap, 
  Clock, 
  Flame, 
  Map as MapIcon, 
  Gauge, 
  LayoutGrid, 
  Dumbbell, 
  TrendingUp, 
  Users, 
  Plus, 
  Search, 
  Settings, 
  Sparkles, 
  Moon, 
  Activity, 
  Bed, 
  Calculator,
  ChevronRight,
  Play,
  Accessibility,
  Utensils,
  Smartphone,
  User as UserIcon,
  Shield,
  HelpCircle,
  LogOut,
  Trash2,
  Lock,
  Download,
  Languages,
  Ruler,
  Volume2,
  ArrowLeft,
  X,
  Target,
  BarChart3,
  Calendar,
  Lock as LockIcon,
  Eye,
  MessageSquare,
  UserX,
  AlarmClock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, ReactNode, ChangeEvent } from 'react';

// --- Constants & Types ---

const PROFILE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAOS4L5QlL7vIMhDC338kUUTT2zaJTLPAfHSXIJxiCrKR-EU3FX_RtNyAZ-HV1BkmwEXyOE33MQUK1cmdOHsnlgfv2wTQlqvzd77DR0SIynyH87hWIRajEPOvlBIbAyKflab4-5mkSDcZG3KZ7YUDZ_JxjMygBK9OhwD5Lh1JwNKy1x8e4aJ0sXMArQPpGIPaDdAlKZ3uf3M533-BCu9REZS7C5KUXdaJ-N49HzNVwgEtLF4JiXZbuFt4qJe2Dv6kugc1kUuG9Dataa";
const LOGO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBW5JSGDoinhI1Sfl3udBqV3qW5C7N-L10ksfMVSi5VToa9Ggt7h6729LKqgit2jbnmrzmYmAEsHM_tkc0nOobeUQFwIZZVDpEP9TTmNzpdc1UqADc4bjXbsgejMCTsRZUIgVpqZ0xmMaFoluSa8fBWe3Vt5WHnEc8yCL-wOY0o_96zXxii4Xq5fWVLqyd5SR7b9P2-iC6cUQlZQajo-7UOzIQdKeVwVbydp_oKTaGuYpweQYV38mUYRbjihKwjnqYwv-wC9eMzr6TJ";

type Screen = 'Home' | 'Exercise' | 'Social' | 'Sleep' | 'Calculator' | 'Login';
type SettingsSection = 'Main' | 'Profile' | 'AppSettings' | 'Notifications' | 'Privacy' | 'Support';

// --- Shared Components ---

const TopAppBar = ({ onProfileClick, showSearch = false, hidden = false }: { onProfileClick: () => void, showSearch?: boolean, hidden?: boolean }) => (
  <header className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_32px_64px_rgba(45,91,255,0.06)] h-20 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
    <div className="flex items-center justify-between px-6 h-full w-full">
      <div className="flex items-center gap-3">
        <img src={LOGO_IMG} alt="Apple Fit" className="h-8 w-8 object-contain" referrerPolicy="no-referrer" />
        <span className="text-on-surface font-headline font-extrabold tracking-tighter text-xl uppercase italic">APPLE FIT</span>
      </div>
      
      <div className="flex items-center gap-4">
        {showSearch && (
          <button className="p-2 rounded-full hover:bg-surface-variant/50 transition-colors">
            <Search className="w-6 h-6 text-on-surface-variant" />
          </button>
        )}
        <button className="p-2 rounded-full hover:bg-surface-variant/50 transition-colors">
          <Bell className="w-6 h-6 text-on-surface-variant" />
        </button>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full border border-outline-variant/20 overflow-hidden active:scale-95 transition-all cursor-pointer"
        >
          <img src={PROFILE_IMG} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </button>
      </div>
    </div>
  </header>
);

const BottomNavBar = ({ activeScreen, setScreen, hidden = false }: { activeScreen: Screen, setScreen: (s: Screen) => void, hidden?: boolean }) => {
  const items: { id: Screen, label: string, icon: any }[] = [
    { id: 'Home', label: 'Home', icon: LayoutGrid },
    { id: 'Exercise', label: 'Exercise', icon: Dumbbell },
    { id: 'Social', label: 'Social', icon: Users },
    { id: 'Sleep', label: 'Sleep', icon: Moon },
    { id: 'Calculator', label: 'Calculator', icon: Calculator },
  ];

  return (
    <nav className={`fixed bottom-0 w-full z-50 bg-[#0f1930]/90 backdrop-blur-2xl pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.4)] md:rounded-t-[2rem] transition-transform duration-300 ${hidden ? 'translate-y-full' : 'translate-y-0'}`}>
      <div className="flex justify-around items-center h-20 w-full px-4 text-on-surface">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 relative ${
              activeScreen === id ? 'text-primary-dim' : 'text-[#40485d] hover:text-on-surface'
            }`}
          >
            <Icon className={`w-6 h-6 ${activeScreen === id ? 'fill-current' : ''}`} />
            <span className="font-body text-[10px] uppercase tracking-[0.1em] font-bold mt-1">{label}</span>
            {activeScreen === id && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute bottom-[-10px] w-1 h-3 bg-primary-dim rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

const SettingsOverlay = ({ onClose, theme, setTheme, onLogout }: { onClose: () => void, theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void, onLogout: () => void }) => {
  const [section, setSection] = useState<SettingsSection>('Main');
  const [profileImg, setProfileImg] = useState(PROFILE_IMG);
  
  // Security Flows State
  const [passwordStep, setPasswordStep] = useState<'Start' | 'RequestOTP' | 'VerifyOTP' | 'Reset'>('Start');
  const [otpSent, setOtpSent] = useState(false);
  const [twoFactorStep, setTwoFactorStep] = useState<'Start' | 'Input'>('Start');

  const Toggle = ({ label, icon: Icon, active = true, onClick }: { label: string, icon?: any, active?: boolean, onClick?: () => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-on-surface-variant" />}
        <span className="text-on-surface font-medium">{label}</span>
      </div>
      <div 
        onClick={onClick}
        className={`w-12 h-6 rounded-full p-1 relative cursor-pointer transition-colors ${active ? 'bg-primary' : 'bg-surface-container-highest'}`}
      >
        <motion.div 
          animate={{ x: active ? 24 : 0 }}
          className="w-4 h-4 bg-white rounded-full" 
        />
      </div>
    </div>
  );

  const SectionHeader = ({ title, onBack }: { title: string, onBack?: () => void }) => (
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack || (() => setSection('Main'))} className="p-2 hover:bg-surface-variant rounded-full">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h2 className="text-3xl font-headline font-bold italic uppercase tracking-tighter">{title}</h2>
    </div>
  );

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (section) {
      case 'Profile':
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <SectionHeader title="Basic Profile Info" />
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative group">
                <img src={profileImg} className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-2xl" alt="Profile" />
                <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Plus className="text-white w-8 h-8" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              <h3 className="text-2xl font-headline font-bold uppercase italic text-primary tracking-tighter">jhunujha9</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Bio (Optional)</label>
                <textarea 
                  className="w-full bg-surface-container rounded-2xl p-4 text-on-surface text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px] italic"
                  placeholder="I'm on a journey to peak fitness. Motivation is key!"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Age</label>
                  <input className="w-full bg-surface-container rounded-xl p-3 text-on-surface font-bold italic" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Height</label>
                  <input className="w-full bg-surface-container rounded-xl p-3 text-on-surface font-bold italic" defaultValue="180 cm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Weight</label>
                  <input className="w-full bg-surface-container rounded-xl p-3 text-on-surface font-bold italic" defaultValue="75 kg" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <SectionHeader title="Notifications" />
            <div className="space-y-2">
              <Toggle label="Workout Reminders (Daily/Weekly)" icon={Dumbbell} />
              <Toggle label="Sleep Reminders (Bed/Wake)" icon={Moon} />
              <Toggle label="Friend Activity (Likes/Comments)" icon={Users} />
              <Toggle label="App Updates & Announcements" icon={Smartphone} />
              <Toggle label="Achievement Alerts (Badges/Streaks)" icon={Zap} />
            </div>
          </div>
        );
      case 'AppSettings':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300 text-on-surface">
            <SectionHeader title="App Settings" />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
                  <span className="font-bold uppercase italic tracking-tighter">Theme</span>
                </div>
                <div className="flex gap-2 bg-surface-container-highest p-1 rounded-xl">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg font-bold uppercase text-[10px] transition-all ${theme === 'dark' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
                  >Dark</button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg font-bold uppercase text-[10px] transition-all ${theme === 'light' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
                  >Light</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="font-bold uppercase italic tracking-tighter">Language</span>
                </div>
                <span className="text-on-surface-variant font-bold uppercase text-[10px]">English</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-primary" />
                  <span className="font-bold uppercase italic tracking-tighter">Units</span>
                </div>
                <span className="text-on-surface-variant font-bold uppercase text-[10px]">kg/lbs • cm/feet</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <span className="font-bold uppercase italic tracking-tighter">Sound / Vibration</span>
                </div>
                <div className="w-10 h-5 bg-primary/20 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" /></div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full p-4 bg-surface-container rounded-2xl flex items-center justify-center gap-3 text-on-surface hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs"
              >
                <LogOut className="w-5 h-5 text-primary" /> Log out
              </button>
              <button className="w-full p-4 bg-error/10 text-error rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs">
                <Trash2 className="w-5 h-5" /> Delete Account
              </button>
            </div>
          </div>
        );
      case 'Privacy':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <SectionHeader title="Privacy & Security" 
              onBack={passwordStep !== 'Start' || twoFactorStep !== 'Start' ? () => {
                setPasswordStep('Start');
                setTwoFactorStep('Start');
              } : undefined}
            />
            <div className="space-y-3">
              {passwordStep === 'Start' && twoFactorStep === 'Start' && (
                <>
                  <button onClick={() => setPasswordStep('RequestOTP')} className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Lock className="w-6 h-6" /></div>
                      <span className="font-bold uppercase italic tracking-tighter">Change Password</span>
                    </div>
                    <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setTwoFactorStep('Input')} className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Shield className="w-6 h-6" /></div>
                      <div>
                        <span className="font-bold block uppercase italic tracking-tighter">Two-Factor Auth</span>
                        <span className="text-[10px] text-primary uppercase font-black">Secure Your Account 🔥</span>
                      </div>
                    </div>
                    <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}

              {/* Password Change Flow */}
              {passwordStep === 'RequestOTP' && (
                <div className="bg-surface-container p-8 rounded-[2rem] space-y-6">
                  <div className="text-center space-y-2">
                    <LockIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-headline font-black uppercase italic italic tracking-tighter">OTP Verification</h3>
                    <p className="text-sm text-on-surface-variant px-4">Provide your email or phone number to receive a 6-digit verification code.</p>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Email or Phone Number" className="w-full bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/10 outline-none focus:border-primary transition-colors text-center font-bold" />
                    <button 
                      onClick={() => setPasswordStep('VerifyOTP')}
                      className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black uppercase italic tracking-[0.1em] shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
                    >Send OTP</button>
                  </div>
                </div>
              )}

              {passwordStep === 'VerifyOTP' && (
                <div className="bg-surface-container p-8 rounded-[2rem] space-y-6 text-center">
                  <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-headline font-black uppercase italic tracking-tighter">Enter 6-Digit OTP</h3>
                  <div className="flex justify-center gap-2">
                    {[1,2,3,4,5,6].map(i => (
                      <input key={i} type="text" maxLength={1} className="w-10 h-14 bg-surface-container-highest rounded-xl text-2xl font-black text-center border border-outline-variant/10" />
                    ))}
                  </div>
                  <button 
                    onClick={() => setPasswordStep('Reset')}
                    className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black uppercase italic tracking-[0.1em]"
                  >Verify & Proceed</button>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">Didn't receive code? <span className="text-primary hover:underline cursor-pointer">Resend</span></p>
                </div>
              )}

              {passwordStep === 'Reset' && (
                <div className="bg-surface-container p-8 rounded-[2rem] space-y-6">
                  <h3 className="text-xl font-headline font-black uppercase italic text-center tracking-tighter">New Password</h3>
                  <div className="space-y-4">
                    <input type="password" placeholder="New Password" className="w-full bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/10 outline-none" />
                    <input type="password" placeholder="Confirm Password" className="w-full bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/10 outline-none" />
                    <button 
                      onClick={() => {
                        setPasswordStep('Start');
                      }}
                      className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black uppercase italic tracking-[0.1em]"
                    >Update Password</button>
                  </div>
                </div>
              )}

              {/* 2FA Flow */}
              {twoFactorStep === 'Input' && (
                <div className="bg-surface-container p-8 rounded-[2rem] space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-headline font-black uppercase italic tracking-tighter leading-tight">Configure Two-Factor Authentication</h3>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-primary italic tracking-widest pl-1">Backup Gmail Account</label>
                      <input type="email" placeholder="example@gmail.com" className="w-full bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/10 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-primary italic tracking-widest pl-1">Phone Number for SMS</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-surface-container-highest p-4 rounded-2xl border border-outline-variant/10 outline-none" />
                    </div>
                    <button 
                      onClick={() => setTwoFactorStep('Start')}
                      className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black uppercase italic tracking-[0.1em]"
                    >Enable 2FA</button>
                  </div>
                </div>
              )}

              {passwordStep === 'Start' && twoFactorStep === 'Start' && (
                <>
                  <button className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Activity className="w-6 h-6" /></div>
                      <span className="font-bold uppercase italic tracking-tighter">Data Permissions</span>
                    </div>
                    <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full p-6 bg-surface-container-high rounded-3xl flex items-center justify-between group border border-primary/20">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-2xl text-primary"><Download className="w-6 h-6" /></div>
                      <span className="font-bold uppercase italic tracking-tighter">Download Your Data</span>
                    </div>
                    <Download className="w-5 h-5 text-primary" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      case 'Support':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <SectionHeader title="Help & Support" />
            <div className="space-y-4">
              <button className="w-full p-6 bg-surface-container rounded-3xl text-left hover:bg-surface-container-high transition-colors">
                <h4 className="font-bold mb-1 uppercase italic tracking-tighter">FAQ</h4>
                <p className="text-on-surface-variant text-sm italic">Find answers to common questions about Apple Fit.</p>
              </button>
              <button className="w-full p-6 bg-surface-container rounded-3xl text-left hover:bg-surface-container-high transition-colors">
                <h4 className="font-bold mb-1 uppercase italic tracking-tighter">Contact Support</h4>
                <p className="text-on-surface-variant text-sm italic">Need more help? Our team is available 24/7.</p>
              </button>
              <button className="w-full p-6 bg-surface-container rounded-3xl text-left hover:bg-surface-container-high transition-colors">
                <h4 className="font-bold mb-1 uppercase italic tracking-tighter">Report a Problem</h4>
                <p className="text-on-surface-variant text-sm italic">Help us improve by reporting bugs or glitches.</p>
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4 pt-12 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-6 mb-12 px-2">
              <img src={PROFILE_IMG} className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-primary/20" alt="Profile" />
              <div>
                <h2 className="text-3xl font-headline font-extrabold italic uppercase tracking-tighter">jhunujha9</h2>
                <button onClick={() => setSection('Profile')} className="text-primary font-bold uppercase text-xs tracking-widest mt-1">Edit Profile</button>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'Profile', label: 'Profile', icon: UserIcon },
                { id: 'AppSettings', label: 'App Settings', icon: Settings },
                { id: 'Notifications', label: 'Notifications', icon: Bell },
                { id: 'Privacy', label: 'Privacy & Security', icon: Shield },
                { id: 'Support', label: 'Support', icon: HelpCircle },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setSection(item.id as SettingsSection)}
                  className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group hover:bg-surface-container-high transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-surface-container-highest rounded-2xl group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-on-surface-variant group-hover:text-primary" />
                    </div>
                    <span className="font-bold text-lg uppercase italic tracking-tighter">{item.label}</span>
                  </div>
                  <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto"
    >
      <div className="max-w-xl mx-auto w-full relative h-full">
        <button onClick={onClose} className="absolute right-0 top-0 p-3 bg-surface-container-highest rounded-full active:scale-90 transition-transform">
          <X className="w-6 h-6" />
        </button>
        {renderContent()}
      </div>
    </motion.div>
  );
};

// --- Screen Components ---

const HomeScreen = () => (
  <main className="pt-28 px-6 max-w-7xl mx-auto space-y-12 pb-32">
    <section className="space-y-2">
      <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase font-label">MONDAY, OCTOBER 24</span>
      <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] text-on-surface uppercase italic">
        Peak <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dim italic">Performance.</span>
      </h1>
    </section>

    {/* Progress & Stats Feature */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Workouts', val: '124', icon: Dumbbell, color: 'text-primary' },
        { label: 'Calories', val: '45.2k', icon: Flame, color: 'text-error' },
        { label: 'Streak', val: '14 Days', icon: Zap, color: 'text-tertiary' },
        { label: 'Reports', val: 'Monthly', icon: BarChart3, color: 'text-secondary' },
      ].map((stat, i) => (
        <div key={i} className="bg-surface-container rounded-3xl p-6 border border-outline-variant/5 shadow-lg group hover:bg-surface-container-high transition-all">
          <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
          <p className="text-2xl font-headline font-black text-on-surface italic">{stat.val}</p>
          <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider italic">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-2 bg-surface-container-low rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group border border-outline-variant/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8" />
            <circle className="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="44.23" strokeLinecap="round" strokeWidth="12" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-headline font-extrabold">92%</span>
            <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Daily Goal</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/10">
        <Move className="text-primary w-8 h-8" />
        <div className="mt-8">
          <h3 className="text-3xl font-headline font-bold">11,482</h3>
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Daily Steps</p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/10">
        <Heart className="text-error w-8 h-8 fill-current" />
        <div className="mt-8">
          <h3 className="text-3xl font-headline font-bold">68 <span className="text-sm font-normal text-on-surface-variant uppercase">BPM</span></h3>
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Heart Rate</p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/10">
        <Zap className="text-tertiary w-8 h-8 fill-current" />
        <div className="mt-8">
          <h3 className="text-3xl font-headline font-bold">52 <span className="text-sm font-normal text-on-surface-variant uppercase">MIN</span></h3>
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Active Minutes</p>
        </div>
      </div>

      <div className="md:col-span-3 bg-surface-container-low rounded-3xl p-8 space-y-6 border border-outline-variant/10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-headline font-bold">Weekly Recovery</h2>
            <p className="text-on-surface-variant text-sm">Optimal zone maintained for 5 days</p>
          </div>
          <div className="flex gap-1.5 items-end h-32">
            {[60, 85, 70, 95, 80, 40, 50].map((h, i) => (
              <div 
                key={i} 
                className={`w-8 rounded-t-lg ${i >= 1 && i <= 4 ? 'bg-primary shadow-[0_0_12px_rgba(151,169,255,0.4)]' : 'bg-surface-container-highest'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between text-[10px] uppercase font-bold text-outline tracking-wider px-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>

    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline font-bold tracking-tight">Recent Activities</h2>
        <button className="text-primary text-xs uppercase font-bold tracking-widest hover:opacity-70 transition-opacity">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container rounded-3xl p-6 flex gap-6 items-center group cursor-pointer transition-all hover:bg-surface-container-high active:scale-[0.98]">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoQu7lGzYH-awkGhEsRNhTZqInSXWNqkQ0oAH2xbNoU9Wdwpb8R-uefZXEuIZctFn7RLrNY_hcgKKx7WKSTllRWxfjIIvkCacxLr4bJ88T0vRcrn_-SiMvBdzp4yZV3KPTB_YxHEt4BL4RWNWwNYxFo0_dHSA0ykxoCQczh049EHaTDzWenrJjjj4zRHCnyC-C6lvDEG5KjKvtgZjZ_kvfyN9w1D_MPwh4ewHaNrJSXd4opkafs_7ePFuEp-LTOJWXqtatNsFEIZiJ" alt="Gym" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-headline font-bold">Hypertrophy Session</h4>
              <span className="text-primary-dim text-[10px] font-bold uppercase">08:30 AM</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                <Clock className="w-3 h-3" /> 45m
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                <Flame className="w-3 h-3" /> 340 kcal
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-3xl p-6 flex gap-6 items-center group cursor-pointer transition-all hover:bg-surface-container-high active:scale-[0.98]">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnzhKuLj_xPzuyhM1J9bt46qRtgGS1DMoLbsa-Fbjm-ARPuMddGbaldmzMpLQKZbB9yp_SiaNIPdj_I3xVR1Ez-A-9f7xA08OnZQtChuFISvq3m75sKLP9gwIRbNxjoLQdc1uUiUJZC-WhtHYveBGLrkBHO8ecqwKuz08swdclJg5SGNTut9NYzz-9exw7t8X71H9ZIqhlcbNVzj9PfgNadSIe64ejzo6YmqJZg5SzZ7oqa_BHu46Svld-RbCT1GZMYXRyfC0mMdKD" alt="Run" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-headline font-bold">Tempo Run</h4>
              <span className="text-primary-dim text-[10px] font-bold uppercase">YESTERDAY</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                <MapIcon className="w-3 h-3" /> 5.2 km
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                <Gauge className="w-3 h-3" /> 4'32"/km
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const SocialScreen = () => (
  <main className="pt-20 pb-32 px-4 max-w-2xl mx-auto space-y-8">
    <section className="space-y-4">
      <div className="flex justify-between items-end px-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1 block italic">Live Updates</span>
          <h2 className="text-2xl font-extrabold tracking-tight font-headline uppercase italic">Community Pulse</h2>
        </div>
        
        {/* Social Settings Quick Access */}
        <div className="flex gap-2">
          <button className="p-2 bg-surface-container rounded-full text-primary hover:bg-surface-container-high transition-colors">
            <LockIcon className="w-5 h-5" />
          </button>
          <button className="text-primary text-sm font-bold hover:underline">See All</button>
        </div>
      </div>

      {/* Social Privacy Controls */}
      <div className="grid grid-cols-2 gap-3 px-2">
        <div className="bg-surface-container/50 p-4 rounded-3xl flex items-center justify-between border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl"><Eye className="w-4 h-4 text-primary" /></div>
            <span className="text-[10px] font-bold uppercase tracking-wider italic">Public Account</span>
          </div>
          <div className="w-8 h-4 bg-primary rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" /></div>
        </div>
        <div className="bg-surface-container/50 p-4 rounded-3xl flex items-center justify-between border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl"><UserX className="w-4 h-4 text-primary" /></div>
            <span className="text-[10px] font-bold uppercase tracking-wider italic">Blocked</span>
          </div>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </div>
      </div>

      <div className="bg-surface-container-low rounded-[2rem] p-6 relative overflow-hidden group border border-outline-variant/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-on-surface-variant text-sm font-medium">Global Daily Steps</p>
            <p className="text-4xl font-black font-headline text-on-surface tracking-tighter">12,482,901</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest">Growing Rapidly</span>
            </div>
          </div>
          <div className="h-16 w-24 flex items-end gap-1.5">
            {[40, 60, 45, 80, 55, 90].map((h, i) => (
              <div 
                key={i} 
                className={`w-2 rounded-full ${h > 70 ? 'bg-primary shadow-[0_0_12px_rgba(151,169,255,0.4)]' : 'bg-surface-container-highest'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="px-2 text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">Rising Athletes</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-2">
        {[
          { name: 'Marcus Chen', followers: '4.2k', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4BDdJne3j8JHaBlFgdzdtYNn_gng2NBRR2wbj092ZNIu8VDfpGTQm4baEx5LU5Aai1Sy03G6WrDKul6x3R7TjcvuFHtUuFLkuEUsvubnma_TQmDa29Pj4-C61r86f6W5DnZWh0K_mOLX2wTDzfUoG3ReFPoXCCbfRZ82Lv8WkDOcBAB6HvqAFKB_egpNvq9hOL5Hbb1Wg6H-gvVtAj-aihjPqbQdK4rUQz4RM_dSshF7T-JlvBWERpmg10qLgd8WgDb2aNPb2cWz1" },
          { name: 'Sarah Drasner', followers: '8.1k', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBvOHY_owb9rZbKzByn-lHDsMc8Mn5v2FG9BItw0cLQZOZxpf6xbbu4fPxFrW5XYftTTA_dhFO9yJ0m3nU78uZH6-Frnnl-IIisAEmzPSD0grk6XgRjy69fwD5IbOm3_nNOs07w8OhQAwrjDwfAqLmdD8HWTllwZ4z-yz0iD-btBwToTCmlNnAqZUaLHkuNzVzyYsPW2yfwr_JD8Xe6WdPQyR28KOxNmbfMdC2AwdCSF7eQea6S7wZpJobsqheeD0mzuJtUX4haC5s", online: true },
          { name: 'Elena Vogt', followers: '12k', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYro2a3CDyqh-OlPjnx2MwdtWXGAi2Zo3ErghCIPQDK-AWiDqCefLf3ENtgFbXn1Vvp7UR0luUvs2eze01lfISox1-cSHLE3gNqYTsTXfT4IsCwPyOR6Pxt1l3NjVs2zsJYQbIq0OdxU_bqjFoag3QxZf0znomt27D0Oj7kOoHs1finaZOnFU0nmxcyyIA5JO7T7X4Cfwr-aAHR3n8pJtz13ZLR4aQKETZrR9sw8usP-6NtSp5_N_eJU18GF_wLHghP9z1ZIIv5fqX" },
          { name: 'Leo King', followers: '2.5k', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxCSfI_XxiZqmbV32f3qvdyvc6LsSAadIXL_NoHsbg5RlLpiuBowaEhWB5YnIBEuCBu2OMU0YvwYZNgfBqUt2zGAdNo-dTTiFKpoinOQ1QlUf2GdXXGNOZ33aVz77AMN9Pg3nLMlAYozh38vlUnCyitF2z7lbj2YNZGxUCjVm7vqF7XetdE-lpF-f0hR8SkUKPNtzl_lbFDRdF_6tNWWY9gIH1J-XxKIRK7zJ4a1v71m0zpMsk-ws08MxuFUPMTfS9DENcpoLkdXn5" }
        ].map((ath, idx) => (
          <div key={idx} className="flex-shrink-0 w-32 space-y-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-tertiary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <img src={ath.img} className="relative w-32 h-40 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-300" referrerPolicy="no-referrer" />
              {ath.online && <div className="absolute top-2 right-2 bg-primary w-2.5 h-2.5 rounded-full border border-surface shadow-lg" />}
            </div>
            <div>
              <p className="text-xs font-bold truncate">{ath.name}</p>
              <p className="text-[10px] text-on-surface-variant font-medium">{ath.followers} followers</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <FeedItem 
        user="Sarah Drasner" 
        meta="Squat Max PR • 2 hours ago" 
        avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBIdRT-WlVlm_wSZE3MzIK7254TfYgnZ7lnmpC9B-392E_r8uaOyLFS3DVTpMFkzA7pzkQj3ZGN-MWHxueI5y27Be20f9mDp1Tvp99DLBVxwjsyfq1PgsGe8rJ4tLvZtVezOzUMrkyZdfyW3HZeFl-2X9kYE1uxwQGOzP2BLpytHdmnLWCPGFrJJ2OufqQHmt8IIFITesmYcSv2vCQBEf7bUQbkU-N1Q--iogU6utO8ZvQP-Y-7QPpYShtqFgdlkPit2JaLEonQjB-N"
      >
        <div className="bg-surface-container rounded-3xl p-6 flex flex-col items-center justify-center space-y-2 border border-outline-variant/10 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">New Personal Best</span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black font-headline tracking-tighter text-on-surface">315</span>
            <span className="text-xl font-bold text-on-surface-variant">LBS</span>
          </div>
          <div className="flex items-center gap-2 text-error text-xs font-bold">
            <TrendingUp className="w-4 h-4" /> +15 lbs from last month
          </div>
        </div>
        <p className="text-sm text-on-surface-variant px-1 mt-3">
          Finally hit the 3 plate milestone! It's been a long journey of consistency and proper recovery. Huge thanks to the Apple Fit community for the motivation.
        </p>
      </FeedItem>

      <FeedItem 
        user="Elena Vogt" 
        meta="Energy Levels • 5 hours ago" 
        avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuC043UjhB2muPQ8BhC2YNweXZ03Wktw-6kMndiZOvFAjHS9Xj47ziJ-8t3FXJEOmahwS67AlYfLbUU-a1rF5tx1bnfg9w_bUKu1tIAmT4_KMB8apaTXQpDM2Sd9GFb-MGdZuXtXkD1A0L2hZayKFzwyVIUNWQ7h6XhFfSEJhhm6ZN1oGRU_IGMo6HH54fIC7SkeYFNz1xGnbrswP1dYGvPPGgPO5xg6Yl23NQlZBeianfMeCkkUWIRF8b315QHfANffFoqozvTRYeOm"
      >
        <div className="bg-surface-container rounded-3xl p-5 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Weekly Energy Flow</h4>
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-surface-variant" />
            </div>
          </div>
          <div className="flex items-end justify-between h-24 gap-2">
            {[30, 50, 45, 90, 60, 75, 55].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-full ${h > 80 ? 'bg-primary shadow-[0_0_12px_rgba(151,169,255,0.2)]' : 'bg-surface-container-highest'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </FeedItem>
    </section>
  </main>
);

const FeedItem = ({ user, meta, avatar, children }: { user: string, meta: string, avatar: string, children: ReactNode }) => (
  <article className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/5">
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-10 h-10 rounded-full object-cover border border-primary/10" referrerPolicy="no-referrer" />
        <div>
          <p className="text-sm font-bold">{user}</p>
          <p className="text-[10px] text-on-surface-variant font-medium">{meta}</p>
        </div>
      </div>
      <button className="text-on-surface-variant p-2"><Settings className="w-5 h-5 opacity-50" /></button>
    </div>
    <div className="px-4 pb-4">
      {children}
    </div>
    <div className="px-4 py-3 flex items-center justify-between border-t border-outline-variant/10">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-primary">
          <Heart className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold">412</span>
        </button>
        <button className="flex items-center gap-1.5 text-on-surface-variant">
          <Activity className="w-5 h-5" />
          <span className="text-xs font-bold">28</span>
        </button>
      </div>
      <button className="text-on-surface-variant"><Search className="w-5 h-5" /></button>
    </div>
  </article>
);

const ExerciseScreen = () => (
  <main className="pt-24 px-6 max-w-5xl mx-auto pb-32">
    <section className="mb-10">
      <div className="relative w-full h-64 rounded-[2rem] overflow-hidden group border border-outline-variant/10">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5vBpIUdPdMKOPjyfh9FbN4o71YMDEto1rUehQY0CsOP_SgT7YU6OIKuRAbJf4Mti8z7616zKTwRuo0bgIvEWoNFToFmI0FxOvruPnvFiRGOoiHN_ZMsjyJI31nam_2nSybTD5BDz62E3xrVKKnoQzifiGIfPoiZyGoFu-agj6K3Q3YF_O-EZWEKBKOHVE2VoSre-8tVHxZCaetBcQNkL6ph2g0WkKum1VU4UBKNxsUlryLKodBadNS7NOXxvOI5MiQVSiPN6N15dr" className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 italic">Active Now</span>
          <h1 className="font-headline text-3xl font-extrabold text-white tracking-tight mb-2 uppercase italic">Training Mode</h1>
          <p className="text-on-surface-variant text-sm max-w-xs italic">Push your limits with AI-guided movements.</p>
        </div>
        <button className="absolute bottom-6 right-6 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <Play className="w-6 h-6 fill-current" />
        </button>
      </div>
    </section>

    {/* Fitness Preferences Feature */}
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-3">
            <Target className="text-primary w-6 h-6" />
            <h3 className="text-lg font-bold uppercase italic tracking-tighter">Fitness Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest italic">Your Goal</label>
              <div className="flex gap-2">
                {['Lose Weight', 'Gain Muscle', 'Maintain'].map((g) => (
                  <button key={g} className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase border italic ${g === 'Gain Muscle' ? 'bg-primary text-white border-primary' : 'bg-surface border-outline-variant/10 text-on-surface-variant'}`}>{g}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest italic">Workout Level</label>
              <div className="flex gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <button key={l} className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase border italic ${l === 'Intermediate' ? 'bg-primary text-white border-primary' : 'bg-surface border-outline-variant/10 text-on-surface-variant'}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="text-primary w-6 h-6" />
            <h3 className="text-lg font-bold uppercase italic tracking-tighter">Training Targets</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-2xl border border-outline-variant/10">
              <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 italic">Target Steps</p>
              <p className="text-2xl font-black italic">12,000</p>
            </div>
            <div className="bg-surface p-4 rounded-2xl border border-outline-variant/10">
              <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 italic">Target Kcal</p>
              <p className="text-2xl font-black italic">2,200</p>
            </div>
            <div className="col-span-2 bg-primary/10 p-4 rounded-2xl border border-primary/20 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-primary mb-1 italic">Preferred Time</p>
                <p className="text-lg font-black italic text-primary">06:00 AM - 08:00 AM</p>
              </div>
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1 block">Workout Library</span>
          <h2 className="font-headline text-2xl font-bold text-on-surface">Target Categories</h2>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-wider hover:opacity-80">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Chest', routines: 12, icon: Dumbbell, color: 'text-primary' },
          { title: 'Legs', routines: 8, icon: Move, color: 'text-secondary' },
          { title: 'Full Body', routines: 15, icon: Accessibility, color: 'text-tertiary' }
        ].map((cat, idx) => (
          <div key={idx} className="bg-surface-container-low rounded-[2rem] p-6 hover:bg-surface-container transition-all group relative overflow-hidden border border-outline-variant/10">
            <div className="relative z-10">
              <div className={`bg-surface-container-highest w-14 h-14 rounded-2xl flex items-center justify-center mb-16 ${cat.color} group-hover:scale-110 transition-transform group-hover:bg-surface-bright`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-1">{cat.title}</h3>
              <p className="text-on-surface-variant text-xs">{cat.routines} specialized routines</p>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <cat.icon className="w-40 h-40" />
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Workout History</h2>
      <div className="space-y-4">
        {[
          { title: 'Hypertrophy Chest A', meta: 'Yesterday • 54 mins • 420 kcal', gain: '+2.5%', color: 'text-primary', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNL0p1g5Xs4yA94a4Fu1rewHkfbJM9BgX99J_dsDUBjcCeSY3dAvJFq5-hPhJG4YHOgCnPy31SageHDt-NRb__tmyKwclsBWu9YH-plMpK435gbMpEc5ZIoHRWFmG6CyztiGY7ozP9Fghz1aKUgGXUA9Ab-9horKzHneavpThdKtbMejbXHhSUUzzVyqSbphtyhzawI69WrVz6-I5JtrKEkVxhWKsv1qfhRg8xO210fzRVCuojZ5RZrDG9fgcG0n1D-5rtdrWnl_G2" },
          { title: 'Endurance Leg Day', meta: 'Oct 24 • 68 mins • 580 kcal', gain: '+1.2%', color: 'text-secondary', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYP-kftd0DBp6xklrSQdcWk8McKbg-Kqd20Zry2p9QNvJuFEcaSvgIC2-y-r1w5I5I6vB-ZvUh9fJjnmtxKFRSyTbIJjvGAzSgS2eQNzNHQqPPP4vRcDvV0smqsNnGlXPLrbobcvFWDCk_A0UWYfNMeW3p4H1TCPfqs38IbhBcotYxiGtj7QM1Y44eoaPRsdz1SkJHpwIGHo_XVBXpm6saxToAodgesWdXq_p0ToQWbu54k0KulQnZdRyGEXnUj_iz9eGDe1-GCxsb" },
          { title: 'Full Body HIIT', meta: 'Oct 22 • 30 mins • 310 kcal', gain: '+5.0%', color: 'text-tertiary', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbYc1hZfy7UwSncdrX-Iys0x4ucidKPmsu1t8ZSAxt03cjd4-OMsHB0y3afps3iberxIC-4f1eboD4nCocxzdDb_dBAvQQ03vRaFx08O63-HUxz8LTJTEKg356A0IYejuo-suV6fijYms6bPoFEI4RyzVuR4GAGVTAXzVcGkI-82y_PC4C7Gu2jz5B2nbVkKhWLRqCbKSoxc17D-a_0PkwS03kVAuI4J-YCs4A-5RWV-rQbRid6JCevAyrHyIEBZ9RXlJ1j_3vQCZL" }
        ].map((item, idx) => (
          <div key={idx} className="bg-surface-container-high rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0">
                <img src={item.img} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">{item.title}</h4>
                <p className="text-on-surface-variant text-xs">{item.meta}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`${item.color} font-bold text-sm`}>{item.gain}</span>
              <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

const SleepScreen = () => (
  <main className="pt-24 px-6 max-w-5xl mx-auto space-y-8 pb-32">
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface-container-low p-8 rounded-[2rem] relative overflow-hidden group border border-outline-variant/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-1">
          <span className="text-on-surface-variant font-label text-[10px] font-bold uppercase tracking-[0.15em] italic">Daily Performance</span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface uppercase italic">Sleep Score</h2>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-8xl font-black font-headline text-primary italic">82</span>
            <span className="text-2xl font-bold text-on-surface-variant italic">/100</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 rounded-full shadow-inner">
            <Sparkles className="w-4 h-4 text-primary fill-current" />
            <span className="text-primary font-bold text-xs uppercase tracking-wider italic">GOOD QUALITY</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Sleep Settings Feature */}
        <div className="col-span-2 bg-surface-container-highest p-6 rounded-[2rem] border border-primary/30 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-primary uppercase italic">Sleep Controls</h3>
            <Bed className="text-primary w-5 h-5" />
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 bg-surface rounded-2xl">
               <span className="text-[10px] font-bold uppercase italic">Sleep Goal (7-8h)</span>
               <span className="text-primary font-bold italic">8.0h</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-surface rounded-2xl">
               <span className="text-[10px] font-bold uppercase italic">Bedtime Reminder</span>
               <div className="w-10 h-5 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
             </div>
             <div className="flex justify-between items-center p-3 bg-surface rounded-2xl">
               <span className="text-[10px] font-bold uppercase italic">Wake-up Alarm</span>
               <AlarmClock className="w-4 h-4 text-on-surface-variant" />
             </div>
          </div>
        </div>
        
        <div className="bg-surface-container p-6 rounded-[2rem] flex flex-col justify-between border border-outline-variant/5">
          <Clock className="text-primary-dim w-6 h-6" />
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Duration</p>
            <p className="text-2xl font-extrabold text-on-surface mt-1">7h 42m</p>
          </div>
        </div>
        <div className="bg-surface-container p-6 rounded-[2rem] flex flex-col justify-between border border-primary/20 shadow-[0_4px_30px_rgba(45,91,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-dim" />
          <Moon className="text-primary-dim w-6 h-6 fill-current" />
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Deep Sleep</p>
            <p className="text-2xl font-extrabold text-on-surface mt-1">2h 15m</p>
          </div>
        </div>
        <div className="col-span-2 bg-surface-container p-6 rounded-[1.5rem] flex items-center justify-between border border-outline-variant/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center">
              <Activity className="text-tertiary w-6 h-6" />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Avg Heart Rate</p>
              <p className="text-xl font-extrabold text-on-surface">54 BPM</p>
            </div>
          </div>
          <span className="text-primary font-bold text-sm uppercase tracking-wide">Target Met</span>
        </div>
      </div>
    </section>

    <section className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-headline text-2xl font-bold text-on-surface">Weekly Patterns</h3>
          <p className="text-on-surface-variant text-sm">Consistency is up 12% from last week</p>
        </div>
        <button className="bg-surface-container-high text-primary font-bold py-2 px-6 rounded-full hover:bg-surface-bright transition-colors text-xs uppercase tracking-widest">Details</button>
      </div>
      <div className="h-48 flex items-end justify-between gap-3 px-2">
        {[65, 80, 50, 95, 70, 60, 75].map((h, i) => (
          <div key={i} className="flex-1 group flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-highest rounded-full h-44 relative overflow-hidden">
              <div 
                className={`absolute bottom-0 w-full rounded-full transition-all duration-700 ${i === 3 ? 'bg-primary shadow-[0_0_20px_rgba(45,91,255,0.4)]' : 'bg-primary/30'}`}
                style={{ height: `${h}%` }}
              />
            </div>
            <span className={`text-[10px] font-black uppercase ${i === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
            </span>
          </div>
        ))}
      </div>
    </section>
  </main>
);

const CalculatorScreen = () => (
  <main className="pt-24 px-6 max-w-5xl mx-auto space-y-8 pb-32">
    <section className="space-y-2">
      <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Calculators</h1>
      <p className="text-on-surface-variant font-body">Precision metrics for your peak performance.</p>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-8 space-y-6 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center">
          <h2 className="font-headline text-xl font-bold">BMI Analysis</h2>
          <span className="text-[10px] uppercase tracking-widest text-primary font-black">Metric System</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Weight (kg)</label>
              <input className="w-full bg-surface-container-highest border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary transition-all font-bold" placeholder="75" type="number" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Height (cm)</label>
              <input className="w-full bg-surface-container-highest border-none rounded-2xl px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary transition-all font-bold" placeholder="180" type="number" />
            </div>
            <button className="w-full bg-primary text-on-primary rounded-2xl py-4 font-black uppercase tracking-widest transition-transform active:scale-95 shadow-lg mt-2">
              Calculate BMI
            </button>
          </div>
          <div className="bg-surface-container-high rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-4 shadow-inner border border-outline-variant/5">
            <div className="text-on-surface-variant text-[10px] font-black uppercase tracking-tighter">Your Current BMI</div>
            <div className="text-7xl font-headline font-black text-primary tracking-tighter">23.1</div>
            <div className="px-5 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest">Healthy Range</div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              A BMI of 23.1 indicates you are within the normal weight range for your height.
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 bg-surface-container rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden border border-outline-variant/5 shadow-sm">
        <div className="z-10">
          <h3 className="font-headline font-bold text-xl mb-1">Hydration</h3>
          <p className="text-xs text-on-surface-variant font-medium">Daily Goal: 3.5L</p>
        </div>
        <div className="z-10 py-8">
          <div className="relative h-56 w-full bg-surface-container-highest rounded-3xl overflow-hidden flex flex-col justify-end shadow-inner">
            <div className="h-[65%] w-full bg-gradient-to-t from-primary-dim to-primary relative shadow-[0_0_30px_rgba(45,91,255,0.3)]">
              <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-black text-on-surface drop-shadow-lg">65%</span>
            </div>
          </div>
        </div>
        <div className="z-10 flex gap-3">
          <button className="flex-1 bg-surface-bright p-4 rounded-2xl flex items-center justify-center hover:bg-surface-container-highest transition-colors active:scale-90">
            <Plus className="w-6 h-6 text-primary" />
          </button>
          <button className="flex-1 bg-surface-bright p-4 rounded-2xl flex items-center justify-center hover:bg-surface-container-highest transition-colors active:scale-90">
            <Activity className="w-6 h-6 text-primary-dim" />
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 blur-[80px]" />
      </div>

      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low rounded-[1.5rem] p-8 space-y-4 border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-primary w-6 h-6 fill-current" />
            <h3 className="font-headline font-bold text-lg">Daily Targets</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Basal Metabolic Rate', value: '1,840 kcal', color: 'text-on-surface-variant' },
              { label: 'Daily Maintenance', value: '2,450 kcal', color: 'text-primary', active: true },
              { label: 'Bulking Phase', value: '2,950 kcal', color: 'text-tertiary' }
            ].map((row, i) => (
              <div key={i} className={`flex justify-between items-center p-4 rounded-2xl ${row.active ? 'bg-surface-container-highest border border-primary/20' : 'bg-surface-container'}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${row.color}`}>{row.label}</span>
                <span className={`font-black tracking-tight ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-low rounded-[1.5rem] p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-headline font-bold text-lg">Macro Breakdown</h3>
            <div className="flex gap-4">
              {['Primary', 'Tertiary', 'Secondary'].map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${c.toLowerCase()}`} />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant">{['Protein', 'Carbs', 'Fats'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-14 w-full rounded-full overflow-hidden mb-10 shadow-inner border border-outline-variant/10">
            <div className="bg-primary w-[40%] flex items-center justify-center text-[10px] font-black text-on-primary">40%</div>
            <div className="bg-tertiary w-[35%] flex items-center justify-center text-[10px] font-black text-on-tertiary">35%</div>
            <div className="bg-secondary w-[25%] flex items-center justify-center text-[10px] font-black text-on-secondary">25%</div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { val: '185g', label: 'Protein' },
              { val: '214g', label: 'Carbs' },
              { val: '68g', label: 'Fats' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black font-headline tracking-tighter">{item.val}</div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </main>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [method, setMethod] = useState<'Main' | 'Phone' | 'Email'>('Main');
  const [otpSent, setOtpSent] = useState(false);
  const [value, setValue] = useState('');

  const renderContent = () => {
    switch (method) {
      case 'Phone':
      case 'Email':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 w-full"
          >
            <button onClick={() => { setMethod('Main'); setOtpSent(false); }} className="flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to options
            </button>
            <div className="space-y-2">
              <h2 className="text-4xl font-headline font-black uppercase italic tracking-tighter leading-tight">
                {otpSent ? 'Verify Identity' : `Login via ${method}`}
              </h2>
              <p className="text-on-surface-variant text-sm italic">
                {otpSent ? `Enter the 6-digit code sent to ${value}` : `Enter your ${method.toLowerCase()} to receive a one-time passcode.`}
              </p>
            </div>
            
            {!otpSent ? (
               <div className="space-y-4">
                 <input 
                   type={method === 'Email' ? 'email' : 'tel'} 
                   placeholder={method === 'Email' ? 'example@gmail.com' : '+1 (555) 000-0000'}
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   className="w-full bg-surface-container-high p-6 rounded-3xl border border-outline-variant/10 outline-none focus:border-primary transition-all text-lg font-bold"
                 />
                 <button 
                   onClick={() => setOtpSent(true)}
                   className="w-full bg-primary text-on-primary py-5 rounded-3xl font-black uppercase italic tracking-[0.15em] shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                 >Get One-Time Passcode</button>
               </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between gap-2">
                  {[1,2,3,4,5,6].map(i => (
                    <input key={i} type="text" maxLength={1} className="w-12 h-16 bg-surface-container-high rounded-2xl text-2xl font-black text-center border border-outline-variant/10 focus:border-primary outline-none" />
                  ))}
                </div>
                <button 
                  onClick={onLogin}
                  className="w-full bg-primary text-on-primary py-5 rounded-3xl font-black uppercase italic tracking-[0.15em] shadow-xl shadow-primary/20"
                >Verify & Login</button>
                <div className="text-center">
                  <button className="text-[10px] font-black uppercase text-on-surface-variant hover:text-primary transition-colors italic tracking-widest">Resend Code in 0:59</button>
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12 w-full"
          >
            <div className="text-center space-y-4">
               <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                 <img src={LOGO_IMG} className="w-10 h-10 object-contain" alt="Apple Fit" referrerPolicy="no-referrer" />
               </div>
               <h1 className="text-5xl font-headline font-black uppercase italic tracking-tighter leading-[0.9]">
                 Apple <span className="text-primary">Fit.</span>
               </h1>
               <p className="text-on-surface-variant font-medium max-w-[240px] mx-auto text-sm italic">Unlock peak performance. Sign in to continue your journey.</p>
            </div>

            <div className="space-y-4">
               <button 
                 onClick={() => setMethod('Email')}
                 className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group hover:bg-primary transition-all duration-500"
               >
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-surface-container-highest rounded-2xl group-hover:bg-white/20">
                      <img src="https://www.google.com/favicon.ico" className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                    </div>
                    <span className="font-bold uppercase italic tracking-tighter group-hover:text-white transition-colors">Continue with Google</span>
                 </div>
                 <ChevronRight className="text-on-surface-variant group-hover:text-white transition-all" />
               </button>

               <button 
                 onClick={() => setMethod('Phone')}
                 className="w-full p-6 bg-surface-container rounded-3xl flex items-center justify-between group hover:bg-primary transition-all duration-500"
               >
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-surface-container-highest rounded-2xl group-hover:bg-white/20">
                      <Smartphone className="w-6 h-6 text-on-surface-variant group-hover:text-white" />
                    </div>
                    <span className="font-bold uppercase italic tracking-tighter group-hover:text-white transition-colors">Continue with Phone</span>
                 </div>
                 <ChevronRight className="text-on-surface-variant group-hover:text-white transition-all" />
               </button>
            </div>

            <div className="text-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-8 leading-relaxed opacity-50 italic">
               By continuing, you agree to Apple Fit's <span className="text-on-surface hover:underline cursor-pointer">Terms of Service</span> and <span className="text-on-surface hover:underline cursor-pointer">Privacy Policy</span>.
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface transition-colors duration-500" data-theme={theme}>
      <TopAppBar 
        onProfileClick={() => setShowSettings(true)}
        showSearch={screen === 'Social'} 
        hidden={screen === 'Login'}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {screen === 'Home' && <HomeScreen />}
          {screen === 'Social' && <SocialScreen />}
          {screen === 'Exercise' && <ExerciseScreen />}
          {screen === 'Sleep' && <SleepScreen />}
          {screen === 'Calculator' && <CalculatorScreen />}
          {screen === 'Login' && <LoginScreen onLogin={() => setScreen('Home')} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <SettingsOverlay 
            theme={theme}
            setTheme={setTheme}
            onLogout={() => {
              setShowSettings(false);
              setScreen('Login');
            }}
            onClose={() => setShowSettings(false)} 
          />
        )}
      </AnimatePresence>

      <BottomNavBar activeScreen={screen} setScreen={setScreen} hidden={screen === 'Login'} />

      {/* Persistent FAB */}
      <AnimatePresence>
        {screen !== 'Login' && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center z-40 sm:bottom-28 md:right-10"
          >
            <Plus className="w-7 h-7 stroke-[3px]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
