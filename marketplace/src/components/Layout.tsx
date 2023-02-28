import Navbar from "./Navbar/";

export default function ({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
