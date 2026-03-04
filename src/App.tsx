/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Camera, 
  MessageCircle, 
  Sparkles, 
  Lock,
  Instagram,
  ExternalLink
} from 'lucide-react';

// --- Types ---
type Screen = 'login' | 'wishes' | 'gallery' | 'celebration';

interface Memory {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

// --- Constants ---
// แต่ละคนมีรหัสลับของตัวเอง และเห็นรูปชุดที่ต่างกัน
// เพิ่มพี่แต่ละคนได้ที่นี่ โดยใส่ รหัส -> รูปภาพ
interface UserData {
  name: string;
  memories: Memory[];
}

const USERS: Record<string, UserData> = {
  // === พี่ J - ใส่รหัส "1" ===
  "PEJJ_UWU": {
    name: "PEJJ_UWU",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/J/S__12509189.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/J/S__12509270.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/J/S__12509300.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/J/S__45178975.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/J/S__45178996.jpg" },
    ],
  },
  // === พี่ Pe - ใส่รหัส "2" ===
  "PEEAI_UWU": {
    name: "PEEAI_UWU",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/Pe/S__12509269.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/Pe/S__12509300.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/Pe/S__20094998.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/Pe/S__26796133.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/Pe/S__27893811.jpg" },
    ],
  },
  // === พี่ Po - ใส่รหัส "3" ===
  "PEPOO_T-T": {
    name: "PEPOO_T-T",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/Po/IMG_5529.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/Po/IMG_8655.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/Po/IMG_9980.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/Po/S__12509250.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/Po/S__20094985.jpg" },
      { id: 6, title: "", date: "", imageUrl: "/img/Po/S__45178965.jpg" },
    ],
  },
  // === พี่ fok - ใส่รหัส "4" ===
  "PEFOK_Y-Y": {
    name: "PEFOK_Y-Y",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/fok/IMG_9980.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/fok/IMG_9982.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/fok/S__4513796.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/fok/S__4513799.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/fok/S__45178997.jpg" },
    ],
  },
  // === พี่ mike - ใส่รหัส "5" ===
  "PEMILK_B-B": {
    name: "PEMILK_B-B",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/mike/IMG_8655.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/mike/S__12509298.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/mike/S__26796044.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/mike/S__27893778.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/mike/S__27893811.jpg" },
    ],
  },
  // === พี่ mok - ใส่รหัส "6" ===
  "PEMOOK_O-O": {
    name: "PEMOOK_O-O",
    memories: [
      { id: 1, title: "", date: "", imageUrl: "/img/mok/S__12509287.jpg" },
      { id: 2, title: "", date: "", imageUrl: "/img/mok/S__12509300.jpg" },
      { id: 3, title: "", date: "", imageUrl: "/img/mok/S__27893777.jpg" },
      { id: 4, title: "", date: "", imageUrl: "/img/mok/S__45178885.jpg" },
      { id: 5, title: "", date: "", imageUrl: "/img/mok/S__45178956.jpg" },
    ],
  },
};

