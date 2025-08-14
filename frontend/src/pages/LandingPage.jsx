function LandingPage() {
    return (
        <main className="container-fluid py-5" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)" }}>

            {/* Hero Section */}
            <section className="text-center px-3 mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <h1
                    className="fw-bold mb-3 position-relative fade-in-up"
                    style={{ fontSize: "2.2rem", lineHeight: "1.2", display: "inline-block" }}
                >
                    <span style={{ color: "#007bff" }}>More time for teaching</span>, less time for attendance.
                    <span
                        style={{
                            position: "absolute",
                            left: 0,
                            bottom: "-6px",
                            width: "0%",
                            height: "4px",
                            background: "linear-gradient(90deg, #007bff, #00b4d8)",
                            borderRadius: "2px",
                            animation: "underlineGrow 1.5s ease forwards 0.3s"
                        }}
                    ></span>
                </h1>
                <p
                    className="text-muted mb-4 fade-in-up"
                    style={{ fontSize: "1.1rem", animationDelay: "0.5s" }}
                >
                    QuickMark handles attendance in seconds — so you can focus on what really matters, your lesson.
                </p>
                <div
                    className="d-flex justify-content-center gap-3 flex-wrap fade-in-up"
                    style={{ animationDelay: "0.7s" }}
                >
                </div>
            </section>

            {/* How it Works */}
            <section className="text-center px-3 mb-5">
                <h4 className="fw-bold mb-4">How It Works</h4>
                <div className="d-flex flex-column gap-3 align-items-center">
                    {[
                        { icon: "🧑‍🏫", text: "Teacher gets a code" },
                        { icon: "🖥️", text: "Writes it on the board" },
                        { icon: "👨‍🎓", text: "Students enter the code" },
                        { icon: "✅", text: "Attendance marked" }
                    ].map((step, idx) => (
                        <div
                            key={idx}
                            className="d-flex align-items-center gap-3 bg-light p-3 rounded shadow-sm fade-in-up"
                            style={{ maxWidth: "340px", width: "100%", animationDelay: `${0.9 + idx * 0.1}s` }}
                        >
                            <span style={{ fontSize: "1.6rem" }}>{step.icon}</span>
                            <span className="fw-semibold">{step.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container px-3 mb-5">
                <h4 className="fw-bold text-center mb-4">Frequently Asked Questions</h4>

                <div className="accordion" id="faqAccordion">
                    {faqData.map((faq, index) => (
                        <div key={index} className="accordion-item border-0 border-bottom">
                            <h2 className="accordion-header" id={`faqHeading${index}`}>
                                <button
                                    className="accordion-button collapsed bg-white fw-semibold"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#faq${index}`}
                                    aria-expanded="false"
                                    aria-controls={`faq${index}`}
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div
                                id={`faq${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`faqHeading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body text-muted">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Animations */}
            <style>
                {`
                @keyframes underlineGrow {
                    to { width: 100%; }
                }

                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .fade-in-up {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease forwards;
                }
                `}
            </style>
        </main>
    );
}

const faqData = [
    { question: "Is QuickMark free to use?", answer: "Yes! QuickMark is completely free." },
    { question: "How does this app work?", answer: "Teachers generate a one-time code (OTP), write it on the board, and students enter the same code from their mobile devices. That’s it — attendance gets recorded automatically." },
    { question: "Can students share the OTP with others?", answer: "Nope! Even if a student tries to share the code, the system detects whether they were actually present on the page and blocks fake entries." },
    { question: "Does it track student location?", answer: "No. We respect student privacy and don’t track their GPS location. We use smart logic that prevents misuse without location tracking." },
    { question: "What if a student switches apps to cheat?", answer: "The app instantly detects if the student minimizes the tab or switches apps — and cancels their attendance." },
    { question: "Is this app difficult to use for teachers?", answer: "Not at all! Teachers just select the subject and get an OTP. Everything else is automated." },
    { question: "Can I export attendance to Excel?", answer: "Yes! You can download attendance records with names, dates, and statuses in one click." },
    { question: "What makes this different from traditional methods?", answer: "It’s fast, paperless, and nearly impossible to manipulate. Works even on mobile browsers — no app needed." },
    { question: "Will it work in our college?", answer: "Absolutely! It works with regular devices and internet connections." },
    { question: "Is it safe to use?", answer: "Yes. Your data is stored securely and we don’t track location." },
    { question: "Do students need to install any app?", answer: "No. Just open the website in a browser and enter the OTP." }
];

export default LandingPage;
