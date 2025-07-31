function LandingPage() {
    return (
        <main className="container-fluid  vh-100">
            <section className="text-center py-4 px-3">
                <img src="/Hero.png" className="hero-img mb-4 w-100" alt="Illustration" />
                <h2 className="fw-bold">Say goodbye to roll calls.</h2>
                <p className="text-muted">
                    Mark attendance in seconds. No proxies, no hassle.
                </p>
            </section>

            <section className="text-center px-3">
                <h4 className="fw-bold mb-4">How It Works?</h4>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <span className="step-icon">🧑‍🏫</span> Teacher gets a code
                </div>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <span className="step-icon">🖥️</span> Writes it on the board
                </div>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <span className="step-icon">👨‍🎓</span> Students enter the code
                </div>
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <span className="step-icon">✅</span> Done. Attendance marked.
                </div>
            </section>

            <section class="container mt-5 px-3">
                <h4 class="fw-bold text-center mb-4">Frequently Asked Questions</h4>

                <div class="accordion" id="faqAccordion">

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqOneHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne" aria-expanded="false" aria-controls="faqOne">
                                Is QuickMark free to use?
                            </button>
                        </h2>
                        <div id="faqOne" class="accordion-collapse collapse" aria-labelledby="faqOneHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Yes! QuickMark is completely free.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqTwoHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo" aria-expanded="false" aria-controls="faqTwo">
                                How does this app work?
                            </button>
                        </h2>
                        <div id="faqTwo" class="accordion-collapse collapse" aria-labelledby="faqTwoHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Teachers generate a one-time code (OTP), write it on the board, and students enter the same code from their mobile devices. That’s it — attendance gets recorded automatically.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqThreeHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree" aria-expanded="false" aria-controls="faqThree">
                                Can students share the OTP with others?
                            </button>
                        </h2>
                        <div id="faqThree" class="accordion-collapse collapse" aria-labelledby="faqThreeHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Nope! Even if a student tries to share the code, the system detects whether they were actually present on the page and blocks fake entries. It’s designed in a way that makes proxy nearly impossible.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqFourHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour" aria-expanded="false" aria-controls="faqFour">
                                Does it track student location?
                            </button>
                        </h2>
                        <div id="faqFour" class="accordion-collapse collapse" aria-labelledby="faqFourHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                No. We respect student privacy and don’t track their GPS location. Instead, we use smart logic that doesn’t rely on location but still prevents misuse.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqFiveHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive" aria-expanded="false" aria-controls="faqFive">
                                What if a student opens the page and then tries to cheat by switching apps?
                            </button>
                        </h2>
                        <div id="faqFive" class="accordion-collapse collapse" aria-labelledby="faqFiveHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                The app instantly detects if the student minimizes the tab, switches apps, or tries to leave — and automatically cancels their attendance.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqSixHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqSix" aria-expanded="false" aria-controls="faqSix">
                                Is this app difficult to use for teachers?
                            </button>
                        </h2>
                        <div id="faqSix" class="accordion-collapse collapse" aria-labelledby="faqSixHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Not at all! Teachers just select the subject and get an OTP. Everything else is handled by the system. No manual work, no extra effort.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqSevenHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqSeven" aria-expanded="false" aria-controls="faqSeven">
                                Can I export attendance to Excel?
                            </button>
                        </h2>
                        <div id="faqSeven" class="accordion-collapse collapse" aria-labelledby="faqSevenHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Yes! Attendance records can be downloaded in Excel format — with proper names, dates, subjects, and whether the student was present or not. Just one click.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqEightHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqEight" aria-expanded="false" aria-controls="faqEight">
                                What makes this app different from traditional attendance methods?
                            </button>
                        </h2>
                        <div id="faqEight" class="accordion-collapse collapse" aria-labelledby="faqEightHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                It’s fast, paperless, and nearly impossible to manipulate. No need to call names or manually mark anything. And it works even on mobile browsers — no app installation needed.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqNineHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqNine" aria-expanded="false" aria-controls="faqNine">
                                Will it work in our college on regular internet and devices?
                            </button>
                        </h2>
                        <div id="faqNine" class="accordion-collapse collapse" aria-labelledby="faqNineHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Absolutely! The app is optimized for everyday mobile phones and college Wi-Fi. It doesn’t require any special hardware or paid tools.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqTenHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqTen" aria-expanded="false" aria-controls="faqTen">
                                 Is it safe to use?
                            </button>
                        </h2>
                        <div id="faqTen" class="accordion-collapse collapse" aria-labelledby="faqTenHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                Yes. Your data is stored securely, and attendance is only accepted when students follow the correct steps — all without tracking location or installing extra apps. It’s simple and smart.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item border-0 border-bottom">
                        <h2 class="accordion-header" id="faqElevenHeading">
                            <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faqEleven" aria-expanded="false" aria-controls="faqEleven">
                                Do students need to install any app?
                            </button>
                        </h2>
                        <div id="faqEleven" class="accordion-collapse collapse" aria-labelledby="faqElevenHeading" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-muted">
                                No installation needed. Just open the website in a browser and enter the OTP. That’s it.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LandingPage;