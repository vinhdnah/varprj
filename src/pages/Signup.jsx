import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pwd);
      if (name) await updateProfile(user, { displayName: name });
      nav("/");
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={onSignup} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
        {err && <p className="text-sm text-red-600 mb-2">{err}</p>}
        <input className="w-full border rounded-xl p-3 mb-3" placeholder="Tên hiển thị"
               value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded-xl p-3 mb-3" type="email" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-xl p-3 mb-4" type="password" placeholder="Mật khẩu"
               value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button className="w-full rounded-xl p-3 bg-emerald-600 text-white font-medium">Tạo tài khoản</button>
        <p className="text-sm mt-3">Đã có tài khoản?
          <Link className="text-sky-600 ml-1" to="/login">Đăng nhập</Link></p>
      </form>
    </div>
  );
}
