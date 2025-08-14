
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Sparkles, Play, TrendingUp, Users, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime" },
    { icon: Zap, value: "< 100ms", label: "Response Time" },
  ]

  return (
    <section className="relative py-20 px-4 overflow-hidden" aria-labelledby="hero-heading">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-[#4285F4]/5 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-[#4285F4]/3 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            bottom: "10%",
            right: "10%",
          }}
        />
      </div>

      <div className="container mx-auto text-center max-w-6xl relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Badge className="mb-6 bg-white/80 backdrop-blur-sm text-[#4285F4] border-[#4285F4]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" aria-hidden="true" />
            Real-time Data Enrichment API
          </Badge>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold text-[#1E293B] mb-6 leading-tight">
            Enrich Your Data with
            <span className="relative inline-block">
              <span className="text-[#4285F4] block relative z-10">Real-time Intelligence</span>
              <div className="absolute inset-0 bg-[#4285F4]/10 blur-xl rounded-lg transform scale-110" />
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-xl md:text-2xl text-[#64748B] mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Power your AI agents, GTM stack, and applications with comprehensive B2B data. Get employee lists, company
            data, emails, and phone numbers through simple APIs.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="group bg-[#4285F4] hover:bg-[#4285F4]/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Start your free trial with 1000 API calls"
            >
              Start Free Trial
              <ArrowRight
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Watch product demo"
            >
              <Play
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              />
              Watch Demo
            </Button>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-8 text-sm text-[#64748B] mb-16 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>Free 1000 API calls</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-[#4285F4]/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#4285F4]" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#1E293B] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#64748B]">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
