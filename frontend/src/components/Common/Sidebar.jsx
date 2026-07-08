import { Link } from "react-router-dom";

export default function Sidebar({
  links = []
}) {

  return (

    <div
      className="border-end bg-light"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >

      <ul className="list-group list-group-flush">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className="list-group-item text-decoration-none"
          >
            {link.label}
          </Link>

        ))}

      </ul>

    </div>
  );
}