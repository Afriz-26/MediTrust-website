import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pharmacy } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { Pill, Truck, Store, Upload, CheckCircle2, X, FileText, ShoppingBag } from 'lucide-react';

interface PharmacyOrderModalProps {
  pharmacy: Pharmacy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PharmacyOrderModal: React.FC<PharmacyOrderModalProps> = ({ pharmacy, isOpen, onClose }) => {
  const { placePharmacyOrder } = useHealthcare();
  const { user } = useAuth();

  const [deliveryType, setDeliveryType] = useState<'Home Delivery' | 'Store Pickup'>('Home Delivery');
  const [medicineInput, setMedicineInput] = useState('Paracetamol 650mg, Vitamin C, BP Medicines');
  const [patientAddress, setPatientAddress] = useState('Door 4-102, Alipiri Main Road, Tirupati');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+91 98765 43210');
  const [prescriptionFile, setPrescriptionFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !pharmacy) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placePharmacyOrder({
      patientName: user?.name || 'Venkatesh K.',
      patientPhone,
      patientAddress,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      deliveryType,
      items: [
        { name: 'Prescribed Medicines / Essentials', quantity: 1, price: 450 }
      ],
      totalAmount: 450,
      prescriptionUploaded: !!prescriptionFile,
      prescriptionFileName: prescriptionFile || undefined
    });
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
              <img src={pharmacy.image} alt={pharmacy.name} className="w-12 h-12 rounded-2xl object-cover border border-cyan-500/40" />
              <div>
                <h2 className="text-lg font-bold text-white">{pharmacy.name}</h2>
                <p className="text-xs text-cyan-400 font-medium">{pharmacy.address}, {pharmacy.city}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <ShoppingBag className="w-10 h-10" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-white">Medicine Order Placed!</h3>
              <p className="text-xs text-slate-300">
                {pharmacy.name} has received your order and is verifying items/prescription.
              </p>
              <div className="p-4 rounded-2xl bg-[#0B1120] border border-emerald-500/30 text-left text-xs space-y-1">
                <div className="font-mono text-emerald-400 font-bold">STATUS: Order Received (Preparing)</div>
                <div className="text-slate-400">Delivery Type: {deliveryType} • Estimated Fulfillment: 30 Mins</div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
              >
                Track Order Status in Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Delivery Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Delivery Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('Home Delivery')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      deliveryType === 'Home Delivery'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Home Delivery (Express)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('Store Pickup')}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      deliveryType === 'Store Pickup'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400'
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-400" />
                    <span>Store Pickup (Self)</span>
                  </button>
                </div>
              </div>

              {/* Medicine List Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Medicines / Health Products Requested</label>
                <textarea
                  rows={2}
                  required
                  value={medicineInput}
                  onChange={(e) => setMedicineInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600 resize-none"
                />
              </div>

              {/* Upload Prescription */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Upload Doctor Prescription (Optional)</label>
                <label className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-[#0B1120] border border-dashed border-slate-700 hover:border-cyan-500 cursor-pointer text-xs text-slate-400 transition-colors">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>{prescriptionFile ? `Selected: ${prescriptionFile}` : 'Choose PDF or Image File'}</span>
                  <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* Address & Phone */}
              {deliveryType === 'Home Delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <Pill className="w-5 h-5" />
                <span>Place Medicine Order</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
