import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileServices";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        email: data.user.email || "",
        profilePicture: data.user.profilePicture || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const data = await updateProfile(profile);

      setProfile({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        profilePicture: data.user.profilePicture || "",
      });

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm">

    
          <div className="mb-8 flex items-center gap-5">

            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold text-gray-600">
                {profile.firstName?.charAt(0)}
                {profile.lastName?.charAt(0)}
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>

              <p className="text-gray-500">
                {profile.email}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            {editing && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Picture URL
                </label>

                <input
                  type="text"
                  name="profilePicture"
                  value={profile.profilePicture}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            )}

          </div>
          <div className="mt-8 flex justify-end gap-3">

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;