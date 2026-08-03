export function Navbar() {
    return (
        <div className="navbar bg-base-300 absolute top-0 right-0 left-0 z-50 rounded-2xl my-5 mx-15 px-10 w-auto">
            <div className="navbar-start">
                <a className="cursor-pointer font-semibold text-2xl">Employee Management System</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-error btn-soft rounded-2xl">Log Out</button>
            </div>
        </div>
    );
}