"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setResult(data.data);
      } else {
        setError("Could not fetch video. Check the link and try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-pink-500 font-black text-2xl tracking-tight">TokSave</span>
        <a href="#how" className="text-gray-400 hover:text-white text-sm transition">How it works</a>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <div className="inline-block bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
          No watermark · No signup · 100% Free
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
          Download TikTok<br />
          <span className="text-pink-500">Without Watermark</span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 max-w-xl">
          Paste any TikTok link and get a clean MP4 in seconds.
        </p>

        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            placeholder="Paste TikTok link here..."
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 transition text-sm"
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-400 disabled:opacity-50 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm whitespace-nowrap"
          >
            {loading ? "Fetching..." : "Download Free"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-400 text-sm">{error}</div>
        )}

        {result && (
          <div className="mt-8 w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <div className="flex gap-4">
              {result.cover && (
                <img src={result.cover} alt="cover" className="w-24 h-24 rounded-xl object-cover" />
              )}
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">{result.title}</p>
                <p className="text-gray-400 text-xs mb-4">@{result.author}</p>
                <div className="flex flex-col gap-2">
                  {result.videoNoWatermark && (
                    <a
                      href={result.videoNoWatermark}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold px-4 py-2 rounded-xl text-center transition"
                    >
                      ↓ Download MP4 (No Watermark)
                    </a>
                  )}
                  {result.videoHD && (
                    <a
                      href={result.videoHD}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl text-center transition"
                    >
                      ↓ Download HD
                    </a>
                  )}
                  {result.audio && (
                    <a
                      href={result.audio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl text-center transition"
                    >
                      ↓ Download MP3 (Audio Only)
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8 mt-12 text-center">
          <div>
            <div className="text-2xl font-black text-white">10M+</div>
            <div className="text-gray-500 text-xs mt-1">Videos Downloaded</div>
          </div>
          <div className="w-px bg-white/10"></div>
          <div>
            <div className="text-2xl font-black text-white">2sec</div>
            <div className="text-gray-500 text-xs mt-1">Avg Download Time</div>
          </div>
          <div className="w-px bg-white/10"></div>
          <div>
            <div className="text-2xl font-black text-white">100%</div>
            <div className="text-gray-500 text-xs mt-1">No Watermark</div>
          </div>
        </div>
      </section>

      <section id="how" className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Copy TikTok Link", desc: "Open TikTok, tap Share, then Copy Link on any video." },
            { step: "02", title: "Paste the Link", desc: "Paste the link into the box above and hit Download." },
            { step: "03", title: "Save Your Video", desc: "Your clean watermark-free MP4 downloads instantly." },
          ].map((item) => (
            <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-pink-500 font-black text-3xl mb-3">{item.step}</div>
              <div className="font-bold mb-2">{item.title}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 text-xs py-8 border-t border-white/5">
        2025 TokSave · Fast TikTok Downloader · No watermark · Free forever
      </footer>
    </main>
  );
}