import { Greetings } from "../Components/Greetings";
import { Navbar } from "../Components/Navbar";
import { MainPage } from "../Components/MainPage";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export function Homepage() {
    const [start, setStart] = useState(false);

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
                        <MainPage key="main" employees={[]} onEdit={() => {}} onDelete={() => {}} />
                    </div>
                )}
            </AnimatePresence>
        </>

    );
}