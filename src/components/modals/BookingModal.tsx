import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Doctor } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Video, Building2, Ticket, CheckCircle2, X, CreditCard, ShieldCheck, QrCode } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const { bookAppointment } = useHealthcare();
  const { user } = useAuth();

  const [consultationType, setConsultationType] = useState<'In-Person OPD' | 'Online Video'>('In-Person OPD');
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [patientName, setPatientName] = useState(user?.name || 'Venkatesh K.');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+91 98765 43210');
  const [paymentMode, setPaymentMode] = useState<'Pay at Clinic' | 'UPI Instant Pay'>('Pay at Clinic');
  const [confirmedToken, setConfirmedToken] = useState<string | null>(null);

  if (!isOpen || !doctor) return null;

  const fee = consultationType === 'Online Video' ? (doctor.onlineFee || doctor.consultationFee) : doctor.consultationFee;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await bookAppointment({
      patientName,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospitalName: doctor.hospitalName,
      date: selectedDate,
      time: selectedSlot,
      type: consultationType,
      status: 'Confirmed',
      consultationFee: fee
    });
    setConfirmedToken(res.tokenNumber);
  };

  const handleClose = () => {
    setConfirmedToken(null);
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
              <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-2xl object-cover border border-cyan-500/40" />
              <div>
                <h2 className="text-lg font-bold text-white">{doctor.name}</h2>
                <p className="text-xs text-cyan-400 font-medium">{doctor.specialty} • {doctor.hospitalName}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedToken ? (
            <div className="text-center py-6 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <Ticket className="w-10 h-10" />
              </motion.div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                Token #{confirmedToken} Issued
              </span>
              <h3 className="text-xl font-extrabold text-white">Appointment Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Your consultation with {doctor.name} is booked for {selectedDate} at {selectedSlot}.
              </p>

              {/* QR Code Token Card */}
              <div className="p-4 rounded-2xl bg-[#0B1120] border border-cyan-500/30 flex items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">OPD Digital Token</div>
                  <div className="text-2xl font-black text-cyan-400 font-mono">{confirmedToken}</div>
                  <div className="text-xs text-slate-300 font-medium">{consultationType}</div>
                  <div className="text-[10px] text-slate-400">{doctor.location}</div>
                </div>
                <div className="p-2 bg-white rounded-xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=MEDITRUST-${confirmedToken}`} 
                    alt="Token QR Code" 
                    className="w-20 h-20"
                  />
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
              >
                Go to My Patient Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              {/* Type Switch */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('In-Person OPD')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      consultationType === 'In-Person OPD'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-sm'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>In-Person OPD (₹{doctor.consultationFee})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('Online Video')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      consultationType === 'Online Video'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-sm'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4 text-blue-400" />
                    <span>Video Call (₹{doctor.onlineFee || doctor.consultationFee})</span>
                  </button>
                </div>
              </div>

              {/* Slot Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Available Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="10:30 AM">10:30 AM (Available)</option>
                    <option value="11:15 AM">11:15 AM (Available)</option>
                    <option value="02:30 PM">02:30 PM (Available)</option>
                    <option value="04:45 PM">04:45 PM (Available)</option>
                    <option value="06:15 PM">06:15 PM (Available)</option>
                  </select>
                </div>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('Pay at Clinic')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 ${
                      paymentMode === 'Pay at Clinic' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>Pay at Hospital/OPD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('UPI Instant Pay')}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 ${
                      paymentMode === 'UPI Instant Pay' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Instant UPI / Card</span>
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-3.5 rounded-2xl bg-[#0B1120] border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Consultation Fee:</span>
                <span className="text-base font-extrabold text-cyan-400">₹{fee}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Confirm Booking & Generate Queue Token</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
