export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-t from-base-300 to-base-200">
            <div className="w-full max-w-md p-8 rounded-2xl border border-base-content/20 bg-base-100">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" className="input w-full mt-1.5 rounded-2xl" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input type="password" id="password" className="input w-full mt-1.5 rounded-2xl" />
                    </div>
                    <button type="submit" className="w-full btn btn-soft btn-primary rounded-2xl mt-5">Login</button>
                </form>
            </div>
        </div>
    );
}