// --- Components ---

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="flex justify-center gap-2 mb-8">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div 
        key={i}
        className={`h-1.5 transition-all duration-300 rounded-full ${
          i === currentStep ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'
        }`}
      />
    ))}
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleLogin = () => {
    const user = USERS[code.toUpperCase()];
    if (user) {
      setCurrentUser(user);
      setScreen('wishes');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const screenVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] font-sans text-slate-800 flex flex-col items-center">
      <div className="w-full max-w-2xl min-h-screen bg-white overflow-hidden flex flex-col relative">
        
        {/* Header Navigation */}
        {screen !== 'login' && (
          <div className="p-6 flex items-center justify-between">
            <button 
              onClick={() => {
                if (screen === 'wishes') setScreen('login');
                if (screen === 'gallery') setScreen('wishes');
                if (screen === 'celebration') setScreen('gallery');
              }}
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </button>
            <h2 className="text-lg font-bold text-slate-700 ">{screen}</h2>
            <button 
              onClick={() => setScreen('celebration')}
              className="text-pink-400 font-semibold text-sm"
            >
              Skip
            </button>
          </div>
        )}

        <div className="flex-1 px-4 sm:px-8 pb-8">
          <AnimatePresence mode="wait">
            {screen === 'login' && (
              <motion.div 
                key="login"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center pt-12"
              >
                <div className="relative mb-8">
                  <div className="w-48 h-48 bg-pink-50 rounded-full flex items-center justify-center">
                    <img 
                      src="https://cdn.readawrite.com/articles/11489/11488125/thumbnail/large.gif?2" 
                      alt="Bear" 
                      className="w-32 h-32 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <Sparkles className="absolute top-0 right-0 text-yellow-400 w-6 h-6" />
                  <Heart className="absolute bottom-10 left-0 text-pink-300 w-4 h-4 fill-pink-300" />
                </div>

                <h1 className="text-3xl font-black text-slate-800 mb-4 text-center">รหัสรับอยู่ ในของที่มอบให้ลองมองหาดู</h1>
                <p className="text-slate-500 text-center mb-8 px-4">
                  ใส่รหัสลับเพื่อเริ่มต้นการเดินทางครั้งสุดท้ายในรั้วโรงเรียน
                </p>

                <div className="w-full space-y-6">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="1"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`w-full h-16 bg-pink-50/50 border-2 border-dashed rounded-2xl px-6 text-center text-xl font-bold tracking-widest outline-none transition-all ${
                        error ? 'border-red-400 bg-red-50' : 'border-pink-200 focus:border-pink-400'
                      }`}
                    />
                    <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-pink-200 w-5 h-5" />
                  </div>

                  <button 
                    onClick={handleLogin}
                    className="w-full h-16 bg-[#B5D1F1] hover:bg-[#A4C4EB] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
                  >
                    <Lock className="w-5 h-5" />
                    Unlock Memories
                  </button>
                </div>

                <p className="mt-8 text-slate-400 text-sm">
                  Trouble logging in? <span className="text-pink-400 font-bold underline decoration-wavy">Ask a friend</span>
                </p>
              </motion.div>
            )}

            {screen === 'wishes' && (
              <motion.div 
                key="wishes"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <ProgressBar currentStep={1} totalSteps={4} />
                <h1 className="text-3xl font-black text-slate-800 mb-2">Heartfelt Wishes</h1>
                <p className="text-pink-400 font-bold tracking-widest text-xs uppercase mb-12">A message for you</p>

                <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-xl shadow-pink-50 border border-pink-50 flex flex-col items-center relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-100 mb-8">
                    <img 
                      src="/img/รูป/pngtree-cute-cartoon-characters-png-image_3021844.jpg" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <p className="text-slate-700 text-center italic text-lg leading-relaxed mb-8">
                    "ใจหายเหมือนกันนะที่ถึงเวลาต้องบอกลาพี่ๆ แล้วผมต้อง ขอบคุณพี่ๆ ที่เป็นแรงบันดาลใจและคอยแนะนำผมมาตลอด แต่ขอให้รู้ว่าพี่ๆเก่งที่สุดแล้วงับ ขอให้พี่ๆโชคดีกับรั้วมหาลัย ผมจะคิดถึงพี่เสมอนะงับ UWU"
                  </p>

                  <div className="flex gap-2 text-pink-300">
                    <Sparkles className="w-4 h-4" />
                    <Sparkles className="w-4 h-4" />
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="w-full mt-12 space-y-4">
                  <button 
                    onClick={() => setScreen('gallery')}
                    className="w-full h-16 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-pink-100 transition-all active:scale-95"
                  >
                    Next <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full text-slate-400 font-medium py-2">Skip for now</button>
                </div>
              </motion.div>
            )}

            {screen === 'gallery' && (
              <motion.div 
                key="gallery"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <ProgressBar currentStep={2} totalSteps={4} />
                <h1 className="text-3xl font-black text-slate-800 mb-2">Picture of memories</h1>
                <p className="text-slate-400 text-center text-sm mb-8 px-4">
                  อยากให้พี่ๆนึกถึ่งช่วงเวลาที่ผ่านมาตอนชมภาพนี้งับ UWU
                </p>

                <div className="columns-2 gap-3 w-full">
                  {(currentUser?.memories ?? []).map((memory, index) => (
                    <motion.div 
                      key={memory.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-3 break-inside-avoid rounded-2xl overflow-hidden shadow-md border border-pink-50 relative group"
                    >
                      <img 
                        src={memory.imageUrl} 
                        alt={memory.title} 
                        className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {memory.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <h3 className="font-bold text-white text-sm">{memory.title}</h3>
                          {memory.date && <p className="text-pink-200 text-[10px] font-bold">{memory.date}</p>}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={() => setScreen('celebration')}
                  className="w-full h-16 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-pink-100 mt-8 transition-all active:scale-95"
                >
                  ไปสู่จุดสิ้นสุดกันงับ <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {screen === 'celebration' && (
              <motion.div 
                key="celebration"
                variants={screenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <ProgressBar currentStep={3} totalSteps={4} />
                
                <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <GraduationCap className="w-12 h-12 text-pink-500" />
                </div>

                <h1 className="text-3xl font-black text-slate-800 mb-4 text-center px-4">
                  ยินดีด้วยนะพี่ๆ 
                </h1>
                <p className="text-slate-500 text-center mb-12 px-8">
                  เฟริส์ทต้องขอโทษพี่ๆ ในหลายๆเรื่องที่เฟริส์ททำผิดไป เฟริส์ทขอให้พี่ๆยกโทษให้เฟริส์ทหน่อยนะครับ
                </p>

                <button className="w-full h-16 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-pink-100 mb-12 transition-all active:scale-95">
                  <Sparkles className="w-5 h-5" />
                  ขอบคุณพี่ๆ สำหรับทุกอย่าง
                </button>

                <div className="w-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Keep in touch</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-pink-200 transition-colors group">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">Line</span>
                      <span className="text-[10px] text-slate-400">@thepps</span>
                    </button>
                    <button className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-pink-200 transition-colors group">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100">
                        <Instagram className="w-5 h-5 text-purple-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">Instagram</span>
                      <span className="text-[10px] text-slate-400">@teppanomsukwee</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setScreen('login')}
                  className="mt-12 w-full h-14 border-2 border-slate-100 text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Back to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
        <Heart className="absolute top-1/4 right-1/4 text-pink-100 w-12 h-12 rotate-12" />
        <Sparkles className="absolute bottom-1/4 left-1/4 text-yellow-100 w-8 h-8" />
      </div>
    </div>
  );
}
