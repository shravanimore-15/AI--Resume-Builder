import { useState } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href = "/";

    } catch (error) {
      console.error(error.message);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;