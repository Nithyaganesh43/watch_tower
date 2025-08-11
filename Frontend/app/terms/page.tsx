"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Terms and Conditions</h1>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Watch Tower 24/7 server monitoring service, you accept and agree to be bound by
                the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
              <p>
                Watch Tower 24/7 provides server monitoring services that check the availability and response time of
                your servers at regular intervals and send email notifications when issues are detected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and valid email addresses for notifications</li>
                <li>Ensure server URLs are accessible and properly configured</li>
                <li>Use the service in compliance with applicable laws and regulations</li>
                <li>Not exceed the allocated server monitoring limits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Service Limitations</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Free accounts are limited to monitoring up to 10 servers</li>
                <li>Monitoring checks are performed every 5 minutes</li>
                <li>Service availability is provided on a best-effort basis</li>
                <li>Historical data retention may be limited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Privacy and Data</h2>
              <p>
                We collect and process data necessary to provide the monitoring service. Please refer to our Privacy
                Policy for detailed information about data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
              <p>
                The service is provided "as is" without any warranties, express or implied. We do not guarantee
                uninterrupted service or the accuracy of monitoring results.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                In no event shall Watch Tower 24/7 be liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to the service at any time, with or without cause,
                with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Contact Information</h2>
              <p>For questions about these Terms and Conditions, please contact us through the service interface.</p>
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
