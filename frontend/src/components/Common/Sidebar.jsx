import { NavLink } from "react-router-dom";

export default function Sidebar({ links = [] }) {
    return (
        <aside
            className="d-flex flex-column p-3 shadow-sm"
            style={{
                width: "260px",
                minHeight: "100vh",
                backgroundColor: "#9ea3ac"
            }}
        >
            <h5 className="text-white fw-bold mb-4">
                Navigation
            </h5>

            <div className="nav flex-column">

                {links.map((link) => (

                    <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                  `nav-link mb-2 rounded px-3 py-2 ${
                      isActive ? "text-white" : "text-light"
                  }`
              }
              style={({ isActive }) => ({
                  backgroundColor: isActive ? "#808785" : "transparent",
                  transition: "all 0.2s ease"
              })}
          >
        {link.label}
    </NavLink>

                ))}

            </div>

        </aside>
    );
}