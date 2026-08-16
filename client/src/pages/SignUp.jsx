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
    if (!username || !lastname || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/auth/signup",
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup failed"
        );
      }

      alert("Signup successful");

      
      navigate("/login");

    } catch (error) {
      console.error(error);

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
          Create Account
        </h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="First Name"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) =>
            setLastname(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Profile Picture URL (optional)"
          value={profile}
          onChange={(e) =>
            setProfile(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

      </form>

    </div>
  );
}

export default SignUp;