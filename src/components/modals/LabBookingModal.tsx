import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laboratory, LabTest } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { TestTube, Home, Building2, Calendar, Clock, CheckCircle2, X, Download, ShieldCheck } from 'lucide-react';

interface LabBookingModalProps {
  lab: Laboratory | null;
  test?: LabTest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LabBookingModal: React.FC<LabBookingModalProps> = ({ lab, test, isOpen, onClose }) => {
  const { user } = useAuth();

  const [bookingType, setBookingType] = useState<'Home Collection' | 'Center Visit'>('Home Collection');
  const [selectedDate, setSelectedDate] = useState('2026-08-02');
  const [selectedTime, setSelectedTime] = useState('07:30 AM (Fasting)');
  const [patientName, setPatientName] = useState(user?.name || 'Venkatesh K.');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState('Door 4-102, Alipiri Main Road, Tirupati');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !lab) return null;

  const activeTest = test || lab.popularTests[0] || {
    name: 'Full Body Health Package',
    sampleType: 'Blood & Urine',
    price: 1499
  };

  const testPrice = ('discountPrice' in activeTest && typeof activeTest.discountPrice === 'number') 
    ? activeTest.discountPrice 
    : activeTest.price;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#111827] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <img src={lab.image} alt={lab.name} className="w-12 h-12 rounded-2xl object-cover border border-cyan-500/40" />
              <div>
                <h2 className="text-lg font-bold text-white">{lab.name}</h2>
                <p className="text-xs text-cyan-400 font-medium">{activeTest.name} (₹{testPrice})</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-white">Lab Appointment Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Booked for {activeTest.name} on {selectedDate} at {selectedTime}.
              </p>
              <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800 text-left text-xs space-y-1">
                <div className="text-cyan-400 font-bold font-mono">BOOKING TYPE: {bookingType}</div>
                <div className="text-slate-400">Sample Type: {activeTest.sampleType} • Phlebotomist Assigned</div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
              >
                View Booking Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              {/* Collection Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Sample Collection Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingType('Home Collection')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      bookingType === 'Home Collection'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Home className="w-4 h-4 text-cyan-400" />
                    <span>Home Sample Collection</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingType('Center Visit')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      bookingType === 'Center Visit'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Walk-In Center Visit</span>
                  </button>
                </div>
              </div>

              {/* Slot Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Collection Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="07:30 AM (Fasting)">07:30 AM (Fasting)</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Address if Home Collection */}
              {bookingType === 'Home Collection' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Collection Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Contact Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Patient Phone Number</label>
                <input
                  type="text"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B1120] border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Price:</span>
                <span className="text-base font-extrabold text-cyan-400">₹{testPrice}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <TestTube className="w-5 h-5" />
                <span>Confirm Diagnostic Booking</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
