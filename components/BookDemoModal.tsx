"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Calendar, Lock, CheckCircle2, ChevronLeft, ChevronRight, 
  ChevronDown, Check
} from "lucide-react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeZoneOptions = [
  { label: "(GMT+05:30) India Standard Time", value: "Asia/Kolkata" },
  { label: "(GMT-08:00) Pacific Time", value: "America/Los_Angeles" },
  { label: "(GMT-05:00) Eastern Time", value: "America/New_York" },
  { label: "(GMT+00:00) London", value: "Europe/London" }
];

const demoSlotTimes = [
  [10, 0],
  [11, 0],
  [13, 0],
  [14, 0],
  [15, 0],
  [16, 30]
];

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isSameDay = (left: Date, right: Date) => dateKey(left) === dateKey(right);

export function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Scheduling states
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZoneOptions[0].value);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form states
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
    industry: "",
    howDidYouHear: "",
    additionalInfo: ""
  });

  const interests = [
    "AI Copilot", "Alerts & Incidents", "Monitoring & Metrics", 
    "Integrations", "Reports & Analytics", "Other"
  ];

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingDays = firstDay.getDay();
    const days: Date[] = [];

    for (let index = leadingDays - 1; index >= 0; index -= 1) {
      days.push(new Date(year, month, -index));
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(new Date(year, month, day));
    }

    while (days.length % 7 !== 0) {
      const lastDay = days[days.length - 1];
      days.push(new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 1));
    }

    return days;
  }, [visibleMonth]);

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const minimumBookingTime = new Date(now.getTime() + 60 * 60 * 1000);

    return demoSlotTimes
      .map(([hour, minute]) => new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute
      ))
      .filter((slot) => slot > minimumBookingTime)
      .map((slot) => ({
        id: slot.toISOString(),
        label: new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: selectedTimeZone
        }).format(slot)
      }));
  }, [now, selectedDate, selectedTimeZone]);

  const selectedSlotLabel = useMemo(() => {
    if (!selectedTime) return null;

    const selectedSlot = new Date(selectedTime);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: selectedTimeZone
    }).format(selectedSlot);
  }, [selectedTime, selectedTimeZone]);

  const localTimeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
    timeZone: selectedTimeZone
  }).format(now);

  const isDateAvailable = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const isPast = startOfDay(date) < startOfDay(now);
    const isOutsideVisibleMonth = date.getMonth() !== visibleMonth.getMonth();

    return !isWeekend && !isPast && !isOutsideVisibleMonth;
  };

  const handleMonthChange = (direction: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate transitioning to scheduling
    setTimeout(() => {
      setIsLoading(false);
      setIsFormCompleted(true);
    }, 600);
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    // Simulate final API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1200);
  };

  const handleReset = () => {
    setStep("form");
    setIsFormCompleted(false);
    setFormData({
      fullName: "",
      workEmail: "",
      companyName: "",
      jobTitle: "",
      companySize: "",
      industry: "",
      howDidYouHear: "",
      additionalInfo: ""
    });
    setSelectedInterests([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedTimeZone(timeZoneOptions[0].value);
    const today = new Date();
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8 font-sans">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[24px] bg-[#0F1517] shadow-2xl border border-white/10"
        >
          {step === "form" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
              
              {/* Left Column - Form */}
              <form onSubmit={handleContinueToSchedule} className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-[#41bf63]" />
                  <span className="text-xs font-bold text-[#41bf63] uppercase tracking-wider">Book a Demo</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  See Teleroot AI in action
                </h2>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-md">
                  Book a personalized demo with our experts and discover how Teleroot AI can help you detect, resolve, and prevent issues faster.
                </p>

                {/* Form Fields */}
                <div className="space-y-5">
                  <div className="mb-2 flex items-center gap-4">
                    <h3 className="text-sm font-bold text-white">Tell us about yourself</h3>
                    <div className="h-px flex-1 bg-white/5"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Full Name <span className="text-red-500">*</span></label>
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Work Email <span className="text-red-500">*</span></label>
                      <input required type="email" name="workEmail" value={formData.workEmail} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all" placeholder="Enter your work email" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Company Name <span className="text-red-500">*</span></label>
                      <input required name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-600 focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all" placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Job Title <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select required name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white appearance-none focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all [&>option]:bg-[#13161F]">
                          <option value="" disabled className="text-slate-600">Select your job title</option>
                          <option value="CTO/CIO">CTO / CIO</option>
                          <option value="VP Engineering">VP Engineering</option>
                          <option value="Network Engineer">Network Engineer</option>
                          <option value="DevOps/SRE">DevOps / SRE</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Company Size <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select required name="companySize" value={formData.companySize} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white appearance-none focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all [&>option]:bg-[#13161F]">
                          <option value="" disabled>Select company size</option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Industry <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select required name="industry" value={formData.industry} onChange={handleInputChange} className="w-full h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white appearance-none focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all [&>option]:bg-[#13161F]">
                          <option value="" disabled>Select industry</option>
                          <option value="Telecommunications">Telecommunications</option>
                          <option value="Technology/SaaS">Technology / SaaS</option>
                          <option value="Finance">Finance</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-300">What would you like to see in the demo? (Select all that apply)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {interests.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest)}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all text-left ${
                              isSelected 
                                ? "border-[#41bf63] bg-[#41bf63]/10 text-white" 
                                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300"
                            }`}
                          >
                            <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border transition-colors shrink-0 ${
                              isSelected ? "border-[#41bf63] bg-[#41bf63]" : "border-slate-500 bg-transparent"
                            }`}>
                              {isSelected && <Check className="h-2.5 w-2.5 text-[#0F1517]" strokeWidth={3} />}
                            </div>
                            <span className="truncate">{interest}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-300">Anything else we should know?</label>
                    <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} className="w-full min-h-[60px] rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder:text-slate-600 focus:border-[#41bf63]/50 focus:bg-[#41bf63]/5 outline-none transition-all resize-y" placeholder="Tell us about your use case, challenges, or goals..." />
                  </div>

                  <div className="mt-4">
                    <button 
                      type="submit" 
                      disabled={isLoading || isFormCompleted}
                      className={`w-full h-10 rounded-xl text-black font-bold text-xs flex items-center justify-center gap-2 transition-all group ${
                        isFormCompleted 
                          ? "bg-white/10 text-slate-400 opacity-50 cursor-not-allowed" 
                          : "bg-[#41bf63] hover:bg-[#bce628] shadow-lg shadow-[#41bf63]/20"
                      }`}
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : isFormCompleted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Ready to Schedule
                        </>
                      ) : (
                        <>
                          Continue to Schedule
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-slate-500 mt-4 justify-center">
                      <Lock className="h-3 w-3" />
                      <p className="text-[10px] font-medium">We respect your privacy. Your information is safe with us.</p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Right Column - Active Calendar */}
              <div className="p-6 lg:p-8 bg-[#13161F] flex flex-col relative overflow-hidden">
                
                {/* Blur Overlay when Form is not completed */}
                <AnimatePresence>
                  {!isFormCompleted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 bg-[#13161F]/80 backdrop-blur-[4px] flex items-center justify-center rounded-r-[24px]"
                    >
                      <div className="text-center p-6 border border-white/10 bg-[#0F1517] shadow-2xl rounded-2xl max-w-[280px] flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                          <Calendar className="h-5 w-5 text-slate-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">Complete the form</h3>
                        <p className="text-[11px] text-slate-400">Please fill out your details and click "Continue to Schedule" to pick your preferred demo time.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative mesh */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-r-[24px]">
                  <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-[#41bf63] rounded-full blur-[120px] opacity-10"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex flex-col gap-1 mb-6 border-b border-white/5 pb-4">
                    <h3 className="text-lg font-bold text-white">Select a date & time</h3>
                    <p className="text-[10px] text-slate-400">Slots update in real time. Current selected-zone time: {localTimeLabel}</p>
                    <div className="mt-2 relative self-start">
                      <select
                        value={selectedTimeZone}
                        onChange={(event) => {
                          setSelectedTimeZone(event.target.value);
                          setSelectedTime(null);
                        }}
                        className="appearance-none rounded-md border border-white/10 bg-white/5 py-1.5 pl-2.5 pr-6 text-[10px] font-medium text-slate-300 outline-none [&>option]:bg-[#13161F]"
                      >
                        {timeZoneOptions.map((timeZone) => (
                          <option key={timeZone.value} value={timeZone.value}>{timeZone.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Calendar UI */}
                  <div className="rounded-xl border border-white/5 bg-[#0F1517] p-4 shadow-inner">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white">{monthFormatter.format(visibleMonth)}</span>
                      <div className="flex gap-1.5">
                        <button type="button" onClick={() => handleMonthChange(-1)} className="h-5 w-5 rounded flex items-center justify-center bg-white/5 text-slate-400 hover:text-white transition-colors"><ChevronLeft className="h-3 w-3" /></button>
                        <button type="button" onClick={() => handleMonthChange(1)} className="h-5 w-5 rounded flex items-center justify-center bg-white/5 text-slate-400 hover:text-white transition-colors"><ChevronRight className="h-3 w-3" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                      {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                        <div key={d} className="text-[8px] font-bold text-slate-500">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                      {calendarDays.map((date) => {
                        const isAvailable = isDateAvailable(date);
                        const isSelected = selectedDate && isSameDay(selectedDate, date);

                        return (
                        <button 
                          key={dateKey(date)}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                          className={`h-7 rounded-full flex items-center justify-center transition-all ${
                            isSelected 
                              ? "bg-[#41bf63] text-black font-bold shadow-[0_0_8px_rgba(65,191,99,0.3)]" 
                              : isAvailable
                                ? "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10"
                                : "text-slate-600 cursor-not-allowed"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots & Submit */}
                  <div className="mt-6 flex-1 flex flex-col">
                    {!selectedDate ? (
                       <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-4">
                         <Calendar className="h-6 w-6 text-slate-500 mb-2" />
                         <p className="text-[10px] text-slate-400">Select a date to view available times</p>
                       </div>
                    ) : (
                       <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex-1 flex flex-col">
                         <p className="text-[11px] font-bold text-white mb-3 text-center">
                           Available times for {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                         </p>
                         {availableSlots.length > 0 ? (
                         <div className="grid grid-cols-3 gap-2 mb-6">
                           {availableSlots.map((slot) => (
                             <button 
                               key={slot.id}
                               type="button"
                               onClick={() => setSelectedTime(slot.id)}
                               className={`w-full rounded-lg border py-2 text-center text-[10px] font-bold transition-all ${
                                 selectedTime === slot.id 
                                  ? "border-[#41bf63] bg-[#41bf63]/10 text-[#41bf63]" 
                                  : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-white/5"
                               }`}
                             >
                               {slot.label}
                             </button>
                           ))}
                         </div>
                         ) : (
                           <div className="mb-6 rounded-xl border border-dashed border-white/10 bg-white/5 p-4 text-center">
                             <p className="text-[10px] font-medium text-slate-500">No remaining slots for this date. Please choose another weekday.</p>
                           </div>
                         )}

                         <div className="mt-auto pt-4 flex flex-col items-center">
                           <AnimatePresence>
                             {selectedTime && (
                               <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: 10 }}
                                 className="w-full"
                               >
                                 <button 
                                   type="button" 
                                   onClick={handleFinalSubmit}
                                   disabled={isLoading}
                                   className="w-full h-11 rounded-xl bg-[#41bf63] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#bce628] disabled:opacity-70 shadow-lg shadow-[#41bf63]/20"
                                 >
                                   {isLoading ? (
                                     <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                   ) : (
                                     `Request demo for ${selectedSlotLabel}`
                                   )}
                                 </button>
                               </motion.div>
                             )}
                           </AnimatePresence>
                           {!selectedTime && (
                              <div className="h-11 w-full rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center opacity-50">
                                 <p className="text-[10px] text-slate-500 font-medium">Select a time to continue</p>
                              </div>
                           )}
                         </div>
                       </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            /* Success State */
            <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center sm:px-10 lg:px-14">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#41bf63] opacity-[0.07] blur-[120px]"></div>
              </div>
              
              <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#41bf63]" />
                </div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">Request Submitted Successfully!</h2>
                <div className="mb-7 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                  <p className="text-sm leading-7 text-slate-400">
                    Thank you for your interest in Teleroot AI, <span className="font-semibold text-white">{formData.fullName}</span>. 
                    We've received your request for <span className="font-semibold text-white">{selectedSlotLabel}</span>. 
                    You will receive an email shortly at <span className="font-medium text-[#41bf63]">{formData.workEmail}</span> with the meeting details.
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="h-11 rounded-xl border border-white/10 bg-white/5 px-8 text-sm font-bold text-white transition-all hover:bg-white/10"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Close button - Rendered last to stay on top */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 z-[100] flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
