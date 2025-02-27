import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/">
          <a className="text-primary hover:underline mb-8 inline-block">&larr; Back to Calculator</a>
        </Link>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground mb-4">Last Updated: 27/2/2025</p>
            
            <div className="prose prose-sm">
              <p>Welcome to Valorant Asset Calculator ("we," "our," or "us"). By accessing and using our website ("the Site"), you agree to these Terms & Conditions. If you do not agree, please do not use the Site.</p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Use of the Site</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>This website allows users to estimate the total money spent on Valorant by selecting in-game items they own.</li>
                <li>You may use the Site without logging in or providing personal information.</li>
                <li>You agree not to misuse the Site for fraudulent, illegal, or unauthorized activities.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>All content, including text, design, and images, belongs to Valorant Asset Calculator unless otherwise stated.</li>
                <li>Riot Games and Valorant are trademarks of Riot Games, Inc. We are not affiliated with or endorsed by Riot Games.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">3. Monetization & Third-Party Ads</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>We may display third-party ads or use affiliate links to support our services.</li>
                <li>We do not control third-party content and are not responsible for external links.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">4. Disclaimer</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>This tool provides an estimated calculation of spending based on selected in-game items. It is not an official or exact representation of Riot Games' pricing.</li>
                <li>We are not responsible for any financial decisions users make based on this tool.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-4">Last Updated: 27/2/2025</p>

            <div className="prose prose-sm">
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>We do not collect personal data as users can use the Site without logging in.</li>
                <li>We may use cookies to analyze traffic and improve user experience.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">2. Third-Party Services</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>We may use services like Google Ads and Analytics, which may collect user data according to their own policies.</li>
                <li>Users can manage cookie preferences through their browser settings.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Copyright & Disclaimer</h1>
            <div className="prose prose-sm">
              <p>Copyright Notice: © 2025-2026 Valorant Asset Calculator. All rights reserved.</p>
              <p className="mt-4">This website is an independent tool and is not affiliated with, endorsed by, or associated with Riot Games.</p>
              <p className="mt-4">Any images or trademarks used belong to their respective owners.</p>
              <p className="mt-4">This tool is for informational and entertainment purposes only. We are not responsible for any financial decisions made based on our calculations.</p>
              <p className="mt-4">For questions, contact us at assettracker.work@gmail.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
