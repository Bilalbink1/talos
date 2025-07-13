import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./SidebarLayout.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FileEarmarkLock2, Fingerprint } from "react-bootstrap-icons";

export const SidebarLayout = () => {
    const sidebarLinks = [
        {
            label: "Cedentials",
            path: "/credentials",
            logo: <FileEarmarkLock2 size="24" />,
        },
        {
            label: "Verification",
            path: "/verification",
            logo: <Fingerprint size="24" />,
        },
    ];

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const selectLink = (sidebarLink: string) => {
        navigate(sidebarLink);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <h2 className={styles.logo}>Talos</h2>
                <div className={"list-group " + styles["sidebar-links-group"]}>
                    {sidebarLinks.map((sidebarLink) => (
                        <button
                            key={sidebarLink.label}
                            type="button"
                            className={
                                "btn text-start " +
                                styles["sidebar-link-btn"] +
                                (pathname.includes(sidebarLink.path)
                                    ? " btn-primary"
                                    : " ")
                            }
                            aria-current="true"
                            onClick={() => selectLink(sidebarLink.path)}
                        >
                            <span className={styles["sidebar-link-btn-label"]}>
                                {sidebarLink.logo}
                                {sidebarLink.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
