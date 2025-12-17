import React, { useMemo, useRef } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";


// --- PROP INTERFACES (Simulated translation object) ---

interface Translation {
    contactTitle: string;
    contactSub: string;
    addr: string;
    phone: string;
    mail: string;
    workingHours: string;
    fullname: string;
    subject: string;
    message: string;
    privacyPolicy: string;
    send: string;
    address: string;
    phoneTitle: string;
    emailTitle: string;
    hoursTitle: string;
    successMsg: string;
}

interface ContactUsProps {
    isRTL: boolean;
    isAR: boolean;
    t: Partial<Translation>;
}

// --- SUB-COMPONENTS ---

interface InfoRowProps {
    Icon: React.ElementType; // Lucide icon component
    title: string;
    children: React.ReactNode;
    isRTL: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const InfoRow = ({ Icon, title, children, isRTL, className = "", style }: InfoRowProps) => (
    <div className={`info-row-item flex flex-col items-center text-center rounded-xl bg-white p-6 border border-gray-200/80 shadow-md transition-all hover:shadow-lg hover:border-emerald-300 ${className}`} style={style}>
        <div className="grid place-items-center h-12 w-12 rounded-full bg-emerald-600 text-white shadow-lg mb-4">
            <Icon className="h-6 w-6" />
        </div>
        <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
            <div className="font-bold text-lg text-emerald-800 mb-2">{title}</div>
            <div className="text-gray-700 text-[15px] leading-relaxed break-words">{children}</div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

export default function ContactUs({ isRTL, isAR, t }: ContactUsProps) {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    // Mock data for missing translation keys for demonstration purposes
    const fullT: Translation = useMemo(() => ({
        contactTitle: t.contactTitle || (isAR ? "تواصل معنا" : "Contact Us"),
        contactSub: t.contactSub || (isAR ? "نحن هنا للإجابة على جميع استفساراتكم. أرسل لنا رسالة وسنتواصل معك قريباً." : "We're here to answer all your inquiries. Send us a message and we'll get back to you soon."),
        address: t.address || (isAR ? "العنوان" : "Address"),
        phoneTitle: t.phoneTitle || (isAR ? "الهاتف" : "Phone"),
        emailTitle: t.emailTitle || (isAR ? "البريد الإلكتروني" : "Email"),
        hoursTitle: t.hoursTitle || (isAR ? "ساعات العمل" : "Working Hours"),
        // Mock data for content
        addr: t.addr || (isAR ? "العراق - كركوك - دارمان" : "Iraq - Kirkuk - Daraman"),
        phone: t.phone || "+964 1 234 5678, +964 770 123 4567",
        mail: t.mail || "info@hadigroup.iq, sales@hadigroup.iq",
        workingHours: t.workingHours || (isAR ? "الأحد - الخميس: 8:00 - 16:00 | الجمعة - السبت: مغلق" : "Sun–Thu: 8:00–16:00 | Fri–Sat: Closed"),
    }), [t, isAR]);

    // CSS animations are handled via classes

    return (
        <section 
            ref={sectionRef}
            id="contact" 
            dir={isRTL ? "rtl" : "ltr"} 
            className="relative overflow-hidden bg-white py-24 md:py-32"
        >
             {/* Decorative Background (من تصميم الأقسام السابقة) */}
             <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-emerald-100/30 blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-3xl opacity-20" />
            </div>


            <div className="container relative z-10 mx-auto px-4">
                <div ref={headerRef} className="mb-16 text-center animate-fadeInDown">
                     {/* Label */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700">
                        <Phone className="h-5 w-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {fullT.contactTitle}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{fullT.contactTitle}</h2>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">{fullT.contactSub}</p>
                    <span className="mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto" />
                </div>

                {/* Contact Info */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                    <InfoRow Icon={MapPin} title={fullT.address} isRTL={isRTL} className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                        <div className="space-y-1">
                            {fullT.addr.split(' - ').map((part, idx) => (
                                <div key={idx}>{part}</div>
                            ))}
                        </div>
                    </InfoRow>
                    <InfoRow Icon={Phone} title={fullT.phoneTitle} isRTL={isRTL} className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
                        <div className="space-y-2">
                            {fullT.phone.split(', ').map((num, idx) => (
                                <div key={idx} className="font-medium">{num.trim()}</div>
                            ))}
                        </div>
                    </InfoRow>
                    <InfoRow Icon={Mail} title={fullT.emailTitle} isRTL={isRTL} className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
                        <div className="space-y-2">
                            {fullT.mail.split(', ').map((email, idx) => (
                                <div key={idx} className="break-all">{email.trim()}</div>
                            ))}
                        </div>
                    </InfoRow>
                    <InfoRow Icon={Clock} title={fullT.hoursTitle} isRTL={isRTL} className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                        <div className="space-y-2">
                            {fullT.workingHours.split(' | ').map((hours, idx) => (
                                <div key={idx}>{hours}</div>
                            ))}
                        </div>
                    </InfoRow>
                </div>
            </div>
        </section>
    );
}