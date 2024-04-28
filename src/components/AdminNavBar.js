import React from "react";
import { Link } from "react-scroll";

export default function AdminNavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/logout">
            <svg
              width="20"
              height="20"
              viewBox="0 0 27 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7188 7.5V4.375C17.7188 3.87772 17.4521 3.40081 16.9774 3.04917C16.5027 2.69754 15.8588 2.5 15.1875 2.5H8.4375C7.76617 2.5 7.12234 2.69754 6.64764 3.04917C6.17293 3.40081 5.90625 3.87772 5.90625 4.375V15.625C5.90625 16.1223 6.17293 16.5992 6.64764 16.9508C7.12234 17.3025 7.76617 17.5 8.4375 17.5H15.1875C15.8588 17.5 16.5027 17.3025 16.9774 16.9508C17.4521 16.5992 17.7188 16.1223 17.7188 15.625V12.5M13.5 7.5L10.125 10M10.125 10L13.5 12.5M10.125 10H24.4688"
                stroke="#FCA311"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </Link>
        </li>
        <li>
          <Link to="users" spy={true} smooth={true} offset={-100}>Users</Link>
        </li>
        <li>
          <Link to="messages" spy={true} smooth={true} offset={-30}>Messages</Link>
        </li>
        <li>
          <Link to="blogs" spy={true} smooth={true}>Blogs Panel</Link>
        </li>
        <li>
          <Link to="new-blog" spy={true} smooth={true}>Create blog</Link>
        </li>
        <li>
          <Link to="/">Back Home</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}