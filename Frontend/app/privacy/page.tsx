"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Email Address:</strong> Used for account verification and alert notifications
                </li>
                <li>
                  <strong>Server URLs:</strong> The websites and services you want to monitor
                </li>
                <li>
                  <strong>Device Information:</strong> Device identifiers for authentication purposes
                </li>
                <li>
                  <strong>Monitoring Data:</strong> Response times, uptime statistics, and server status information
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide server monitoring services</li>
                <li>Send email notifications about server status</li>
                <li>Authenticate and secure your account</li>
                <li>Generate uptime and performance reports</li>
                <li>Improve our service quality and features</li>
                <li>Communicate important service updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Data Storage and Security</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Data is stored securely using industry-standard encryption</li>
                <li>Access to your data is restricted to authorized personnel only</li>
                <li>We implement appropriate technical and organizational measures to protect your data</li>
                <li>
                  Monitoring data is retained for operational purposes and may be automatically deleted after a certain
                  period
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
              <p className="mb-3">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>With your explicit consent</li>
                <li>
                  With trusted service providers who assist in operating our service (under strict confidentiality
                  agreements)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to maintain your session, remember your preferences, and improve
                your experience. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and associated data</li>
                <li>Export your monitoring data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information is retained while your account is active</li>
                <li>Monitoring data may be retained for up to 30 days for operational purposes</li>
                <li>Historical data may be aggregated and anonymized for service improvement</li>
                <li>Data is deleted within a reasonable time after account termination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. International Data Transfers</h2>
              <p>
                Your data may be processed and stored in countries other than your own. We ensure appropriate safeguards
                are in place to protect your data during international transfers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us through the
                service interface.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
