import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Required field validation
    if (!username || !lastname || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            lastname,
            email,
            password,
            profilePicture: profile,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup successful:", data);

      alert("Signup successful! Please login.");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white border rounded-lg shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

        {/* First Name */}
        <input
          type="text"
          placeholder="First Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="given-name"
          className="w-full border p-3 mb-4 rounded"
        />

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          autoComplete="family-name"
          className="w-full border p-3 mb-4 rounded"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full border p-3 mb-4 rounded"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="w-full border p-3 mb-4 rounded"
        />

        {/* Profile Picture */}
        <input
          type="text"
          placeholder="Profile Picture URL (optional)"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="w-full border p-3 mb-4 rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
