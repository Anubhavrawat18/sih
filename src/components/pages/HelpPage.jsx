import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { 
  HelpCircle, 
  MessageSquare, 
  Download, 
  Send, 
  Phone, 
  Mail, 
  FileText,
  Search,
  BookOpen,
  Video,
  Clock
} from "lucide-react";

const faqItems = [
  {
    id: "getting-started",
    question: "How do I get started with Ocean Guard?",
    answer: "Ocean Guard is designed for monitoring coastal hazards in real-time. Start by familiarizing yourself with the main dashboard, where you can view active reports, analyze trends, and manage alerts. The system automatically aggregates data from various sources including citizen reports, social media, and official weather services."
  },
  {
    id: "create-alerts",
    question: "How do I create and send emergency alerts?",
    answer: "Navigate to the Alerts & Notifications section and click 'Create Manual Alert'. Select the hazard type, specify the affected region, choose severity level, and compose your message. You can send alerts via SMS, email, and push notifications to registered emergency responders and field teams."
  },
  {
    id: "verify-reports",
    question: "How are reports verified for accuracy?",
    answer: "Ocean Guard uses a multi-step verification process. Reports are initially filtered through automated systems that check for consistency and credibility. They are then reviewed by trained analysts who can verify, flag, or mark reports as pending. Verified reports appear with a green checkmark on the dashboard."
  },
  {
    id: "social-media",
    question: "How does social media monitoring work?",
    answer: "The system continuously monitors public social media posts for ocean-related keywords and hashtags. Our sentiment analysis engine categorizes posts as positive, neutral, or negative, while also identifying trending topics and high-impact content that may indicate emerging hazards."
  },
  {
    id: "hotspot-analysis",
    question: "What is hotspot analysis and how do I use it?",
    answer: "Hotspot analysis identifies geographic regions with higher than normal hazard activity. The system ranks areas by incident frequency, severity, and trend patterns. Use the timeline slider to view historical data and identify seasonal patterns or emerging risk areas."
  },
  {
    id: "data-export",
    question: "Can I export data and reports?",
    answer: "Yes, Ocean Guard supports data export in multiple formats. You can export individual reports as CSV files, generate comprehensive PDF reports for agencies, and download chart data from the analytics section. Use the export buttons found throughout the interface."
  },
  {
    id: "user-permissions",
    question: "How do user roles and permissions work?",
    answer: "Ocean Guard has four main user roles: Administrator (full access), Analyst (monitoring and verification), Field Coordinator (alerts and response), and Observer (read-only access). Administrators can manage user permissions in the Settings section."
  },
  {
    id: "api-integration",
    question: "What external systems can Ocean Guard integrate with?",
    answer: "Ocean Guard integrates with NOAA Weather Service, USGS Earthquake Monitoring, Emergency Alert Systems, and other early warning platforms. These integrations provide real-time data feeds and enable automated alert distribution through existing emergency communication networks."
  }
];

const quickLinks = [
  { title: "User Manual", description: "Complete guide to Ocean Guard features", icon: BookOpen, type: "PDF" },
  { title: "Video Tutorials", description: "Step-by-step video guides", icon: Video, type: "Video" },
  { title: "API Documentation", description: "Technical integration guide", icon: FileText, type: "Web" },
  { title: "Quick Reference Card", description: "Printable reference guide", icon: Download, type: "PDF" }
];

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [supportTicket, setSupportTicket] = useState({
    subject: "",
    priority: "Medium",
    category: "General",
    description: ""
  });

  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const submitTicket = () => {
    alert("Support ticket submitted successfully! You will receive a confirmation email shortly.");
    setSupportTicket({
      subject: "",
      priority: "Medium", 
      category: "General",
      description: ""
    });
  };

  const downloadResource = (title) => {
    alert(`Downloading ${title}...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#103173]">Help & Support</h1>
        <p className="text-gray-600">Find answers and get assistance with Ocean Guard</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <HelpCircle className="h-8 w-8 text-[#1D7BC1] mx-auto mb-2" />
            <h3 className="font-medium">FAQ</h3>
            <p className="text-sm text-gray-600">Common questions</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-[#1D7BC1] mx-auto mb-2" />
            <h3 className="font-medium">Contact Support</h3>
            <p className="text-sm text-gray-600">Get direct help</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Download className="h-8 w-8 text-[#1D7BC1] mx-auto mb-2" />
            <h3 className="font-medium">Downloads</h3>
            <p className="text-sm text-gray-600">Guides and resources</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 text-[#1D7BC1] mx-auto mb-2" />
            <h3 className="font-medium">Emergency Contact</h3>
            <p className="text-sm text-gray-600">24/7 support hotline</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search FAQ */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-2">
            {filteredFAQs.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <HelpCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No FAQ items found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>Submit a support ticket for assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={supportTicket.subject}
                  onChange={(e) => setSupportTicket(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                  id="priority"
                  className="w-full px-3 py-2 border rounded-md"
                  value={supportTicket.priority}
                  onChange={(e) => setSupportTicket(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category"
                  className="w-full px-3 py-2 border rounded-md"
                  value={supportTicket.category}
                  onChange={(e) => setSupportTicket(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="General">General Question</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Account">Account & Access</option>
                  <option value="Bug">Bug Report</option>
                  <option value="Feature">Feature Request</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue or question..."
                rows={4}
                value={supportTicket.description}
                onChange={(e) => setSupportTicket(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <Button 
              onClick={submitTicket}
              className="w-full bg-[#1D7BC1] hover:bg-[#103173]"
              disabled={!supportTicket.subject || !supportTicket.description}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Multiple ways to reach our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Emergency Hotline</p>
                  <p className="text-sm text-red-700">1-800-OCEAN-911 (24/7)</p>
                  <p className="text-xs text-red-600">For urgent system issues or critical alerts</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Mail className="h-5 w-5 text-[#1D7BC1]" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-600">support@oceanguard.gov</p>
                  <p className="text-xs text-gray-500">Response within 4 business hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Phone className="h-5 w-5 text-[#1D7BC1]" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-gray-600">1-555-GUARD-HELP</p>
                  <p className="text-xs text-gray-500">Mon-Fri, 8 AM - 6 PM PST</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <Clock className="h-5 w-5 text-[#1D7BC1]" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM PST</p>
                  <p className="text-xs text-gray-500">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Current Support Status</h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">All systems operational</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Last updated: 5 minutes ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Resources
          </CardTitle>
          <CardDescription>Documentation and training materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => downloadResource(link.title)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <link.icon className="h-6 w-6 text-[#1D7BC1]" />
                  <Badge variant="secondary" className="text-xs">
                    {link.type}
                  </Badge>
                </div>
                <h4 className="font-medium mb-1">{link.title}</h4>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}