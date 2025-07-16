import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const NavBar = () => {
    return (
        <nav>
            <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <Link to="/" className="text-lg font-bold">
                    My Product App
                </Link>

                <div className="flex items-center gap-2">
                    <Button variant="link" asChild className="text-white">
                        <Link to="/createproduct">Create Product</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
