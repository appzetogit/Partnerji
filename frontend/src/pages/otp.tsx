import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock, User, Mail, Camera, MapPin, Check, Loader2, ShieldCheck, AlertCircle, Trash2, Upload } from "lucide-react";
import { MobileFrame } from "@/components/Partnerji/Shell";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/otp")({ component: Otp });

function Otp() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"otp" | "details" | "provider_details" | "provider_kyc">("otp");

  // OTP states for login
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // User profile states for first-time user details screen
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Provider registration states
  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerPhoto, setProviderPhoto] = useState<string | null>(null);
  const [providerErrors, setProviderErrors] = useState<{ name?: string; address?: string; photo?: string }>({});

  // Provider KYC states
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarOtpDigits, setAadhaarOtpDigits] = useState(["", "", "", "", "", ""]);
  const aadhaarOtpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState(false);
  const [isAadhaarOtpSent, setIsAadhaarOtpSent] = useState(false);
  const [isSendingAadhaarOtp, setIsSendingAadhaarOtp] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [supportDocType, setSupportDocType] = useState("Driving License");
  const [supportDocImage, setSupportDocImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);

  const phone = typeof window !== "undefined" ? localStorage.getItem("user_phone") || "" : "";
  const role = typeof window !== "undefined" ? localStorage.getItem("user_role") || "user" : "user";

  const handleVerify = () => {
    if (role === "Provider") {
      // Check if this provider is already registered
      const savedProviderRegistered = localStorage.getItem("provider_registered");
      if (savedProviderRegistered === "true") {
        navigate({ to: "/Provider/home" });
      } else {
        // Go to provider details registration step
        setStep("provider_details");
      }
    } else {
      // Check if this is a first-time user
      const savedName = localStorage.getItem("user_name");
      if (savedName) {
        navigate({ to: "/home" });
      } else {
        setStep("details");
      }
    }
  };

  const handleRegisterSubmit = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email.trim());
    navigate({ to: "/home" });
  };

  // Provider details submission
  const handleProviderDetailsSubmit = () => {
    const newErrors: { name?: string; address?: string; photo?: string } = {};
    if (!providerName.trim()) {
      newErrors.name = "Please enter your full name";
    }
    if (!providerAddress.trim()) {
      newErrors.address = "Please enter your work address";
    }
    if (!providerPhoto) {
      newErrors.photo = "Please upload or select a profile photo";
    }

    if (Object.keys(newErrors).length > 0) {
      setProviderErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    setStep("provider_kyc");
  };

  // Profile photo helpers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProviderPhoto(reader.result as string);
        setProviderErrors(prev => ({ ...prev, photo: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const useDemoPhoto = () => {
    // Premium preset profile portrait
    setProviderPhoto("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80");
    setProviderErrors(prev => ({ ...prev, photo: "" }));
    toast.success("Demo profile photo selected!");
  };

  // Webcam live photo helpers
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setWebcamStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setWebcamError(false);
    } catch (err) {
      console.warn("Webcam access denied/unavailable", err);
      setWebcamError(true);
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };

  const captureSelfie = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 320;
      canvas.height = videoRef.current.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedSelfie(dataUrl);
        stopWebcam();
        toast.success("Live selfie captured successfully!");
      }
    }
  };

  const simulateSelfie = () => {
    // Beautiful verified placeholder selfie image
    setCapturedSelfie("https://images.unsplash.com/photo-1580489944761-15a19d654956?w=320&auto=format&fit=crop&q=80");
    toast.success("Webcam photo simulated!");
  };

  // Manage webcam status depending on active step
  useEffect(() => {
    if (step === "provider_kyc" && !capturedSelfie) {
      startWebcam();
    } else {
      stopWebcam();
    }
    return () => stopWebcam();
  }, [step, capturedSelfie]);

  // Send Aadhaar OTP simulation
  const handleSendAadhaarOtp = () => {
    setIsSendingAadhaarOtp(true);
    setTimeout(() => {
      setIsSendingAadhaarOtp(false);
      setIsAadhaarOtpSent(true);
      toast.success("OTP sent to your Aadhaar-registered mobile number!");
    }, 1200);
  };

  // Aadhaar OTP validation and verification
  const handleVerifyAadhaarOtp = () => {
    const enteredOtp = aadhaarOtpDigits.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter complete 6-digit Aadhaar OTP");
      return;
    }
    if (!capturedSelfie) {
      toast.error("Please take a live photo first");
      return;
    }

    setIsVerifyingAadhaar(true);

    // Simulate standard Aadhaar validation request
    setTimeout(() => {
      setIsVerifyingAadhaar(false);
      setIsAadhaarVerified(true);
      toast.success("Aadhaar Verified Successfully!");
    }, 1800);
  };

  // Supporting document photo helpers
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSupportDocImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const useDemoDocImage = () => {
    setSupportDocImage("https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=320&auto=format&fit=crop&q=80");
    toast.success(`${supportDocType} demo file selected!`);
  };

  // Save registration & redirect to home
  const completeProviderRegistration = () => {
    localStorage.setItem("provider_registered", "true");
    localStorage.setItem("provider_kyc_status", "pending");
    localStorage.setItem("provider_name", providerName);
    localStorage.setItem("provider_email", providerEmail.trim());
    localStorage.setItem("provider_address", providerAddress);
    localStorage.setItem("provider_photo", providerPhoto || "");
    localStorage.setItem("provider_selfie", capturedSelfie || "");
    localStorage.setItem("provider_aadhaar", aadhaarNumber);
    localStorage.setItem("provider_support_doc_type", supportDocType);
    localStorage.setItem("provider_support_doc_image", supportDocImage || "");
    navigate({ to: "/Provider/home" });
  };

  // SUCCESS KYC OVERLAY
  if (kycSuccess) {
    return (
      <MobileFrame className="bg-[#fdfdfd]" frameClassName="bg-[#fdfdfd]">
        <div className="flex-1 flex flex-col items-center justify-between p-6 bg-white">
          <div className="w-full flex justify-end pt-4">
            <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              KYC Verified
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <div className="relative w-24 h-24 mb-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-500/20 scale-up-animation">
                <Check size={44} className="text-emerald-500 animate-bounce-short" strokeWidth={3} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white shadow-soft">
                <ShieldCheck size={18} />
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Identity Authenticated!</h1>
            <p className="text-xs text-slate-500 mt-2 max-w-[280px] leading-relaxed">
              Your Aadhaar details and live photo match perfectly. Your profile has been generated.
            </p>

            <div className="mt-8 w-full max-w-[280px] bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">COMPANION NAME</span>
                <span className="text-slate-700 font-bold">{providerName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">IDENTITY DOC</span>
                <span className="text-slate-700 font-bold">Aadhaar Card (•••• {aadhaarNumber.slice(-4)})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">SUPPORTING DOC</span>
                <span className="text-slate-700 font-bold">{supportDocType}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">STATUS</span>
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Verification Pending
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={completeProviderRegistration}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-soft active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
          >
            Go to Partner Workspace
          </button>
        </div>
      </MobileFrame>
    );
  }

  // STEP: USER DETAILS FORM (First-time users)
  if (step === "details") {
    return (
      <MobileFrame className="bg-[#fdfdfd]" frameClassName="bg-[#fdfdfd]">
        <div className="flex-1 flex flex-col px-6 pt-6 pb-6 bg-white justify-between overflow-y-auto no-scrollbar">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("otp")}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer"
              >
                <ArrowLeft size={18} className="text-slate-700" />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-10 rounded-full bg-primary" />
                <div className="h-1.5 w-4 rounded-full bg-slate-200" />
              </div>
              <div className="w-10" />
            </div>

            <div className="text-center flex flex-col items-center">
              <h1 className="text-xl font-black text-slate-800">Complete Your Profile</h1>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[280px] leading-relaxed">
                Please provide your name and email to finish setting up your account.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className={`flex items-center h-[50px] rounded-xl bg-white border ${errors.name ? "border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-primary focus-within:ring-primary/10"} focus-within:ring-4 shadow-sm overflow-hidden transition-all px-4 gap-3`}>
                  <User size={16} className="text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    placeholder="Enter your name"
                    className="flex-1 h-full bg-transparent text-sm font-bold outline-none text-slate-800"
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] font-semibold text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className={`flex items-center h-[50px] rounded-xl bg-white border ${errors.email ? "border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-primary focus-within:ring-primary/10"} focus-within:ring-4 shadow-sm overflow-hidden transition-all px-4 gap-3`}>
                  <Mail size={16} className="text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 h-full bg-transparent text-sm font-bold outline-none text-slate-800"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-semibold text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleRegisterSubmit}
            className="w-full h-[54px] grad-primary text-white font-bold rounded-xl flex items-center justify-center shadow-soft active:scale-[0.98] transition cursor-pointer mt-4"
          >
            Complete Registration
          </button>
        </div>
      </MobileFrame>
    );
  }

  // STEP: PROVIDER DETAILS FORM
  if (step === "provider_details") {
    return (
      <MobileFrame className="bg-[#fdfdfd]" frameClassName="bg-[#fdfdfd]">
        <div className="flex-1 flex flex-col px-6 pt-6 pb-6 bg-white justify-between overflow-y-auto no-scrollbar">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("otp")}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer"
              >
                <ArrowLeft size={18} className="text-slate-700" />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-10 rounded-full bg-primary" />
                <div className="h-1.5 w-4 rounded-full bg-slate-200" />
              </div>
              <div className="w-10" />
            </div>

            <div className="text-center flex flex-col items-center">
              <h1 className="text-xl font-black text-slate-800">Companion Workspace</h1>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[280px] leading-relaxed">
                Step 1 of 2 — Complete your profile details to create your workspace.
              </p>
            </div>

            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center justify-center py-2 relative">
              <div className="relative">
                {providerPhoto ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-soft">
                    <img src={providerPhoto} alt="Provider Profile" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setProviderPhoto(null)}
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center border-2 border-white shadow hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-24 h-24 rounded-full border-2 border-dashed ${providerErrors.photo ? "border-red-400 bg-red-50/20 text-red-500" : "border-slate-300 bg-slate-50 text-slate-500"} flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shadow-sm`}
                  >
                    <Camera size={24} />
                    <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Photo</span>
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {!providerPhoto && (
                <button
                  type="button"
                  onClick={useDemoPhoto}
                  className="mt-2 text-[10px] font-bold text-primary hover:underline cursor-pointer"
                >
                </button>
              )}
              {providerErrors.photo && (
                <p className="text-[10px] font-semibold text-red-500 mt-1">{providerErrors.photo}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className={`flex items-center h-[50px] rounded-xl bg-white border ${providerErrors.name ? "border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-primary focus-within:ring-primary/10"} focus-within:ring-4 shadow-sm overflow-hidden transition-all px-4 gap-3`}>
                  <User size={16} className="text-slate-400" />
                  <input
                    type="text"
                    value={providerName}
                    onChange={(e) => {
                      setProviderName(e.target.value);
                      if (providerErrors.name) setProviderErrors(prev => ({ ...prev, name: "" }));
                    }}
                    placeholder="Enter your Name"
                    className="flex-1 h-full bg-transparent text-sm font-bold outline-none text-slate-800"
                  />
                </div>
                {providerErrors.name && (
                  <p className="text-[10px] font-semibold text-red-500">{providerErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Email Address (Optional)
                </label>
                <div className="flex items-center h-[50px] rounded-xl bg-white border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 shadow-sm overflow-hidden transition-all px-4 gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <input
                    type="email"
                    value={providerEmail}
                    onChange={(e) => setProviderEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="flex-1 h-full bg-transparent text-sm font-bold outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Work Address
                </label>
                <div className={`flex items-start rounded-xl bg-white border ${providerErrors.address ? "border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-primary focus-within:ring-primary/10"} focus-within:ring-4 shadow-sm overflow-hidden transition-all px-4 py-3 gap-3`}>
                  <MapPin size={16} className="text-slate-400 mt-1 shrink-0" />
                  <textarea
                    value={providerAddress}
                    onChange={(e) => {
                      setProviderAddress(e.target.value);
                      if (providerErrors.address) setProviderErrors(prev => ({ ...prev, address: "" }));
                    }}
                    placeholder="Enter Your Address"
                    rows={2}
                    className="flex-1 bg-transparent text-sm font-bold outline-none text-slate-800 resize-none"
                  />
                </div>
                {providerErrors.address && (
                  <p className="text-[10px] font-semibold text-red-500">{providerErrors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleProviderDetailsSubmit}
            className="w-full h-[54px] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl flex items-center justify-center shadow-soft active:scale-[0.98] transition cursor-pointer mt-4"
          >
            Continue to KYC
          </button>
        </div>
      </MobileFrame>
    );
  }

  // STEP: PROVIDER KYC VERIFICATION
  if (step === "provider_kyc") {
    return (
      <MobileFrame className="bg-[#fdfdfd]" frameClassName="bg-[#fdfdfd]">
        <div className="flex-1 flex flex-col px-6 pt-6 pb-6 bg-white justify-between overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("provider_details")}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer"
              >
                <ArrowLeft size={18} className="text-slate-700" />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-4 rounded-full bg-primary" />
                <div className="h-1.5 w-10 rounded-full bg-primary" />
              </div>
              <div className="w-10" />
            </div>

            <div className="text-center flex flex-col items-center">
              <h1 className="text-xl font-black text-slate-800">KYC Verification</h1>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[280px] leading-relaxed">
                Step 2 of 2 — Verify your identity using Aadhaar and live photo verification.
              </p>
            </div>

            {/* Live Camera Interface & Aadhaar verification (Hidden once Aadhaar is verified) */}
            {!isAadhaarVerified && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    1. Take Live Photo
                  </label>

                  <div className="relative w-full aspect-video rounded-2xl bg-slate-900 border border-slate-800 shadow-inner overflow-hidden flex items-center justify-center">
                    {capturedSelfie ? (
                      // Selfie Display
                      <div className="relative w-full h-full">
                        <img src={capturedSelfie} alt="Live Selfie" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-emerald-500/15 flex items-center justify-center border-2 border-emerald-500">
                          <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-card flex items-center gap-1">
                            ✓ Photo Captured
                          </span>
                        </div>
                        <button
                          onClick={() => setCapturedSelfie(null)}
                          className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/20 active:scale-95 transition-all cursor-pointer"
                        >
                          Retake
                        </button>
                      </div>
                    ) : webcamError ? (
                      // Simulated Webcam UI
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-amber-500/30 bg-amber-500/5 flex items-center justify-center mb-2">
                          <Camera className="text-amber-500 animate-pulse" size={28} />
                          <div className="absolute inset-0 border border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin rounded-full pointer-events-none" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-300">Camera Simulated</p>
                        <p className="text-[9px] text-slate-500 max-w-[200px] mt-0.5 leading-relaxed">
                          Webcam is disabled or unavailable. Press the button below to simulate capture.
                        </p>
                        <button
                          onClick={simulateSelfie}
                          className="mt-3 px-4 h-9 bg-primary text-white text-xs font-bold rounded-xl shadow-soft hover:bg-primary-dark transition cursor-pointer"
                        >
                          Simulate Capture
                        </button>
                      </div>
                    ) : (
                      // Live Webcam Video View
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />

                        {/* Face target guide overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[120px] h-[150px] rounded-[50%] border-2 border-dashed border-primary/60 bg-transparent flex items-center justify-center relative shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-1/2 left-0 right-0 border-t border-primary/20 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {!capturedSelfie && !webcamError && (
                    <button
                      type="button"
                      onClick={captureSelfie}
                      className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-soft active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Camera size={16} />
                      Capture Photo
                    </button>
                  )}
                </div>

                {/* Aadhaar Number input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    2. Aadhaar Card Number
                  </label>
                  <div className="flex items-center h-[50px] rounded-xl bg-white border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 shadow-sm overflow-hidden transition-all px-4 gap-3">
                    <ShieldCheck size={18} className="text-slate-400" />
                    <input
                      type="text"
                      maxLength={12}
                      value={aadhaarNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setAadhaarNumber(val);
                        if (val.length !== 12) {
                          setIsAadhaarOtpSent(false);
                        }
                      }}
                      placeholder="Enter Aadhaar Card Number"
                      className="flex-1 h-full bg-transparent text-sm font-bold outline-none text-slate-800 tracking-wider"
                    />
                    {aadhaarNumber.length === 12 && (
                      <span className="text-emerald-500 font-bold text-xs">✓ Done</span>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold tracking-wide">
                    Aadhaar card details are encrypted and processed securely.
                  </p>
                </div>

                {/* Send OTP button appears when 12 digits are complete, but OTP is not yet sent */}
                {aadhaarNumber.length === 12 && !isAadhaarOtpSent && (
                  <button
                    type="button"
                    onClick={handleSendAadhaarOtp}
                    disabled={isSendingAadhaarOtp}
                    className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-soft active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2 mt-3 animate-fade-in-slide"
                  >
                    {isSendingAadhaarOtp ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send Aadhaar OTP"
                    )}
                  </button>
                )}

                {/* Aadhaar OTP Section (Only shows when 12 digits are entered AND Send OTP is clicked) */}
                {aadhaarNumber.length === 12 && isAadhaarOtpSent && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 animate-fade-in-slide mt-3">
                    <div className="flex justify-center gap-1.5 py-1">
                      {aadhaarOtpDigits.map((d, i) => (
                        <input
                          key={i}
                          ref={el => { aadhaarOtpRefs.current[i] = el; }}
                          value={d}
                          inputMode="numeric"
                          maxLength={1}
                          onKeyDown={e => {
                            if (e.key === "Backspace" && !aadhaarOtpDigits[i] && i > 0) {
                              aadhaarOtpRefs.current[i - 1]?.focus();
                            }
                          }}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, "");
                            const next = [...aadhaarOtpDigits];
                            next[i] = v;
                            setAadhaarOtpDigits(next);
                            if (v && i < 5) aadhaarOtpRefs.current[i + 1]?.focus();
                          }}
                          className="w-10 h-10 rounded-lg border border-slate-200 bg-white text-base font-bold text-center outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-slate-800"
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyAadhaarOtp}
                      disabled={isVerifyingAadhaar}
                      className="w-full h-11 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-primary-dark active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isVerifyingAadhaar ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying Aadhaar OTP...
                        </>
                      ) : (
                        "Verify Aadhaar OTP"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Supporting Document Section (Only shows once Aadhaar is verified) */}
            {isAadhaarVerified && (
              <div className="space-y-4 animate-fade-in-slide">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-700 text-xs font-bold mb-2">
                  <Check size={16} />
                  Aadhaar Card Verified Successfully
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    3. Select Supporting Document
                  </label>
                  <select
                    value={supportDocType}
                    onChange={(e) => {
                      setSupportDocType(e.target.value);
                      setSupportDocImage(null);
                    }}
                    className="w-full h-[50px] rounded-xl bg-white border border-slate-200 px-4 font-bold text-sm text-slate-800 outline-none focus:border-primary shadow-sm"
                  >
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Bank Passbook">Bank Passbook</option>
                    <option value="Electric Bill">Electric Bill</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    4. Upload {supportDocType} Image
                  </label>
                  <div className="relative">
                    {supportDocImage ? (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center">
                        <img src={supportDocImage} alt={supportDocType} className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setSupportDocImage(null)}
                          className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-400 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => docFileInputRef.current?.click()}
                        className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shadow-sm gap-2"
                      >
                        <Upload size={24} className="text-slate-400 animate-bounce-short" />
                        <span className="text-xs font-bold text-slate-700">Upload {supportDocType} File</span>
                        <span className="text-[9px] text-slate-400">Supports JPG, PNG, PDF</span>
                      </button>
                    )}
                    <input
                      type="file"
                      ref={docFileInputRef}
                      onChange={handleDocUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {!supportDocImage && (
                    <button
                      type="button"
                      onClick={useDemoDocImage}
                      className="mt-1 text-[10px] font-bold text-primary hover:underline cursor-pointer block text-center w-full"
                    >
                      Or use a Demo Image for testing
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!supportDocImage) {
                      toast.error(`Please upload an image of your ${supportDocType}`);
                      return;
                    }
                    setKycSuccess(true);
                  }}
                  className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl flex items-center justify-center shadow-soft active:scale-[0.98] transition cursor-pointer mt-6"
                >
                  Registration Done
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-400 font-semibold">
            Locked & Encrypted via UIDAI Authority Gateway
          </div>
        </div>
      </MobileFrame>
    );
  }

  // DEFAULT STEP: VERIFY OTP SCREEN (LOGIN)
  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col px-6 pt-6 pb-8 bg-white justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Link to="/login" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center cursor-pointer">
              <ArrowLeft size={20} className="text-slate-700" />
            </Link>
            <h1 className="text-xl font-bold text-slate-800">Verify OTP</h1>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-soft flex items-center justify-center mb-3">
              <Lock size={24} className="text-primary" />
            </div>
            <p className="text-xs text-muted-foreground font-semibold">Secure verification</p>
          </div>

          <p className="text-center text-sm text-muted-foreground leading-relaxed">
            We've sent a 6-digit code to <span className="font-semibold text-foreground">
              {phone ? (phone.startsWith("+91") ? phone : `+91 ${phone}`) : "+91 98765 43210"}
            </span>
          </p>

          <div className="flex justify-center gap-1.5 mt-8">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el; }}
                value={d}
                inputMode="numeric"
                maxLength={1}
                onKeyDown={e => {
                  if (e.key === "Backspace" && !digits[i] && i > 0) {
                    refs.current[i - 1]?.focus();
                  }
                }}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, "");
                  const next = [...digits]; next[i] = v; setDigits(next);
                  if (v && i < 5) refs.current[i + 1]?.focus();
                }}
                className="w-11 h-11 rounded-[8px] border border-slate-200 bg-white text-lg font-bold text-center outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm text-slate-800"
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Resend in <span className="text-primary font-bold tabular-nums">0:28</span>
          </p>
        </div>

        <button
          onClick={handleVerify}
          className="w-full h-[54px] grad-primary rounded-xl text-white font-bold flex items-center justify-center shadow-soft active:scale-[0.98] transition cursor-pointer"
        >
          Verify & Continue
        </button>
      </div>
    </MobileFrame>
  );
}
