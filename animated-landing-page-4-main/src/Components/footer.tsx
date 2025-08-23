"use client";

import { motion, useInView } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { JSX, useRef } from "react";
import Noise from "@/Animations/Noise/Noise";

const XLogo = () => (
  <svg className="w-5 h-5 p-0.5" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </svg>
);

interface FooterProps {
  onServiceClick?: (
    serviceType: "mobile" | "software" | "web",
    title: string,
    description: string
  ) => void;
}

export default function Footer({ onServiceClick }: FooterProps): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="bg-gradient-to-b h-content overflow-hidden from-blue-50 to-white w-screen relative border-t border-blue-100">
      <Noise patternAlpha={10} />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-br from-black to-blue-400 bg-clip-text text-transparent mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Nexsite
            </motion.h3>
            <div className="flex gap-4">
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
                  color: "#1111aa",
                  label: "X",
                  link: "https://x.com/nexsite_in",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  title={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors duration-300"
                >
                  <social.icon
                    className="w-5 h-5"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Website Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-black/80 font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {[
                {
                  name: "Mobile Apps",
                  type: "mobile" as const,
                  description:
                    "We design and develop intuitive mobile applications tailored to your business needs, ensuring seamless user experiences across devices.",
                },
                {
                  name: "Web Applications",
                  type: "web" as const,
                  description:
                    "Our web applications are robust, scalable, and designed to meet your specific requirements, enhancing productivity and user engagement.",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-sm text-black/60 hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={() => {
                    if (onServiceClick) {
                      onServiceClick(item.type, item.name, item.description);
                    }
                  }}
                >
                  {item.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-black/80 font-semibold mb-4">Hours</h4>
            <ul className="space-y-3">
              {[
                "Mon: 09:00 am – 06:30 pm",
                "Tue: 09:00 am – 06:30 pm",
                "Wed: 09:00 am – 06:30 pm",
                "Thu: 09:00 am – 06:30 pm",
                "Fri: 09:00 am – 06:30 pm",
                "Sat: Closed",
                "Sun: Closed",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-sm text-black/60 hover:text-blue-600 transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-black/80 font-semibold mb-4">Address</h4>
            <ul className="space-y-3">
              {[
                "401/Hippocrates house no-168,",
                "Koramangala 5th Block 17 C Main",
                "kBH key colony, BENGALURU,",
                "KARNATAKA, 560095, India",
                "Better yet, see us in person!",
                "We love our customers, so feel free to visit during normal business hours.",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-sm text-black/60 hover:text-blue-600 transition-colors"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
