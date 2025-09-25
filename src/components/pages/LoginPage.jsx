import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// --- UI Components (Placeholders) -------------------------------------------
// In a larger app, these would be in their own files (e.g., under a 'components/ui' directory)
const Card = ({ className, children }) => (
  <div
    className={`border bg-white text-card-foreground shadow-sm rounded-xl ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ className, children }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);
const CardDescription = ({ className, children }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);
const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ children, className, variant, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses =
    variant === "link"
      ? "text-primary underline-offset-4 hover:underline"
      : "bg-primary text-primary-foreground hover:bg-primary/90";
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

const Label = ({ className, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
);

// --- Login Page Component ---------------------------------------------------
export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);

      onLogin();
      navigate("/");
    } catch (err) {
      console.error("Firebase Login Error:", err.code, err.message);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A0E2F8] via-[#B9D4E9] to-white flex items-center justify-center p-4">
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
            {error && (
              <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">
                {error}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full bg-[#1D7BC1] hover:bg-[#103173] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                variant="link"
                className="w-full text-[#1D7BC1]"
                type="button"
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
