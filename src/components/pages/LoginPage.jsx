import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ create navigate instance

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Dummy auth: any email + password accepted
    if (email.trim() && password.trim()) {
      onLogin();
      navigate("/"); // ✅ redirect to dashboard
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A0E2F8] via-[#B9D4E9] to-white flex items-center justify-center p-4">
      {/* Background wave illustration */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-64 text-[#67B5DC] opacity-20"
          viewBox="0 0 1200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,100 C300,150 600,50 1200,100 L1200,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-full h-48 text-[#A0E2F8] opacity-30"
          viewBox="0 0 1200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,150 C400,100 800,180 1200,120 L1200,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1D7BC1] to-[#67B5DC] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">OG</span>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl text-[#103173]">
              Ocean Guard
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Real-Time Coastal Hazard Intelligence
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full bg-[#1D7BC1] hover:bg-[#103173] text-white"
              >
                Login
              </Button>
              <Button variant="link" className="w-full text-[#1D7BC1]">
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
