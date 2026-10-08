"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { gsap, ScrollTrigger, useGSAP, READY_EVENT, prefersReducedMotion } from "@/lib/gsap"
import { profile, skillsRowA, skillsRowB } from "@/lib/content"
import { RoleSwitcher } from "./role-switcher"

const ORBIT = [...skillsRowA.slice(0, 6), ...skillsRowB.slice(0, 4)]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const reduced = prefersReducedMotion()
      const q = gsap.utils.selector(sectionRef)

      const intro = contextSafe!(() => {
        if (reduced) return
        gsap
          .timeline()
          .from(q("[data-intro-card]"), { scale: 0.7, opacity: 0, rotateY: -60, duration: 1.6, ease: "expo.out" })
          .from(q("[data-intro-headline]"), { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.1)
          .from(q("[data-hero-ring]"), { opacity: 0, duration: 1.2 }, 0.4)
          .from(q("[data-hero-fade]"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, 0.4)
      })

      if ((window as unknown as { __portfolioReady?: boolean }).__portfolioReady) intro()
      else window.addEventListener(READY_EVENT, intro, { once: true })
      const removeIntroListener = () => window.removeEventListener(READY_EVENT, intro)

      if (reduced) return removeIntroListener

      const mm = gsap.matchMedia()
      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const isDesktop = ctx.conditions?.desktop
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: isDesktop ? "+=220%" : "+=140%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        tl.to(q("[data-hero-spinner]"), { rotateY: 360, duration: 1 }, 0)
          .to(q("[data-hero-ring-inner]"), { rotateY: -540, duration: 1 }, 0)
          .to(q("[data-hero-headline]"), { scale: 1.25, duration: 1 }, 0)
          .to(q("[data-hero-progress]"), { scaleX: 1, duration: 1 }, 0)
          .to(q("[data-hero-bottom]"), { opacity: 0, y: -30, duration: 0.2 }, 0.78)
          .to(q("[data-hero-stage]"), { scale: 0.85, opacity: 0.2, duration: 0.2 }, 0.8)
      })

      return () => {
        removeIntroListener()
        mm.revert()
      }
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return
    const rig = rigRef.current
    if (!rig) return
    const rx = gsap.quickTo(rig, "rotateX", { duration: 0.8, ease: "power3.out" })
    const ry = gsap.quickTo(rig, "rotateY", { duration: 0.8, ease: "power3.out" })
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      ry(x * 18)
      rx(-y * 12)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => window.removeEventListener("load", refresh)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-aurora grain"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_45%,rgba(167,139,250,0.22),transparent_70%)]"
      />

      <div
        data-hero-headline
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none px-4 text-center"
      >
        <h1 id="hero-title" className="sr-only">
          {profile.fullName} — {profile.role}
        </h1>
        <div data-intro-headline>
          <RoleSwitcher />
        </div>
      </div>

      <div data-hero-stage className="absolute inset-0 z-10 flex items-center justify-center [perspective:1400px]">
        <div ref={rigRef} className="preserve-3d relative">
          <div data-hero-ring className="preserve-3d pointer-events-none absolute left-1/2 top-1/2 [--orbit-r:200px] md:[--orbit-r:320px]" aria-hidden="true">
            <div
              className="preserve-3d"
              style={{ transform: "rotateX(-12deg)" }}
            >
              <div data-hero-ring-inner className="preserve-3d">
                {ORBIT.map((skill, i) => (
                  <span
                    key={skill}
                    className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/80 backdrop-blur-sm md:text-xs"
                    style={{
                      transform: `rotateY(${(360 / ORBIT.length) * i}deg) translateZ(var(--orbit-r))`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div data-intro-card className="preserve-3d">
          <div
            data-hero-spinner
            className="preserve-3d relative aspect-[3/4] w-[min(64vw,340px)] md:w-[360px]"
          >
            <div className="backface-hidden absolute inset-0 overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_120px_-20px_rgba(124,58,237,0.55)]">
              <Image
                src={profile.photo || "/placeholder.svg"}
                alt={`Portrait of ${profile.fullName}`}
                fill
                priority
                sizes="(min-width: 768px) 360px, 64vw"
                className="object-cover object-[50%_25%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,6,11,0.85))]" />
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_50%,rgba(7,6,11,0.5))]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                <span>{profile.fullName}</span>
                <span className="flex items-center gap-1.5">
                  <span className="pulse-dot size-1.5 rounded-full bg-status" />
                  Online
                </span>
              </div>
            </div>

            <div
              className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/15 bg-[#0e0b17] p-6"
              style={{ transform: "rotateY(180deg)" }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,rgba(167,139,250,0.35),transparent_70%)]" />
              <div className="relative flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>ID · 2026</span>
                <span>v1.0</span>
              </div>
              <div className="relative text-center">
                <p className="text-8xl font-bold tracking-tighter text-foreground md:text-9xl">{profile.initials}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {"// build · ship · repeat"}
                </p>
              </div>
              <div className="relative space-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <p>Flutter · Node · XR</p>
                <p>{profile.region}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div data-hero-bottom className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
        <div className="max-w-sm">
          <p data-hero-fade className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            {"// Hi, I'm "}
            {profile.firstName}
          </p>
          <p data-hero-fade className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {profile.tagline}
          </p>
          <div data-hero-fade className="mt-5 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              View Work <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div data-hero-fade className="hidden w-56 md:block">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <ArrowDown className="size-3" aria-hidden="true" /> Scroll to scrub timeline
          </p>
          <div className="mt-3 h-px w-full bg-white/10">
            <div data-hero-progress className="h-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
