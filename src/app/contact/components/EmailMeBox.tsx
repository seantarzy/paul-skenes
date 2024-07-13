"use client";

import { FormEvent, useState } from "react";

export default function EmailMeBox() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ subject, message, fromEmail })
    });
    setIsSubmitting(false);
    if (res.ok) {
      setIsSuccess(true);
      alert("Email sent!");
    } else {
      alert("Email failed to send");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md md:w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">
        Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-slate-100">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-slate-100 rounded-md focus:ring-teal-400 focus:border-teal-400"
            required
          />
        </label>
        <label className="block">
          <span className="text-slate-100">Message:</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-slate-100 rounded-md focus:ring-teal-400 focus:border-teal-400"
            rows={5}
            required
          />
        </label>
        <label className="block">
          <span className="text-slate-100">Your Email:</span>
          <input
            type="email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-slate-100 rounded-md focus:ring-teal-400 focus:border-teal-400"
            required
          />
        </label>
        <button
          type="submit"
          className={`mt-4 w-full px-4 py-2 font-semibold text-center text-gray-900 bg-teal-400 rounded-md shadow-sm ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-500"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {isSuccess && (
          <p className="mt-2 text-center text-green-500">
            Email sent successfully!
          </p>
        )}
      </form>
    </div>
  );
}
