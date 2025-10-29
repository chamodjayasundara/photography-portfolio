import { motion } from "framer-motion";
import { FiPhone, FiMail, FiInstagram, FiFacebook } from "react-icons/fi";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Get in <span style={{ color: '#f15a24' }}>Touch</span>
          </h1>
          <p className="text-lg text-gray-400 font-light">
            Let's create something beautiful together
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Phone */}
          <a
            href="tel:+94761937301"
            className="group bg-zinc-900 border border-zinc-800 hover:border-[#f15a24] rounded-2xl p-8 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#f15a24] p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FiPhone size={24} />
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Phone</h3>
                <p className="text-lg font-medium">+94 76 193 7301</p>
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:chamodjayasundaraphotography@gmail.com"
            className="group bg-zinc-900 border border-zinc-800 hover:border-[#f15a24] rounded-2xl p-8 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#f15a24] p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FiMail size={24} />
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                <p className="text-lg font-medium break-all">chamodjayasundaraphotography@gmail.com</p>
              </div>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/chamodjayasundaraphotography?igsh=MXczNnBkNzZnZ2Zrag=="
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-800 hover:border-[#f15a24] rounded-2xl p-8 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#f15a24] p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FiInstagram size={24} />
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Instagram</h3>
                <p className="text-lg font-medium">@chamodjayasundaraphotography</p>
              </div>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/17mCTCwf4Y/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-800 hover:border-[#f15a24] rounded-2xl p-8 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#f15a24] p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FiFacebook size={24} />
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Facebook</h3>
                <p className="text-lg font-medium">Chamod Jayasundara Photography</p>
              </div>
            </div>
          </a>
        </motion.div>

        {/* CTA Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-gray-400 mb-6">
            Whether it's capturing your property, products, or any commercial requirement, I'm here to bring your vision to life.
          </p>
          <a
            href="mailto:chamodjayasundaraphotography@gmail.com"
            className="inline-block bg-[#f15a24] text-white px-8 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            Send Me an Email
          </a>
        </motion.div>
      </div>
    </div>
  );
}