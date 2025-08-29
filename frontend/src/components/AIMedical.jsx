import React, { useState } from 'react';
import { Brain, Stethoscope, User, Bot, Send, Loader } from 'lucide-react';

export default function AIMedicalQA() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patientAnswer, setPatientAnswer] = useState('');
  const [doctorAnswer, setDoctorAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('patient');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setPatientAnswer('');
    setDoctorAnswer('');

    try {
      const response = await fetch('http://127.0.0.1:5000/get_answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setPatientAnswer(data.patientAnswer || '');
      setDoctorAnswer(data.doctorAnswer || '');
    } catch (err) {
      console.error(err);
      setError('Failed to get answers from server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navbar */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MedAI Assistant</h1>
              <p className="text-xs text-cyan-300">Intelligent Medical Q&A</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Medical Assistant
          </h1>
          <p className="text-gray-300 text-lg">Get instant medical insights powered by advanced AI</p>
        </div>

        {/* Question Form */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 mb-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask your medical question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className={`w-full p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading || !question.trim()
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/25"
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>AI Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Ask AI Assistant</span>
                </>
              )}
            </button>
          </form>
        </div>

        {error && <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 mb-6"><p className="text-red-300">{error}</p></div>}

        {loading && (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 mb-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-8 h-8 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-cyan-300">AI is analyzing your question...</p>
          </div>
        )}

        {(patientAnswer || doctorAnswer) && !loading && (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
            <div className="flex gap-4 mb-6">
              <button type="button" onClick={() => setActiveTab("patient")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "patient"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50"
                }`}>
                <User className="w-4 h-4" /><span>Patient View</span>
              </button>
              <button type="button" onClick={() => setActiveTab("doctor")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "doctor"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50"
                }`}>
                <Bot className="w-4 h-4" /><span>Clinical View</span>
              </button>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30">
              {activeTab === "patient" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Patient-Friendly Answer</h3>
                  </div>
                  <div className="pl-11">
                    <p className="text-gray-200 leading-relaxed">{patientAnswer}</p>
                  </div>
                </div>
              )}
              {activeTab === "doctor" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-400">Clinical Analysis</h3>
                  </div>
                  <div className="pl-11">
                    <p className="text-gray-200 leading-relaxed">{doctorAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>⚠️ This AI assistant provides educational information only. Always consult healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  );
}
