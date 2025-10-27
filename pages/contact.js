export default function Contact() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>

      <p className="text-center mb-6 text-gray-600">
        Feel free to reach out via email or the form below.
      </p>

      <form className="max-w-xl mx-auto space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows="5"
            placeholder="Your Message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}