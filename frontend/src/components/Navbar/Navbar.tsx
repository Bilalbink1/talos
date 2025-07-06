import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const DemoNavbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const sidebarLinks = ["Credentials", "Verification"];
    const navigate = useNavigate();

    const handleShowSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const handleSelectLink = (sidebarLink: string) => {
        handleShowSidebar();
        navigate("/" + sidebarLink.toLocaleLowerCase());
    };

    return (
        <>
            <Navbar expand={false} className="bg-body-tertiary mb">
                <Container fluid>
                    <Navbar.Toggle onClick={handleShowSidebar} />
                    <Navbar.Brand>Talos</Navbar.Brand>
                    <Navbar.Text>User</Navbar.Text>
                    <Navbar.Offcanvas
                        show={showSidebar}
                        onHide={handleShowSidebar}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Talos</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div
                                className={
                                    "list-group " +
                                    styles["sidebar-links-group"]
                                }
                            >
                                {sidebarLinks.map((sidebarLink) => (
                                    <button
                                        key={sidebarLink}
                                        type="button"
                                        className={
                                            "btn text-start btn-light " +
                                            styles["sidebar-link-btn"]
                                        }
                                        aria-current="true"
                                        onClick={() =>
                                            handleSelectLink(sidebarLink)
                                        }
                                    >
                                        {sidebarLink}
                                    </button>
                                ))}
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default DemoNavbar;
