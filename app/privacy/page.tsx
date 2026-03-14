export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a1e" }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(138,43,226,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto px-4 pb-16" style={{ maxWidth: 900, paddingTop: 100 }}>
        <h1
          className="font-black mb-2"
          style={{
            fontSize: "2.2rem",
            background: "linear-gradient(135deg, #00d4ff, #8a2be2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: March 03, 2026</p>

        <div
          className="rounded-2xl p-8 space-y-6 text-gray-300 leading-relaxed"
          style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.2)" }}
        >
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Interpretation and Definitions</h2>
            <h3 className="font-semibold mb-2 text-white">Interpretation</h3>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3 className="font-semibold mt-4 mb-2 text-white">Definitions</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Account</strong> — a unique account created for You to access our Service.</li>
              <li><strong className="text-white">Affiliate</strong> — an entity that controls, is controlled by, or is under common control with a party.</li>
              <li><strong className="text-white">Company</strong> — refers to Vibe and Velocity.</li>
              <li><strong className="text-white">Cookies</strong> — small files placed on Your device by a website.</li>
              <li><strong className="text-white">Country</strong> — Andhra Pradesh, India.</li>
              <li><strong className="text-white">Device</strong> — any device that can access the Service.</li>
              <li><strong className="text-white">Personal Data</strong> — any information that relates to an identified or identifiable individual.</li>
              <li><strong className="text-white">Service</strong> — refers to the Website.</li>
              <li><strong className="text-white">Usage Data</strong> — data collected automatically from the Service infrastructure.</li>
              <li><strong className="text-white">Website</strong> — Vibe and Velocity, accessible from <a href="https://aarif-khan-mohammad.github.io/AffliateStore/" className="underline" style={{ color: "#00d4ff" }} target="_blank" rel="noopener noreferrer">our site</a>.</li>
              <li><strong className="text-white">You</strong> — the individual accessing or using the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Collecting and Using Your Personal Data</h2>
            <h3 className="font-semibold mb-2 text-white">Types of Data Collected</h3>
            <p>While using Our Service, We may ask You to provide personally identifiable information including first name and last name.</p>
            <p className="mt-2">Usage Data is collected automatically and may include IP address, browser type, pages visited, time and date of visit, and other diagnostic data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Use of Your Personal Data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To manage Your Account</li>
              <li>To contact You</li>
              <li>To provide news, special offers, and general information</li>
              <li>To manage Your requests</li>
              <li>For business transfers and other purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Security of Your Personal Data</h2>
            <p>The security of Your Personal Data is important to Us. While We strive to use commercially reasonable means to protect Your Personal Data, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Children's Privacy</h2>
            <p>Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Links to Other Websites</h2>
            <p>Our Service may contain links to other websites not operated by Us. We strongly advise You to review the Privacy Policy of every site You visit.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Changes to this Privacy Policy</h2>
            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#00d4ff" }}>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, visit our <a href="/about" className="underline" style={{ color: "#00d4ff" }}>About &amp; Support</a> page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
