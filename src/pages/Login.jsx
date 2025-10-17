import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState(""); 
  const [pwd, setPwd] = useState(""); 
  const [err, setErr] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, pwd); nav("/"); }
    catch (e) { setErr(e.message); }
  };

  const onGoogle = async () => {
    try { await signInWithPopup(auth, googleProvider); nav("/"); }
    catch (e) { setErr(e.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={onLogin} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
        {err && <p className="text-sm text-red-600 mb-2">{err}</p>}
        <input className="w-full border rounded-xl p-3 mb-3" type="email" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-xl p-3 mb-4" type="password" placeholder="Mật khẩu"
               value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button className="w-full rounded-xl p-3 bg-sky-600 text-white font-medium">Đăng nhập</button>
        <button type="button" onClick={onGoogle}
          className="w-full rounded-xl p-3 mt-3 border">Đăng nhập với Google</button>
        <p className="text-sm mt-3">Chưa có tài khoản?
          <Link className="text-sky-600 ml-1" to="/signup">Đăng ký</Link></p>
      </form>
    </div>
  );
}
