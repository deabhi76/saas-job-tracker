export default function Footer() {

    return (

        <footer
            className="border-top py-4 mt-5"
            style={{
                background: "#ffffff"
            }}
        >

            <div className="container text-center">

                <p className="text-muted mb-1">

                    © 2026 SaaS Job Tracker

                </p>

                <small className="text-muted">

                    Built with React, Node.js, Express,
                    PostgreSQL and Redis.

                </small>

            </div>

        </footer>

    );

}