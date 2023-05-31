import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#042541]">
      <div className="container py-10 m-auto">
        <nav className="text-white flex justify-center gap-20">
          <div>
            <h3 className="text-2xl mb-5"> The Basics</h3>
            <ul className="flex flex-col gap-1">
              <li className="text-lg">
                <Link to="">About TMDB</Link>
              </li>
              <li className="text-lg">
                <Link to="">Contact us</Link>
              </li>
              <li className="text-lg">
                <Link to="">API</Link>
              </li>
              <li className="text-lg">
                <Link to="">System Status</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl mb-5">Get Involved</h3>
            <ul className="flex flex-col gap-1">
              <li className="text-lg">
                <Link to="">Contributen buble</Link>
              </li>
              <li className="text-lg">
                <Link to="">Add New Movie</Link>
              </li>
              <li className="text-lg">
                <Link to="">Add New Tv Show</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl mb-5">Community</h3>
            <ul className="flex flex-col gap-1">
              <li className="text-lg">
                <Link to="">Guideles</Link>
              </li>
              <li className="text-lg">
                <Link to="">Discussions</Link>
              </li>
              <li className="text-lg">
                <Link to="">Leaderboard</Link>
              </li>
              <li className="text-lg">
                <Link to="">Twitter</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
