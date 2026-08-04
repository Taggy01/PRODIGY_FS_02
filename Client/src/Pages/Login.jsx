export default function Login() {
    return (
        <div className="flex justify-center items-center">
            <div className="flex-1 md:flex flex-col justify-center min-h-screen bg-base-300 w-1/2 p-8 hidden">
                <h1 className="text-2xl font-bold text-left">Welcome to</h1>
                <h1 className="text-4xl font-bold text-primary text-left">Employee Management System</h1>
                <p className="text-lg text-base-content/70 text-left">A simple and efficient solution for managing your employees.</p>

            </div>
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-linear-to-t from-base-300 to-base-200">
            <div className="w-full max-w-md p-10 rounded-2xl border border-base-content/20 bg-base-100">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" className="input w-full mt-1.5 focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input type="password" id="password" className="input w-full mt-1.5 focus:outline-none" />
                    </div>
                    <button type="submit" className="w-full btn btn-soft btn-primary rounded-2xl mt-5">Login</button>
                </form>
            </div>
        </div>
        </div>
    );
}