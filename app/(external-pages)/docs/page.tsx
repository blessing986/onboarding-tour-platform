"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  BookOpen,
  Rocket,
  Cog,
  Play,
  ChevronRight,
  Terminal,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./components/CodeBlock";
import {
  htmlExampleCode,
  navigation,
  reactExampleCode,
  scriptTagCode,
} from "./constants/constant";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-sky/20 via-brand-blush/10 to-brand-sage/20 text-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sky rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-blush rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-4 sm:space-y-6 lg:space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp}  transition={{ type: "spring", stiffness: 300 }}>
                 <Badge variant="outline" className="text-sm hover:scale-105 transition-transform cursor-default border-amber-500 text-slate-900 bg-amber-50/80 px-4 py-1.5">
                  <BookOpen className="h-3 w-3 mr-2 text-amber-500" />
                  Developer Documentation
                </Badge>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight "
                variants={fadeInUp}
              >
                <motion.span
                  className="text-[#20063B] bg-clip-text inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  TourGuide Docs
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Everything you need to create powerful onboarding experiences
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
              <aside className="lg:sticky lg:top-20 h-fit space-y-6">
                <div className="bg-white/80 border-2 border-white/50 rounded-3xl p-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#2A1E5C] hover:bg-[#2A1E5C]/80 text-white "
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="hidden lg:block bg-linear-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20 rounded-3xl p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Terminal className="h-4 w-4 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Need Help?</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our team is ready to assist with integration questions
                  </p>
                  <Link href="mailto:support@example.com">
                    <Button
                      className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer rounded-full transition-all duration-300"
                      size="sm"
                    >
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </aside>

              <main className="space-y-8">
                <AnimatePresence mode="wait">
                  {activeSection === "quickstart" && (
                    <motion.div
                      key="quickstart"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <Card className="bg-white/80 border-2 border-white/50 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-brand-blush/30 bg-linear-to-r from-brand-sky/20 to-brand-blush/20">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#2A1E5C] rounded-xl">
                              <Rocket className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-slate-900">
                                Quick Start Guide
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Get running in minutes
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          <div className="space-y-6">
                            {[
                              {
                                step: "01",
                                title: "Create an Account",
                                description:
                                  "Sign up for free and access your personalized dashboard with full tour management capabilities.",
                              },
                              {
                                step: "02",
                                title: "Build Your Tour",
                                description:
                                  "Create a new tour with at least 5 steps. Define target elements, descriptions, and customize the appearance.",
                              },
                              {
                                step: "03",
                                title: "Add the Embed Code",
                                description:
                                  "Copy your unique embed script from the dashboard and paste it into your website's HTML.",
                              },
                              {
                                step: "04",
                                title: "Go Live",
                                description:
                                  "Activate your tour and watch as new users get a seamless onboarding experience.",
                              },
                            ].map((item, idx) => (
                              <div key={idx} className="group relative">
                                <div className="flex gap-4 sm:gap-6">
                                  <div className="relative">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#2A1E5C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                      <span className="text-xl font-bold text-white">
                                        {item.step}
                                      </span>
                                    </div>
                                    {idx < 3 && (
                                      <div className="absolute left-1/2 top-16 w-0.5 h-6 bg-linear-to-b from-brand-teal/50 to-transparent -translate-x-1/2" />
                                    )}
                                  </div>
                                  <div className="flex-1 pt-2 space-y-2">
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-[#2A1E5C] transition-colors">
                                      {item.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 border-2 border-white/50 rounded-3xl">
                        <CardHeader>
                          <CardTitle className="text-slate-900 flex items-center gap-2">
                            <Play className="h-5 w-5 text-brand-teal" />
                            Ready to Start?
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 mb-4">
                            Choose your preferred integration method below and
                            follow the setup instructions.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              onClick={() => setActiveSection("integration")}
                              className="h-14 px-8 text-lg bg-[#2A1E5C] hover:bg-[#2A1E5C]/80 text-white rounded-full transition-all duration-300 cursor-pointer"
                            >
                              View Integration Guide
                              <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Link href="/demo.html">
                             <Button
                              variant="outline"
                              className="h-14 px-8 text-lg border-2 border-[#2A1E5C] text-[#2A1E5C] hover:text-white hover:bg-[#2A1E5C] transition-colors rounded-full duration-300 cursor-pointer"
                            >
                              View Demo
                              </Button>
                              </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {activeSection === "integration" && (
                    <motion.div
                      key="integration"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <Card className="bg-white/80 border-2 border-white/50 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-brand-blush/30 bg-linear-to-r from-brand-sky/20 to-brand-blush/20">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#2A1E5C] rounded-xl">
                              <Code2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-slate-900">
                                Installation
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Choose your integration method
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 lg:p-8 space-y-8">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold text-slate-900">
                                  Script Tag
                                </h3>
                                <Badge className="bg-brand-teal/20 text-brand-teal border-brand-teal/30">
                                  Recommended
                                </Badge>
                              </div>
                            </div>
                            <p className="text-slate-600">
                              Add this script before the closing &lt;/body&gt;
                              tag:
                            </p>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-linear-to-r from-brand-teal/10 to-brand-sky/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="p-4 overflow-x-auto">
                                <CodeBlock
                                  code={scriptTagCode}
                                  language="html"
                                  id="script1"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                              NPM Package
                            </h3>
                            <p className="text-slate-600">Using react:</p>
                            <CodeBlock
                              code="npm i embeddable-tour-platform"
                              language="bash"
                              id="npm-install"
                            />
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                              Configuration Options
                            </h3>
                            <div className="grid gap-3">
                              {[
                                {
                                  option: "tourId",
                                  desc: "Unique identifier for your tour",
                                  required: true,
                                },
                                {
                                  option: "secret_key",
                                  desc: "Authentication key for secure access",
                                  required: true,
                                },
                                {
                                  option: "resume",
                                  desc: "Resume tour from the last completed step",
                                  required: false,
                                },
                                {
                                  option: "styles",
                                  desc: "Custom styling for the tour UI",
                                  required: false,
                                },
                                {
                                  option: "onEvent",
                                  desc: "Callback for tracking tour events",
                                  required: false,
                                },
                              ].map((item) => (
                                <div
                                  key={item.option}
                                  className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-brand-teal/50 transition-colors"
                                >
                                  <code className="px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-brand-teal font-mono text-sm">
                                    {item.option}
                                  </code>
                                  <span className="flex-1 text-slate-600">
                                    {item.desc}
                                  </span>
                                  {item.required && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 border-2 border-white/50 rounded-3xl">
                        <CardHeader>
                          <CardTitle className="text-slate-900">
                            Element Targeting
                          </CardTitle>
                          <CardDescription className="text-slate-600">
                            Use CSS selectors to target elements
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            { selector: "#elementId", desc: "Target by ID" },
                            {
                              selector: ".className",
                              desc: "Target by class name",
                            },
                          ].map((item) => (
                            <div
                              key={item.selector}
                              className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl"
                            >
                              <code className="px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-brand-teal font-mono text-sm">
                                {item.selector}
                              </code>
                              <span className="flex-1 text-slate-600">
                                {item.desc}
                              </span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {activeSection === "api" && (
                    <motion.div
                      key="api"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <Card className="bg-white/80 border-2 border-white/50 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-brand-blush/30 bg-linear-to-r from-brand-sky/20 to-brand-blush/20">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#2A1E5C] rounded-xl">
                              <Cog className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-slate-900">
                                API Methods
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Programmatic control of your tours
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 lg:p-8 space-y-8">
                          {[
                            {
                              method: "start()",
                              desc: "Manually start the tour",
                              code: "TourGuide.start();",
                            },
                            {
                              method: "goTo()",
                              desc: "Jump to specific step",
                              code: "TourGuide.goTo();",
                            },
                            {
                              method: "destroy()",
                              desc: "Stop the tour at any point",
                              code: "TourGuide.destroy();",
                            },
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-3">
                                <code className="text-lg font-semibold text-brand-teal font-mono">
                                  TourGuide.{item.method}
                                </code>
                              </div>
                              <p className="text-slate-600">{item.desc}</p>
                              <CodeBlock
                                code={item.code}
                                language="javascript"
                                id={`api-${idx}`}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {activeSection === "examples" && (
                    <motion.div
                      key="examples"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <Card className="bg-white/80 border-2 border-white/50 rounded-3xl">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#2A1E5C] rounded-lg">
                              <Layers className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-slate-900">
                                Complete HTML Example
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Full implementation with all features
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 overflow-x-auto">
                            <CodeBlock
                              code={htmlExampleCode}
                              language="html"
                              id="html-example"
                              showLineNumbers={true}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/80 border-2 border-white/50 rounded-3xl">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#2A1E5C] rounded-lg">
                              <Code2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-slate-900">
                                React Example
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Integration with React hooks
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CodeBlock
                            code={reactExampleCode}
                            language="jsx"
                            id="react-example"
                            showLineNumbers={true}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>

              <div className="lg:hidden bg-linear-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Terminal className="h-4 w-4 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Need Help?</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our team is ready to assist with integration questions
                </p>
                <Link href="mailto:support@example.com">
                  <Button
                    className="w-full h-10 bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer rounded-full transition-all duration-300"
                    size="sm"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
