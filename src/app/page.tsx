"use client";
import { useState, useEffect } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Cpu,
  Waves,
  Factory,
  Zap,
  Ship,
  Train,
  Building2,
  GitBranch,
  Layers,
  Database,
  Bot,
  CheckCircle2,
  Menu,
  X,
  Activity,
  ShieldCheck,
  Check,
  ArrowUp,
  Play,
  Pause,
  Sparkles,
  Loader2,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
const heroTwin = "/hero-twin.jpg";
const networkTopo = "/network-topology.jpg";

export default function Home() {
  const [activeModalPrimitive, setActiveModalPrimitive] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-teal/20 selection:text-teal-glow">
      <Nav />
      <main id="main-content">
        <Hero />
        <LogoStrip />
        <Positioning />
        <Platform onSelectPrimitive={setActiveModalPrimitive} />
        <Products onSelectProduct={setActiveModalProduct} />
        <WhyNow />
        <Sectors />
        <CTA />
      </main>
      <Footer />

      {/* Primitive Detail Modal */}
      {activeModalPrimitive && (
        <PrimitiveModal
          primitiveKey={activeModalPrimitive}
          onClose={() => setActiveModalPrimitive(null)}
        />
      )}

      {/* Product Spec Modal */}
      {activeModalProduct && (
        <ProductModal
          productKey={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cybertwinx_theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("cybertwinx_theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navLinks = [
    ["Platform", "#platform"],
    ["Products", "#products"],
    ["Capabilities", "#positioning"],
    ["Sectors", "#sectors"],
    ["Why Now", "#why-now"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline/80 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md focus-ring p-1"
          aria-label="CyberTwinX Home"
        >
          <img
            src="/CX_light_logo.png"
            alt="CyberTwinX Logo"
            className="h-8 w-auto hidden dark:block"
          />
          <img
            src="/CX_dark_logo.png"
            alt="CyberTwinX Logo"
            className="h-8 w-auto block dark:hidden"
          />
          {/* <span className="hidden sm:inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-2 py-0.5 text-[10px] font-mono text-teal font-medium">
            v2.4 LTS
          </span> */}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded px-1.5 py-1"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface/80 text-foreground transition-all hover:bg-surface hover:border-teal/50 focus-ring"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-teal transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-teal transition-transform hover:-rotate-12" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block focus-ring rounded px-2 py-1"
          >
            Sign in
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-md bg-teal px-3.5 py-2 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-teal-glow hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus-ring"
          >
            <span>Request briefing</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface/80 text-foreground transition-colors hover:bg-surface focus-ring md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-hairline bg-background/95 p-6 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-base font-medium text-foreground transition-colors hover:border-hairline hover:bg-surface/50"
              >
                <span>{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
            <div className="pt-4 border-t border-hairline flex flex-col gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-between rounded-md border border-hairline bg-surface/60 px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
              >
                <span className="flex items-center gap-2">
                  {theme === "dark" ? <Sun className="h-4 w-4 text-teal" /> : <Moon className="h-4 w-4 text-teal" />}
                  <span>Appearance</span>
                </span>
                <span className="text-xs font-mono text-teal uppercase font-semibold">{theme} mode</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-md border border-hairline bg-surface/60 py-2.5 text-sm font-medium text-foreground hover:bg-surface"
              >
                Sign in to Console
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-teal py-2.5 text-sm font-semibold text-primary-foreground hover:bg-teal-glow"
              >
                <span>Request Briefing</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [consoleTab, setConsoleTab] = useState<"topology" | "attack" | "telemetry">("topology");
  const [simRunning, setSimRunning] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string>("AquaPure-01");

  const nodesInfo: Record<string, { name: string; type: string; status: string; invariants: string; load: string }> = {
    "AquaPure-01": {
      name: "Secure Water Treatment",
      type: "6-Stage Physical Water Plant",
      status: "SECURE",
      invariants: "42 Invariants Active",
      load: "Modbus/OPC-UA 1.2 GB/s",
    },
    "AquaGrid-02": {
      name: "Water Distribution Network",
      type: "Multi-Zone Pump & Tank Grid",
      status: "SECURE",
      invariants: "28 Invariants Active",
      load: "DNP3 / IEC 60870 850 MB/s",
    },
    "PowerGrid-03": {
      name: "Electric Power & Intelligent Control",
      type: "Substation & Microgrid Twin",
      status: "ATTACK TEST",
      invariants: "36 Invariants Active",
      load: "IEC 61850 GOOSE 2.4 GB/s",
    },
    "PortMarine-04": {
      name: "Maritime & Offshore Terminal",
      type: "Vessel Control & Cargo Twin",
      status: "SECURE",
      invariants: "19 Invariants Active",
      load: "NMEA 0183 / Modbus 410 MB/s",
    },
  };

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {/* Live Indicator Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
                Backed by Advanced Cyber-Physical R&D Labs
              </span>
            </div>

            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[68px]">
              Cyber-physical{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal via-teal-glow to-teal">
                digital twins
              </span>{" "}
              for critical infrastructure.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              CyberTwinX is the AI-first platform that automatically generates high-fidelity twins
              of industrial OT environments — enabling operators, regulators, and defense agencies to
              safely simulate attacks, validate security policies, and execute joint cyber ranges without touching live assets.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-teal-glow glow-teal focus-ring"
              >
                <span>Request platform briefing</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#positioning"
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:border-teal/30 focus-ring"
              >
                <span>Compare capabilities</span>
              </a>
            </div>

            {/* Industry Metrics */}
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-hairline pt-7">
              {[
                ["USD 2.37B", "Global cyber-range market"],
                ["17.0%", "APAC CAGR through 2030"],
                ["Zero", "Physical plant capex required"],
              ].map(([metric, label]) => (
                <div key={metric} className="rounded-lg border border-hairline/60 bg-surface/30 p-3 sm:p-4 backdrop-blur-sm">
                  <dt className="font-display text-xl font-semibold text-foreground sm:text-2xl lg:text-3xl text-teal">
                    {metric}
                  </dt>
                  <dd className="mt-1 text-[11px] sm:text-xs leading-snug text-muted-foreground font-medium">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero Interactive Twin Showcase Console */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface/90 shadow-[var(--shadow-elevated)] backdrop-blur-md">
              {/* Console Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-surface/95 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-teal" />
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    twin.session · {selectedNode} · <span className="text-teal font-mono">LIVE</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSimRunning(!simRunning)}
                    className="inline-flex items-center gap-1 rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                    title={simRunning ? "Pause simulation" : "Resume simulation"}
                  >
                    {simRunning ? <Pause className="h-3 w-3 text-teal" /> : <Play className="h-3 w-3 text-amber-400" />}
                    <span>{simRunning ? "RUNNING" : "PAUSED"}</span>
                  </button>
                  <span className="font-mono text-[10px] text-teal/80 bg-teal/10 px-1.5 py-0.5 rounded">60 FPS</span>
                </div>
              </div>

              {/* Console Mode Selector Tabs */}
              <div className="flex border-b border-hairline bg-background/50 text-[12px] font-mono">
                {(["topology", "attack", "telemetry"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setConsoleTab(tab)}
                    className={`flex-1 px-3 py-2 text-center transition-colors border-r border-hairline last:border-r-0 ${consoleTab === tab
                      ? "bg-surface font-semibold text-teal border-b-2 border-b-teal"
                      : "text-muted-foreground hover:bg-surface/40 hover:text-foreground"
                      }`}
                  >
                    {tab === "topology" && "1. Topology Grid"}
                    {tab === "attack" && "2. Attack Tree Logs"}
                    {tab === "telemetry" && "3. PAD Invariants"}
                  </button>
                ))}
              </div>

              {/* Console Content Display */}
              <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between">
                {consoleTab === "topology" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-muted-foreground">Select Twin Subsystem:</span>
                      <span className="font-mono text-teal text-[11px]">{nodesInfo[selectedNode].invariants}</span>
                    </div>
                    {/* Node Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {Object.entries(nodesInfo).map(([id, info]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setSelectedNode(id)}
                          className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${selectedNode === id
                            ? "border-teal bg-teal/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                            : "border-hairline bg-surface/60 hover:bg-surface hover:border-hairline/80"
                            }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-mono text-xs font-bold text-foreground">{id}</span>
                            <span
                              className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-medium ${info.status === "SECURE"
                                ? "bg-teal/20 text-teal"
                                : "bg-amber-500/20 text-amber-300"
                                }`}
                            >
                              {info.status}
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-foreground/90 mt-1 line-clamp-1">
                            {info.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                            {info.load}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Visual Preview Graphic */}
                    <div className="relative rounded-lg overflow-hidden border border-hairline mt-3 group">
                      <img
                        src={heroTwin}
                        alt="CyberTwinX Plant Visualization"
                        className="w-full h-36 object-cover filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-3">
                        <div className="flex items-center justify-between w-full text-xs font-mono">
                          <span className="text-foreground font-medium">
                            Node: <span className="text-teal font-semibold">{selectedNode}</span> ({nodesInfo[selectedNode].type})
                          </span>
                          <span className="text-teal font-bold flex items-center gap-1">
                            <Activity className="h-3 w-3 animate-pulse" /> 98.6% Fidelity
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {consoleTab === "attack" && (
                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-hairline">
                      <span>Simulated Adversary: AdversaryAI v2.1</span>
                      <span className="text-amber-400 font-semibold">T0836 MITRE ATT&CK</span>
                    </div>

                    <div className="bg-background/90 rounded-md border border-hairline p-3 font-mono space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-emerald-400">
                        <span className="text-muted-foreground font-mono">[09:02:11]</span>
                        <span>[INGRESS] Modbus TCP connection established to PLC-301 (Port 502)</span>
                      </div>
                      <div className="flex items-start gap-2 text-amber-300">
                        <span className="text-muted-foreground font-mono">[09:02:14]</span>
                        <span>[ATTACK] Spoofing Water Level Set-point (LIT101 &gt; 1200mm)</span>
                      </div>
                      <div className="flex items-start gap-2 text-teal">
                        <span className="text-muted-foreground font-mono">[09:02:15]</span>
                        <span>[PAD ENGINE] Physics-Aware Invariant #14 Triggered: Pump P101 overspeed prevented</span>
                      </div>
                      <div className="flex items-start gap-2 text-cyan-300">
                        <span className="text-muted-foreground font-mono">[09:02:16]</span>
                        <span>[VERIFICATION] Safety Interlock engaged. Twin state recorded to audit log.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-hairline bg-surface/60 flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">Adversary Trajectory:</span>
                      <span className="text-teal font-semibold text-xs">14 Paths Evaluated · 0 Breaches</span>
                    </div>
                  </div>
                )}

                {consoleTab === "telemetry" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
                      <span>Live Invariant Assertions ({selectedNode})</span>
                      <span className="text-teal">Physics-Aware Invariants (PAD)</span>
                    </div>

                    <div className="border border-hairline rounded-md overflow-hidden bg-background/80">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-surface text-muted-foreground font-mono text-[10px] uppercase border-b border-hairline">
                          <tr>
                            <th className="p-2">Invariant ID</th>
                            <th className="p-2">Variable</th>
                            <th className="p-2">Current Value</th>
                            <th className="p-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hairline font-mono text-[11px]">
                          <tr>
                            <td className="p-2 text-teal">INV-P1-TANK</td>
                            <td className="p-2 text-foreground">LIT-101 Level</td>
                            <td className="p-2 text-foreground/90">782 mm</td>
                            <td className="p-2 text-right font-bold text-teal">PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-teal">INV-P2-FLOW</td>
                            <td className="p-2 text-foreground">FIT-201 Rate</td>
                            <td className="p-2 text-foreground/90">2.4 m³/h</td>
                            <td className="p-2 text-right font-bold text-teal">PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-teal">INV-P3-VALVE</td>
                            <td className="p-2 text-foreground">MV-101 Interlock</td>
                            <td className="p-2 text-foreground/90">CLOSED (1)</td>
                            <td className="p-2 text-right font-bold text-teal">PASS</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-teal">INV-P4-PRESS</td>
                            <td className="p-2 text-foreground">PIT-301 Pressure</td>
                            <td className="p-2 text-foreground/90">4.1 bar</td>
                            <td className="p-2 text-right font-bold text-teal">PASS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-2.5 rounded-lg border border-hairline bg-surface/50 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Physics Invariant Confidence:</span>
                      <span className="text-teal font-bold font-mono">99.98% Verification Rate</span>
                    </div>
                  </div>
                )}

                {/* Bottom Bar Info */}
                <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-teal" /> Non-intrusive software execution
                  </span>
                  <a href="#platform" className="text-teal hover:underline font-sans font-medium text-xs">
                    Explore Platform →
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -left-5 -top-5 hidden rounded-lg border border-hairline bg-surface/95 px-3.5 py-2.5 shadow-lg backdrop-blur-md lg:block">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Autonomous Verification
              </div>
              <div className="mt-0.5 text-xs font-medium text-foreground flex items-center gap-1.5">
                <span>PAD Invariants:</span>
                <span className="text-teal font-mono font-semibold">ALL PASS (42/42)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- LOGO STRIP ---------------- */
function LogoStrip() {
  const partners = [
    { name: "Cyber-Physical Security Labs", desc: "Center for Research in Cyber Security" },
    { name: "CSA Singapore", desc: "Cyber Security Agency of Singapore" },
    { name: "CRPO", desc: "Cyber Research Programme Office" },
    { name: "EnterpriseSG", desc: "Enterprise Singapore Innovation" },
    { name: "OT-ISAC", desc: "Operational Tech ISAC" },
    { name: "Maritime Cyber Security Alliance", desc: "Maritime Cyber Security Testbed Alliance" },
  ];

  return (
    <section className="border-y border-hairline bg-surface/30 py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal" /> Built with & validated by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group relative cursor-default"
                title={partner.desc}
              >
                <span className="font-display text-sm sm:text-base font-semibold tracking-tight text-muted-foreground/90 transition-colors group-hover:text-teal">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- POSITIONING & COMPARISON MATRIX ---------------- */
function Positioning() {
  return (
    <section id="positioning" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4">Category Leadership</div>
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Not another cybersecurity scanner.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              Power grids, water treatment, maritime ports, and rail networks run on tightly-coupled, safety-critical OT.
              Active network scans risk crashing legacy PLCs, while building physical testbeds costs tens of millions and requires months of manual engineering.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <strong className="text-foreground font-semibold">CyberTwinX collapses that trade-off.</strong> We generate high-fidelity, software-defined twins of physical OT infrastructure directly from standard engineering files — delivering a safe environment for attack simulation, policy testing, and compliance validation.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Capability Comparison Matrix Table */}
            <div className="overflow-hidden rounded-xl border border-hairline bg-surface/80 backdrop-blur-sm shadow-lg">
              <div className="p-5 border-b border-hairline bg-surface/90">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Capability Matrix: Traditional vs. CyberTwinX
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  How CyberTwinX compares to physical test-beds and generic IT cyber ranges.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface-2/60 text-muted-foreground font-mono text-[11px] uppercase border-b border-hairline">
                    <tr>
                      <th className="py-3 px-4">Evaluation Metric</th>
                      <th className="py-3 px-3">Physical Testbeds</th>
                      <th className="py-3 px-3">Generic IT Ranges</th>
                      <th className="py-3 px-4 text-teal font-bold bg-teal/5">CyberTwinX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {[
                      ["Physics-Aware Fidelity", "High (Physical)", "Low (Software diagrams)", "98.6% Software Twin"],
                      ["Capex Required", "$10M - $50M+", "Moderate ($500k+)", "Zero Plant Capex"],
                      ["Downtime & Safety Risk", "High Plant Risk", "Low Risk", "Zero Plant Risk"],
                      ["Automated Twin Gen", "Manual Months", "Manual Weeks", "Automated Hours"],
                      ["Physics-Aware Invariants", "Custom Hardware", "Not Supported", "Native Integrated"],
                      ["Regulatory Alignment", "Limited Access", "Generic IT Standards", "Cybersecurity Act 2025"],
                    ].map(([metric, phys, it, twx]) => (
                      <tr key={metric} className="hover:bg-surface-2/40 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-foreground">{metric}</td>
                        <td className="py-3.5 px-3 text-muted-foreground">{phys}</td>
                        <td className="py-3.5 px-3 text-muted-foreground">{it}</td>
                        <td className="py-3.5 px-4 font-semibold text-teal bg-teal/5 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                          <span>{twx}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PLATFORM PRIMITIVES ---------------- */
function Platform({ onSelectPrimitive }: { onSelectPrimitive: (key: string) => void }) {
  const pillars = [
    {
      id: "twin-gen",
      icon: GitBranch,
      title: "Automated Twin Generation",
      body: "Ingest SG-ML, IEC 61131, and vendor configuration files to emit a running cyber-physical twin with stateful protocol stacks.",
      tag: "Ingestion Engine",
    },
    {
      id: "physics-sim",
      icon: Cpu,
      title: "Physics-Aware Simulation",
      body: "Virtual PLCs, sensors, and actuators execute against realistic physical process dynamics. Twins act like real plants, not static diagrams.",
      tag: "Execution Engine",
    },
    {
      id: "adversary-ai",
      icon: Bot,
      title: "Agentic AI Adversary",
      body: "Adaptive red-team agents plan, pivot, and execute multi-stage attacks through the twin — surfacing vulnerabilities humans miss.",
      tag: "Adversary Engine",
    },
    {
      id: "pad-engine",
      icon: Shield,
      title: "Physics-Aware Detection (PAD)",
      body: "Patented Physics-Aware Invariants detect physical state anomalies that IT monitoring tools structurally cannot see.",
      tag: "Detection Engine",
    },
    {
      id: "synthetic-data",
      icon: Database,
      title: "Synthetic OT Datasets",
      body: "Generate labeled, replayable attack PCAPs and process telemetry to train machine learning models without risking live operations.",
      tag: "Data Engine",
    },
    {
      id: "compliance-sandbox",
      icon: Layers,
      title: "Compliance Sandbox",
      body: "Purpose-built for the Cybersecurity (Amendment) Act 2025 and OT Cybersecurity Masterplan validation requirements.",
      tag: "Governance Engine",
    },
  ];

  return (
    <section id="platform" className="relative border-t border-hairline py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">The Platform</div>
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Six core primitives. One operating system for OT resilience.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
            CyberTwinX combines ingestion, physics simulation, red-teaming, anomaly detection, and compliance auditing into a unified, enterprise-grade architecture.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ id, icon: Icon, title, body, tag }) => (
            <div
              key={id}
              onClick={() => onSelectPrimitive(id)}
              className="group relative flex flex-col justify-between rounded-xl border border-hairline bg-surface/70 p-6 sm:p-7 backdrop-blur-sm transition-all hover:border-teal/50 hover:bg-surface cursor-pointer focus-ring"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && onSelectPrimitive(id)}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-background text-teal transition-colors group-hover:border-teal/50 group-hover:bg-teal/10">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-teal bg-teal/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-teal transition-colors">
                  {title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline/60 flex items-center justify-between text-xs font-semibold text-teal">
                <span>Explore Technical Specs</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products({ onSelectProduct }: { onSelectProduct: (key: string) => void }) {
  const products = [
    {
      id: "twinforge",
      tag: "Product · 01",
      name: "TwinForge",
      pitch:
        "The automated digital twin generation engine. Transform SCADA topologies, CAD files, and PLC logic into live twins in hours.",
      bullets: [
        "Ingests SG-ML, IEC 61131, & multi-vendor PLC configs",
        "Stateful Modbus TCP, OPC-UA, DNP3 & IEC 61850 protocol stacks",
        "Deterministic process replay & state snapshotting",
      ],
      status: "Production Ready",
    },
    {
      id: "rangeos",
      tag: "Product · 02",
      name: "RangeOS",
      pitch:
        "Software-defined OT cyber-range platform. Execute blue-team drills and multi-national defense exercises at scale.",
      bullets: [
        "Multi-tenant sovereign cloud deployment options",
        "Scenario library curated with leading OT security research labs",
        "Automated scoring, telemetry recording & after-action report",
      ],
      status: "Enterprise v2.4",
    },
    {
      id: "adversaryai",
      tag: "Product · 03",
      name: "AdversaryAI",
      pitch:
        "Agentic red-team engine that plans, adapts, and executes attack trees against twins — identifying vulnerabilities proactively.",
      bullets: [
        "LLM-guided attack tree generation & execution",
        "100% coverage of MITRE ATT&CK for ICS matrix techniques",
        "Cryptographically signed, reproducible attack traces",
      ],
      status: "AI Engine Active",
    },
  ];

  return (
    <section id="products" className="relative overflow-hidden border-t border-hairline py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url(${networkTopo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="eyebrow mb-4">Product Suite</div>
        <h2 className="max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
          Complete software suite for cyber-physical validation.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-surface/85 p-7 sm:p-8 backdrop-blur-md transition-all hover:border-teal/40 hover:bg-surface hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal font-semibold">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-2 text-muted-foreground border border-hairline">
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  {p.name}
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {p.pitch}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-hairline pt-5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" strokeWidth={1.75} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => onSelectProduct(p.id)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-hairline bg-surface-2/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-primary-foreground focus-ring"
                >
                  <span>View Architecture & Specs</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY NOW ---------------- */
function WhyNow() {
  const timeline = [
    {
      date: "October 2025",
      title: "Cybersecurity (Amendment) Act 2025 Mandates",
      body: "Regulatory oversight expands to third-party-owned Critical Information Infrastructure (CII), temporary high-risk systems, and cloud-hosted OT networks.",
    },
    {
      date: "2024 – 2026",
      title: "OT Cybersecurity Masterplan Implementation",
      body: "Secure-by-deployment validation and joint defense exercises become mandatory for CII operators across water, power, and transport sectors.",
    },
    {
      date: "2026 and Beyond",
      title: "APAC OT Cyber Resilience Scale-Out",
      body: "17% CAGR in cyber-range investments through 2030 — making compliance-grade software digital twins essential for defense and operations.",
    },
  ];

  return (
    <section id="why-now" className="relative border-t border-hairline py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4">Regulatory Drivers</div>
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Regulation made safe OT validation a mandatory priority.
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Singapore and global regulatory bodies have established strict mandates for industrial cyber resilience.
              CyberTwinX was architected to serve as the compliance-ready validation layer for these regulations.
            </p>

            <div className="mt-8 p-5 rounded-xl border border-teal/30 bg-teal/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-teal font-mono text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> CII Operator Readiness Checklist
              </div>
              <ul className="mt-3 space-y-2 text-xs text-foreground/90">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal" /> 100% Non-intrusive twin simulation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal" /> Multi-vendor PLC protocol support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal" /> Audit-ready cryptographically signed logs
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative space-y-8 border-l border-hairline/80 pl-6 sm:pl-8">
              {timeline.map((t) => (
                <li key={t.date} className="relative">
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-teal bg-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                  </span>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal font-semibold">
                    {t.date}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTORS ---------------- */
function Sectors() {
  const [selectedSector, setSelectedSector] = useState<string>("power");

  const sectors = [
    { id: "power", icon: Zap, name: "Power & Energy", body: "Substation automation, power generation plants, microgrids, renewable SCADA." },
    { id: "water", icon: Waves, name: "Water & Wastewater", body: "Water treatment stages, distribution networks, dosing control loops (AquaPure/AquaGrid)." },
    { id: "maritime", icon: Ship, name: "Maritime & Ports", body: "Vessel control networks, automated container terminals, bunkering systems (PortMarine)." },
    { id: "rail", icon: Train, name: "Rail & Transport", body: "Signaling networks, train control systems, depot traction substations." },
    { id: "manufacturing", icon: Factory, name: "Advanced Fabs", body: "Semiconductor cleanrooms, pharmaceutical batch plants, precision assembly." },
    { id: "facilities", icon: Building2, name: "Critical Infrastructure", body: "Data centers, hospital BMS, airport baggage & HVAC controls." },
  ];

  return (
    <section id="sectors" className="relative border-t border-hairline py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">Target Domains</div>
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Engineered for every critical infrastructure sector.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ id, icon: Icon, name, body }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedSector(id)}
              className={`group relative overflow-hidden rounded-xl border text-left p-6 transition-all focus-ring ${selectedSector === id
                ? "border-teal bg-teal/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                : "border-hairline bg-surface/70 hover:border-hairline/80 hover:bg-surface"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-background text-teal group-hover:border-teal/50">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {name}
                </h3>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono text-teal">
                <span>{selectedSector === id ? "Active Sector" : "Select Sector"}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA BRIEFING REQUEST ---------------- */
function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    sector: "Water & Wastewater",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Briefing Request Received", {
        description: "Our technical team will review your organization details and get in touch under NDA within 1 business day.",
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative border-t border-hairline py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/90 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-30" />

          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-4">Request Executive Briefing</div>
              <h2 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                Defend critical infrastructure before the first attack — not during it.
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                CyberTwinX is currently onboarding design partners across critical infrastructure operators, national security agencies, and regulatory bodies. All briefings are held under NDA.
              </p>

              <div className="mt-8 space-y-3 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  <span>Sovereign deployment on-premise or local cloud</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  <span>Confidential research & architecture preview</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {submitted ? (
                <div className="rounded-xl border border-teal/40 bg-surface/95 p-8 text-center backdrop-blur animate-in fade-in duration-300">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20 text-teal mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    Briefing Request Confirmed
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    Thank you, <strong className="text-foreground">{formData.name || "Operator"}</strong>. We have logged your briefing request for <strong className="text-foreground">{formData.organisation || "your organization"}</strong> ({formData.email}).
                  </p>
                  <p className="mt-4 text-xs font-mono text-teal bg-teal/10 p-3 rounded-lg border border-teal/20">
                    Response SLA: Within 1 Business Day under NDA
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", organisation: "", sector: "Water & Wastewater" });
                    }}
                    className="mt-6 text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 rounded-xl border border-hairline bg-background/80 p-6 sm:p-7 backdrop-blur"
                >
                  <div>
                    <label htmlFor="briefing-name" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5 font-semibold">
                      Full Name
                    </label>
                    <input
                      id="briefing-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Alex Tan"
                      className="w-full rounded-md border border-hairline bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:ring-2 focus:ring-teal/20 focus-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="briefing-email" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5 font-semibold">
                      Official Work Email
                    </label>
                    <input
                      id="briefing-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex.tan@utility.gov.sg"
                      className="w-full rounded-md border border-hairline bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:ring-2 focus:ring-teal/20 focus-ring"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="briefing-org" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5 font-semibold">
                        Organisation
                      </label>
                      <input
                        id="briefing-org"
                        type="text"
                        required
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="National Water Agency"
                        className="w-full rounded-md border border-hairline bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:ring-2 focus:ring-teal/20 focus-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="briefing-sector" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5 font-semibold">
                        Sector
                      </label>
                      <select
                        id="briefing-sector"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full rounded-md border border-hairline bg-surface px-3.5 py-2.5 text-sm text-foreground focus:border-teal focus:ring-2 focus:ring-teal/20 focus-ring"
                      >
                        <option value="Water & Wastewater">Water & Wastewater</option>
                        <option value="Power & Energy">Power & Energy</option>
                        <option value="Maritime & Ports">Maritime & Ports</option>
                        <option value="Rail & Transport">Rail & Transport</option>
                        <option value="Advanced Fabs">Advanced Fabs</option>
                        <option value="Government & Defense">Government & Defense</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-teal-glow focus-ring disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Logging Briefing Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Briefing Request</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    We respond to verified inbound requests within 1 business day under NDA.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-hairline bg-surface/40 pt-16 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/CX_light_logo.png"
                alt="CyberTwinX Logo"
                className="h-8 w-auto hidden dark:block"
              />
              <img
                src="/CX_dark_logo.png"
                alt="CyberTwinX Logo"
                className="h-8 w-auto block dark:hidden"
              />
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
              The AI-first cyber-physical digital-twin platform engineered for critical infrastructure operators, regulators, and defense agencies.
            </p>

            {/* Operational System Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/80 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[11px] text-muted-foreground">
                Twin Simulation Engine: <strong className="text-teal">OPERATIONAL</strong> (99.98% SLA)
              </span>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              Platform & Specs
            </div>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#platform" className="text-foreground/80 hover:text-teal transition-colors">
                  TwinForge Engine
                </a>
              </li>
              <li>
                <a href="#products" className="text-foreground/80 hover:text-teal transition-colors">
                  RangeOS Cyber-Range
                </a>
              </li>
              <li>
                <a href="#products" className="text-foreground/80 hover:text-teal transition-colors">
                  AdversaryAI Red-Team
                </a>
              </li>
              <li>
                <a href="#positioning" className="text-foreground/80 hover:text-teal transition-colors">
                  Physics-Aware Invariants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              Governance & Research
            </div>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#why-now" className="text-foreground/80 hover:text-teal transition-colors">
                  Cybersecurity Act 2025
                </a>
              </li>
              <li>
                <a href="#why-now" className="text-foreground/80 hover:text-teal transition-colors">
                  OT Masterplan Validation
                </a>
              </li>
              <li>
                <a href="#sectors" className="text-foreground/80 hover:text-teal transition-colors">
                  CII Sector Guidelines
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/80 hover:text-teal transition-colors">
                  Executive Briefings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © 2026 CyberTwinX Pte. Ltd. All rights reserved. Built with leading cyber-physical security research.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono uppercase tracking-wider text-[10px] bg-surface-2 px-2 py-1 rounded">
              Singapore · Sovereign Ready
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs text-teal hover:underline focus-ring p-1 rounded"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- PRIMITIVE DETAIL MODAL ---------------- */
function PrimitiveModal({ primitiveKey, onClose }: { primitiveKey: string; onClose: () => void }) {
  const details: Record<string, { title: string; subtitle: string; desc: string; specs: string[]; standards: string }> = {
    "twin-gen": {
      title: "Automated Twin Generation Engine",
      subtitle: "Zero-Manual Modeling Ingestion Architecture",
      desc: "TwinForge ingests vendor configuration files (Rockwell, Siemens, Schneider), SCADA diagrams, and IEC 61131-3 PLC program binaries to automatically synthesize a stateful, software-defined twin.",
      specs: [
        "Parses Siemens TIA Portal, Rockwell Studio 5000 & Schneider EcoStruxure project files",
        "Generates virtual PLC instances (vPLC) running stateful firmware emulation",
        "Automated memory mapping for I/O coils, holding registers, and internal flags",
      ],
      standards: "IEC 61131-3 · Modbus TCP · OPC-UA · DNP3",
    },
    "physics-sim": {
      title: "Physics-Aware Process Simulation Engine",
      subtitle: "Stateful Hydrodynamic & Electrical Dynamics",
      desc: "Simulates continuous physical processes (fluid dynamics, chemical dosing, electrical grid frequency, pressure differential) in sync with discrete PLC control loops.",
      specs: [
        "Sub-millisecond synchronization between physics ODE solvers and vPLC scan cycles",
        "Pre-packaged plant models: AquaPure (Water Treatment), AquaGrid (Water Distribution), PowerGrid (Electric Substation)",
        "Real-time noise injection and sensor drift calibration",
      ],
      standards: "MATLAB/Simulink Co-simulation · FMI/FMU 3.0 Standard",
    },
    "adversary-ai": {
      title: "Agentic AI Adversary Engine",
      subtitle: "Autonomous Threat Synthesis & Execution",
      desc: "AdversaryAI generates dynamic, multi-stage attack trees targeting OT networks, probing for protocol vulnerabilities and physical invariant violations.",
      specs: [
        "LLM-guided attack tree planner mapped to MITRE ATT&CK for ICS",
        "Automates adversary TTPs: Command Spoofing, Unauthorized Firmware Upload, Logic Corruption",
        "Outputs cryptographically signed PCAPs and execution trace logs",
      ],
      standards: "MITRE ATT&CK for ICS · ISA/IEC 62443 Security Zones",
    },
    "pad-engine": {
      title: "Physics-Aware Detection (PAD)",
      subtitle: "Patented Physics-Aware Invariant Verification",
      desc: "PAD monitors physical process invariants derived from first-principles physics equations, detecting covert cyber-physical attacks that bypass traditional IT intrusion detection.",
      specs: [
        "Monitors invariant assertions across physical state variables in real time",
        "Zero false-positive detection for unauthorized set-point overrides",
        "Hardware-in-the-loop and software twin native integration",
      ],
      standards: "Physics-Aware Invariant Technology · US Patent Verification",
    },
    "synthetic-data": {
      title: "Synthetic OT Dataset Generator",
      subtitle: "ML Training & Threat Replay Corpora",
      desc: "Generates high-volume, precision-labeled cyber-physical dataset corpora combining normal operating telemetry and attack payloads for training detection AI.",
      specs: [
        "Labeled network PCAP files + PLC I/O telemetry CSV/Parquet streams",
        "Configurable noise levels, drop rates, and packet manipulation vectors",
        "Completely synthetic — zero risk of exfiltrating live plant data",
      ],
      standards: "Parquet · PCAP-NG · OpenTelemetry Format",
    },
    "compliance-sandbox": {
      title: "Compliance & Audit Sandbox",
      subtitle: "Singapore Cybersecurity Act 2025 Audit Layer",
      desc: "Provides a sovereign, isolated sandbox environment for regulatory bodies and CII operators to audit system resilience and certify compliance.",
      specs: [
        "Automated compliance scoring against Singapore Cybersecurity Amendment Act 2025",
        "Exportable PDF/JSON audit reports with signed verification chains",
        "Multi-tenant isolation with strict local data residency",
      ],
      standards: "Cybersecurity (Amendment) Act 2025 · CSA OT Cybersecurity Masterplan",
    },
  };

  const item = details[primitiveKey] || details["twin-gen"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-surface p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-hairline bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground focus-ring"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="font-mono text-[10px] uppercase tracking-wider text-teal font-semibold">
          {item.subtitle}
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>

        <div className="mt-6 border-t border-hairline pt-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold mb-3">
            Core Technical Capabilities
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
            {item.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0 mt-0.5" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-surface-2 border border-hairline flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">Protocols & Standards:</span>
          <span className="text-teal font-semibold">{item.standards}</span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-teal px-5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-teal-glow focus-ring"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PRODUCT SPEC MODAL ---------------- */
function ProductModal({ productKey, onClose }: { productKey: string; onClose: () => void }) {
  const products: Record<string, { title: string; subtitle: string; desc: string; specs: string[]; deployment: string }> = {
    twinforge: {
      title: "TwinForge — Architecture & Specs",
      subtitle: "Automated OT Digital Twin Generation Engine",
      desc: "TwinForge ingests network topology, PLC programs, and process schematics to build an executable, physics-aware digital twin within hours.",
      specs: [
        "In-memory vPLC emulation supporting Modbus, DNP3, OPC-UA & IEC 61850",
        "Deterministic physical process solver with 1ms scan-cycle sync",
        "API & CLI interface for automated CI/CD pipeline integration",
        "Support for 10,000+ simultaneous I/O signal tags per twin session",
      ],
      deployment: "Kubernetes / Bare-Metal Linux / Sovereign Cloud",
    },
    rangeos: {
      title: "RangeOS — Cyber Range Platform Specs",
      subtitle: "Software-Defined Multi-Tenant Cyber Range",
      desc: "RangeOS provides a complete operational platform for organizing red vs. blue team exercises, national security drills, and training.",
      specs: [
        "Curated scenario library with real-world threat blueprints",
        "Real-time scoreboards, telemetry recording, and instant replay",
        "Role-based access control (RBAC) with multi-tenant isolation",
        "Exportable PDF/JSON after-action reports for compliance verification",
      ],
      deployment: "On-Premise Appliance / Private Cloud / GovCloud",
    },
    adversaryai: {
      title: "AdversaryAI — Autonomous Red-Team Engine",
      subtitle: "AI Threat Synthesis & Attack Tree Planner",
      desc: "AdversaryAI uses reinforcement learning and LLMs to simulate complex adaptive threat actors targeting industrial control systems.",
      specs: [
        "Automated attack tree generation for Modbus/DNP3/OPC-UA networks",
        "100% coverage of MITRE ATT&CK for ICS matrix techniques",
        "Cryptographically signed payload execution traces",
        "Zero-impact simulation execution inside TwinForge sandboxes",
      ],
      deployment: "Integrated Engine Module / Standalone API",
    },
  };

  const item = products[productKey] || products["twinforge"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-surface p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-hairline bg-surface-2 flex items-center justify-center text-muted-foreground hover:text-foreground focus-ring"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="font-mono text-[10px] uppercase tracking-wider text-teal font-semibold">
          {item.subtitle}
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>

        <div className="mt-6 border-t border-hairline pt-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold mb-3">
            System Specifications
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
            {item.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0 mt-0.5" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-surface-2 border border-hairline flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">Deployment Target:</span>
          <span className="text-teal font-semibold">{item.deployment}</span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-teal px-5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-teal-glow focus-ring"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}
