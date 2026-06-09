"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewStudent() {
  const router = useRouter();
  const supabase = createClient();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    class_id: "",
    bio: "",
  });

  useEffect(() => {
    async function fetchClasses() {
      const { data } = await supabase.from("classes").select("*").order("name");
      setClasses(data || []);
    }
    fetchClasses();
  }, []);

  function handleNameChange(e) {
    const name = e.target.value;
    setForm((prev) => ({ ...prev, name, slug: slugify(name) }));
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    if (!form.name || !form.class_id) {
      setError("Name and class are required.");
      setLoading(false);
      return;
    }

    let photo_url = null;

    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${form.slug}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("student-photos")
        .upload(fileName, photoFile);

      if (uploadError) {
        setError("Photo upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("student-photos")
        .getPublicUrl(fileName);

      photo_url = urlData.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from("students")
      .insert({
        name: form.name,
        slug: form.slug,
        class_id: form.class_id,
        bio: form.bio,
        photo_url,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push(`/admin/students/${data.id}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center gap-4 px-8 py-5 bg-white/60 backdrop-blur-md border-b border-slate-200">
        <button
          onClick={() => router.push("/admin")}
          className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Add New Student</h1>
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 mt-0.5">
            Create a student profile
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
          
          {/* Photo upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white/50 border-2 border-cyan-200 shadow-inner">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-slate-300 font-light">+</span>
              )}
            </div>
            <label className="cursor-pointer text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 text-cyan-600 border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 bg-white/50">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">
                Full Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3.5 rounded-xl text-slate-900 bg-white/60 border border-slate-200 outline-none transition-all duration-300 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 placeholder:text-slate-400"
                placeholder="Arjun Krishna"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">
                Profile URL
              </label>
              <div className="flex items-center gap-1 px-4 py-3.5 rounded-xl bg-slate-100/50 border border-slate-200">
                <span className="text-slate-400 text-sm">/students/</span>
                <span className="text-slate-900 font-medium text-sm">
                  {form.slug || <span className="text-slate-400 italic font-normal">auto-generated</span>}
                </span>
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">
                Class *
              </label>
              <select
                name="class_id"
                value={form.class_id}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/60 border border-slate-200 outline-none transition-all duration-300 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none ${
                  form.class_id ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <option value="" disabled className="text-slate-400">
                  Select a class
                </option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id} className="text-slate-900 bg-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl text-slate-900 bg-white/60 border border-slate-200 outline-none resize-none transition-all duration-300 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 placeholder:text-slate-400"
                placeholder="A short description about the student..."
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-60 flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/20 mt-4"
            style={{ background: "#0891b2" /* tailwind cyan-600 */ }}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Creating...
              </>
            ) : "Create Student Profile"}
          </button>

        </div>
      </div>
    </div>
  );
}