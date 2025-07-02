'use client'
import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";
export default function LandingPage() {
    return (
        <main className="flex flex-cols items-center py-10 px-40 gap-24
        animate-fade-in max-md:flex-col">
            <section className="flex flex-col items-center">
                {/* input logo*/}
                <Image
                    src="/assets/logo.svg"
                    alt="Calendly Logo"
                    width={300}
                    height={300}
                />
            <h1 className="text-2xl font-black lg:text-3xl">
                Your time, perfectly planned.
            </h1>
            <p className="font-extralight">
                Join millions of proffesionals who easily book meetings
                with the #1 scheduling tool.
            </p>
            <Image
                src="/assets/planning.svg"
                alt="Calendly planning"
                width={500}
                height={500}
                />
            </section>
            <div className="mt-3">
                <SignIn
                    routing="hash"// keep the sign in form on the same page
                    appearance={{
                        baseTheme: neobrutalism,
                    }}
                    />
            </div>

        </main>
    )
}