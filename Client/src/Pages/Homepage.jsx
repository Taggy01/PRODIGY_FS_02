import { Greetings } from "../Components/Greetings";
import { Navbar } from "../Components/Navbar";
import { MainPage } from "../Components/MainPage";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export function Homepage() {
    const [start, setStart] = useState(false);
    const employees = [
        { id: 1, name: "John Doe", position: "Software Engineer", department: "Engineering" },
        { id: 2, name: "Jane Smith", position: "Product Manager", department: "Product" },
        { id: 3, name: "Alice Johnson", position: "UX Designer", department: "Design" },
    ];

    return (
        <>
            <AnimatePresence mode="wait">
                {!start ? (

                    <Greetings
                        key="greetings"
                        onStart={() => setStart(true)}
                    />
                ) : (
                    <div>
                        <Navbar />
                        <MainPage key="main" employees={employees} onEdit={() => {}} onDelete={() => {}} />
                    </div>
                )}
            </AnimatePresence>
        </>

    );
}