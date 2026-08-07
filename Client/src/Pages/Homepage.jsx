import { Greetings } from "../Components/Greetings";
import { Navbar } from "../Components/Navbar";
import { MainPage } from "../Components/MainPage";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export function Homepage({ employees, fetchEmployees }) {
    const [start, setStart] = useState(() => {
        return sessionStorage.getItem("hasVisited") === "true";
    });

    const handleStart = () => {
        setStart(true);
        sessionStorage.setItem("hasVisited", "true");
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {!start ? (

                    <Greetings
                        key="greetings"
                        onStart={handleStart}
                    />
                ) : (
                    <div>
                        <Navbar />
                        <MainPage key="main" employees={employees} fetchEmployees={fetchEmployees}/>
                    </div>
                )}
            </AnimatePresence>
        </>

    );
}