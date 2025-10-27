import "../App.css";

function LandingPage() {
    return (
        <main className="container-fluid py-5 mt-5" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)" }}>

            {/* Hero Section */}
            <section className="hero-section text-center px-3 mb-5 mt-5 mx-auto" style={{ maxWidth: "700px" }}>
                <h1 className="hero-heading fw-bold mb-3 position-relative fade-in-up d-inline-block">
                    <span className="text-primary">More time for teaching</span>, less time for attendance.
                    <span className="underline"></span>
                </h1>

                <p className="hero-subtext text-muted mb-4 fade-in-up">
                    QuickMark handles attendance in seconds, so you can focus on what really matters, your lesson!
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap fade-in-up">
                    {/* You can place buttons or CTAs here */}
                </div>
            </section>


            {/* How it Works */}
            <section className="how-it-works container text-center py-5">
                <h2 className="fw-bold mb-5">How It Works</h2>

                <div className="steps-wrapper d-flex flex-lg-row flex-column align-items-center justify-content-center position-relative">

                    {[
                        { title: "Generate Code", desc: "Teacher creates a unique code." },
                        { title: "Display Code", desc: "Shown to students in class." },
                        { title: "Join with Code", desc: "Students enter the code." },
                        { title: "Mark Attendance", desc: "System records automatically." }
                    ].map((step, idx) => (
                        <div
                            key={idx}
                            className="step-box text-start text-lg-center bg-white shadow-sm p-4 rounded-4 position-relative mb-4 mb-lg-0 mx-2"
                        >
                            <h5 className="fw-semibold mb-2">{step.title}</h5>
                            <p className="text-muted small mb-0">{step.desc}</p>

                            {/* Connector line */}
                            {idx < 3 && (
                                <div className="connector d-none d-lg-block position-absolute top-50 translate-middle-y"></div>
                            )}
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
