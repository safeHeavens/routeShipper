"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  Send,
  Clock,
  MapPin,
  CheckCircle,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How do I track my shipment?",
    answer:
      "You can track your shipment by entering your tracking number on our Tracking page. Simply go to the tracking section, enter your unique tracking code (e.g., RS-2024-XXXXXXXX), and you'll see real-time updates on your shipment's location and status.",
  },
  {
    question: "What are your shipping rates?",
    answer:
      "Our shipping rates vary based on package dimensions, weight, destination, and service type (Air, Ocean, or Ground). For an accurate quote, please contact our sales team or use our online calculator in the shipping section. We offer competitive rates and volume discounts for business accounts.",
  },
  {
    question: "How long does international shipping take?",
    answer:
      "International shipping times depend on the destination and service selected. Air freight typically takes 1-5 business days, while ocean freight ranges from 15-45 days. Express services are available for urgent shipments. You can view estimated delivery times during the booking process.",
  },
  {
    question: "Do you offer insurance for shipments?",
    answer:
      "Yes, we offer comprehensive shipping insurance for all shipment types. Basic coverage is included with every shipment, and additional coverage options are available for high-value items. You can select your preferred coverage level during checkout.",
  },
  {
    question: "What items are prohibited from shipping?",
    answer:
      "Prohibited items include hazardous materials, explosives, illegal substances, live animals (without proper permits), and perishable goods without proper packaging. For a complete list of prohibited and restricted items, please refer to our shipping guidelines or contact our support team.",
  },
  {
    question: "How do I file a claim for damaged goods?",
    answer:
      "To file a damage claim, document the damage with photos, keep all original packaging, and contact our support team within 48 hours of delivery. Complete the online claim form with your tracking number, description of damage, and supporting documentation. Claims are typically processed within 5-7 business days.",
  },
  {
    question: "Can I change my delivery address after shipping?",
    answer:
      "Address changes may be possible depending on the shipment status. Contact our support team as soon as possible with your tracking number. Additional fees may apply for address modifications. Note that some changes may not be possible for shipments already in transit.",
  },
  {
    question: "Do you offer warehousing services?",
    answer:
      "Yes, we provide comprehensive warehousing solutions including storage, inventory management, pick and pack services, and order fulfillment. Our facilities are strategically located across major cities worldwide. Contact our business team for custom warehousing solutions.",
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    value: "1-800-123-4567",
    action: "tel:+18001234567",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "support@routeshipper.com",
    action: "mailto:support@routeshipper.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us in real-time",
    value: "Available 24/7",
    action: "#chat",
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-methods",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".faq-section",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", category: "", message: "" });
  };

  return (
    <div>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="header-content text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Customer Support
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              We are here to help. Get in touch with our support team or find
              answers in our FAQ section.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods py-12 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.action}
                className="contact-card block"
              >
                <Card className="h-full border-2 border-transparent transition-all duration-300 hover:border-[#FF7A00] hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#0B1E4A" }}
                    >
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#0B1E4A]">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-gray-500">{method.description}</p>
                    <p className="mt-3 font-semibold text-[#FF7A00]">
                      {method.value}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-[#0B1E4A] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#10B981" }}
                    >
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#0B1E4A]">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {"Thank you for contacting us. We'll get back to you within 24 hours."}
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-white"
                      style={{ backgroundColor: "#FF7A00" }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tracking">Tracking Issue</SelectItem>
                            <SelectItem value="shipping">Shipping Inquiry</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="damage">Damage Claim</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your inquiry in detail..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-white"
                      style={{ backgroundColor: "#FF7A00" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Support Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#FF7A00" }}
                    >
                      <Headphones className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0B1E4A]">
                        24/7 Support Available
                      </h3>
                      <p className="mt-1 text-gray-500">
                        Our dedicated support team is available around the clock to
                        assist you with any questions or concerns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-[#0B1E4A]">
                    Office Hours & Location
                  </h3>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 shrink-0 text-[#FF7A00] mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B1E4A]">Business Hours</p>
                      <p className="text-gray-500">Monday - Friday: 9AM - 6PM EST</p>
                      <p className="text-gray-500">Saturday: 10AM - 4PM EST</p>
                      <p className="text-gray-500">Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-[#FF7A00] mt-0.5" />
                    <div>
                      <p className="font-medium text-[#0B1E4A]">Headquarters</p>
                      <p className="text-gray-500">123 Logistics Way</p>
                      <p className="text-gray-500">New York, NY 10001</p>
                      <p className="text-gray-500">United States</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-[#0B1E4A] text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Need Urgent Help?</h3>
                  <p className="mt-2 text-gray-300">
                    For time-sensitive shipping issues, call our priority support
                    line for immediate assistance.
                  </p>
                  <a href="tel:+18009999999">
                    <Button
                      className="mt-4 w-full text-[#0B1E4A]"
                      style={{ backgroundColor: "#FF7A00", color: "white" }}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      1-800-999-9999
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section py-12 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "#0B1E4A" }}
            >
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[#0B1E4A]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-500">
              Find quick answers to common questions
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border-0 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#0B1E4A] hover:text-[#FF7A00] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-500">{"Can't find what you're looking for?"}</p>
            <Link href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Button
                className="mt-4 gap-2 text-white"
                style={{ backgroundColor: "#0B1E4A" }}
              >
                <MessageCircle className="h-4 w-4" />
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
