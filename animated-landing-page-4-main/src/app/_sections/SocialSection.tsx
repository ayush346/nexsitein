"use client";

import { GradientBorderProvider } from "@/Components/gradientBorderProvider";
import { motion, useInView } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  PersonStanding,
  BriefcaseBusiness,
} from "lucide-react";
import { useRef, useState } from "react";

const XLogo = () => (
  <svg className="w-8 h-8 p-0.5" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </svg>
);

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSent(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data: { ok?: boolean; previewUrl?: string; dev?: boolean } = await res.json();
      if (res.ok && data.ok) {
        setSent("ok");
        if (data.dev && data.previewUrl) {
          // Open Ethereal preview so you can see the message in dev
          window.open(data.previewUrl, "_blank");
        }
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSent("err");
        // Fallback to mailto so the user can still contact
        const subject = encodeURIComponent(
          `Contact Form Submission from ${formData.name}`
        );
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        );
        window.open(
          `mailto:contact@nexsite.in?subject=${subject}&body=${body}`,
          "_blank"
        );
      }
    } catch (err) {
      setSent("err");
      // Fallback to mailto so the user can still contact
      const subject = encodeURIComponent(
        `Contact Form Submission from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      );
      window.open(
        `mailto:contact@nexsite.in?subject=${subject}&body=${body}`,
        "_blank"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-blue-50 w-screen relative overflow-hidden"
      id="contact"
      style={{
        background: 'url("/back.png")',
        backgroundSize: "cover",
      }}
    >
      <div
        className="backdrop-blur-2xl bg-white/30 h-content py-40 pt-64 px-4 z-10"
        ref={ref}
      >
        <div className="max-w-7xl h-content mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center pb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-black/80 mb-4">
              Get in Touch
            </h2>
            <p className="text-black/60 max-w-xl mx-auto text-sm md:text-base">
              Let&apos;s create something extraordinary together. Reach out
              through any channel.
            </p>
          </motion.div>
          <div className="grid gap-12 lg:grid-cols-2 h-full">
            {/* Left Column - Form & Contact Info */}
            <div className="space-y-8">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="space-y-6"
                onSubmit={handleSendMessage}
              >
                {(
                  [
                    { placeholder: "Your Name", name: "name", type: "text" },
                    {
                      placeholder: "Email Address",
                      name: "email",
                      type: "email",
                    },
                    {
                      placeholder: "Phone Number",
                      name: "phone",
                      type: "text",
                    },
                  ] as const
                ).map((field, index) => (
                  <GradientBorderProvider
                    key={index}
                    className="rounded-[18px] hover:-translate-y-1 transition-transform duration-300"
                  >
                    <motion.input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="w-full px-6 py-3.5 rounded-[16px] bg-white/70 backdrop-blur-sm focus:outline-none text-black/80 placeholder-black/50 shadow-sm hover:shadow-md transition-all"
                    />
                  </GradientBorderProvider>
                ))}

                <GradientBorderProvider className="rounded-[18px] hover:-translate-y-1 transition-transform duration-300">
                  <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3.5 rounded-[16px] bg-white/70 backdrop-blur-sm focus:outline-none text-black/80 placeholder-black/50 shadow-sm hover:shadow-md transition-all"
                  />
                </GradientBorderProvider>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <GradientBorderProvider className="rounded-[14px] bg-gradient-to-br from-[#00000011] to-[#00000022] !p-0.5">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-black text-white/80 px-8 py-4 rounded-[14px] hover:bg-black/90 transition-all duration-300 text-base md:text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending..." : sent === "ok" ? "Sent" : sent === "err" ? "Try Again" : "Send Message"}
                    </button>
                  </GradientBorderProvider>
                </motion.div>
              </motion.form>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
              >
                {[
                  {
                    icon: PersonStanding,
                    text: "Ayush: +91 72042 42741",
                    sub: "Direct Contact",
                  },
                  {
                    icon: BriefcaseBusiness,
                    text: "Adarsh: +91 63633 61722",
                    sub: "Business Inquiries",
                  },
                  {
                    icon: Mail,
                    text: "contact@nexsite.in",
                    sub: "For Enquiries",
                  },
                  {
                    icon: MapPin,
                    text: "Bangalore",
                    sub: "Karnataka, India",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-6 rounded-[20px] bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <GradientBorderProvider className="p-2 rounded-[12px]">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </GradientBorderProvider>
                      <div>
                        {String(item.text).includes("@") ? (
                          <a
                            href={`mailto:${item.text}`}
                            className="font-medium text-black/80 hover:underline"
                          >
                            {item.text}
                          </a>
                        ) : /\d/.test(String(item.text)) ? (
                          (() => {
                            const match = String(item.text).match(/(\+?\d[\d\s\-()]*)/);
                            const tel = match ? match[1].replace(/[^+\d]/g, "") : String(item.text).replace(/[^+\d]/g, "");
                            return (
                              <a href={`tel:${tel}`} className="font-medium text-black/80 hover:underline">
                                {item.text}
                              </a>
                            );
                          })()
                        ) : (
                          <p className="font-medium text-black/80">{item.text}</p>
                        )}
                        <p className="text-sm text-black/50 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              {/* Interactive Map */}
              <GradientBorderProvider className="rounded-[32px] hover:-translate-y-1 transition-transform duration-300 w-full h-96">
                <div className="w-full h-full rounded-[28px] overflow-hidden bg-white/70 backdrop-blur-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659862987!2d77.46612964672096!3d12.954280231203436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1745179841785!5m2!1sen!2sin"
                    className="w-full h-full"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
              </GradientBorderProvider>

              {/* Social Links */}
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="bg-white/70 backdrop-blur-sm rounded-[28px] p-8 space-y-6"
                >
                  <h3 className="text-xl font-semibold text-black/80">
                    Connect Socially
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      {
                        icon: Facebook,
                        color: "#1111aa",
                        label: "Facebook",
                        link: "https://www.facebook.com/nexsite.in",
                      },
                      {
                        icon: Instagram,
                        color: "#E1306C",
                        label: "Instagram",
                        link: "https://www.instagram.com/thenexsite?igsh=OTV3Nm5lOGc4bmtp&utm_source=qr",
                      },
                      {
                        icon: Linkedin,
                        color: "#0A66C2",
                        label: "LinkedIn",
                        link: "https://www.linkedin.com/company/nexsite-consultancy/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BYYAnhvViQiCaj6CNZbWDnQ%3D%3D",
                      },
                      {
                        icon: Youtube,
                        color: "#FF0000",
                        label: "YouTube",
                        link: "https://youtube.com/@thenexsite?si=jb6cxh_9uyvLu4pJ",
                      },
                      {
                        icon: XLogo,
                        color: "#FF0000",
                        label: "X",
                        link: "https://www.x.com/nexsiteLLP",
                      },
                    ].map((Social, index) => (
                      <motion.a
                        key={index}
                        href={Social.link}
                        target="_blank"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 hover:bg-white/90 transition-all duration-300 cursor-pointer"
                        style={{ color: Social.color }}
                      >
                        <Social.icon className="w-8 h-8" />
                        <span className="text-sm text-black/70">
                          {Social.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/20 rounded-full blur-3xl opacity-40 pointer-events-none"
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0000ff03,transparent)] pointer-events-none" />
    </section>
  );
}
