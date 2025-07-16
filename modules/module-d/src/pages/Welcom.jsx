import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="max-w-[500px] mx-auto flex-center flex-col h-[100dvh] border-x">
      <h1 className="text-7xl font-bold mb-8 ">Welcome</h1>
      <Link to="service/carparks" role="button" className="get-started-btn">
        Get Started
      </Link>
    </div>
  );
}
